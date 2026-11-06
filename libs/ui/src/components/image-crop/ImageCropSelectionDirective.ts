// #region Imports

import { Directive, ElementRef, HostListener, effect, inject, input, output, type InputSignal, type OutputEmitterRef } from '@angular/core';
import { createImageCropSelection } from './createImageCropSelection';
import type { IImageCropPoint } from './IImageCropPoint';
import type { IImageCropSelection } from './IImageCropSelection';

// #endregion

/**
 * Coordinates pointer selection and renders a selected image region to a PNG file.
 *
 * @public
 */
@Directive({
    selector: '[ngpImageCropSelection]',
})
export class ImageCropSelectionDirective {
    // #region Fields

    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private _dragOrigin: IImageCropPoint | null = null;
    private _handledCropRequest = 0;
    private _isCropping = false;
    private _pointerId: number | null = null;
    private _selection: IImageCropSelection | null = null;

    // #endregion

    // #region Ctor

    /**
     * Connects crop requests to the current selection.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            const request = this.cropRequest();

            if (request <= this._handledCropRequest) {
                return;
            }

            this._handledCropRequest = request;
            void this.crop().catch((error: unknown) => {
                this.cropError.emit(error instanceof Error ? error : new Error('The image crop failed.'));
            });
        });
    }

    // #endregion

    // #region Properties

    /**
     * Monotonically increasing value that requests the current selection as a file.
     *
     * @public
     * @readonly
     */
    public readonly cropRequest: InputSignal<number> = input.required<number>();

    /**
     * Minimum accepted selection width and height in rendered pixels.
     *
     * @public
     * @readonly
     */
    public readonly minimumSelectionSize: InputSignal<number> = input(1);

    /**
     * Name assigned to the emitted PNG file.
     *
     * @public
     * @readonly
     */
    public readonly outputFileName: InputSignal<string> = input('image-crop.png');

    /**
     * Image element used as the crop source.
     *
     * @public
     * @readonly
     */
    public readonly sourceImage: InputSignal<HTMLImageElement> = input.required<HTMLImageElement>();

    /**
     * Emits failures raised while decoding or encoding the crop.
     *
     * @public
     * @readonly
     */
    public readonly cropError: OutputEmitterRef<Error> = output<Error>();

    /**
     * Emits the cropped PNG file.
     *
     * @public
     * @readonly
     */
    public readonly cropResult: OutputEmitterRef<File> = output<File>();

    /**
     * Emits the normalized selection whenever pointer movement changes it.
     *
     * @public
     * @readonly
     */
    public readonly selectionChange: OutputEmitterRef<IImageCropSelection> = output<IImageCropSelection>();

    // #endregion

    // #region Methods

    /**
     * Begins a selection from the active pointer.
     *
     * @param event - Pointer event raised on the crop surface.
     * @protected
     */
    @HostListener('pointerdown', ['$event'])
    protected onPointerDown(event: PointerEvent): void {
        if (this._pointerId !== null) {
            return;
        }

        const surface = this._elementRef.nativeElement;
        const point = resolveImageCropPoint(event, surface.getBoundingClientRect());
        this._pointerId = event.pointerId;
        this._dragOrigin = point;
        surface.setPointerCapture(event.pointerId);
        this.publishSelection(createImageCropSelection(point, point));
        event.preventDefault();
    }

    /**
     * Updates the active selection.
     *
     * @param event - Pointer event raised on the crop surface.
     * @protected
     */
    @HostListener('pointermove', ['$event'])
    protected onPointerMove(event: PointerEvent): void {
        if (event.pointerId !== this._pointerId || !this._dragOrigin) {
            return;
        }

        const point = resolveImageCropPoint(event, this._elementRef.nativeElement.getBoundingClientRect());
        this.publishSelection(createImageCropSelection(this._dragOrigin, point));
        event.preventDefault();
    }

    /**
     * Completes or cancels the active selection.
     *
     * @param event - Pointer event raised on the crop surface.
     * @protected
     */
    @HostListener('pointerup', ['$event'])
    @HostListener('pointercancel', ['$event'])
    protected onPointerUp(event: PointerEvent): void {
        if (event.pointerId !== this._pointerId) {
            return;
        }

        const surface = this._elementRef.nativeElement;

        if (surface.hasPointerCapture(event.pointerId)) {
            surface.releasePointerCapture(event.pointerId);
        }

        this._pointerId = null;
        this._dragOrigin = null;
        event.preventDefault();
    }

    /**
     * Converts the selected rendered rectangle into source-image pixels.
     *
     * @private
     */
    private async crop(): Promise<void> {
        const selection = this._selection;
        const minimumSelectionSize = Math.max(this.minimumSelectionSize(), 1);

        if (this._isCropping || !selection || selection.width < minimumSelectionSize || selection.height < minimumSelectionSize) {
            return;
        }

        this._isCropping = true;

        try {
            const surface = this._elementRef.nativeElement;
            const image = this.sourceImage();

            if (!image.complete) {
                await image.decode();
            }

            if (image.naturalWidth <= 0 || image.naturalHeight <= 0 || surface.clientWidth <= 0 || surface.clientHeight <= 0) {
                throw new Error('The source image has no renderable dimensions.');
            }

            const scaleX = image.naturalWidth / surface.clientWidth;
            const scaleY = image.naturalHeight / surface.clientHeight;
            const canvas = surface.ownerDocument.createElement('canvas');
            canvas.width = Math.max(1, Math.round(selection.width * scaleX));
            canvas.height = Math.max(1, Math.round(selection.height * scaleY));
            const context = canvas.getContext('2d');

            if (!context) {
                throw new Error('The image crop canvas could not be initialized.');
            }

            context.drawImage(
                image,
                Math.round(selection.left * scaleX),
                Math.round(selection.top * scaleY),
                canvas.width,
                canvas.height,
                0,
                0,
                canvas.width,
                canvas.height,
            );
            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('The image crop could not be encoded.'))), 'image/png');
            });
            this.cropResult.emit(
                new File([blob], this.outputFileName(), {
                    type: 'image/png',
                    lastModified: Date.now(),
                }),
            );
        } finally {
            this._isCropping = false;
        }
    }

    /**
     * Stores and publishes the current selection.
     *
     * @param selection - Normalized rendered rectangle.
     * @private
     */
    private publishSelection(selection: IImageCropSelection): void {
        this._selection = selection;
        this.selectionChange.emit(selection);
    }

    // #endregion
}

function resolveImageCropPoint(event: PointerEvent, bounds: DOMRect): IImageCropPoint {
    return {
        x: Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width),
        y: Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height),
    };
}
