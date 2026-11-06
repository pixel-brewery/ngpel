// #region Imports

import { TestBed } from '@angular/core/testing';
import { DialogService, type IDialogRef } from '@pixel-brewery/mosaik-elements-angular';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ImageCropDialogComponent } from './ImageCropDialogComponent';
import type { IImageCropDialogData } from './IImageCropDialogData';
import type { IImageCropRef } from './IImageCropRef';
import { ImageCropService } from './ImageCropService';

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
    DialogService: class DialogService {},
}));

describe('ImageCropService', () => {
    const createObjectUrl = vi.fn(() => 'blob:source');
    const revokeObjectUrl = vi.fn();
    let closed: Subject<never>;
    let dialogRef: IDialogRef<IImageCropDialogData, File>;
    let show: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        closed = new Subject<never>();
        dialogRef = {
            closed,
            overlayRef: { hostElement: document.createElement('div') },
        } as unknown as IDialogRef<IImageCropDialogData, File>;
        show = vi.fn(() => dialogRef);
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: createObjectUrl,
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: revokeObjectUrl,
        });
        TestBed.configureTestingModule({
            providers: [ImageCropService, { provide: DialogService, useValue: { show } }],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        createObjectUrl.mockClear();
        revokeObjectUrl.mockClear();
        show.mockClear();
        vi.restoreAllMocks();
    });

    it('opens a reusable crop dialog with resolved labels and output configuration', () => {
        // arrange
        const service = TestBed.inject(ImageCropService);
        const file = new File(['image'], 'photo.jpeg', { type: 'image/jpeg' });

        // act
        const result = service.open(file, {
            labels: { title: 'Bild zuschneiden' },
            minimumSelectionSize: 12.4,
            outputFileName: 'selection',
        });

        // assert
        expect(result.closed).toBe(closed);
        expect(result.overlayRef).toBe(dialogRef.overlayRef);
        expect(show).toHaveBeenCalledWith(
            ImageCropDialogComponent,
            expect.objectContaining({
                data: expect.objectContaining({
                    labels: expect.objectContaining({
                        title: 'Bild zuschneiden',
                        cancel: 'Cancel',
                    }),
                    minimumSelectionSize: 12,
                    outputFileName: 'selection.png',
                    previewUrl: 'blob:source',
                }),
                clickOutsideToClose: false,
                pressEscapeToClose: true,
            }),
        );
    });

    it('releases the temporary preview URL when the dialog closes', () => {
        // arrange
        const service = TestBed.inject(ImageCropService);
        const file = new File(['image'], 'photo.png', { type: 'image/png' });
        service.open(file);

        // act
        closed.complete();

        // assert
        expect(revokeObjectUrl).toHaveBeenCalledOnce();
        expect(revokeObjectUrl).toHaveBeenCalledWith('blob:source');
    });

    describe('edge cases', () => {
        it('falls back to the default minimum when a runtime caller supplies a non-finite size', () => {
            // arrange
            const service = TestBed.inject(ImageCropService);
            const file = new File(['image'], 'photo.png', { type: 'image/png' });

            // act
            service.open(file, { minimumSelectionSize: Number.NaN });

            // assert
            expect(show).toHaveBeenCalledWith(
                ImageCropDialogComponent,
                expect.objectContaining({
                    data: expect.objectContaining({
                        minimumSelectionSize: 8,
                    }),
                }),
            );
        });
    });

    describe('error handling', () => {
        it('rejects empty non-image files before allocating browser resources', () => {
            // arrange
            const service = TestBed.inject(ImageCropService);
            const file = new File([], 'empty.txt', { type: 'text/plain' });

            // act
            const openInvalidFile = (): IImageCropRef => service.open(file);

            // assert
            expect(openInvalidFile).toThrow('ImageCropService requires a non-empty image file.');
            expect(createObjectUrl).not.toHaveBeenCalled();
            expect(show).not.toHaveBeenCalled();
        });

        it('releases the preview URL when opening the dialog fails', () => {
            // arrange
            const service = TestBed.inject(ImageCropService);
            const file = new File(['image'], 'photo.png', { type: 'image/png' });
            show.mockImplementationOnce(() => {
                throw new Error('overlay failed');
            });

            // act
            const openFailedDialog = (): IImageCropRef => service.open(file);

            // assert
            expect(openFailedDialog).toThrow('overlay failed');
            expect(revokeObjectUrl).toHaveBeenCalledWith('blob:source');
        });
    });
});
