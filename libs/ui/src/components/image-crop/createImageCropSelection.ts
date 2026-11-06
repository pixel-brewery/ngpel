// #region Imports

import type { IImageCropPoint } from './IImageCropPoint';
import type { IImageCropSelection } from './IImageCropSelection';

// #endregion

/**
 * Creates a normalized rectangle independent of drag direction.
 *
 * @param origin - Drag origin.
 * @param current - Current pointer position.
 * @returns Pixel-based crop selection.
 * @public
 */
export function createImageCropSelection(origin: IImageCropPoint, current: IImageCropPoint): IImageCropSelection {
    return {
        left: Math.min(origin.x, current.x),
        top: Math.min(origin.y, current.y),
        width: Math.abs(current.x - origin.x),
        height: Math.abs(current.y - origin.y),
    };
}
