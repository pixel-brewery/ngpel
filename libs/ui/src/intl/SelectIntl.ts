// #region Imports

import type { Provider } from '@angular/core';
import { SelectElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the select component.
 *
 * @param translations - Translation keys used for the select labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideSelectIntl(translations: IntlTranslationMap<SelectElementIntl>): Provider {
    return {
        provide: SelectElementIntl,
        useFactory: (): SelectElementIntl => translateIntl(new SelectElementIntl(), translations),
    };
}
