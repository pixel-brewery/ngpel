// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';
import type { IImagePreviewImage } from './IImagePreviewImage';

// #endregion

/**
 * Converts image source strings into image preview descriptors.
 *
 * @public
 */
@Pipe({
    name: 'imagePreviewImage',
})
export class ImagePreviewImagePipe implements PipeTransform {
    // #region Methods

    /**
     * Converts one source or a source collection.
     *
     * @param value - Image source or sources to convert.
     * @returns Matching image preview descriptor or descriptors.
     * @public
     */
    public transform(value: string): IImagePreviewImage;
    public transform(value: ReadonlyArray<string>): ReadonlyArray<IImagePreviewImage>;
    public transform(value: string | ReadonlyArray<string>): IImagePreviewImage | ReadonlyArray<IImagePreviewImage> {
        return Array.isArray(value) ? value.map((src) => ({ src })) : { src: value as string };
    }

    // #endregion
}
