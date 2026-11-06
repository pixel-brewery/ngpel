// #region Imports

import type { Direction } from '@angular/cdk/bidi';
import type { IImagePreviewLabels } from './IImagePreviewLabels';

// #endregion

/**
 * Configures image preview behavior and presentation.
 *
 * @public
 */
export interface IImagePreviewConfig {
    /**
     * Closes the preview when its backdrop is activated.
     *
     * @public
     * @readonly
     */
    readonly backdropClosable?: boolean;

    /**
     * Disposes the preview when Angular navigation begins.
     *
     * @public
     * @readonly
     */
    readonly closeOnNavigation?: boolean;

    /**
     * Text direction of the preview.
     *
     * @public
     * @readonly
     */
    readonly direction?: Direction;

    /**
     * Enables Escape and arrow-key controls.
     *
     * @public
     * @readonly
     */
    readonly keyboard?: boolean;

    /**
     * Accessible labels used by the viewer.
     *
     * @public
     * @readonly
     */
    readonly labels?: Partial<IImagePreviewLabels>;

    /**
     * Maximum permitted zoom factor.
     *
     * @public
     * @readonly
     */
    readonly maxZoom?: number;

    /**
     * Minimum image width and height that must remain visible after dragging.
     *
     * @public
     * @readonly
     */
    readonly minimumVisibleSize?: number;

    /**
     * Minimum permitted zoom factor.
     *
     * @public
     * @readonly
     */
    readonly minZoom?: number;

    /**
     * Initial clockwise rotation in degrees.
     *
     * @public
     * @readonly
     */
    readonly rotation?: number;

    /**
     * Amount added or removed by a zoom action.
     *
     * @public
     * @readonly
     */
    readonly zoomStep?: number;

    /**
     * Initial zoom factor.
     *
     * @public
     * @readonly
     */
    readonly zoom?: number;
}
