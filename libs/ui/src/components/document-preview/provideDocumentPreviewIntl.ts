import type { Provider } from '@angular/core';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';
import { DocumentPreviewIntl } from './DocumentPreviewIntl';

/**
 * Maps the preview labels to application translation keys. Unmapped labels retain their defaults.
 *
 * @param translations Label-to-key mapping.
 * @returns The Angular provider.
 * @public
 */
export function provideDocumentPreviewIntl(translations: IntlTranslationMap<DocumentPreviewIntl>): Provider {
    return { provide: DocumentPreviewIntl, useFactory: () => translateIntl(new DocumentPreviewIntl(), translations) };
}
