// #region Imports

import { TestBed } from '@angular/core/testing';
import { Cancel, DIALOG_REF, DIALOG_REF_DATA } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImageCropDialogComponent } from './ImageCropDialogComponent';
import type { IImageCropDialogData } from './IImageCropDialogData';
import type { IImageCropSelection } from './IImageCropSelection';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    Cancel: {
        negative: vi.fn(() => ({ reason: 'negative' })),
        positive: vi.fn((result: File) => ({ reason: 'positive', result })),
    },
    DIALOG_REF: 'DIALOG_REF',
    DIALOG_REF_DATA: 'DIALOG_REF_DATA',
    DialogContentDirective: class DialogContentDirective {},
    DialogFooterDirective: class DialogFooterDirective {},
    DialogHeaderComponent: class DialogHeaderComponent {},
    DialogHeaderDirective: class DialogHeaderDirective {},
}));

interface IImageCropDialogComponentTestApi {
    apply(): void;

    cancel(): void;

    onCropError(): void;

    onCropResult(file: File): void;

    onSelectionChange(selection: IImageCropSelection): void;
}

describe('ImageCropDialogComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('enables apply only after a selection reaches the configured minimum size', () => {
        // arrange
        const { component, api } = createComponent();

        // act
        api.onSelectionChange({ left: 0, top: 0, width: 8, height: 8 });

        // assert
        expect(component.canApply()).toBe(true);
        expect(component.selection()).toEqual({ left: 0, top: 0, width: 8, height: 8 });
    });

    it('closes positively with the encoded crop result', () => {
        // arrange
        const { api, close } = createComponent();
        const file = new File(['crop'], 'crop.png', { type: 'image/png' });

        // act
        api.onCropResult(file);

        // assert
        expect(close).toHaveBeenCalledWith(Cancel.positive(file));
    });

    it('closes negatively when the user cancels', () => {
        // arrange
        const { api, close } = createComponent();

        // act
        api.cancel();

        // assert
        expect(close).toHaveBeenCalledWith(Cancel.negative());
    });

    describe('edge cases', () => {
        it('does not request a crop for an undersized selection', () => {
            // arrange
            const { component, api } = createComponent();
            api.onSelectionChange({ left: 0, top: 0, width: 7, height: 100 });

            // act
            api.apply();

            // assert
            expect(component.canApply()).toBe(false);
            expect(component.cropRequest()).toBe(0);
        });

        it('shows the configured safe message instead of exposing the technical crop error', () => {
            // arrange
            const { component, api } = createComponent();

            // act
            api.onCropError();

            // assert
            expect(component.cropError()).toBe('Crop failed');
        });
    });
});

function createComponent(): {
    readonly api: IImageCropDialogComponentTestApi;
    readonly close: ReturnType<typeof vi.fn>;
    readonly component: ImageCropDialogComponent;
} {
    const close = vi.fn();
    const data: IImageCropDialogData = {
        labels: {
            title: 'Crop',
            description: 'Select',
            imageAlternativeText: 'Source',
            cancel: 'Cancel',
            apply: 'Apply',
            cropError: 'Crop failed',
        },
        minimumSelectionSize: 8,
        outputFileName: 'source-crop.png',
        previewUrl: 'blob:source',
    };
    TestBed.configureTestingModule({
        providers: [
            { provide: DIALOG_REF_DATA, useValue: data },
            { provide: DIALOG_REF, useValue: { close } },
        ],
    });
    const component = TestBed.runInInjectionContext(() => new ImageCropDialogComponent());

    return {
        api: component as unknown as IImageCropDialogComponentTestApi,
        close,
        component,
    };
}
