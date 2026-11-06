// #region Imports

import { inject, Injectable } from '@angular/core';
import { DialogService } from '@pixel-brewery/mosaik-elements-angular';
import { finalize, take } from 'rxjs';
import type { IImageCropConfig } from './IImageCropConfig';
import type { IImageCropDialogData } from './IImageCropDialogData';
import type { IImageCropLabels } from './IImageCropLabels';
import type { IImageCropRef } from './IImageCropRef';
import { ImageCropDialogComponent } from './ImageCropDialogComponent';

// #endregion

const DEFAULT_LABELS: IImageCropLabels = {
    title: 'Crop image',
    description: 'Drag to select an image region.',
    imageAlternativeText: 'Image to crop',
    cancel: 'Cancel',
    apply: 'Apply crop',
    cropError: 'The selected image region could not be created.',
};

/**
 * Opens image files in the reusable crop dialog and manages temporary browser resources.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ImageCropService {
    // #region Fields

    private readonly _dialogService = inject(DialogService);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    /**
     * Opens an image for rectangular cropping.
     *
     * @param file - Source image file.
     * @param config - Optional behavior and label overrides.
     * @returns Reference to the opened crop dialog.
     * @public
     */
    public open(file: File, config: IImageCropConfig = {}): IImageCropRef {
        this.validateFile(file);

        const previewUrl = URL.createObjectURL(file);
        const requestedMinimumSelectionSize = config.minimumSelectionSize ?? 8;
        const data: IImageCropDialogData = {
            labels: { ...DEFAULT_LABELS, ...config.labels },
            minimumSelectionSize: Number.isFinite(requestedMinimumSelectionSize) ? Math.max(1, Math.round(requestedMinimumSelectionSize)) : 8,
            outputFileName: this.resolveOutputFileName(file, config.outputFileName),
            previewUrl,
        };

        try {
            const dialogRef = this._dialogService.show<IImageCropDialogData, File>(ImageCropDialogComponent, {
                data,
                hasBackdrop: true,
                backdropStrategy: 'own',
                clickOutsideToClose: false,
                pressEscapeToClose: true,
                size: { width: '80rem', height: '58rem' },
                minSize: { width: '20rem' },
                maxSize: { width: '100vw', height: '100vh' },
            });
            dialogRef.closed
                .pipe(
                    take(1),
                    finalize(() => URL.revokeObjectURL(previewUrl)),
                )
                .subscribe({ error: () => undefined });

            return {
                closed: dialogRef.closed,
                overlayRef: dialogRef.overlayRef,
            };
        } catch (error: unknown) {
            URL.revokeObjectURL(previewUrl);
            throw error;
        }
    }

    /**
     * Resolves a safe PNG output name.
     *
     * @param file - Source image file.
     * @param configuredName - Optional caller-provided name.
     * @returns File name ending in `.png`.
     * @private
     */
    private resolveOutputFileName(file: File, configuredName: string | undefined): string {
        const requestedName = configuredName?.trim();
        if (requestedName) {
            return requestedName.toLowerCase().endsWith('.png') ? requestedName : `${requestedName}.png`;
        }

        const extensionIndex = file.name.lastIndexOf('.');
        const baseName = (extensionIndex > 0 ? file.name.slice(0, extensionIndex) : file.name).trim() || 'image';

        return `${baseName}-crop.png`;
    }

    /**
     * Rejects empty and unsupported source files before opening an overlay.
     *
     * @param file - Source file to validate.
     * @private
     */
    private validateFile(file: File): void {
        if (!(file instanceof File) || file.size <= 0 || !file.type.startsWith('image/')) {
            throw new Error('ImageCropService requires a non-empty image file.');
        }
    }

    // #endregion
}
