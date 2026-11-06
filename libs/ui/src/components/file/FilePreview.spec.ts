// #region Imports

import { describe, expect, it } from 'vitest';
import { createFilePreviewFallback, resolveFileExtensionLabel, resolveFileIconName } from './FilePreview';

// #endregion

describe('FilePreview', () => {
    it.each([
        ['quote.pdf', 'document'],
        ['contract.docx', 'document'],
        ['budget.xlsx', 'table'],
        ['export.csv', 'table'],
        ['bundle.zip', 'archive'],
        ['payload.json', 'code'],
        ['notes.md', 'textParagraph'],
        ['README', 'document'],
        ['', 'document'],
    ])('should represent %s with the %s icon', (fileName, expectedIcon) => {
        // act
        const iconName = resolveFileIconName(fileName);

        // assert
        expect(iconName).toBe(expectedIcon);
    });

    it.each([
        ['quote.pdf', 'PDF'],
        ['Archiv.TAR.GZ', 'GZ'],
        ['no-extension', ''],
        ['.gitignore', ''],
        [null, ''],
    ])('should label %s as %s', (fileName, expectedLabel) => {
        // act
        const label = resolveFileExtensionLabel(fileName);

        // assert
        expect(label).toBe(expectedLabel);
    });

    it('should leave the icon of the fallback preview to the rendering component', () => {
        // act
        const preview = createFilePreviewFallback();

        // assert
        expect(preview).toEqual({ type: 'other' });
    });
});
