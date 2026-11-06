// #region Imports

import { Location } from '@angular/common';
import { DestroyRef, ErrorHandler, inject, Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationSkipped, NavigationStart, Router } from '@angular/router';
import {
    defaultIfEmpty,
    defer,
    EMPTY,
    finalize,
    firstValueFrom,
    from,
    fromEvent,
    map,
    type Observable,
    Subject,
    type Subscription,
    take,
    takeUntil,
} from 'rxjs';
import { CONTEXT_OVERLAY_OPTIONS } from './CONTEXT_OVERLAY_OPTIONS';
import { CONTEXT_OVERLAY_TARGETS } from './CONTEXT_OVERLAY_TARGETS';
import type { ContextOverlayLoader } from './ContextOverlayLoader';
import { ContextOverlayRegistry } from './ContextOverlayRegistry';
import { ContextOverlayUrl } from './ContextOverlayUrl';
import type { IContextOverlayOutcome } from './IContextOverlayOutcome';
import type { IContextOverlayRef } from './IContextOverlayRef';
import type { IContextOverlayState } from './IContextOverlayState';
import type { IContextOverlayTarget } from './IContextOverlayTarget';

// #endregion

interface IActiveOverlay {
    state: IContextOverlayState;
    readonly target: IContextOverlayTarget;
    readonly ref: IContextOverlayRef;
    readonly closed: Promise<void>;
    routeClosing: boolean;
    subscription?: Subscription;
}

interface IOverlayPlan {
    readonly state: IContextOverlayState;
    readonly target: IContextOverlayTarget;
    readonly url: string;
}

function sameAddress(left: IContextOverlayState | undefined, right: IContextOverlayState): boolean {
    return left !== undefined && left.key === right.key && left.id === right.id && left.context === right.context;
}

/**
 * Synchronizes a stack of contextual surfaces with the current browser URL. Register it once with
 * `provideContextOverlayRouting()` at application composition.
 *
 * @public
 */
@Injectable()
export class ContextOverlayService {
    // #region Fields

    private readonly _location = inject(Location);
    private readonly _router = inject(Router);
    private readonly _errorHandler = inject(ErrorHandler);
    private readonly _options = inject(CONTEXT_OVERLAY_OPTIONS);
    private readonly _url = inject(ContextOverlayUrl);
    private readonly _registry = new ContextOverlayRegistry(inject(CONTEXT_OVERLAY_TARGETS, { optional: true }) ?? []);
    private readonly _closedOutcome = new Subject<IContextOverlayOutcome>();
    private readonly _active: IActiveOverlay[] = [];
    private readonly _prepared = new Map<string, ContextOverlayLoader>();
    private _ready = false;
    private _navigationId: number | undefined;
    private _awaitingPopState = false;
    private _requestedUrl: string | undefined;
    private _disposed = false;
    private _request: AbortController | undefined;
    private _transition: Promise<void> = Promise.resolve();

    // #endregion

    // #region Ctor

    /** Starts synchronization and binds the mounted surfaces to the environment injector. */
    public constructor() {
        const routerSubscription = this._router.events.subscribe((event): void => {
            if (event instanceof NavigationStart) {
                this._navigationId = event.id;
                this._request?.abort();
                this._requestedUrl = undefined;
                return;
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError || event instanceof NavigationSkipped) {
                if (this._navigationId !== undefined && this._navigationId !== event.id) {
                    return;
                }
                this._navigationId = undefined;
                this._awaitingPopState = false;
                this._ready ||= event instanceof NavigationEnd || this._router.navigated;
                this.synchronizeIfReady();
            }
        });
        const popStateSubscription = this._location.subscribe((event): void => {
            if (event.type === 'popstate') {
                this._awaitingPopState = true;
                this._request?.abort();
                this._requestedUrl = undefined;
            }
        });
        const disconnectLocation = this._location.onUrlChange((): void => this.synchronizeIfReady());
        inject(DestroyRef).onDestroy((): void => {
            routerSubscription.unsubscribe();
            popStateSubscription.unsubscribe();
            disconnectLocation();
            this.dispose();
        });
        this._ready = this._router.navigated;
        this.synchronizeIfReady();
    }

    // #endregion

    // #region Properties

    /** Emits the address of each overlay closed by its surface, for callers that only need to refresh related data. */
    public get closed(): Observable<IContextOverlayState> {
        return this.closedOutcome.pipe(map(({ state }) => state));
    }

    /** Emits interactive close outcomes. URL-driven closes and disposal are silent. */
    public get closedOutcome(): Observable<IContextOverlayOutcome> {
        return this._closedOutcome.asObservable();
    }

    // #endregion

    // #region Methods

    /**
     * Checks whether a feature registered an overlay key, regardless of access to a particular address.
     * @param key Semantic target key.
     * @returns Whether the key belongs to the overlay registry.
     */
    public hasTarget(key: string): boolean {
        return this._registry.resolve(key) !== undefined;
    }

    /**
     * Opens a registered overlay above the current page and appends one browser history entry.
     *
     * @param key Registered target key.
     * @param id Identifier for a detail surface. Omit it for creation.
     * @param context Optional addressable feature context.
     * @param transient Optional in-memory data for this opening only.
     * @returns Whether the address was accepted.
     */
    public open(key: string, id?: string, context?: string, transient?: unknown): boolean {
        return this.writeAddress({ key, id, context }, false, transient);
    }

    /**
     * Opens the top address of an in-scope resource URL over the current page.
     *
     * @param url Resource URL containing the overlay address.
     * @returns Whether the address was accepted.
     */
    public openFromUrl(url: string): boolean {
        const stack = this._url.parseStack(url);
        const top = stack === 'invalid' ? undefined : stack.at(-1);

        return top !== undefined && this.open(top.key, top.id, top.context);
    }

    /**
     * Switches the top overlay within the current browser history entry.
     *
     * @param key Registered target key.
     * @param id Identifier for a detail surface. Omit it for creation.
     * @param context Optional addressable feature context.
     * @returns Whether the replacement was accepted.
     */
    public replaceTop(key: string, id?: string, context?: string): boolean {
        return this.writeAddress({ key, id, context }, true);
    }

    /**
     * Promotes the mounted top create surface to a persisted identity without remounting it.
     *
     * @param key Key of the active create target.
     * @param id Newly persisted resource identifier.
     * @returns Whether the active surface was updated.
     */
    public identifyCreated(key: string, id: string): boolean {
        const active = this._active.at(-1);
        if (!this.canWrite() || !active || active.routeClosing || active.state.key !== key || active.state.id !== undefined) {
            return false;
        }

        const previous = active.state;
        const state: IContextOverlayState = { ...previous, id };
        const url = this.currentUrl();
        const stack = this._url.parseStack(url);
        if (stack === 'invalid' || !sameAddress(stack.at(-1), previous)) {
            return false;
        }

        try {
            const next = this._url.writeStack(url, [...stack.slice(0, -1), state]);
            this.requireTarget(state).prepare(state);
            active.state = state;
            this.replaceUrl(next);
            return true;
        } catch {
            active.state = previous;
            return false;
        }
    }

    private writeAddress(state: IContextOverlayState, replace: boolean, transient?: unknown): boolean {
        if (!this.canWrite()) {
            return false;
        }
        const url = this.currentUrl();
        const stack = this._url.parseStack(url);
        if (stack === 'invalid' || (replace && stack.length === 0)) {
            return false;
        }

        let next: string | undefined;
        try {
            const target = this.requireTarget(state);
            if (sameAddress(stack.at(-1), state)) {
                return true;
            }
            next = this._url.writeStack(url, [...(replace ? stack.slice(0, -1) : stack), state]);
            this._prepared.set(next, target.prepare(state, transient));
            if (replace) {
                this.replaceUrl(next);
            } else {
                this._location.go(next);
            }
            return true;
        } catch {
            if (next !== undefined) {
                this._prepared.delete(next);
            }
            return false;
        }
    }

    private synchronizeIfReady(): void {
        if (!this.canWrite()) {
            return;
        }
        const url = this.currentUrl();
        if (url === this._requestedUrl) {
            return;
        }
        this._requestedUrl = url;
        this._request?.abort();
        this._request = new AbortController();
        const { signal } = this._request;

        let plan: IOverlayPlan[] = [];
        let failure: { readonly error: unknown } | undefined;
        try {
            const stack = this._url.parseStack(url);
            if (stack === 'invalid') {
                throw new Error('Invalid contextual overlay URL.');
            }
            plan = stack.map((state, index) => ({
                state,
                target: this.requireTarget(state),
                url: this._url.writeStack(url, stack.slice(0, index + 1)),
            }));
        } catch (error) {
            failure = { error };
        }
        const plannedUrls = new Set(plan.map((entry) => entry.url));
        for (const preparedUrl of this._prepared.keys()) {
            if (!plannedUrls.has(preparedUrl)) {
                this._prepared.delete(preparedUrl);
            }
        }

        this._transition = this._transition
            .then(async (): Promise<void> => {
                await this.transition(url, plan, signal);
                if (failure && this.isCurrent(url, signal)) {
                    this.reportInvalid(url, failure.error);
                }
            })
            .catch((error: unknown): void => {
                if (this.isCurrent(url, signal)) {
                    this.reportInvalid(url, error);
                }
            });
    }

    private async transition(url: string, plan: ReadonlyArray<IOverlayPlan>, signal: AbortSignal): Promise<void> {
        if (!this.isCurrent(url, signal)) {
            return;
        }

        let common = 0;
        for (const entry of plan) {
            if (!sameAddress(this._active[common]?.state, entry.state)) {
                break;
            }
            common++;
        }
        while (this._active.length > common) {
            const active = this._active.at(-1);
            if (!active) {
                break;
            }
            active.routeClosing = true;
            active.ref.close();
            await active.closed;
            if (!this.isCurrent(url, signal)) {
                return;
            }
        }

        for (const entry of plan.slice(common)) {
            const load = this._prepared.get(entry.url) ?? entry.target.prepare(entry.state);
            const open = await firstValueFrom(
                defer(() => (signal.aborted ? EMPTY : from(load(signal)))).pipe(takeUntil(fromEvent(signal, 'abort')), defaultIfEmpty(undefined)),
            );
            if (!open || !this.isCurrent(url, signal)) {
                return;
            }
            this.requireTarget(entry.state);
            this._prepared.delete(entry.url);
            this.mount(entry, open());
            if (!this.isCurrent(url, signal)) {
                return;
            }
        }
    }

    private mount(entry: IOverlayPlan, ref: IContextOverlayRef): void {
        let settle!: () => void;
        const closed = new Promise<void>((resolve) => {
            settle = resolve;
        });
        const active: IActiveOverlay = {
            state: entry.state,
            target: entry.target,
            ref,
            closed,
            routeClosing: false,
        };
        this._active.push(active);
        active.subscription = ref.closed.pipe(take(1), defaultIfEmpty(undefined), finalize(settle)).subscribe({
            next: (result: unknown): void => this.surfaceClosed(active, result),
            error: (error: unknown): void => {
                this.surfaceClosed(active, undefined);
                this._errorHandler.handleError(error);
            },
        });
        if (!active.subscription.closed) {
            ref.onOpened?.();
        }
    }

    private surfaceClosed(active: IActiveOverlay, result: unknown): void {
        const index = this._active.indexOf(active);
        if (index < 0) {
            return;
        }
        this._active.splice(index, 1);
        if (active.routeClosing || !this.canWrite()) {
            return;
        }
        const url = this.currentUrl();
        const stack = this._url.parseStack(url);
        if (stack === 'invalid' || !sameAddress(stack[index], active.state)) {
            return;
        }
        this.replaceUrl(this._url.writeStack(url, stack.slice(0, index)));
        active.target.onClosed?.(result, active.state);
        this._closedOutcome.next({ state: active.state, result });
    }

    private requireTarget(state: IContextOverlayState): IContextOverlayTarget {
        const target = this._registry.resolve(state.key);
        if (!target || !target.canOpen(state)) {
            throw new Error(`Contextual overlay "${state.key}" is unavailable.`);
        }
        return target;
    }

    private reportInvalid(url: string, error: unknown): void {
        try {
            void Promise.resolve(this._options.onInvalidUrl(url, error)).catch((failure: unknown): void => this._errorHandler.handleError(failure));
        } catch (failure) {
            this._errorHandler.handleError(failure);
        }
    }

    private canWrite(): boolean {
        return this._ready && !this._disposed && !this._awaitingPopState && this._navigationId === undefined;
    }

    private currentUrl(): string {
        return this._location.path(true) || '/';
    }

    private isCurrent(url: string, signal: AbortSignal): boolean {
        return this.canWrite() && !signal.aborted && this.currentUrl() === url;
    }

    private replaceUrl(url: string): void {
        this._location.replaceState(url, '', this._location.getState());
    }

    private dispose(): void {
        this._disposed = true;
        this._request?.abort();
        this._prepared.clear();
        for (const active of this._active.splice(0).reverse()) {
            active.subscription?.unsubscribe();
            if (!active.routeClosing) {
                active.ref.close();
            }
        }
        this._closedOutcome.complete();
    }

    // #endregion
}
