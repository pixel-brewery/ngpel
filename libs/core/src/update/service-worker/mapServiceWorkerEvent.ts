// #region Imports

import type { UnrecoverableStateEvent, VersionEvent } from '@angular/service-worker';
import type { IUpdateEvent } from '../models/IUpdateEvent';

// #endregion

/**
 * Translates a `SwUpdate` event into the source-agnostic {@link IUpdateEvent} vocabulary.
 *
 * @public
 * @param event A `versionUpdates` or `unrecoverable` event of `SwUpdate`.
 * @returns The equivalent update event.
 */
export function mapServiceWorkerEvent(event: VersionEvent | UnrecoverableStateEvent): IUpdateEvent {
    switch (event.type) {
        case 'VERSION_DETECTED':
            return { type: 'versionDetected', version: { id: event.version.hash, appData: event.version.appData } };
        case 'VERSION_READY':
            return {
                type: 'versionReady',
                currentVersion: { id: event.currentVersion.hash, appData: event.currentVersion.appData },
                latestVersion: { id: event.latestVersion.hash, appData: event.latestVersion.appData },
            };
        case 'VERSION_INSTALLATION_FAILED':
            return {
                type: 'versionInstallationFailed',
                version: { id: event.version.hash, appData: event.version.appData },
                error: event.error,
            };
        case 'NO_NEW_VERSION_DETECTED':
            return { type: 'noNewVersionDetected', version: { id: event.version.hash, appData: event.version.appData } };
        case 'UNRECOVERABLE_STATE':
            return { type: 'unrecoverable', reason: event.reason };
        default: {
            const unhandled: never = event;

            return unhandled;
        }
    }
}
