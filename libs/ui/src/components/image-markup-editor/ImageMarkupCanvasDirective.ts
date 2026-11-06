// #region Imports

import { DOCUMENT } from '@angular/common';
import { computed, Directive, effect, ElementRef, inject, input, type OnDestroy, output, signal, type Signal, untracked } from '@angular/core';
import type { IImageMarkupCropSelection } from './IImageMarkupCropSelection';
import type { IImageMarkupOperation } from './IImageMarkupOperation';
import type { IImageMarkupPoint } from './IImageMarkupPoint';
import { ImageMarkupDocument } from './ImageMarkupDocument';
import { ImageMarkupSymbol } from './ImageMarkupSymbol';
import type { ImageMarkupSymbolValue } from './ImageMarkupSymbolValue';
import { ImageMarkupTool } from './ImageMarkupTool';
import type { ImageMarkupToolValue } from './ImageMarkupToolValue';

// #endregion

const MAXIMUM_FREEHAND_POINTS = 10_000;

/**
 * Owns pointer interaction, history rendering, and PNG encoding for one markup canvas.
 *
 * @public
 */
@Directive({
    selector: 'canvas[ngpImageMarkupCanvas]',
    host: {
        class: 'block touch-none select-none',
        '(pointerdown)': 'onPointerDown($event)',
        '(pointermove)': 'onPointerMove($event)',
        '(pointerup)': 'onPointerUp($event)',
        '(pointercancel)': 'onPointerCancel($event)',
        '(keydown)': 'onKeyDown($event)',
    },
})
export class ImageMarkupCanvasDirective implements OnDestroy {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);
    private readonly _elementRef: ElementRef<HTMLCanvasElement> = inject(ElementRef<HTMLCanvasElement>);
    private readonly _annotationCanvas: HTMLCanvasElement = this._document.createElement('canvas');
    private readonly _canRedo = signal(false);
    private readonly _canUndo = signal(false);
    private readonly _cropPreviewSelection = signal<IImageMarkupCropSelection | null>(null);
    private readonly _cropSelection = signal<IImageMarkupCropSelection | null>(null);
    private readonly _hasChanges = signal(false);
    private readonly _isLoading = signal(true);
    private readonly _isReady = signal(false);
    private readonly _sourceHeight = signal(0);
    private readonly _sourceWidth = signal(0);
    private _history: ImageMarkupDocument = new ImageMarkupDocument();
    private _activePointerId: number | null = null;
    private _cropDragOrigin: IImageMarkupPoint | null = null;
    private _draftCropSelection: IImageMarkupCropSelection | null = null;
    private _draftOperation: IImageMarkupOperation | null = null;
    private _loadVersion = 0;
    private _sourceImage: HTMLImageElement | null = null;

    // #endregion

    // #region Ctor

    /**
     * Connects source changes to the canvas loader.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            const sourceUrl = this.sourceUrl();
            const maximumSourcePixels = this.maximumSourcePixels();
            const historyLimit = this.historyLimit();

            untracked(() => void this.loadSource(sourceUrl, maximumSourcePixels, historyLimit));
        });
    }

    // #endregion

    // #region Properties

    /**
     * Browser URL of the source image.
     *
     * @public
     * @readonly
     */
    public readonly sourceUrl = input('');

    /**
     * File name used by PNG export.
     *
     * @public
     * @readonly
     */
    public readonly outputFileName = input('image-edited.png');

    /**
     * Currently selected drawing tool.
     *
     * @public
     * @readonly
     */
    public readonly tool = input<ImageMarkupToolValue>(ImageMarkupTool.PEN);

    /**
     * Current CSS drawing color.
     *
     * @public
     * @readonly
     */
    public readonly color = input('#ef4444');

    /**
     * Current stroke width in source-image pixels.
     *
     * @public
     * @readonly
     */
    public readonly strokeWidth = input(6);

    /**
     * Current text and symbol size in source-image pixels.
     *
     * @public
     * @readonly
     */
    public readonly fontSize = input(36);

    /**
     * Text placed by the text tool.
     *
     * @public
     * @readonly
     */
    public readonly text = input('');

    /**
     * Symbol placed by the symbol tool.
     *
     * @public
     * @readonly
     */
    public readonly symbol = input<ImageMarkupSymbolValue>(ImageMarkupSymbol.CHECKMARK);

    /**
     * Maximum accepted source-image pixel count.
     *
     * @public
     * @readonly
     */
    public readonly maximumSourcePixels = input(40_000_000);

    /**
     * Maximum undo snapshot count.
     *
     * @public
     * @readonly
     */
    public readonly historyLimit = input(100);

    /**
     * Emits rendering and source-loading errors.
     *
     * @public
     * @readonly
     */
    public readonly editorError = output<Error>();

    /**
     * Emits when the text tool is used without text.
     *
     * @public
     * @readonly
     */
    public readonly textPlacementRejected = output<void>();

    /**
     * Emits after a source image has been loaded and rendered at its original resolution.
     *
     * @public
     * @readonly
     */
    public readonly sourceReady = output<void>();

    /**
     * Emits when a committed crop changes the visible source-image viewport.
     *
     * @public
     * @readonly
     */
    public readonly viewportChanged = output<void>();

    /**
     * Crop rectangle currently being dragged before it becomes a history step.
     *
     * @public
     * @readonly
     */
    public readonly cropPreviewSelection: Signal<IImageMarkupCropSelection | null> = this._cropPreviewSelection.asReadonly();

    /**
     * Current crop rectangle in source-image pixels.
     *
     * @public
     * @readonly
     */
    public readonly cropSelection: Signal<IImageMarkupCropSelection | null> = this._cropSelection.asReadonly();

    /**
     * Horizontal source-image offset of the committed visible viewport.
     *
     * @public
     * @readonly
     */
    public readonly viewportLeft: Signal<number> = computed(() => this._cropSelection()?.left ?? 0);

    /**
     * Vertical source-image offset of the committed visible viewport.
     *
     * @public
     * @readonly
     */
    public readonly viewportTop: Signal<number> = computed(() => this._cropSelection()?.top ?? 0);

    /**
     * Width of the committed visible viewport in source-image pixels.
     *
     * @public
     * @readonly
     */
    public readonly viewportWidth: Signal<number> = computed(() => this._cropSelection()?.width ?? this._sourceWidth());

    /**
     * Height of the committed visible viewport in source-image pixels.
     *
     * @public
     * @readonly
     */
    public readonly viewportHeight: Signal<number> = computed(() => this._cropSelection()?.height ?? this._sourceHeight());

    /**
     * Loaded source-image width in pixels.
     *
     * @public
     * @readonly
     */
    public readonly sourceWidth: Signal<number> = this._sourceWidth.asReadonly();

    /**
     * Loaded source-image height in pixels.
     *
     * @public
     * @readonly
     */
    public readonly sourceHeight: Signal<number> = this._sourceHeight.asReadonly();

    /**
     * Indicates whether an undo operation is available.
     *
     * @public
     * @readonly
     */
    public readonly canUndo: Signal<boolean> = this._canUndo.asReadonly();

    /**
     * Indicates whether a redo operation is available.
     *
     * @public
     * @readonly
     */
    public readonly canRedo: Signal<boolean> = this._canRedo.asReadonly();

    /**
     * Indicates whether crop or markup edits differ from the source image.
     *
     * @public
     * @readonly
     */
    public readonly hasChanges: Signal<boolean> = this._hasChanges.asReadonly();

    /**
     * Indicates whether the source image is loading.
     *
     * @public
     * @readonly
     */
    public readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();

    /**
     * Indicates whether the canvas can accept input and export.
     *
     * @public
     * @readonly
     */
    public readonly isReady: Signal<boolean> = this._isReady.asReadonly();

    // #endregion

    // #region Methods

    /**
     * Restores the previous markup snapshot.
     *
     * @returns Whether the canvas changed.
     * @public
     */
    public undo(): boolean {
        this.cancelGesture();
        const previousCropSelection = this._history.cropSelection;
        const changed = this._history.undo();
        if (changed) {
            this.refresh();
            this.emitViewportChangedIfCropChanged(previousCropSelection);
        }

        return changed;
    }

    /**
     * Reapplies the next markup snapshot.
     *
     * @returns Whether the canvas changed.
     * @public
     */
    public redo(): boolean {
        this.cancelGesture();
        const previousCropSelection = this._history.cropSelection;
        const changed = this._history.redo();
        if (changed) {
            this.refresh();
            this.emitViewportChangedIfCropChanged(previousCropSelection);
        }

        return changed;
    }

    /**
     * Removes all crop and markup edits while preserving one undo snapshot.
     *
     * @returns Whether the canvas changed.
     * @public
     */
    public clear(): boolean {
        this.cancelGesture();
        const previousCropSelection = this._history.cropSelection;
        const changed = this._history.clear();
        if (changed) {
            this.refresh();
            this.emitViewportChangedIfCropChanged(previousCropSelection);
        }

        return changed;
    }

    /**
     * Encodes the source image and current markup as a PNG file.
     *
     * @returns Edited PNG file at the selected or original source resolution.
     * @public
     */
    public async exportFile(): Promise<File> {
        if (!this._isReady() || !this._sourceImage) {
            throw new Error('The image markup canvas is not ready for export.');
        }

        this.cancelGesture();
        this.render();
        const sourceCanvas = this._elementRef.nativeElement;
        const cropSelection = this._history.cropSelection;
        const canvas = cropSelection ? this.createCroppedCanvas(sourceCanvas, cropSelection) : sourceCanvas;
        const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('The image markup canvas could not be encoded.'))), 'image/png');
        });

        return new File([blob], this.resolveOutputFileName(), { type: 'image/png', lastModified: Date.now() });
    }

    /**
     * Releases in-flight pointer and source-loading state.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this._loadVersion += 1;
        this.cancelGesture();
        this._sourceImage = null;
    }

    protected onPointerDown(event: PointerEvent): void {
        if (!this._isReady() || event.button !== 0 || this._activePointerId !== null) {
            return;
        }

        const point = this.resolvePoint(event);
        if (!point) {
            return;
        }

        const tool = this.tool();
        if (tool === ImageMarkupTool.PAN) {
            return;
        }

        if (tool === ImageMarkupTool.CROP) {
            event.preventDefault();
            this._activePointerId = event.pointerId;
            this._cropDragOrigin = point;
            this._draftCropSelection = null;
            this._elementRef.nativeElement.setPointerCapture(event.pointerId);

            return;
        }

        if (tool === ImageMarkupTool.TEXT) {
            const content = this.text().trim();
            if (!content) {
                this.textPlacementRejected.emit();

                return;
            }

            this.commitOperation({
                tool,
                points: [point],
                color: this.resolveColor(),
                strokeWidth: this.resolveStrokeWidth(),
                fontSize: this.resolveFontSize(),
                text: content,
            });

            return;
        }

        if (tool === ImageMarkupTool.SYMBOL) {
            this.commitOperation({
                tool,
                points: [point],
                color: this.resolveColor(),
                strokeWidth: this.resolveStrokeWidth(),
                fontSize: this.resolveFontSize(),
                symbol: this.symbol(),
            });

            return;
        }

        event.preventDefault();
        this._activePointerId = event.pointerId;
        this._elementRef.nativeElement.setPointerCapture(event.pointerId);
        this._draftOperation = {
            tool,
            points: [point],
            color: this.resolveColor(),
            strokeWidth: this.resolveStrokeWidth(),
        };
        this.renderSafely();
    }

    protected onPointerMove(event: PointerEvent): void {
        if (event.pointerId !== this._activePointerId) {
            return;
        }

        const point = this.resolvePoint(event);
        if (!point) {
            return;
        }

        event.preventDefault();
        if (this._cropDragOrigin) {
            this._draftCropSelection = this.normalizeCropSelection(this._cropDragOrigin, point);
            this._cropPreviewSelection.set(this._draftCropSelection);

            return;
        }

        if (!this._draftOperation) {
            return;
        }

        this.updateDraft(point);
        this.renderSafely();
    }

    protected onPointerUp(event: PointerEvent): void {
        if (event.pointerId !== this._activePointerId) {
            return;
        }

        const point = this.resolvePoint(event);
        if (this._cropDragOrigin) {
            const selection = point ? this.normalizeCropSelection(this._cropDragOrigin, point) : null;
            this.releasePointer(event.pointerId);
            this._cropDragOrigin = null;
            this._draftCropSelection = null;
            this._cropPreviewSelection.set(null);
            const changed = selection ? this._history.setCropSelection(selection) : false;
            this.refresh();
            if (changed) {
                this.viewportChanged.emit();
            }

            return;
        }

        if (!this._draftOperation) {
            this.releasePointer(event.pointerId);

            return;
        }

        if (point) {
            this.updateDraft(point);
        }

        const operation = this._draftOperation;
        this.releasePointer(event.pointerId);
        this._draftOperation = null;

        if (this.isMeaningfulOperation(operation)) {
            this.commitOperation(operation);
        } else {
            this.renderSafely();
        }
    }

    protected onPointerCancel(event: PointerEvent): void {
        if (event.pointerId === this._activePointerId) {
            this.cancelGesture();
            this.renderSafely();
        }
    }

    protected onKeyDown(event: KeyboardEvent): void {
        const modifierPressed = event.ctrlKey || event.metaKey;
        if (!modifierPressed) {
            if (event.key === 'Escape') {
                this.cancelGesture();
                this.renderSafely();
            }

            return;
        }

        const key = event.key.toLowerCase();
        if (key === 'z' && !event.shiftKey) {
            event.preventDefault();
            this.undo();
        } else if (key === 'y' || (key === 'z' && event.shiftKey)) {
            event.preventDefault();
            this.redo();
        }
    }

    private async loadSource(sourceUrl: string, maximumSourcePixels: number, historyLimit: number): Promise<void> {
        const version = ++this._loadVersion;
        this._isLoading.set(true);
        this._isReady.set(false);
        this._sourceImage = null;
        this._sourceHeight.set(0);
        this._sourceWidth.set(0);
        this.cancelGesture();

        if (!sourceUrl.trim()) {
            this._history.reset();
            this.refresh();
            this._isLoading.set(false);

            return;
        }

        try {
            const image = await this.createImage(sourceUrl);
            if (version !== this._loadVersion) {
                return;
            }

            const width = image.naturalWidth;
            const height = image.naturalHeight;
            const maximumPixels = Number.isFinite(maximumSourcePixels) ? Math.max(1, Math.round(maximumSourcePixels)) : 40_000_000;
            if (width <= 0 || height <= 0) {
                throw new Error('The image source has invalid dimensions.');
            }
            if (width * height > maximumPixels) {
                throw new Error('IMAGE_MARKUP_SOURCE_TOO_LARGE');
            }

            const canvas = this._elementRef.nativeElement;
            canvas.width = width;
            canvas.height = height;
            this._annotationCanvas.width = width;
            this._annotationCanvas.height = height;
            this._history = new ImageMarkupDocument(historyLimit);
            this._sourceImage = image;
            this._sourceHeight.set(height);
            this._sourceWidth.set(width);
            this.refresh();
            this._isReady.set(true);
            this.sourceReady.emit();
        } catch (error: unknown) {
            if (version === this._loadVersion) {
                this.editorError.emit(error instanceof Error ? error : new Error('The source image could not be loaded.'));
            }
        } finally {
            if (version === this._loadVersion) {
                this._isLoading.set(false);
            }
        }
    }

    private createImage(sourceUrl: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = this._document.createElement('img');
            image.decoding = 'async';
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('The source image could not be loaded.'));
            image.src = sourceUrl;
        });
    }

    private commitOperation(operation: IImageMarkupOperation): void {
        this._history.commit(operation);
        this.refresh();
    }

    private updateDraft(point: IImageMarkupPoint): void {
        const operation = this._draftOperation;
        if (!operation) {
            return;
        }

        if (this.isFreehandTool(operation.tool)) {
            const lastPoint = operation.points.at(-1);
            if (!lastPoint || operation.points.length >= MAXIMUM_FREEHAND_POINTS || Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) < 0.75) {
                return;
            }

            this._draftOperation = { ...operation, points: [...operation.points, point] };

            return;
        }

        const start = operation.points[0];
        if (start) {
            this._draftOperation = { ...operation, points: [start, point] };
        }
    }

    private resolvePoint(event: PointerEvent): IImageMarkupPoint | null {
        const canvas = this._elementRef.nativeElement;
        const bounds = canvas.getBoundingClientRect();
        if (bounds.width <= 0 || bounds.height <= 0 || canvas.width <= 0 || canvas.height <= 0) {
            return null;
        }

        return {
            x: Math.min(canvas.width, Math.max(0, (event.clientX - bounds.left) * (canvas.width / bounds.width))),
            y: Math.min(canvas.height, Math.max(0, (event.clientY - bounds.top) * (canvas.height / bounds.height))),
        };
    }

    private resolveColor(): string {
        return this.color().trim() || '#ef4444';
    }

    private resolveStrokeWidth(): number {
        const value = this.strokeWidth();

        return Number.isFinite(value) ? Math.min(128, Math.max(1, value)) : 6;
    }

    private resolveFontSize(): number {
        const value = this.fontSize();

        return Number.isFinite(value) ? Math.min(256, Math.max(8, value)) : 36;
    }

    private resolveOutputFileName(): string {
        const fileName = this.outputFileName().trim() || 'image-edited.png';

        return fileName.toLowerCase().endsWith('.png') ? fileName : `${fileName}.png`;
    }

    private normalizeCropSelection(start: IImageMarkupPoint, end: IImageMarkupPoint): IImageMarkupCropSelection | null {
        const canvas = this._elementRef.nativeElement;
        const viewport = this._history.cropSelection;
        const minimumLeft = viewport?.left ?? 0;
        const minimumTop = viewport?.top ?? 0;
        const maximumRight = viewport ? viewport.left + viewport.width : canvas.width;
        const maximumBottom = viewport ? viewport.top + viewport.height : canvas.height;
        const left = Math.min(maximumRight, Math.max(minimumLeft, Math.floor(Math.min(start.x, end.x))));
        const top = Math.min(maximumBottom, Math.max(minimumTop, Math.floor(Math.min(start.y, end.y))));
        const right = Math.max(minimumLeft, Math.min(maximumRight, Math.ceil(Math.max(start.x, end.x))));
        const bottom = Math.max(minimumTop, Math.min(maximumBottom, Math.ceil(Math.max(start.y, end.y))));
        const width = right - left;
        const height = bottom - top;

        return width >= 1 && height >= 1 ? { left, top, width, height } : null;
    }

    private createCroppedCanvas(sourceCanvas: HTMLCanvasElement, selection: IImageMarkupCropSelection): HTMLCanvasElement {
        const left = Math.min(sourceCanvas.width - 1, Math.max(0, Math.floor(selection.left)));
        const top = Math.min(sourceCanvas.height - 1, Math.max(0, Math.floor(selection.top)));
        const right = Math.min(sourceCanvas.width, Math.max(left + 1, Math.ceil(selection.left + selection.width)));
        const bottom = Math.min(sourceCanvas.height, Math.max(top + 1, Math.ceil(selection.top + selection.height)));
        const width = right - left;
        const height = bottom - top;
        const output = this._document.createElement('canvas');
        output.width = width;
        output.height = height;
        const context = output.getContext('2d');
        if (!context) {
            throw new Error('The cropped image canvas could not be initialized.');
        }

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(sourceCanvas, left, top, width, height, 0, 0, width, height);

        return output;
    }

    private isMeaningfulOperation(operation: IImageMarkupOperation): boolean {
        if (this.isFreehandTool(operation.tool)) {
            return operation.points.length > 0;
        }

        const start = operation.points[0];
        const end = operation.points[1];

        return Boolean(start && end && Math.hypot(end.x - start.x, end.y - start.y) >= 1);
    }

    private isFreehandTool(tool: ImageMarkupToolValue): boolean {
        return tool === ImageMarkupTool.PEN || tool === ImageMarkupTool.HIGHLIGHTER || tool === ImageMarkupTool.ERASER;
    }

    private cancelGesture(): void {
        if (this._activePointerId !== null) {
            this.releasePointer(this._activePointerId);
        }

        this._cropDragOrigin = null;
        this._draftCropSelection = null;
        this._draftOperation = null;
        this._cropPreviewSelection.set(null);
        this._cropSelection.set(this._history.cropSelection);
    }

    private emitViewportChangedIfCropChanged(previous: IImageMarkupCropSelection | null): void {
        const current = this._history.cropSelection;
        if (previous?.left !== current?.left || previous?.top !== current?.top || previous?.width !== current?.width || previous?.height !== current?.height) {
            this.viewportChanged.emit();
        }
    }

    private releasePointer(pointerId: number): void {
        const canvas = this._elementRef.nativeElement;
        if (canvas.hasPointerCapture(pointerId)) {
            canvas.releasePointerCapture(pointerId);
        }
        this._activePointerId = null;
    }

    private refresh(): void {
        this.renderSafely();
        this._canUndo.set(this._history.canUndo);
        this._canRedo.set(this._history.canRedo);
        this._hasChanges.set(this._history.hasChanges);
        this._cropSelection.set(this._history.cropSelection);
    }

    private renderSafely(): void {
        try {
            this.render();
        } catch (error: unknown) {
            this.editorError.emit(error instanceof Error ? error : new Error('The image markup canvas could not render.'));
        }
    }

    private render(): void {
        const sourceImage = this._sourceImage;
        if (!sourceImage) {
            return;
        }

        const canvas = this._elementRef.nativeElement;
        const displayContext = canvas.getContext('2d');
        const annotationContext = this._annotationCanvas.getContext('2d');
        if (!displayContext || !annotationContext) {
            throw new Error('The image markup canvas could not be initialized.');
        }

        displayContext.clearRect(0, 0, canvas.width, canvas.height);
        displayContext.imageSmoothingEnabled = true;
        displayContext.imageSmoothingQuality = 'high';
        displayContext.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);

        annotationContext.clearRect(0, 0, this._annotationCanvas.width, this._annotationCanvas.height);
        for (const operation of this._history.operations) {
            renderOperation(annotationContext, operation);
        }
        if (this._draftOperation) {
            renderOperation(annotationContext, this._draftOperation);
        }

        displayContext.drawImage(this._annotationCanvas, 0, 0);
    }

    // #endregion
}

function renderOperation(context: CanvasRenderingContext2D, operation: IImageMarkupOperation): void {
    const start = operation.points[0];
    if (!start) {
        return;
    }

    context.save();
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = operation.strokeWidth;
    context.strokeStyle = operation.color;
    context.fillStyle = operation.color;

    if (operation.tool === ImageMarkupTool.ERASER) {
        context.globalCompositeOperation = 'destination-out';
    } else if (operation.tool === ImageMarkupTool.HIGHLIGHTER) {
        context.globalAlpha = 0.32;
    }

    if (operation.tool === ImageMarkupTool.PEN || operation.tool === ImageMarkupTool.HIGHLIGHTER || operation.tool === ImageMarkupTool.ERASER) {
        renderFreehand(context, operation.points, operation.strokeWidth);
    } else if (operation.tool === ImageMarkupTool.LINE || operation.tool === ImageMarkupTool.ARROW) {
        const end = operation.points.at(-1) ?? start;
        renderLine(context, start, end);
        if (operation.tool === ImageMarkupTool.ARROW) {
            renderArrowHead(context, start, end, operation.strokeWidth);
        }
    } else if (operation.tool === ImageMarkupTool.RECTANGLE) {
        const end = operation.points.at(-1) ?? start;
        context.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    } else if (operation.tool === ImageMarkupTool.ELLIPSE) {
        const end = operation.points.at(-1) ?? start;
        context.beginPath();
        context.ellipse((start.x + end.x) / 2, (start.y + end.y) / 2, Math.abs(end.x - start.x) / 2, Math.abs(end.y - start.y) / 2, 0, 0, Math.PI * 2);
        context.stroke();
    } else if (operation.tool === ImageMarkupTool.TEXT && operation.text) {
        renderText(context, start, operation.text, operation.fontSize ?? 36);
    } else if (operation.tool === ImageMarkupTool.SYMBOL && operation.symbol) {
        renderSymbol(context, start, operation.symbol, operation.fontSize ?? 36, operation.strokeWidth);
    }

    context.restore();
}

function renderFreehand(context: CanvasRenderingContext2D, points: ReadonlyArray<IImageMarkupPoint>, strokeWidth: number): void {
    const first = points[0];
    if (!first) {
        return;
    }

    if (points.length === 1) {
        context.beginPath();
        context.arc(first.x, first.y, strokeWidth / 2, 0, Math.PI * 2);
        context.fill();

        return;
    }

    context.beginPath();
    context.moveTo(first.x, first.y);
    for (const point of points.slice(1)) {
        context.lineTo(point.x, point.y);
    }
    context.stroke();
}

function renderLine(context: CanvasRenderingContext2D, start: IImageMarkupPoint, end: IImageMarkupPoint): void {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

function renderArrowHead(context: CanvasRenderingContext2D, start: IImageMarkupPoint, end: IImageMarkupPoint, strokeWidth: number): void {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const length = Math.max(12, strokeWidth * 4);
    context.beginPath();
    context.moveTo(end.x, end.y);
    context.lineTo(end.x - length * Math.cos(angle - Math.PI / 6), end.y - length * Math.sin(angle - Math.PI / 6));
    context.moveTo(end.x, end.y);
    context.lineTo(end.x - length * Math.cos(angle + Math.PI / 6), end.y - length * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function renderText(context: CanvasRenderingContext2D, point: IImageMarkupPoint, text: string, fontSize: number): void {
    context.font = `600 ${fontSize}px sans-serif`;
    context.textBaseline = 'top';
    const lineHeight = fontSize * 1.2;
    for (const [index, line] of text.split(/\r?\n/).entries()) {
        context.fillText(line, point.x, point.y + index * lineHeight);
    }
}

function renderSymbol(
    context: CanvasRenderingContext2D,
    point: IImageMarkupPoint,
    symbol: ImageMarkupSymbolValue,
    fontSize: number,
    strokeWidth: number,
): void {
    context.font = `700 ${fontSize}px sans-serif`;
    context.lineWidth = strokeWidth;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const character = resolveSymbolCharacter(symbol);
    context.strokeText(character, point.x, point.y);
    context.fillText(character, point.x, point.y);
}

function resolveSymbolCharacter(symbol: ImageMarkupSymbolValue): string {
    switch (symbol) {
        case ImageMarkupSymbol.CROSS:
            return '✕';
        case ImageMarkupSymbol.EXCLAMATION:
            return '!';
        case ImageMarkupSymbol.QUESTION:
            return '?';
        case ImageMarkupSymbol.STAR:
            return '★';
        case ImageMarkupSymbol.CHECKMARK:
        default:
            return '✓';
    }
}
