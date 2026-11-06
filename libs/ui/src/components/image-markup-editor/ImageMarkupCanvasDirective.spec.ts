// #region Imports

import { DOCUMENT } from '@angular/common';
import { ElementRef, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IImageMarkupOperation } from './IImageMarkupOperation';
import { ImageMarkupCanvasDirective } from './ImageMarkupCanvasDirective';
import { ImageMarkupDocument } from './ImageMarkupDocument';
import { ImageMarkupSymbol } from './ImageMarkupSymbol';
import { ImageMarkupTool } from './ImageMarkupTool';

// #endregion

interface IImageMarkupCanvasDirectiveTestApi {
    readonly _history: ImageMarkupDocument;
    readonly _isReady: WritableSignal<boolean>;
    readonly _sourceHeight: WritableSignal<number>;
    readonly _sourceWidth: WritableSignal<number>;
    _sourceImage: HTMLImageElement | null;
    onPointerDown(event: PointerEvent): void;
    onPointerMove(event: PointerEvent): void;
    onPointerUp(event: PointerEvent): void;
}

describe('Image markup canvas', () => {
    let canvas: HTMLCanvasElement;
    let directive: ImageMarkupCanvasDirective;
    let api: IImageMarkupCanvasDirectiveTestApi;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        TestBed.configureTestingModule({
            providers: [ImageMarkupCanvasDirective, { provide: DOCUMENT, useValue: document }, { provide: ElementRef, useValue: new ElementRef(canvas) }],
        });
        directive = TestBed.inject(ImageMarkupCanvasDirective);
        api = directive as unknown as IImageMarkupCanvasDirectiveTestApi;
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('updates public history state when undoing committed markup', () => {
        // arrange
        api._history.commit(createOperation());

        // act
        const changed = directive.undo();

        // assert
        expect(changed).toBe(true);
        expect(directive.canRedo()).toBe(true);
        expect(directive.hasChanges()).toBe(false);
    });

    it('exports the original-resolution canvas as a PNG file', async () => {
        // arrange
        const context = createCanvasContext();
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
        Object.defineProperty(canvas, 'toBlob', {
            configurable: true,
            value: vi.fn((callback: BlobCallback) => callback(new Blob(['png'], { type: 'image/png' }))),
        });
        canvas.width = 100;
        canvas.height = 50;
        api._sourceImage = document.createElement('img');
        api._isReady.set(true);

        // act
        const result = await directive.exportFile();

        // assert
        expect(result).toBeInstanceOf(File);
        expect(result.name).toBe('image-edited.png');
        expect(result.type).toBe('image/png');
    });

    it('exports only the selected source-image rectangle when cropping is configured', async () => {
        // arrange
        const context = createCanvasContext();
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
        vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback: BlobCallback) => {
            callback(new Blob(['png'], { type: 'image/png' }));
        });
        canvas.width = 100;
        canvas.height = 50;
        api._sourceImage = document.createElement('img');
        api._history.setCropSelection({ left: 10, top: 5, width: 40, height: 20 });
        api._isReady.set(true);

        // act
        const result = await directive.exportFile();

        // assert
        expect(result.type).toBe('image/png');
        expect(context.drawImage).toHaveBeenCalledWith(canvas, 10, 5, 40, 20, 0, 0, 40, 20);
    });

    it('commits a crop as the visible viewport and restores the full image through undo', () => {
        // arrange
        prepareCropInteraction(canvas, directive, api);
        const viewportChanged = vi.fn();
        directive.viewportChanged.subscribe(viewportChanged);

        // act
        api.onPointerDown(createPointerEvent(1, 10, 5));
        api.onPointerMove(createPointerEvent(1, 60, 25));

        // assert
        expect(directive.cropPreviewSelection()).toEqual({ left: 10, top: 5, width: 50, height: 20 });
        expect(directive.cropSelection()).toBeNull();

        // act
        api.onPointerUp(createPointerEvent(1, 60, 25));

        // assert
        expect(directive.cropPreviewSelection()).toBeNull();
        expect(directive.cropSelection()).toEqual({ left: 10, top: 5, width: 50, height: 20 });
        expect(directive.viewportLeft()).toBe(10);
        expect(directive.viewportTop()).toBe(5);
        expect(directive.viewportWidth()).toBe(50);
        expect(directive.viewportHeight()).toBe(20);
        expect(viewportChanged).toHaveBeenCalledTimes(1);

        // act
        directive.undo();

        // assert
        expect(directive.cropSelection()).toBeNull();
        expect(directive.viewportLeft()).toBe(0);
        expect(directive.viewportTop()).toBe(0);
        expect(directive.viewportWidth()).toBe(100);
        expect(directive.viewportHeight()).toBe(50);
        expect(viewportChanged).toHaveBeenCalledTimes(2);
    });

    it('keeps consecutive crop gestures inside the already committed viewport', () => {
        // arrange
        const interaction = prepareCropInteraction(canvas, directive, api);
        api.onPointerDown(createPointerEvent(1, 10, 5));
        api.onPointerMove(createPointerEvent(1, 60, 25));
        api.onPointerUp(createPointerEvent(1, 60, 25));
        interaction.setBounds(-10, -5, 100, 50);

        // act
        api.onPointerDown(createPointerEvent(2, 0, 0));
        api.onPointerMove(createPointerEvent(2, 20, 10));
        api.onPointerUp(createPointerEvent(2, 20, 10));

        // assert
        expect(directive.cropSelection()).toEqual({ left: 10, top: 5, width: 20, height: 10 });
        expect(directive.undo()).toBe(true);
        expect(directive.cropSelection()).toEqual({ left: 10, top: 5, width: 50, height: 20 });
    });

    it('renders symbols with the selected size and stroke width', async () => {
        // arrange
        const context = createCanvasContext();
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
        Object.defineProperty(canvas, 'toBlob', {
            configurable: true,
            value: vi.fn((callback: BlobCallback) => callback(new Blob(['png'], { type: 'image/png' }))),
        });
        canvas.width = 100;
        canvas.height = 50;
        api._sourceImage = document.createElement('img');
        api._history.commit({
            tool: ImageMarkupTool.SYMBOL,
            points: [{ x: 20, y: 15 }],
            color: '#0ea5e9',
            strokeWidth: 24,
            fontSize: 64,
            symbol: ImageMarkupSymbol.STAR,
        });
        api._isReady.set(true);

        // act
        await directive.exportFile();

        // assert
        expect(context.strokeText).toHaveBeenCalledWith('★', 20, 15);
        expect(context.fillText).toHaveBeenCalledWith('★', 20, 15);
        expect(context.lineWidth).toBe(24);
        expect(context.font).toBe('700 64px sans-serif');
    });

    describe('edge cases', () => {
        it('keeps empty history stable across undo, redo, and clear', () => {
            // arrange

            // act
            const undoResult = directive.undo();

            // assert
            expect(undoResult).toBe(false);
            expect(directive.redo()).toBe(false);
            expect(directive.clear()).toBe(false);
        });

        it('rejects export before a valid source image has loaded', async () => {
            // arrange

            // act
            const result = directive.exportFile();

            // assert
            await expect(result).rejects.toThrow('The image markup canvas is not ready for export.');
        });
    });
});

function createOperation(): IImageMarkupOperation {
    return {
        tool: ImageMarkupTool.PEN,
        points: [{ x: 1, y: 1 }],
        color: '#ef4444',
        strokeWidth: 4,
    };
}

function prepareCropInteraction(
    canvas: HTMLCanvasElement,
    directive: ImageMarkupCanvasDirective,
    api: IImageMarkupCanvasDirectiveTestApi,
): { readonly setBounds: (left: number, top: number, width: number, height: number) => void } {
    let bounds = createBounds(0, 0, 100, 50);
    let capturedPointerId: number | null = null;
    canvas.width = 100;
    canvas.height = 50;
    api._sourceWidth.set(100);
    api._sourceHeight.set(50);
    api._isReady.set(true);
    Object.defineProperty(directive, 'tool', { configurable: true, value: () => ImageMarkupTool.CROP });
    vi.spyOn(canvas, 'getBoundingClientRect').mockImplementation(() => bounds);
    Object.defineProperty(canvas, 'setPointerCapture', {
        configurable: true,
        value: vi.fn((pointerId: number) => {
            capturedPointerId = pointerId;
        }),
    });
    Object.defineProperty(canvas, 'hasPointerCapture', {
        configurable: true,
        value: vi.fn((pointerId: number) => capturedPointerId === pointerId),
    });
    Object.defineProperty(canvas, 'releasePointerCapture', {
        configurable: true,
        value: vi.fn((pointerId: number) => {
            if (capturedPointerId === pointerId) {
                capturedPointerId = null;
            }
        }),
    });

    return {
        setBounds(left: number, top: number, width: number, height: number): void {
            bounds = createBounds(left, top, width, height);
        },
    };
}

function createPointerEvent(pointerId: number, clientX: number, clientY: number): PointerEvent {
    return {
        button: 0,
        clientX,
        clientY,
        pointerId,
        preventDefault: vi.fn(),
    } as unknown as PointerEvent;
}

function createBounds(left: number, top: number, width: number, height: number): DOMRect {
    return {
        bottom: top + height,
        height,
        left,
        right: left + width,
        top,
        width,
        x: left,
        y: top,
        toJSON: () => ({}),
    } as DOMRect;
}

function createCanvasContext(): CanvasRenderingContext2D {
    return {
        clearRect: vi.fn(),
        drawImage: vi.fn(),
        fillText: vi.fn(),
        font: '',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
        lineWidth: 1,
        restore: vi.fn(),
        save: vi.fn(),
        strokeText: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
}
