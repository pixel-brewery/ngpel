// #region Imports

import type { Provider } from '@angular/core';
import { AutoCompleteBoxElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the autocomplete box component.
 *
 * @param translations - Translation keys used for the autocomplete box labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideAutoCompleteBoxIntl(translations: IntlTranslationMap<AutoCompleteBoxElementIntl>): Provider {
    return {
        provide: AutoCompleteBoxElementIntl,
        useFactory: (): AutoCompleteBoxElementIntl => translateIntl(new AutoCompleteBoxElementIntl(), translations),
    };
}
