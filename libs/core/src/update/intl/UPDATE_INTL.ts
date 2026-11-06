// #region Imports

import { InjectionToken } from '@angular/core';
import { DEFAULT_UPDATE_INTL } from './DEFAULT_UPDATE_INTL';
import type { IUpdateIntl } from './IUpdateIntl';

// #endregion

/**
 * Injection token carrying the {@link IUpdateIntl} texts. Falls back to {@link DEFAULT_UPDATE_INTL}
 * so strategies work without any configuration; `provideUpdate({ intl })` overrides it.
 *
 * @public
 */
export const UPDATE_INTL = new InjectionToken<IUpdateIntl>('NGPEL_UPDATE_INTL', {
    providedIn: 'root',
    factory: (): IUpdateIntl => DEFAULT_UPDATE_INTL,
});
