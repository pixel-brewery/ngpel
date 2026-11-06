// #region Imports

import type { Provider } from '@angular/core';
import { CHAT_INTL } from '@pixel-brewery/mosaik-elements-angular';
import { ChatElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the chat component.
 *
 * @param translations - Translation keys used for the chat labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideChatIntl(translations: IntlTranslationMap<ChatElementIntl>): Provider {
    return {
        provide: CHAT_INTL,
        useFactory: (): ChatElementIntl => translateIntl(new ChatElementIntl(), translations),
    };
}
