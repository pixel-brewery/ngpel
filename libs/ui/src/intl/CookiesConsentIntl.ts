// #region Imports

import type { Provider } from '@angular/core';
import { CookiesConsentElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the cookies consent component.
 *
 * @param translations - Translation keys used for the cookies consent labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideCookiesConsentIntl(translations: IntlTranslationMap<CookiesConsentElementIntl>): Provider {
    return {
        provide: CookiesConsentElementIntl,
        useFactory: (): CookiesConsentElementIntl => translateIntl(new CookiesConsentElementIntl(), translations),
    };
}
