// #region Imports

import type { IImageMarkupPoint } from './IImageMarkupPoint';
import type { ImageMarkupSymbolValue } from './ImageMarkupSymbolValue';
import type { ImageMarkupToolValue } from './ImageMarkupToolValue';

// #endregion

/**
 * Immutable drawing operation stored by the markup editor history.
 *
 * @public
 */
export interface IImageMarkupOperation {
    // #region Properties

    /**
     * Tool that produced the operation.
     *
     * @public
     * @readonly
     */
    readonly tool: ImageMarkupToolValue;

    /**
     * Source-image points used by the operation.
     *
     * @public
     * @readonly
     */
    readonly points: ReadonlyArray<IImageMarkupPoint>;

    /**
     * CSS color used to render the operation.
     *
     * @public
     * @readonly
     */
    readonly color: string;

    /**
     * Stroke width in source-image pixels.
     *
     * @public
     * @readonly
     */
    readonly strokeWidth: number;

    /**
     * Optional text content for text operations.
     *
     * @public
     * @readonly
     */
    readonly text?: string;

    /**
     * Optional symbol for symbol operations.
     *
     * @public
     * @readonly
     */
    readonly symbol?: ImageMarkupSymbolValue;

    /**
     * Text or symbol size in source-image pixels.
     *
     * @public
     * @readonly
     */
    readonly fontSize?: number;

    // #endregion
}
