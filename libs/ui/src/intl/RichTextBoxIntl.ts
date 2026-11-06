// #region Imports

import type { Provider } from '@angular/core';
import { RichTextBoxElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the rich text box component.
 *
 * @param translations - Translation keys used for the rich text box labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideRichTextBoxIntl(translations: IntlTranslationMap<RichTextBoxElementIntl>): Provider {
    return {
        provide: RichTextBoxElementIntl,
        useFactory: (): RichTextBoxElementIntl => translateIntl(new RichTextBoxElementIntl(), translations),
    };
}
