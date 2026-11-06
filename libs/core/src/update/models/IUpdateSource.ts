// #region Imports

import type { Signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { IUpdateEvent } from './IUpdateEvent';
import type { IUpdateStatus } from './IUpdateStatus';

// #endregion

/**
 * Port between the update lifecycle and the platform that delivers updates. The service-worker
 * entry point ships an adapter over `SwUpdate`; a desktop application implements it over its IPC
 * channel, a test over a scriptable fake.
 *
 * @public
 */
export interface IUpdateSource {
    // #region Properties

    /**
     * Whether the source can deliver updates at all. Expected to be stable for the lifetime of the
     * application; transient conditions are reported through {@link IUpdateSource.status}.
     */
    readonly isEnabled: boolean;

    /**
     * The current lifecycle snapshot.
     */
    readonly status: Signal<IUpdateStatus>;

    /**
     * Lifecycle events, dispatched by the manager to every registered strategy.
     */
    readonly events: Observable<IUpdateEvent>;

    // #endregion

    // #region Methods

    /**
     * Asks the platform for a newer version. Resolves `true` when a newer version was found.
     */
    check(): Observable<boolean> | Promise<boolean>;

    /**
     * Activates a downloaded version. Resolves `true` when a version was activated.
     */
    activate(): Observable<boolean> | Promise<boolean>;

    // #endregion
}
