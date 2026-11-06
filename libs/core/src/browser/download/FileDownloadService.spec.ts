import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileDownloadService } from './FileDownloadService';

function createService(): FileDownloadService {
    TestBed.configureTestingModule({ providers: [FileDownloadService] });

    return TestBed.inject(FileDownloadService);
}

function stubObjectUrls(): { readonly revokeObjectURL: ReturnType<typeof vi.fn> } {
    const revokeObjectURL = vi.fn();
    Object.defineProperty(window.URL, 'createObjectURL', {
        configurable: true,
        value: vi.fn(() => 'blob:generated-url'),
    });
    Object.defineProperty(window.URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });

    return { revokeObjectURL };
}

describe('FileDownloadService', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('suggests the supplied name instead of the temporary object URL', () => {
        // Arrange
        const anchor = document.createElement('a');
        const click = vi.spyOn(anchor, 'click').mockImplementation(() => undefined);
        vi.spyOn(document, 'createElement').mockReturnValue(anchor);
        stubObjectUrls();
        const service = createService();

        // Act
        service.downloadBlobAs(new Blob(['doc']), 'report.docx');

        // Assert
        expect(anchor.download).toBe('report.docx');
        expect(anchor.getAttribute('href')).toBe('blob:generated-url');
        expect(anchor.rel).toBe('noopener');
        expect(click).toHaveBeenCalledOnce();
    });

    it('preserves umlauts and sharp s in the suggested name', () => {
        // Arrange
        const anchor = document.createElement('a');
        vi.spyOn(anchor, 'click').mockImplementation(() => undefined);
        vi.spyOn(document, 'createElement').mockReturnValue(anchor);
        stubObjectUrls();
        const service = createService();

        // Act
        service.downloadBlobAs(new Blob(['photo']), 'Grüße ß.jpg');

        // Assert
        expect(anchor.download).toBe('Grüße ß.jpg');
    });

    it('releases the temporary object URL even when the click throws', () => {
        // Arrange
        const anchor = document.createElement('a');
        vi.spyOn(anchor, 'click').mockImplementation(() => {
            throw new Error('blocked');
        });
        vi.spyOn(document, 'createElement').mockReturnValue(anchor);
        const { revokeObjectURL } = stubObjectUrls();
        const service = createService();

        // Act
        const download = (): void => service.downloadBlobAs(new Blob(['doc']), 'a.docx');

        // Assert
        expect(download).toThrowError('blocked');
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:generated-url');
    });

    it('does nothing when there is no window', () => {
        // Arrange
        const createElement = vi.fn();
        TestBed.configureTestingModule({
            providers: [FileDownloadService, { provide: DOCUMENT, useValue: { defaultView: null, createElement } }],
        });
        const service = TestBed.inject(FileDownloadService);

        // Act
        service.downloadBlobAs(new Blob(['doc']), 'a.docx');

        // Assert
        expect(createElement).not.toHaveBeenCalled();
    });
});
