// #region Imports

import { inject, Injectable } from '@angular/core';
import { DialogService } from '@pixel-brewery/mosaik-elements-angular';
import { finalize, take } from 'rxjs';
import type { IImageMarkupEditorConfig } from './IImageMarkupEditorConfig';
import type { IImageMarkupEditorDialogData } from './IImageMarkupEditorDialogData';
import type { IImageMarkupEditorLabels } from './IImageMarkupEditorLabels';
import type { IImageMarkupEditorRef } from './IImageMarkupEditorRef';
import { ImageMarkupEditorDialogComponent } from './ImageMarkupEditorDialogComponent';

// #endregion

const DEFAULT_MAXIMUM_SOURCE_PIXELS = 40_000_000;
const DEFAULT_HISTORY_LIMIT = 100;
const DEFAULT_LABELS: IImageMarkupEditorLabels = {
    title: 'Edit image',
    description: 'Crop, draw, mark, add text, or place symbols on the image.',
    canvasLabel: 'Editable image',
    cancel: 'Cancel',
    apply: 'Apply changes',
    undo: 'Undo',
    redo: 'Redo',
    clear: 'Clear edits',
    tools: 'Tools',
    pan: 'Move canvas',
    crop: 'Crop',
    pen: 'Pen',
    highlighter: 'Highlighter',
    eraser: 'Eraser',
    shapes: 'Shapes',
    line: 'Line',
    arrow: 'Arrow',
    rectangle: 'Rectangle',
    ellipse: 'Ellipse',
    text: 'Text',
    symbol: 'Symbol',
    color: 'Color',
    strokeWidth: 'Stroke width',
    fontSize: 'Text and symbol size',
    textPlaceholder: 'Text placed on the image',
    symbolType: 'Symbol',
    checkmark: 'Checkmark',
    cross: 'Cross',
    exclamation: 'Exclamation mark',
    question: 'Question mark',
    star: 'Star',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    resetView: 'Reset view',
    textRequired: 'Enter text before placing it on the image.',
    loadError: 'The source image could not be loaded.',
    exportError: 'The edited image could not be created.',
    sourceTooLarge: 'The source image is too large to edit safely.',
};

/**
 * Opens image files in the framework-neutral raster markup editor.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ImageMarkupEditorService {
    // #region Fields

    private readonly _dialogService: DialogService = inject(DialogService);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    /**
     * Opens a source image for non-destructive raster markup.
     *
     * @param file - Source image file.
     * @param config - Optional behavior and label overrides.
     * @returns Reference to the opened markup editor.
     * @public
     */
    public open(file: File, config: IImageMarkupEditorConfig = {}): IImageMarkupEditorRef {
        this.validateFile(file);

        const previewUrl = URL.createObjectURL(file);
        const data: IImageMarkupEditorDialogData = {
            labels: { ...DEFAULT_LABELS, ...config.labels },
            previewUrl,
            outputFileName: this.resolveOutputFileName(file, config.outputFileName),
            maximumSourcePixels: this.resolvePositiveInteger(config.maximumSourcePixels, DEFAULT_MAXIMUM_SOURCE_PIXELS, 1_000_000, 100_000_000),
            historyLimit: this.resolvePositiveInteger(config.historyLimit, DEFAULT_HISTORY_LIMIT, 1, 500),
        };

        try {
            const dialogRef = this._dialogService.show<IImageMarkupEditorDialogData, File>(ImageMarkupEditorDialogComponent, {
                data,
                hasBackdrop: true,
                backdropStrategy: 'own',
                clickOutsideToClose: false,
                pressEscapeToClose: true,
                size: { width: '80rem', height: '92vh' },
                minSize: { width: '22rem' },
                maxSize: { width: '96vw', height: '92vh' },
            });
            dialogRef.closed
                .pipe(
                    take(1),
                    finalize(() => URL.revokeObjectURL(previewUrl)),
                )
                .subscribe({ error: () => undefined });

            return {
                closed: dialogRef.closed,
                overlayRef: dialogRef.overlayRef,
            };
        } catch (error: unknown) {
            URL.revokeObjectURL(previewUrl);
            throw error;
        }
    }

    private resolveOutputFileName(file: File, configuredName: string | undefined): string {
        const requestedName = configuredName?.trim();
        if (requestedName) {
            return requestedName.toLowerCase().endsWith('.png') ? requestedName : `${requestedName}.png`;
        }

        const extensionIndex = file.name.lastIndexOf('.');
        const baseName = (extensionIndex > 0 ? file.name.slice(0, extensionIndex) : file.name).trim() || 'image';

        return `${baseName}-edited.png`;
    }

    private resolvePositiveInteger(value: number | undefined, fallback: number, minimum: number, maximum: number): number {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            return fallback;
        }

        return Math.min(maximum, Math.max(minimum, Math.round(value)));
    }

    private validateFile(file: File): void {
        if (!(file instanceof File) || file.size <= 0 || !file.type.startsWith('image/')) {
            throw new Error('ImageMarkupEditorService requires a non-empty image file.');
        }
    }

    // #endregion
}
