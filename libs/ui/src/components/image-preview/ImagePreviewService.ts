// #region Imports

import { inject, Injectable } from '@angular/core';
import { DialogService } from '@pixel-brewery/mosaik-elements-angular';
import type { IImagePreviewConfig } from './IImagePreviewConfig';
import type { IImagePreviewImage } from './IImagePreviewImage';
import type { IImagePreviewLabels } from './IImagePreviewLabels';
import { ImagePreviewComponent } from './ImagePreviewComponent';
import type { IImagePreviewData } from './ImagePreviewData';
import { ImagePreviewRef } from './ImagePreviewRef';
import { ImagePreviewState } from './ImagePreviewState';

// #endregion

const DEFAULT_LABELS: IImagePreviewLabels = {
    close: 'Close image preview',
    next: 'Next image',
    previous: 'Previous image',
    rotateLeft: 'Rotate left',
    rotateRight: 'Rotate right',
    viewer: 'Image preview',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
};

/**
 * Opens images in a full-screen CDK overlay.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ImagePreviewService {
    // #region Fields

    private readonly _dialogService = inject(DialogService);

    // #endregion

    // #region Methods

    /**
     * Opens an image collection and returns its control reference.
     *
     * @param images - Images available in the viewer.
     * @param config - Optional behavior and presentation overrides.
     * @param index - Initially selected image index.
     * @returns Reference controlling the open preview.
     * @public
     */
    public open(images: ReadonlyArray<IImagePreviewImage>, config: IImagePreviewConfig = {}, index = 0): ImagePreviewRef {
        const validImages = images.filter((image) => image.src.trim().length > 0);
        if (validImages.length === 0) {
            throw new Error('ImagePreviewService requires at least one image with a non-empty source.');
        }

        const resolvedData = this.resolveData(validImages, config, index);
        const data: IImagePreviewData = {
            ...resolvedData,
            state: new ImagePreviewState(resolvedData),
        };
        const dialogRef = this._dialogService.show<IImagePreviewData>(ImagePreviewComponent, {
            backdropStrategy: 'own',
            clickOutsideToClose: false,
            closeOnNavigation: data.config.closeOnNavigation,
            data,
            focusOnOpen: true,
            hasBackdrop: false,
            isFullScreen: true,
            pressEscapeToClose: data.config.keyboard,
            size: {
                height: '100vh',
                width: '100vw',
            },
        });

        return new ImagePreviewRef(dialogRef, data.state);
    }

    /**
     * Resolves safe configuration defaults and bounds.
     *
     * @param images - Valid preview images.
     * @param config - Requested configuration.
     * @param index - Requested initial index.
     * @returns Fully resolved preview data.
     * @private
     */
    private resolveData(images: ReadonlyArray<IImagePreviewImage>, config: IImagePreviewConfig, index: number): Omit<IImagePreviewData, 'state'> {
        const minZoom = Math.max(config.minZoom ?? 1, 0.1);
        const maxZoom = Math.max(config.maxZoom ?? 4, minZoom);
        const zoom = Math.min(Math.max(config.zoom ?? minZoom, minZoom), maxZoom);

        return {
            config: {
                backdropClosable: config.backdropClosable ?? true,
                closeOnNavigation: config.closeOnNavigation ?? true,
                direction: config.direction,
                keyboard: config.keyboard ?? true,
                maxZoom,
                minimumVisibleSize: Math.max(config.minimumVisibleSize ?? 64, 1),
                minZoom,
                rotation: config.rotation ?? 0,
                zoom,
                zoomStep: Math.max(config.zoomStep ?? 0.5, 0.1),
            },
            images,
            index: Math.min(Math.max(index, 0), images.length - 1),
            labels: { ...DEFAULT_LABELS, ...config.labels },
        };
    }

    // #endregion
}
