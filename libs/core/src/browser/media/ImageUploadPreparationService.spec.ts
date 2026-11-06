// #region Imports

import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImageUploadPreparationService } from './ImageUploadPreparationService';

// #endregion

const OPTIONS = { maximumFileSizeInBytes: 900, maximumWidthInPixels: 1600, maximumHeightInPixels: 900 };

describe('ImageUploadPreparationService', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('preserves an already bounded file without decoding it', async () => {
        // Arrange
        const file = new File(['image'], 'poster.png', { type: 'image/png' });
        const createElement = vi.fn();
        const { service } = createService(createElement);

        // Act
        const result = await service.prepare(file, file.name, OPTIONS);

        // Assert
        expect(result).toBe(file);
        expect(createElement).not.toHaveBeenCalled();
    });

    it('resizes and encodes an oversized image within the upload budget', async () => {
        // Arrange
        const source = new Blob([new Uint8Array(1000)], { type: 'image/png' });
        const drawImage = vi.fn();
        const canvas = {
            width: 0,
            height: 0,
            getContext: () => ({ drawImage }),
            toBlob: (callback: BlobCallback, type: string) => callback(new Blob([new Uint8Array(800)], { type })),
        };
        const image = createLoadableImage(2400, 1600);
        const { service, revokeObjectURL } = createService((tagName) => (tagName === 'img' ? image : canvas));

        // Act
        const result = await service.prepare(source, 'poster.png', OPTIONS);

        // Assert
        expect(result).toMatchObject({ name: 'poster.webp', type: 'image/webp', size: 800 });
        expect(drawImage).toHaveBeenCalledWith(image, 0, 0, 1350, 900);
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:poster-source');
    });

    it('releases the image URL when the browser returns a different encoding', async () => {
        // Arrange
        const source = new Blob([new Uint8Array(1000)], { type: 'image/png' });
        const canvas = {
            getContext: () => ({ drawImage: vi.fn() }),
            toBlob: (callback: BlobCallback) => callback(new Blob(['fallback'], { type: 'image/png' })),
        };
        const image = createLoadableImage(2400, 1600);
        const { service, revokeObjectURL } = createService((tagName) => (tagName === 'img' ? image : canvas));

        // Act
        const result = service.prepare(source, 'poster.png', OPTIONS);

        // Assert
        await expect(result).rejects.toThrow('The image could not be encoded as WebP.');
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:poster-source');
    });
});

function createService(createElement: (tagName: string) => unknown): {
    readonly service: ImageUploadPreparationService;
    readonly revokeObjectURL: ReturnType<typeof vi.fn>;
} {
    const revokeObjectURL = vi.fn();
    TestBed.configureTestingModule({
        providers: [
            ImageUploadPreparationService,
            {
                provide: DOCUMENT,
                useValue: {
                    createElement,
                    defaultView: { File, URL: { createObjectURL: () => 'blob:poster-source', revokeObjectURL } },
                },
            },
        ],
    });

    return { service: TestBed.inject(ImageUploadPreparationService), revokeObjectURL };
}

function createLoadableImage(naturalWidth: number, naturalHeight: number): HTMLImageElement {
    const image = {
        naturalHeight,
        naturalWidth,
        onload: null,
        set src(_value: string) {
            queueMicrotask(() => image.onload?.(new Event('load')));
        },
    } as HTMLImageElement;

    return image;
}
