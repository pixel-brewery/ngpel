// #region Imports

import { ElementRef, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ImageCropSelectionDirective } from './ImageCropSelectionDirective';

// #endregion

interface IImageCropSelectionDirectiveTestApi {
    onPointerDown(event: PointerEvent): void;

    onPointerMove(event: PointerEvent): void;

    onPointerUp(event: PointerEvent): void;
}

describe('image crop selection directive', () => {
    let cropRequest: WritableSignal<number>;
    let directive: ImageCropSelectionDirective;
    let image: HTMLImageElement;
    let surface: HTMLDivElement;

    beforeEach(() => {
        cropRequest = signal(0);
        image = document.createElement('img');
        surface = document.createElement('div');
        vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 100));
        Object.defineProperties(surface, {
            hasPointerCapture: { configurable: true, value: vi.fn(() => true) },
            releasePointerCapture: { configurable: true, value: vi.fn() },
            setPointerCapture: { configurable: true, value: vi.fn() },
        });
        TestBed.configureTestingModule({
            providers: [
                ImageCropSelectionDirective,
                {
                    provide: ElementRef,
                    useValue: new ElementRef(surface),
                },
            ],
        });
        directive = TestBed.inject(ImageCropSelectionDirective);
        Object.defineProperties(directive, {
            cropRequest: { configurable: true, value: cropRequest },
            minimumSelectionSize: { configurable: true, value: signal(8) },
            outputFileName: { configurable: true, value: signal('selection.png') },
            sourceImage: { configurable: true, value: signal(image) },
        });
        TestBed.tick();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('renders the selected source region to a PNG file', async () => {
        // arrange
        selectRectangle(directive, { x: 10, y: 20 }, { x: 50, y: 60 });
        Object.defineProperties(image, {
            complete: { configurable: true, value: true },
            naturalHeight: { configurable: true, value: 300 },
            naturalWidth: { configurable: true, value: 200 },
        });
        Object.defineProperties(surface, {
            clientHeight: { configurable: true, value: 100 },
            clientWidth: { configurable: true, value: 100 },
        });
        const drawImage = vi.fn();
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
            drawImage,
        } as unknown as CanvasRenderingContext2D);
        vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => {
            callback(new Blob(['crop'], { type: 'image/png' }));
        });
        const cropResult = new Promise<File>((resolve) => directive.cropResult.subscribe(resolve));

        // act
        cropRequest.set(1);
        TestBed.tick();
        const result = await cropResult;

        // assert
        expect(result).toBeInstanceOf(File);
        expect(result.name).toBe('selection.png');
        expect(result.type).toBe('image/png');
        expect(drawImage).toHaveBeenCalledWith(image, 20, 60, 80, 120, 0, 0, 80, 120);
    });

    describe('error handling', () => {
        it('emits an error when the browser cannot initialize a crop canvas', async () => {
            // arrange
            selectRectangle(directive, { x: 10, y: 10 }, { x: 30, y: 30 });
            Object.defineProperties(image, {
                complete: { configurable: true, value: true },
                naturalHeight: { configurable: true, value: 100 },
                naturalWidth: { configurable: true, value: 100 },
            });
            Object.defineProperties(surface, {
                clientHeight: { configurable: true, value: 100 },
                clientWidth: { configurable: true, value: 100 },
            });
            vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
            const cropError = new Promise<Error>((resolve) => directive.cropError.subscribe(resolve));

            // act
            cropRequest.set(1);
            TestBed.tick();
            const error = await cropError;

            // assert
            expect(error.message).toBe('The image crop canvas could not be initialized.');
        });
    });
});

function selectRectangle(
    directive: ImageCropSelectionDirective,
    origin: { readonly x: number; readonly y: number },
    current: { readonly x: number; readonly y: number },
): void {
    const api = directive as unknown as IImageCropSelectionDirectiveTestApi;
    api.onPointerDown(createPointerEvent('pointerdown', 1, origin));
    api.onPointerMove(createPointerEvent('pointermove', 1, current));
    api.onPointerUp(createPointerEvent('pointerup', 1, current));
}

function createPointerEvent(type: string, pointerId: number, point: { readonly x: number; readonly y: number }): PointerEvent {
    const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: point.x,
        clientY: point.y,
    });
    Object.defineProperty(event, 'pointerId', { configurable: true, value: pointerId });

    return event as PointerEvent;
}
