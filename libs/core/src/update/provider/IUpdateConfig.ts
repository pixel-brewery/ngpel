// #region Imports

import type { IUpdateIntl } from '../intl/IUpdateIntl';

// #endregion

/**
 * Options of `provideUpdate()`.
 *
 * @public
 */
export interface IUpdateConfig {
    // #region Properties

    /**
     * Runs an update check as soon as the application is stable.
     *
     * @default false
     */
    readonly checkOnStart?: boolean;

    /**
     * Overrides for the neutral {@link IUpdateIntl} texts; omitted keys keep their default.
     */
    readonly intl?: Partial<IUpdateIntl>;

    // #endregion
}
