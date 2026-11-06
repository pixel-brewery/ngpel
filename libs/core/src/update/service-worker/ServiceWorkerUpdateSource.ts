// #region Imports

import { inject, Injectable, type Signal, signal, type WritableSignal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import type { IUpdateEvent } from '../models/IUpdateEvent';
import type { IUpdateSource } from '../models/IUpdateSource';
import type { IUpdateStatus } from '../models/IUpdateStatus';
import type { UpdateStatusKind } from '../models/UpdateStatusKind';
import { defer, from, map, merge, type Observable, of, tap } from 'rxjs';
import { mapServiceWorkerEvent } from './mapServiceWorkerEvent';

// #endregion

/**
 * {@link IUpdateSource} adapter over the Angular service worker: maps `versionUpdates` and
 * `unrecoverable` onto {@link IUpdateEvent}, derives the {@link IUpdateStatus} from that stream and
 * from the outcome of `checkForUpdate()`, and delegates activation to `activateUpdate()`.
 * Requires `provideServiceWorker()` in the application; reports `disabled` when the service worker
 * is not enabled (for example in development builds).
 *
 * @public
 */
@Injectable()
export class ServiceWorkerUpdateSource implements IUpdateSource {
    // #region Fields

    private readonly _swUpdate: SwUpdate;
    private readonly _status: WritableSignal<IUpdateStatus>;
    private readonly _events: Observable<IUpdateEvent>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ServiceWorkerUpdateSource` class.
     *
     * @public
     * @param swUpdate The service worker update API; injected when omitted.
     */
    public constructor(swUpdate: SwUpdate = inject(SwUpdate)) {
        this._swUpdate = swUpdate;
        this._status = signal<IUpdateStatus>(swUpdate.isEnabled ? { kind: 'idle' } : { kind: 'disabled', reason: 'Service worker updates are not enabled.' });
        this._events = merge(swUpdate.versionUpdates.pipe(map(mapServiceWorkerEvent)), swUpdate.unrecoverable.pipe(map(mapServiceWorkerEvent))).pipe(
            tap((event) => this.applyEvent(event)),
        );
    }

    // #endregion

    // #region Properties

    /**
     * Whether the service worker is enabled in this build and browser.
     *
     * @public
     * @readonly
     */
    public get isEnabled(): boolean {
        return this._swUpdate.isEnabled;
    }

    /**
     * The lifecycle snapshot derived from the service worker events and checks.
     *
     * @public
     * @readonly
     */
    public get status(): Signal<IUpdateStatus> {
        return this._status.asReadonly();
    }

    /**
     * The mapped `versionUpdates` and `unrecoverable` events. Subscribing keeps the status in sync.
     *
     * @public
     * @readonly
     */
    public get events(): Observable<IUpdateEvent> {
        return this._events;
    }

    // #endregion

    // #region Methods

    /**
     * Runs `checkForUpdate()`, moving the status through `checking` to `downloading`, `idle` or
     * `failed`. Emits `false` without touching a disabled service worker.
     *
     * @public
     */
    public check(): Observable<boolean> {
        if (!this._swUpdate.isEnabled) {
            return of(false);
        }

        return defer(() => {
            this.patch({ kind: 'checking' });

            return from(this._swUpdate.checkForUpdate());
        }).pipe(
            tap({
                next: (found) => this.patch({ kind: this.kindAfterCheck(found), lastCheckedAt: new Date(Date.now()) }),
                error: (error: unknown) => this.patch({ kind: 'failed', reason: describeError(error), lastCheckedAt: new Date(Date.now()) }),
            }),
        );
    }

    /**
     * Runs `activateUpdate()`. Emits `false` without touching a disabled service worker.
     *
     * @public
     */
    public activate(): Observable<boolean> {
        if (!this._swUpdate.isEnabled) {
            return of(false);
        }

        return from(this._swUpdate.activateUpdate());
    }

    /**
     * Projects one event onto the status.
     */
    private applyEvent(event: IUpdateEvent): void {
        switch (event.type) {
            case 'versionDetected':
                this.patch({ kind: 'downloading', targetVersion: event.version.id });
                return;
            case 'versionReady':
                this.patch({ kind: 'ready', currentVersion: event.currentVersion.id, targetVersion: event.latestVersion.id });
                return;
            case 'versionInstallationFailed':
                this.patch({ kind: 'failed', targetVersion: event.version.id, reason: event.error });
                return;
            case 'noNewVersionDetected':
                this.patch({ kind: this.kindAfterCheck(false), currentVersion: event.version.id });
                return;
            case 'unrecoverable':
                this.patch({ kind: 'failed', reason: event.reason });
                return;
            default: {
                const unhandled: never = event;

                return unhandled;
            }
        }
    }

    /**
     * Keeps a downloaded version `ready`; otherwise a positive check means `downloading`, a
     * negative one `idle`.
     */
    private kindAfterCheck(found: boolean): UpdateStatusKind {
        const current = this._status().kind;

        if (current === 'ready') {
            return 'ready';
        }

        return found ? 'downloading' : 'idle';
    }

    /**
     * Merges a partial snapshot into the status.
     */
    private patch(changes: Partial<IUpdateStatus>): void {
        this._status.update((status) => ({ ...status, ...changes }));
    }

    // #endregion
}

/**
 * Extracts a readable message from a rejected check.
 */
function describeError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}
