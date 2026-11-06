// #region Imports

import { computed, DestroyRef, inject, Injectable, signal, type Signal, type WritableSignal } from '@angular/core';
import type { AbortRef } from '../refs/AbortRef';
import type { LoadingRef } from '../refs/LoadingRef';
import { isObservable, Observable, Subscription } from 'rxjs';
import { disposeViewPresenter } from './disposeViewPresenter';
import type { IViewPresenter } from './IViewPresenter';

// #endregion

/**
 * Signal-based presentation state owned by a {@link View}.
 *
 * @remarks
 * The presenter binds itself to the destruction of the injector that created it, so it releases its
 * tracked subscriptions and aborts its in-flight work even when no View ever ran `ngOnDestroy`.
 * Loading is counted, not flagged: `withLoading` balances one enter against one leave, and an
 * Observable only counts while something is subscribed to it.
 *
 * Every concrete presenter carries its own `@Injectable()`: Angular refuses to instantiate a class
 * that only inherits the decorator.
 *
 * @public
 * @abstract
 *
 * @example
 * ```typescript
 * @Injectable()
 * class OrderViewPresenter extends ViewPresenter {}
 * ```
 */
@Injectable()
export abstract class ViewPresenter implements IViewPresenter {
    // #region Fields

    private readonly _initialized: WritableSignal<boolean>;
    private readonly _disposed: WritableSignal<boolean>;
    private readonly _activeOperations: WritableSignal<number>;
    private readonly _isLoading: Signal<boolean>;
    private readonly _subscriptions: Subscription;
    private readonly _abortController: AbortController;
    private readonly _abortRef: AbortRef;
    private readonly _loadingRef: LoadingRef;
    private _disposing = false;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ViewPresenter` class.
     *
     * @public
     * @param destroyRef The destruction scope the presenter disposes with; injected when omitted.
     */
    public constructor(destroyRef: DestroyRef = inject(DestroyRef)) {
        this._initialized = signal(false);
        this._disposed = signal(false);
        this._activeOperations = signal(0);
        this._isLoading = computed(() => this._activeOperations() > 0);
        this._subscriptions = new Subscription();
        this._abortController = new AbortController();
        this._abortRef = {
            signal: this._abortController.signal,
            abort: (): void => {
                if (!this._abortController.signal.aborted) {
                    this._abortController.abort();
                }
            },
        };
        this._loadingRef = {
            enter: (): void => this.setLoading(true),
            leave: (): void => this.setLoading(false),
        };

        destroyRef.onDestroy(() => disposeViewPresenter(this));
    }

    // #endregion

    // #region Properties

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get disposed(): Signal<boolean> {
        return this._disposed.asReadonly();
    }

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get initialized(): Signal<boolean> {
        return this._initialized.asReadonly();
    }

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get isLoading(): Signal<boolean> {
        return this._isLoading;
    }

    /**
     * Loading reference handed to asynchronous commands so their runtime feeds `isLoading`, as in
     * `asyncCommand(() => this.save(), undefined, this.loadingRef)`.
     *
     * @protected
     * @readonly
     */
    protected get loadingRef(): LoadingRef {
        return this._loadingRef;
    }

    /**
     * Cancellation reference for presenter-owned asynchronous work; aborted on disposal.
     *
     * @protected
     * @readonly
     */
    protected get abortRef(): AbortRef {
        return this._abortRef;
    }

    // #endregion

    // #region Methods

    /**
     * Marks the presenter as initialized. Override to load the data the View binds to and call
     * `super.initialize()` first.
     *
     * @public
     * @virtual
     */
    public initialize(): void {
        if (!this._initialized()) {
            this._initialized.set(true);
        }
    }

    /**
     * Aborts in-flight work, unsubscribes every tracked subscription and marks the presenter as
     * disposed. Repeated calls are ignored.
     *
     * @public
     * @virtual
     */
    public dispose(): void {
        if (this._disposing) {
            return;
        }

        this._disposing = true;

        try {
            this._abortRef.abort();
            this._subscriptions.unsubscribe();
        } finally {
            this._disposed.set(true);
        }
    }

    /**
     * Balances the loading counter for work managed directly by a presenter subclass.
     *
     * @protected
     * @param value Whether an operation starts (`true`) or finishes (`false`).
     */
    protected loading(value: boolean): void {
        this.setLoading(value);
    }

    /**
     * Balances the loading state around an operation.
     *
     * @remarks
     * A `Subscription` counts from the moment it is handed over until it closes or is unsubscribed
     * and is released on disposal. An `Observable` is wrapped so every attached subscriber counts
     * separately and is released on disposal. A factory is invoked immediately; its `Observable` result
     * is wrapped, any other result is adopted as a promise that counts until it settles.
     *
     * @protected
     * @param operation The operation to track.
     * @returns The tracked operation.
     */
    protected withLoading(operation: Subscription): Subscription;
    protected withLoading<T>(operation: Observable<T>): Observable<T>;
    protected withLoading<T>(operation: () => Observable<T>): Observable<T>;
    protected withLoading<T>(operation: () => Promise<T> | T): Promise<T>;
    protected withLoading<T>(operation: Subscription | Observable<T> | (() => Promise<T> | Observable<T> | T)): Subscription | Promise<T> | Observable<T> {
        if (operation instanceof Subscription) {
            return this.trackSubscription(operation);
        }

        if (isObservable(operation)) {
            return this.trackObservable(operation);
        }

        const result = operation();

        if (isObservable(result)) {
            return this.trackObservable(result);
        }

        this.setLoading(true);

        return Promise.resolve(result).finally(() => this.setLoading(false));
    }

    /**
     * Adjusts the active-operation counter that backs `isLoading`, clamped at zero so an
     * unbalanced leave cannot make a later enter invisible.
     */
    private setLoading(value: boolean): void {
        this._activeOperations.update((count) => Math.max(0, count + (value ? 1 : -1)));
    }

    /**
     * Wraps an observable so the loading state is entered on subscribe and left on teardown.
     */
    private trackObservable<T>(operation: Observable<T>): Observable<T> {
        return new Observable<T>((subscriber) => {
            this.trackSubscription(subscriber);

            if (!subscriber.closed) {
                operation.subscribe(subscriber);
            }
        });
    }

    /**
     * Tracks a subscription without replacing its `unsubscribe`, so the caller keeps the instance
     * it created.
     */
    private trackSubscription(subscription: Subscription): Subscription {
        this.setLoading(true);
        subscription.add(() => this.setLoading(false));
        this._subscriptions.add(subscription);

        return subscription;
    }

    // #endregion
}
