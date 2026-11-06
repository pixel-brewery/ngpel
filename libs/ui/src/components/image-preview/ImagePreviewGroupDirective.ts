// #region Imports

import { contentChildren, Directive, HostListener, inject, input, type InputSignal } from '@angular/core';
import { ImageComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IImagePreviewConfig } from './IImagePreviewConfig';
import type { IImagePreviewImage } from './IImagePreviewImage';
import { ImagePreviewService } from './ImagePreviewService';

// #endregion

/**
 * Opens descendant Mosaik image controls as one navigable preview collection.
 *
 * @public
 */
@Directive({
    selector: '[ngpImagePreviewGroup]',
    exportAs: 'ngpImagePreviewGroup',
})
export class ImagePreviewGroupDirective {
    // #region Fields

    private readonly _imagePreviewService = inject(ImagePreviewService);
    private readonly _imageComponents = contentChildren(ImageComponent, { descendants: true });

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
     * Optional image collection replacing descendant Mosaik image metadata.
     *
     * @public
     * @readonly
     */
    public readonly ngpImagePreviewGroup: InputSignal<ReadonlyArray<IImagePreviewImage> | undefined> = input<ReadonlyArray<IImagePreviewImage>>();

    // #endregion

    // #region Methods

    /**
     * Opens the clicked descendant image and its siblings.
     *
     * @param event - Bubbling group click event.
     * @protected
     */
    @HostListener('click', ['$event'])
    protected openClickedImage(event: MouseEvent): void {
        if (!(event.target instanceof Node)) {
            return;
        }

        const imageComponents = this._imageComponents();
        const index = imageComponents.findIndex((imageComponent) => imageComponent.elementRef.nativeElement.contains(event.target as Node));
        if (index < 0) {
            return;
        }

        const images =
            this.ngpImagePreviewGroup() ??
            imageComponents.map((imageComponent) => ({
                alt: imageComponent.alt(),
                height: imageComponent.height(),
                src: imageComponent.src() ?? '',
                srcset: imageComponent.srcset(),
                width: imageComponent.width(),
            }));

        this._imagePreviewService.open(images, this.config(), index);
    }

    // #endregion
}
