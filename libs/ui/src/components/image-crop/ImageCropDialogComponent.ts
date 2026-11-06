// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, signal, type Signal } from '@angular/core';
import {
    ButtonComponent,
    Cancel,
    DIALOG_REF,
    DIALOG_REF_DATA,
    DialogContentDirective,
    DialogFooterDirective,
    DialogHeaderComponent,
    DialogHeaderDirective,
    type IDialogRef,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IImageCropDialogData } from './IImageCropDialogData';
import type { IImageCropLabels } from './IImageCropLabels';
import type { IImageCropSelection } from './IImageCropSelection';
import { ImageCropSelectionDirective } from './ImageCropSelectionDirective';

// #endregion

/**
 * Renders a localized dialog for selecting and encoding an image region.
 *
 * @public
 */
@Component({
    selector: 'ngp-image-crop-dialog',
    imports: [ButtonComponent, DialogContentDirective, DialogFooterDirective, DialogHeaderComponent, DialogHeaderDirective, ImageCropSelectionDirective],
    template: `
        <ng-template mosaikDialogHeader>
            <mosaik-dialog-header [text]="labels.title" [subText]="labels.description" />
        </ng-template>

        <ng-template mosaikDialogContent>
            <div class="flex min-h-72 flex-col gap-3">
                <div class="flex flex-1 items-center justify-center overflow-auto bg-(--mosaik-scheme-surface) p-2">
                    <div class="relative inline-flex max-w-full select-none">
                        <img
                            #sourceImage
                            class="block max-h-[65vh] max-w-[min(72rem,100%)] object-contain"
                            draggable="false"
                            [src]="previewUrl"
                            [alt]="labels.imageAlternativeText"
                        />
                        <div
                            class="absolute inset-0 cursor-crosshair touch-none"
                            ngpImageCropSelection
                            [sourceImage]="sourceImage"
                            [cropRequest]="cropRequest()"
                            [minimumSelectionSize]="minimumSelectionSize"
                            [outputFileName]="outputFileName"
                            (selectionChange)="onSelectionChange($event)"
                            (cropResult)="onCropResult($event)"
                            (cropError)="onCropError()"
                        >
                            @if (selection(); as currentSelection) {
                                <div
                                    class="pointer-events-none absolute border-2 border-(--mosaik-scheme-primary) bg-[color-mix(in_srgb,var(--mosaik-scheme-primary)_18%,transparent)] shadow-[0_0_0_9999px_color-mix(in_srgb,black_48%,transparent)]"
                                    [style.left.px]="currentSelection.left"
                                    [style.top.px]="currentSelection.top"
                                    [style.width.px]="currentSelection.width"
                                    [style.height.px]="currentSelection.height"
                                ></div>
                            }
                        </div>
                    </div>
                </div>

                @if (cropError(); as errorMessage) {
                    <p class="text-sm text-(--mosaik-scheme-error)" role="alert">{{ errorMessage }}</p>
                }
            </div>
        </ng-template>

        <ng-template mosaikDialogFooter>
            <div class="flex items-center justify-end gap-2">
                <mosaik-button [label]="labels.cancel" [appearance]="'plain'" (click)="cancel()" />
                <mosaik-button [label]="labels.apply" [appearance]="'solid'" [variant]="'primary'" [disabled]="!canApply()" (click)="apply()" />
            </div>
        </ng-template>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropDialogComponent {
    // #region Fields

    private readonly _data = inject(DIALOG_REF_DATA) as IImageCropDialogData;
    private readonly _dialogRef = inject(DIALOG_REF) as IDialogRef<IImageCropDialogData, File>;
    private readonly _cropError = signal<string | null>(null);
    private readonly _cropRequest = signal(0);
    private readonly _selection = signal<IImageCropSelection | null>(null);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Indicates whether the current selection satisfies the configured size.
     *
     * @public
     * @readonly
     */
    public readonly canApply: Signal<boolean> = computed(() => {
        const selection = this._selection();

        return selection !== null && selection.width >= this._data.minimumSelectionSize && selection.height >= this._data.minimumSelectionSize;
    });

    /**
     * Current crop error shown to the user.
     *
     * @public
     * @readonly
     */
    public readonly cropError: Signal<string | null> = this._cropError.asReadonly();

    /**
     * Monotonically increasing crop request.
     *
     * @public
     * @readonly
     */
    public readonly cropRequest: Signal<number> = this._cropRequest.asReadonly();

    /**
     * Resolved user-visible dialog labels.
     *
     * @public
     * @readonly
     */
    public readonly labels: IImageCropLabels = this._data.labels;

    /**
     * Minimum accepted selection width and height.
     *
     * @public
     * @readonly
     */
    public readonly minimumSelectionSize: number = this._data.minimumSelectionSize;

    /**
     * File name assigned to the encoded crop.
     *
     * @public
     * @readonly
     */
    public readonly outputFileName: string = this._data.outputFileName;

    /**
     * Temporary browser URL rendering the source image.
     *
     * @public
     * @readonly
     */
    public readonly previewUrl: string = this._data.previewUrl;

    /**
     * Current rendered-image selection.
     *
     * @public
     * @readonly
     */
    public readonly selection: Signal<IImageCropSelection | null> = this._selection.asReadonly();

    // #endregion

    // #region Methods

    /**
     * Closes the dialog without a result.
     *
     * @protected
     */
    protected cancel(): void {
        this._dialogRef.close(Cancel.negative());
    }

    /**
     * Requests encoding of the current selection.
     *
     * @protected
     */
    protected apply(): void {
        if (this.canApply()) {
            this._cropError.set(null);
            this._cropRequest.update((request) => request + 1);
        }
    }

    /**
     * Shows a localized error after crop encoding failed.
     *
     * @protected
     */
    protected onCropError(): void {
        this._cropError.set(this._data.labels.cropError);
    }

    /**
     * Closes the dialog with the encoded crop.
     *
     * @param file - Cropped PNG file.
     * @protected
     */
    protected onCropResult(file: File): void {
        this._dialogRef.close(Cancel.positive(file));
    }

    /**
     * Stores the normalized image selection.
     *
     * @param selection - Current rendered-image rectangle.
     * @protected
     */
    protected onSelectionChange(selection: IImageCropSelection): void {
        this._selection.set(selection);
        this._cropError.set(null);
    }

    // #endregion
}
