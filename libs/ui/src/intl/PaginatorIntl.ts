// #region Imports

import type { Provider } from '@angular/core';
import { PaginatorElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the paginator component.
 *
 * @param translations - Translation keys used for the paginator labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function providePaginatorIntl(translations: IntlTranslationMap<PaginatorElementIntl>): Provider {
    return {
        provide: PaginatorElementIntl,
        useFactory: (): PaginatorElementIntl => translateIntl(new PaginatorElementIntl(), translations),
    };
}
