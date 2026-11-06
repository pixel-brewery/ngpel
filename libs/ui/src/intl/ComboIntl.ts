// #region Imports

import type { Provider } from '@angular/core';
import { ComboElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the combo component.
 *
 * @param translations - Translation keys used for the combo labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideComboIntl(translations: IntlTranslationMap<ComboElementIntl>): Provider {
    return {
        provide: ComboElementIntl,
        useFactory: (): ComboElementIntl => translateIntl(new ComboElementIntl(), translations),
    };
}
