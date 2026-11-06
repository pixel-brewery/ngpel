// #region Imports

import type { Provider } from '@angular/core';
import { FileUploadElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the file upload component.
 *
 * @param translations - Translation keys used for the file upload labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideFileUploadIntl(translations: IntlTranslationMap<FileUploadElementIntl>): Provider {
    return {
        provide: FileUploadElementIntl,
        useFactory: (): FileUploadElementIntl => translateIntl(new FileUploadElementIntl(), translations),
    };
}
