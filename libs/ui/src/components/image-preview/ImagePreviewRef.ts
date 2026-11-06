// #region Imports

import { Cancel, type IDialogRef } from '@pixel-brewery/mosaik-elements-angular';
import { map, type Observable } from 'rxjs';
import type { IImagePreviewData } from './ImagePreviewData';
import type { ImagePreviewState } from './ImagePreviewState';

// #endregion

/**
 * Controls one open image preview.
 *
 * @public
 */
export class ImagePreviewRef {
    // #region Fields

    private readonly _dialogRef: IDialogRef<IImagePreviewData>;
    private readonly _state: ImagePreviewState;

    // #endregion

    // #region Ctor

    /**
     * Constructs an image preview reference.
     *
     * @param dialogRef - Owning Mosaik dialog reference.
     * @param state - Reactive preview state.
     * @public
     */
    public constructor(dialogRef: IDialogRef<IImagePreviewData>, state: ImagePreviewState) {
        this._dialogRef = dialogRef;
        this._state = state;
        this.closed = this._dialogRef.closed.pipe(map(() => undefined));
    }

    // #endregion

    // #region Properties

    /**
     * Emits once after the preview is disposed.
     *
     * @public
     * @readonly
     */
    public readonly closed: Observable<void>;

    // #endregion

    // #region Methods

    /**
     * Disposes the preview.
     *
     * @public
     */
    public close(): void {
        this._dialogRef.close(Cancel.negative());
    }

    /**
     * Selects the next image.
     *
     * @public
     */
    public next(): void {
        this._state.next();
    }

    /**
     * Selects the previous image.
     *
     * @public
     */
    public previous(): void {
        this._state.previous();
    }

    /**
     * Selects an image by its zero-based index.
     *
     * @param index - Requested image index.
     * @public
     */
    public select(index: number): void {
        this._state.select(index);
    }

    // #endregion
}
