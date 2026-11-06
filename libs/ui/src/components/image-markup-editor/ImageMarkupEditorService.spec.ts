// #region Imports

import { TestBed } from '@angular/core/testing';
import { DialogService, type IDialogRef } from '@pixel-brewery/mosaik-elements-angular';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IImageMarkupEditorDialogData } from './IImageMarkupEditorDialogData';
import type { IImageMarkupEditorRef } from './IImageMarkupEditorRef';
import { ImageMarkupEditorDialogComponent } from './ImageMarkupEditorDialogComponent';
import { ImageMarkupEditorService } from './ImageMarkupEditorService';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ActionbarComponent: class ActionbarComponent {},
    ActionbarGroupComponent: class ActionbarGroupComponent {},
    ActionbarItemComponent: class ActionbarItemComponent {},
    ActionbarSeparatorComponent: class ActionbarSeparatorComponent {},
    AnimateDirective: class AnimateDirective {},
    ButtonComponent: class ButtonComponent {},
    PressButtonComponent: class PressButtonComponent {},
    Cancel: {
        negative: vi.fn(() => ({ reason: 'negative' })),
        positive: vi.fn((result: File) => ({ reason: 'positive', result })),
    },
    ColorPickerComponent: class ColorPickerComponent {},
    DIALOG_REF: 'DIALOG_REF',
    DIALOG_REF_DATA: 'DIALOG_REF_DATA',
    DialogContentDirective: class DialogContentDirective {},
    DialogFooterDirective: class DialogFooterDirective {},
    DialogHeaderComponent: class DialogHeaderComponent {},
    DialogHeaderDirective: class DialogHeaderDirective {},
    DialogService: class DialogService {},
    DesignerCanvasComponent: class DesignerCanvasComponent {},
    DesignerComponent: class DesignerComponent {},
    DesignerContentComponent: class DesignerContentComponent {},
    DesignerFrameComponent: class DesignerFrameComponent {},
    DropDownButtonComponent: class DropDownButtonComponent {},
    FormFieldComponent: class FormFieldComponent {},
    FormFieldDirective: class FormFieldDirective {},
    FormFieldStateDirective: class FormFieldStateDirective {},
    IconNameDirective: class IconNameDirective {},
    MenuComponent: class MenuComponent {},
    MenuItemComponent: class MenuItemComponent {},
    NumberBoxComponent: class NumberBoxComponent {},
    SelectComponent: class SelectComponent {},
    SelectItemComponent: class SelectItemComponent {},
    SkeletonComponent: class SkeletonComponent {},
    TextBoxComponent: class TextBoxComponent {},
    TooltipDirective: class TooltipDirective {},
    ToggleButtonComponent: class ToggleButtonComponent {},
}));

describe('Image markup editor service', () => {
    const createObjectUrl = vi.fn(() => 'blob:source');
    const revokeObjectUrl = vi.fn();
    let closed: Subject<never>;
    let dialogRef: IDialogRef<IImageMarkupEditorDialogData, File>;
    let show: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        closed = new Subject<never>();
        dialogRef = {
            closed,
            overlayRef: { hostElement: document.createElement('div') },
        } as unknown as IDialogRef<IImageMarkupEditorDialogData, File>;
        show = vi.fn(() => dialogRef);
        Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectUrl });
        Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectUrl });
        TestBed.configureTestingModule({
            providers: [ImageMarkupEditorService, { provide: DialogService, useValue: { show } }],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        createObjectUrl.mockClear();
        revokeObjectUrl.mockClear();
        show.mockClear();
        vi.restoreAllMocks();
    });

    it('opens the neutral editor with resolved labels, limits, and a safe PNG output name', () => {
        // arrange
        const service = TestBed.inject(ImageMarkupEditorService);
        const file = new File(['image'], 'photo.jpeg', { type: 'image/jpeg' });

        // act
        const result = service.open(file, {
            labels: { title: 'Bild bearbeiten' },
            outputFileName: 'marked',
            historyLimit: 25.4,
            maximumSourcePixels: 12_000_000,
        });

        // assert
        expect(result.closed).toBe(closed);
        expect(result.overlayRef).toBe(dialogRef.overlayRef);
        expect(show).toHaveBeenCalledWith(
            ImageMarkupEditorDialogComponent,
            expect.objectContaining({
                data: expect.objectContaining({
                    labels: expect.objectContaining({ crop: 'Crop', title: 'Bild bearbeiten', pen: 'Pen' }),
                    outputFileName: 'marked.png',
                    historyLimit: 25,
                    maximumSourcePixels: 12_000_000,
                    previewUrl: 'blob:source',
                }),
                clickOutsideToClose: false,
                pressEscapeToClose: true,
                size: { width: '80rem', height: '92vh' },
                maxSize: { width: '96vw', height: '92vh' },
            }),
        );
        expect(show.mock.calls[0]?.[1]).not.toHaveProperty('isFullScreen');
    });

    it('releases the temporary source URL when the editor closes', () => {
        // arrange
        const service = TestBed.inject(ImageMarkupEditorService);
        service.open(new File(['image'], 'photo.png', { type: 'image/png' }));

        // act
        closed.complete();

        // assert
        expect(revokeObjectUrl).toHaveBeenCalledOnce();
        expect(revokeObjectUrl).toHaveBeenCalledWith('blob:source');
    });

    describe('edge cases', () => {
        it('clamps unsafe runtime configuration to supported bounds', () => {
            // arrange
            const service = TestBed.inject(ImageMarkupEditorService);
            const file = new File(['image'], 'photo.png', { type: 'image/png' });

            // act
            service.open(file, { historyLimit: 10_000, maximumSourcePixels: 10 });

            // assert
            expect(show).toHaveBeenCalledWith(
                ImageMarkupEditorDialogComponent,
                expect.objectContaining({
                    data: expect.objectContaining({ historyLimit: 500, maximumSourcePixels: 1_000_000 }),
                }),
            );
        });
    });

    describe('error handling', () => {
        it('rejects empty non-image files before allocating browser resources', () => {
            // arrange
            const service = TestBed.inject(ImageMarkupEditorService);
            const file = new File([], 'empty.txt', { type: 'text/plain' });

            // act
            const openInvalidFile = (): IImageMarkupEditorRef => service.open(file);

            // assert
            expect(openInvalidFile).toThrow('ImageMarkupEditorService requires a non-empty image file.');
            expect(createObjectUrl).not.toHaveBeenCalled();
            expect(show).not.toHaveBeenCalled();
        });

        it('releases the source URL when opening the overlay fails', () => {
            // arrange
            const service = TestBed.inject(ImageMarkupEditorService);
            const file = new File(['image'], 'photo.png', { type: 'image/png' });
            show.mockImplementationOnce(() => {
                throw new Error('overlay failed');
            });

            // act
            const openFailedEditor = (): IImageMarkupEditorRef => service.open(file);

            // assert
            expect(openFailedEditor).toThrow('overlay failed');
            expect(revokeObjectUrl).toHaveBeenCalledWith('blob:source');
        });
    });
});
