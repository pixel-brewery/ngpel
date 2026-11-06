// #region Imports

import { Directive, ElementRef, HostListener, inject, input, type InputSignal } from '@angular/core';
import { AvatarComponent, ImageComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IImagePreviewConfig } from './IImagePreviewConfig';
import type { IImagePreviewImage } from './IImagePreviewImage';
import { ImagePreviewService } from './ImagePreviewService';

// #endregion

/**
 * Opens image-bearing controls and elements in the shared image preview.
 *
 * @public
 */
@Directive({
    selector: 'mosaik-avatar[ngpImagePreview], mosaik-image[ngpImagePreview]',
    exportAs: 'ngpImagePreview',
})
export class ImagePreviewDirective {
    // #region Fields

    private readonly _avatarComponent = inject(AvatarComponent, { optional: true, self: true });
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _imageComponent = inject(ImageComponent, { optional: true, self: true });
    private readonly _imagePreviewService = inject(ImagePreviewService);

    // #endregion

    // #region Properties

    /**
     * Optional preview behavior overrides.
     *
     * @public
     * @readonly
     */
    public readonly config: InputSignal<IImagePreviewConfig> = input<IImagePreviewConfig>({});

    /**
     * Optional image metadata replacing values from the Mosaik control.
     *
     * @public
     * @readonly
     */
    public readonly preview: InputSignal<IImagePreviewImage | undefined> = input<IImagePreviewImage>();

    /**
     * Prevents the host image from opening the shared preview.
     *
     * @public
     * @readonly
     */
    public readonly previewDisabled: InputSignal<boolean> = input(false);

    // #endregion

    // #region Methods

    /**
     * Opens the image represented by the host control.
     *
     * @public
     */
    @HostListener('click')
    public open(): void {
        if (this.previewDisabled()) {
            return;
        }

        const image = this.preview() ?? this.resolveImage();
        if (image) {
            this._imagePreviewService.open([image], this.config());
        }
    }

    /**
     * Resolves image metadata from the attached Mosaik control.
     *
     * @returns Resolved image metadata when a source is available.
     * @private
     */
    private resolveImage(): IImagePreviewImage | undefined {
        const src = this._imageComponent?.src() ?? this._avatarComponent?.src();
        if (!src) {
            return undefined;
        }

        return {
            alt: this._imageComponent?.alt() ?? this._elementRef.nativeElement.getAttribute('aria-label') ?? undefined,
            height: this._imageComponent?.height(),
            src,
            srcset: this._imageComponent?.srcset(),
            width: this._imageComponent?.width(),
        };
    }

    // #endregion
}
