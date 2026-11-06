// #region Imports

import type { IUpdateIntl } from './IUpdateIntl';

// #endregion

/**
 * Neutral English texts used until a product overrides them through `provideUpdate({ intl })`.
 *
 * @public
 */
export const DEFAULT_UPDATE_INTL: Readonly<IUpdateIntl> = Object.freeze({
    readyHeader: 'New version available',
    readyMessage: 'Reload the application to use the latest version.',
    unrecoverableHeader: 'Reload required',
    unrecoverableMessage: 'The installed version can no longer be used. Please reload the application.',
    installationFailedHeader: 'Update failed',
    installationFailedMessage: 'The new version could not be installed.',
    noNewVersionMessage: 'No new version available.',
    reloadLabel: 'Reload',
});
