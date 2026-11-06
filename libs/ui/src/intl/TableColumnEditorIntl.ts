// #region Imports

import type { Provider } from '@angular/core';
import { TABLE_COLUMN_EDITOR_INTL } from '@pixel-brewery/mosaik-elements-angular';
import { TableColumnEditorElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the table column editor component.
 *
 * @param translations - Translation keys used for the table column editor labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideTableColumnEditorIntl(translations: IntlTranslationMap<TableColumnEditorElementIntl>): Provider {
    return {
        provide: TABLE_COLUMN_EDITOR_INTL,
        useFactory: (): TableColumnEditorElementIntl => translateIntl(new TableColumnEditorElementIntl(), translations),
    };
}

/**
 * Creates an instance of the table column editor intl.
 *
 * @returns The intl instance with English defaults.
 *
 * @deprecated Use `provideTableColumnEditorIntl()` instead. This function returns an instance without translation for legacy compatibility.
 *
 * @public
 */
