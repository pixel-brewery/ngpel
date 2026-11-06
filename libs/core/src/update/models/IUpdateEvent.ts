// #region Imports

import type { IUpdateNoNewVersionDetectedEvent } from './IUpdateNoNewVersionDetectedEvent';
import type { IUpdateUnrecoverableEvent } from './IUpdateUnrecoverableEvent';
import type { IUpdateVersionDetectedEvent } from './IUpdateVersionDetectedEvent';
import type { IUpdateVersionInstallationFailedEvent } from './IUpdateVersionInstallationFailedEvent';
import type { IUpdateVersionReadyEvent } from './IUpdateVersionReadyEvent';

// #endregion

/**
 * Discriminated union of every event an {@link IUpdateSource} can emit. It replaces the
 * `@angular/service-worker` event classes in the strategy contract, so the primary entry point has
 * no service-worker dependency and any platform can implement the port.
 *
 * @public
 */
export type IUpdateEvent =
    | IUpdateVersionDetectedEvent
    | IUpdateVersionReadyEvent
    | IUpdateVersionInstallationFailedEvent
    | IUpdateNoNewVersionDetectedEvent
    | IUpdateUnrecoverableEvent;
