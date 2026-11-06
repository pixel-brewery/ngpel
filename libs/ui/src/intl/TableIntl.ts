// #region Imports

import type { Provider } from '@angular/core';
import { TABLE_INTL } from '@pixel-brewery/mosaik-elements-angular';
import { TableElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides the application's own labels for the Mosaik table.
 *
 * @public
 * @param translations Translation keys for the table labels.
 * @returns The provider to add to the composition root.
 */
export function provideTableIntl(translations: IntlTranslationMap<TableElementIntl>): Provider {
    return {
        provide: TABLE_INTL,
        useFactory: (): TableElementIntl => translateIntl(new TableElementIntl(), translations),
    };
}
