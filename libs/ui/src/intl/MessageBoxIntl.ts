// #region Imports

import type { Provider } from '@angular/core';
import { MessageBoxElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the message box component.
 *
 * @param translations - Translation keys used for the message box labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideMessageBoxIntl(translations: IntlTranslationMap<MessageBoxElementIntl>): Provider {
    return {
        provide: MessageBoxElementIntl,
        useFactory: (): MessageBoxElementIntl => translateIntl(new MessageBoxElementIntl(), translations),
    };
}
