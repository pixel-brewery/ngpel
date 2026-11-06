// #region Imports

import { type Signal, signal, type WritableSignal } from '@angular/core';
import { concatMap, first, from, type Observable, of, Subscription, tap } from 'rxjs';
import type { IUpdateEvent } from '../models/IUpdateEvent';
import type { IUpdateSource } from '../models/IUpdateSource';
import type { IUpdateStatus } from '../models/IUpdateStatus';
import type { IUpdateHandlerStrategy } from '../strategies/IUpdateHandlerStrategy';
import type { IUpdateManagerOptions } from './IUpdateManagerOptions';

// #endregion

/**
 * Drives the update lifecycle: listens to the {@link IUpdateSource}, fans every event out to all
 * registered strategies and exposes check/activate operations that wait for application
 * stability. Created by `provideUpdate()`; inject it to trigger manual checks or to read the status.
 *
 * @public
 */
export class UpdateManager {
    // #region Fields

    private readonly _source: IUpdateSource;
    private readonly _strategies: ReadonlyArray<IUpdateHandlerStrategy>;
    private readonly _checkOnStart: boolean;
    private readonly _isStable: Observable<boolean>;
    private readonly _subscriptions: Subscription;
    private readonly _lastUpdate: WritableSignal<Date | null>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `UpdateManager` class.
     *
     * @public
     * @param source The platform source to listen to.
     * @param strategies The strategies every event is dispatched to, in order.
     * @param options Lifecycle options.
     */
    public constructor(source: IUpdateSource, strategies: ReadonlyArray<IUpdateHandlerStrategy>, options: IUpdateManagerOptions = {}) {
        this._source = source;
        this._strategies = strategies;
        this._checkOnStart = options.checkOnStart ?? false;
        this._isStable = options.isStable ?? of(true);
        this._subscriptions = new Subscription();
        this._lastUpdate = signal<Date | null>(null);
    }

    // #endregion

    // #region Properties

    /**
     * The lifecycle snapshot reported by the source.
     *
     * @public
     * @readonly
     */
    public get status(): Signal<IUpdateStatus> {
        return this._source.status;
    }

    /**
     * When the manager last completed a check, or `null` before the first one.
     *
     * @public
     * @readonly
     */
    public get lastUpdate(): Signal<Date | null> {
        return this._lastUpdate.asReadonly();
    }

    /**
     * Whether the source can deliver updates at all.
     *
     * @public
     * @readonly
     */
    public get isEnabled(): boolean {
        return this._source.isEnabled;
    }

    // #endregion

    // #region Methods

    /**
     * Starts listening to the source and, when configured, runs the initial check. Does nothing
     * for a disabled source.
     *
     * @public
     */
    public initialize(): void {
        if (!this._source.isEnabled) {
            return;
        }

        this._subscriptions.add(this._source.events.subscribe((event) => this.dispatch(event)));

        if (this._checkOnStart) {
            this._subscriptions.add(this.check().subscribe());
        }
    }

    /**
     * Stops listening to the source and cancels a pending initial check.
     *
     * @public
     */
    public dispose(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * Waits for application stability, then asks the source for a newer version and records the
     * check time. Emits `false` without consulting a disabled source.
     *
     * @public
     */
    public check(): Observable<boolean> {
        return this._isStable.pipe(
            first((isStable) => isStable),
            concatMap(() => (this._source.isEnabled ? from(this._source.check()) : of(false))),
            tap(() => this._lastUpdate.set(new Date(Date.now()))),
        );
    }

    /**
     * Activates a downloaded version through the source.
     *
     * @public
     */
    public update(): Observable<boolean> {
        return from(this._source.activate());
    }

    /**
     * Routes one event to the matching hook of every strategy.
     */
    private dispatch(event: IUpdateEvent): void {
        for (const strategy of this._strategies) {
            switch (event.type) {
                case 'versionDetected':
                    strategy.versionDetected(event);
                    break;
                case 'versionInstallationFailed':
                    strategy.versionInstallationFailed(event);
                    break;
                case 'versionReady':
                    strategy.versionReady(event);
                    break;
                case 'noNewVersionDetected':
                    strategy.noNewVersionDetected(event);
                    break;
                case 'unrecoverable':
                    strategy.unrecoverable(event);
                    break;
                default: {
                    const unhandled: never = event;

                    return unhandled;
                }
            }
        }
    }

    // #endregion
}
