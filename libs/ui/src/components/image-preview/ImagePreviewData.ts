// #region Imports

import { InjectionToken } from '@angular/core';
import type { IImagePreviewConfig } from './IImagePreviewConfig';
import type { IImagePreviewImage } from './IImagePreviewImage';
import type { IImagePreviewLabels } from './IImagePreviewLabels';
import type { ImagePreviewState } from './ImagePreviewState';

// #endregion

/**
 * Fully resolved data supplied to an image preview overlay.
 *
 * @public
 */
export interface IImagePreviewData {
    /**
     * Resolved viewer configuration.
     *
     * @public
     * @readonly
     */
    readonly config: Required<Omit<IImagePreviewConfig, 'direction' | 'labels'>> & Pick<IImagePreviewConfig, 'direction'>;

    /**
     * Images available in the viewer.
     *
     * @public
     * @readonly
     */
    readonly images: ReadonlyArray<IImagePreviewImage>;

    /**
     * Initially selected image index.
     *
     * @public
     * @readonly
     */
    readonly index: number;

    /**
     * Resolved accessible control labels.
     *
     * @public
     * @readonly
     */
    readonly labels: IImagePreviewLabels;

    /**
     * Reactive state shared by the component and its public reference.
     *
     * @public
     * @readonly
     */
    readonly state: ImagePreviewState;
}

/**
 * Provides resolved data to an image preview overlay.
 *
 * @public
 */
export const IMAGE_PREVIEW_DATA = new InjectionToken<IImagePreviewData>('IMAGE_PREVIEW_DATA');
