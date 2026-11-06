// #region Imports

import type { ThumbnailPreview } from '@pixel-brewery/mosaik-elements-foundation';
import type { FileStateValue } from '../file/FileStateValue';

// #endregion

/**
 * Framework-independent view model rendered by the generic files container.
 *
 * @public
 */
export interface IFileItem {
    /** Stable identifier returned by item interaction events. */
    readonly id: number | string;

    /** User-facing file name. */
    readonly fileName: string;

    /** Optional MIME type used to infer a preview. */
    readonly contentType?: null | string;

    /** Optional supporting text. */
    readonly description?: null | string;

    /** Whether this individual file rejects interactions. */
    readonly disabled?: boolean;

    /** Optional explicit Mosaik thumbnail preview. */
    readonly preview?: null | ThumbnailPreview;

    /** Optional media URL used to infer an image, video, or audio preview. */
    readonly previewUrl?: null | string;

    /** Determinate progress between zero and one. */
    readonly progress?: number;

    /** File size in bytes. */
    readonly sizeInBytes?: null | number;

    /** Current visual and interaction state. */
    readonly state?: FileStateValue;

    /** Accessible label for the current state. */
    readonly stateLabel?: null | string;
}
