// #region Imports

import { inject, type Provider } from '@angular/core';
import { DATA_TABLE_INTL, TABLE_COLUMN_EDITOR_INTL } from '@pixel-brewery/mosaik-elements-angular';
import { DataTableElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides the application's own labels for the Mosaik data table.
 *
 * The data table embeds the column editor, so a column-editor internationalization provided
 * alongside it is folded in rather than silently ignored.
 *
 * @public
 * @param translations Translation keys for the data table labels.
 * @returns The provider to add to the composition root.
 */
export function provideDataTableIntl(translations: IntlTranslationMap<DataTableElementIntl>): Provider {
    return {
        provide: DATA_TABLE_INTL,
        useFactory: (): DataTableElementIntl => {
            const intl = translateIntl(new DataTableElementIntl(), translations);
            const columnEditorIntl = inject(TABLE_COLUMN_EDITOR_INTL, { optional: true });

            if (columnEditorIntl) {
                Object.assign(intl.columnEditor, columnEditorIntl);
            }

            return intl;
        },
    };
}
