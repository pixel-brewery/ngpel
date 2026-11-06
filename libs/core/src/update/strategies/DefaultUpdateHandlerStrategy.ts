// #region Imports

import { inject, Injectable } from '@angular/core';
import type { IUpdateIntl } from '../intl/IUpdateIntl';
import { UPDATE_INTL } from '../intl/UPDATE_INTL';
import type { IUpdateNoNewVersionDetectedEvent } from '../models/IUpdateNoNewVersionDetectedEvent';
import type { IUpdateUnrecoverableEvent } from '../models/IUpdateUnrecoverableEvent';
import type { IUpdateVersionInstallationFailedEvent } from '../models/IUpdateVersionInstallationFailedEvent';
import type { IUpdateVersionReadyEvent } from '../models/IUpdateVersionReadyEvent';
import { UpdateHandlerStrategyBase } from './UpdateHandlerStrategyBase';

// #endregion

/**
 * Console-only strategy: reports the lifecycle with the {@link IUpdateIntl} texts and never
 * touches the UI. Registered by default when `provideUpdate()` receives no strategy feature.
 *
 * @public
 */
@Injectable()
export class DefaultUpdateHandlerStrategy extends UpdateHandlerStrategyBase {
    // #region Fields

    /** The texts this strategy reports with. */
    private readonly _intl: IUpdateIntl = inject(UPDATE_INTL);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `DefaultUpdateHandlerStrategy` class. The base constructor is
     * protected, so the public constructor is what keeps the class usable as an Angular `Type`.
     *
     * @public
     */
    public constructor() {
        super();
    }

    // #endregion

    // #region Methods

    /**
     * Reports the failed installation on the console.
     *
     * @public
     * @override
     */
    public override versionInstallationFailed(event: IUpdateVersionInstallationFailedEvent): void {
        super.versionInstallationFailed(event);

        console.error(`${this._intl.installationFailedHeader}: ${this._intl.installationFailedMessage}\n${event.error}`);
    }

    /**
     * Reports the available version on the console.
     *
     * @public
     * @override
     */
    public override versionReady(event: IUpdateVersionReadyEvent): void {
        super.versionReady(event);

        console.info(`${this._intl.readyHeader}: ${this._intl.readyMessage}`);
    }

    /**
     * Reports the unchanged version on the console.
     *
     * @public
     * @override
     */
    public override noNewVersionDetected(event: IUpdateNoNewVersionDetectedEvent): void {
        super.noNewVersionDetected(event);

        console.info(this._intl.noNewVersionMessage);
    }

    /**
     * Reports the broken installation on the console.
     *
     * @public
     * @override
     */
    public override unrecoverable(event: IUpdateUnrecoverableEvent): void {
        super.unrecoverable(event);

        console.error(`${this._intl.unrecoverableHeader}: ${this._intl.unrecoverableMessage}\n${event.reason}`);
    }

    // #endregion
}
