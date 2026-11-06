// #region Imports

import type { Provider } from '@angular/core';
import { ListElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the list component.
 *
 * @param translations - Translation keys used for the list labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideListIntl(translations: IntlTranslationMap<ListElementIntl>): Provider {
    return {
        provide: ListElementIntl,
        useFactory: (): ListElementIntl => translateIntl(new ListElementIntl(), translations),
    };
}
