// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import type { IImageUploadPreparationOptions } from './IImageUploadPreparationOptions';

// #endregion

const INITIAL_WEBP_QUALITY = 0.84;
const MINIMUM_WEBP_QUALITY = 0.44;
const WEBP_QUALITY_STEP = 0.1;
const DIMENSION_SCALE_STEP = 0.8;
const MAXIMUM_ENCODING_ATTEMPTS = 20;
const WEBP_TYPE = 'image/webp';

/**
 * Prepares a browser-selected image for upload. Files within the byte limit retain their bytes and name.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ImageUploadPreparationService {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);

    // #endregion

    // #region Methods

    /**
     * Preserves small images and resizes and encodes oversized images as WebP.
     *
     * @public
     * @param source Image data selected by the user.
     * @param originalName Name to use for a blob or to derive a WebP file name from.
     * @param options Byte limit and dimension limits for re-encoding.
     * @returns The prepared file.
     */
    public async prepare(source: Blob, originalName: string, options: IImageUploadPreparationOptions): Promise<File> {
        const view = this._document.defaultView;
        if (!view || typeof view.File !== 'function') {
            throw new Error('Image upload preparation requires a browser window.');
        }

        if (source.size <= options.maximumFileSizeInBytes) {
            return source instanceof view.File ? source : new view.File([source], originalName, { type: source.type || 'application/octet-stream' });
        }

        const image = this._document.createElement('img');
        const sourceUrl = view.URL.createObjectURL(source);

        try {
            await this.loadImage(image, sourceUrl);
            const encoded = await this.encodeWithinTransportLimit(image, options);

            return new view.File([encoded], this.createOutputName(originalName), { type: WEBP_TYPE });
        } finally {
            view.URL.revokeObjectURL(sourceUrl);
        }
    }

    private async encodeWithinTransportLimit(image: HTMLImageElement, options: IImageUploadPreparationOptions): Promise<Blob> {
        let scale = Math.min(1, options.maximumWidthInPixels / image.naturalWidth, options.maximumHeightInPixels / image.naturalHeight);
        let quality = INITIAL_WEBP_QUALITY;

        for (let attempt = 0; attempt < MAXIMUM_ENCODING_ATTEMPTS; attempt += 1) {
            const canvas = this.createCanvas(image, scale);
            const blob = await this.encodeWebp(canvas, quality);

            if (blob.size > 0 && blob.size <= options.maximumFileSizeInBytes) {
                return blob;
            }

            if (quality > MINIMUM_WEBP_QUALITY) {
                quality = Math.max(MINIMUM_WEBP_QUALITY, quality - WEBP_QUALITY_STEP);
            } else {
                scale *= DIMENSION_SCALE_STEP;
                quality = INITIAL_WEBP_QUALITY;
            }
        }

        throw new Error('The image could not be reduced to the upload transport limit.');
    }

    private createCanvas(image: HTMLImageElement, scale: number): HTMLCanvasElement {
        const canvas = this._document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('The image upload canvas could not be initialized.');
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        return canvas;
    }

    private encodeWebp(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (blob?.type === WEBP_TYPE) {
                        resolve(blob);
                    } else {
                        reject(new Error('The image could not be encoded as WebP.'));
                    }
                },
                WEBP_TYPE,
                quality,
            );
        });
    }

    private async loadImage(image: HTMLImageElement, sourceUrl: string): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error('The image could not be loaded.'));
            image.src = sourceUrl;
        });

        if (image.naturalWidth <= 0 || image.naturalHeight <= 0) {
            throw new Error('The image has invalid dimensions.');
        }
    }

    private createOutputName(originalName: string): string {
        const extensionIndex = originalName.lastIndexOf('.');
        const baseName = (extensionIndex > 0 ? originalName.slice(0, extensionIndex) : originalName).trim() || 'image';

        return `${baseName}.webp`;
    }

    // #endregion
}
