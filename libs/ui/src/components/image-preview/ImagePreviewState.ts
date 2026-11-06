// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { Point } from '@angular/cdk/drag-drop';
import type { IImagePreviewImage } from './IImagePreviewImage';
import type { IImagePreviewData } from './ImagePreviewData';

// #endregion

/**
 * Owns the reactive state of one image preview instance.
 *
 * @public
 */
export class ImagePreviewState {
    // #region Fields

    private readonly _data: Omit<IImagePreviewData, 'state'>;
    private readonly _index: WritableSignal<number>;
    private readonly _position: WritableSignal<Point> = signal({ x: 0, y: 0 });
    private readonly _rotation: WritableSignal<number>;
    private readonly _zoom: WritableSignal<number>;

    // #endregion

    // #region Ctor

    /**
     * Constructs preview state from resolved data.
     *
     * @param data - Resolved preview data.
     * @public
     */
    public constructor(data: Omit<IImagePreviewData, 'state'>) {
        this._data = data;
        this._index = signal(data.index);
        this._rotation = signal(data.config.rotation);
        this._zoom = signal(data.config.zoom);
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether another image follows the current image.
     *
     * @public
     * @readonly
     */
    public readonly canGoNext: Signal<boolean> = computed(() => this._index() < this._data.images.length - 1);

    /**
     * Indicates whether another image precedes the current image.
     *
     * @public
     * @readonly
     */
    public readonly canGoPrevious: Signal<boolean> = computed(() => this._index() > 0);

    /**
     * Indicates whether the image can be enlarged.
     *
     * @public
     * @readonly
     */
    public readonly canZoomIn: Signal<boolean> = computed(() => this._zoom() < this._data.config.maxZoom);

    /**
     * Indicates whether the image can be reduced.
     *
     * @public
     * @readonly
     */
    public readonly canZoomOut: Signal<boolean> = computed(() => this._zoom() > this._data.config.minZoom);

    /**
     * Currently rendered image.
     *
     * @public
     * @readonly
     */
    public readonly currentImage: Signal<IImagePreviewImage> = computed(() => this.getCurrentImage());

    /**
     * Current free-drag position.
     *
     * @public
     * @readonly
     */
    public readonly position: Signal<Point> = this._position.asReadonly();

    /**
     * CSS transform applied to the current image.
     *
     * @public
     * @readonly
     */
    public readonly transform: Signal<string> = computed(() => `scale3d(${this._zoom()}, ${this._zoom()}, 1) rotate(${this._rotation()}deg)`);

    // #endregion

    // #region Methods

    /**
     * Selects the next image when available.
     *
     * @public
     */
    public next(): void {
        if (this.canGoNext()) {
            this._index.update((index) => index + 1);
            this.resetTransform();
        }
    }

    /**
     * Selects the previous image when available.
     *
     * @public
     */
    public previous(): void {
        if (this.canGoPrevious()) {
            this._index.update((index) => index - 1);
            this.resetTransform();
        }
    }

    /**
     * Rotates the image counter-clockwise.
     *
     * @public
     */
    public rotateLeft(): void {
        this._rotation.update((rotation) => rotation - 90);
    }

    /**
     * Rotates the image clockwise.
     *
     * @public
     */
    public rotateRight(): void {
        this._rotation.update((rotation) => rotation + 90);
    }

    /**
     * Selects an image by its zero-based index.
     *
     * @param index - Requested image index.
     * @public
     */
    public select(index: number): void {
        const boundedIndex = Math.min(Math.max(index, 0), this._data.images.length - 1);
        if (boundedIndex !== this._index()) {
            this._index.set(boundedIndex);
            this.resetTransform();
        }
    }

    /**
     * Stores the final free-drag position.
     *
     * @param position - Final CDK free-drag position.
     * @public
     */
    public setPosition(position: Point): void {
        this._position.set(position);
    }

    /**
     * Enlarges the image by the configured step.
     *
     * @public
     */
    public zoomIn(): void {
        if (this.canZoomIn()) {
            this._zoom.update((zoom) => Math.min(zoom + this._data.config.zoomStep, this._data.config.maxZoom));
            this._position.set({ x: 0, y: 0 });
        }
    }

    /**
     * Reduces the image by the configured step.
     *
     * @public
     */
    public zoomOut(): void {
        if (this.canZoomOut()) {
            this._zoom.update((zoom) => Math.max(zoom - this._data.config.zoomStep, this._data.config.minZoom));
            this._position.set({ x: 0, y: 0 });
        }
    }

    /**
     * Resolves the selected image from validated overlay data.
     *
     * @returns Currently selected image.
     * @private
     */
    private getCurrentImage(): IImagePreviewImage {
        const image = this._data.images[this._index()];
        if (!image) {
            throw new Error('Image preview data does not contain the selected image.');
        }

        return image;
    }

    /**
     * Restores the configured transform defaults.
     *
     * @private
     */
    private resetTransform(): void {
        this._position.set({ x: 0, y: 0 });
        this._rotation.set(this._data.config.rotation);
        this._zoom.set(this._data.config.zoom);
    }

    // #endregion
}
