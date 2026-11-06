// #region Imports

import { DOCUMENT } from '@angular/common';
import { DestroyRef, ElementRef, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ILiveAudioWaveformCanvasConfiguration } from './ILiveAudioWaveformCanvasConfiguration';
import { LiveAudioWaveformCanvasDirective } from './LiveAudioWaveformCanvasDirective';
import { LiveAudioWaveformComponent } from './LiveAudioWaveformComponent';

// #endregion

interface IRenderedBar {
    readonly alpha: number;
    readonly color: string | CanvasGradient | CanvasPattern;
    readonly height: number;
    readonly radius: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}

interface IRenderedRectangle {
    readonly compositeOperation: GlobalCompositeOperation;
    readonly height: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}

/**
 * The directive takes its collaborators as constructor parameters, so the spec instantiates it
 * through Angular's own factory rather than reproducing the dependency list by hand.
 */
interface IAngularDirectiveFactory<T> {
    readonly ɵfac: () => T;
}

const DEFAULT_TEST_CONFIGURATION: ILiveAudioWaveformCanvasConfiguration = {
    barColor: null,
    barGap: 1,
    barHeight: 4,
    barRadius: 1.5,
    barWidth: 3,
    fadeEdges: true,
    fadeWidth: 24,
    fftSize: 256,
    historySize: 60,
    mode: 'static',
    sensitivity: 1,
    smoothingTimeConstant: 0.8,
    state: 'idle',
    updateRate: 30,
};

class FakeCanvasGradient {
    public readonly colorStops: Array<{ readonly color: string; readonly offset: number }> = [];

    public addColorStop(offset: number, color: string): void {
        this.colorStops.push({ color, offset });
    }
}

class FakeCanvasContext {
    public clearCount = 0;
    public fillStyle: string | CanvasGradient | CanvasPattern = '';
    public globalAlpha = 1;
    public globalCompositeOperation: GlobalCompositeOperation = 'source-over';
    public readonly gradients: FakeCanvasGradient[] = [];
    public readonly rectangles: IRenderedRectangle[] = [];
    public readonly renderedBars: IRenderedBar[] = [];
    public readonly transforms: Array<ReadonlyArray<number>> = [];
    private _pendingBar: IRenderedBar | null = null;

    public beginPath(): void {
        this._pendingBar = null;
    }

    public clearRect(): void {
        this.clearCount++;
    }

    public createLinearGradient(): CanvasGradient {
        const gradient = new FakeCanvasGradient();
        this.gradients.push(gradient);

        return gradient as unknown as CanvasGradient;
    }

    public fill(): void {
        if (this._pendingBar) {
            this.renderedBars.push(this._pendingBar);
        }
    }

    public fillRect(x: number, y: number, width: number, height: number): void {
        this.rectangles.push({
            compositeOperation: this.globalCompositeOperation,
            height,
            width,
            x,
            y,
        });
    }

    public roundRect(x: number, y: number, width: number, height: number, radius: number): void {
        this._pendingBar = {
            alpha: this.globalAlpha,
            color: this.fillStyle,
            height,
            radius,
            width,
            x,
            y,
        };
    }

    public setTransform(
        horizontalScale: number,
        verticalSkew: number,
        horizontalSkew: number,
        verticalScale: number,
        horizontalTranslation: number,
        verticalTranslation: number,
    ): void {
        this.transforms.push([horizontalScale, verticalSkew, horizontalSkew, verticalScale, horizontalTranslation, verticalTranslation]);
    }

    public resetDrawCalls(): void {
        this.rectangles.length = 0;
        this.renderedBars.length = 0;
    }
}

class FakeAnalyserNode {
    public fftSize = 256;
    public sampleValue = 128;
    public smoothingTimeConstant = 0.8;

    public get frequencyBinCount(): number {
        return this.fftSize / 2;
    }

    public getByteFrequencyData(array: Uint8Array<ArrayBuffer>): void {
        array.fill(this.sampleValue);
    }
}

class FakeMediaStreamAudioSourceNode {
    public connectCount = 0;
    public disconnectCount = 0;

    public connect(): void {
        this.connectCount++;
    }

    public disconnect(): void {
        this.disconnectCount++;
    }
}

class FakeAudioContext {
    public readonly analyser = new FakeAnalyserNode();
    public closeCount = 0;
    public readonly source = new FakeMediaStreamAudioSourceNode();
    public state: AudioContextState = 'running';
    public readonly stream: MediaStream | null = null;

    public constructor() {
        audioContexts.push(this);
    }

    public close(): Promise<void> {
        this.closeCount++;
        this.state = 'closed';

        return Promise.resolve();
    }

    public createAnalyser(): AnalyserNode {
        return this.analyser as unknown as AnalyserNode;
    }

    public createMediaStreamSource(stream: MediaStream): MediaStreamAudioSourceNode {
        Object.defineProperty(this, 'stream', { value: stream });

        return this.source as unknown as MediaStreamAudioSourceNode;
    }

    public resume(): Promise<void> {
        this.state = 'running';

        return Promise.resolve();
    }
}

class FakeResizeObserver {
    public disconnectCount = 0;
    public unobserveCount = 0;
    private readonly _callback: ResizeObserverCallback;

    public constructor(callback: ResizeObserverCallback) {
        this._callback = callback;
        resizeObservers.push(this);
    }

    public disconnect(): void {
        this.disconnectCount++;
    }

    public observe(): void {
        this.trigger();
    }

    public trigger(): void {
        this._callback([], this as unknown as ResizeObserver);
    }

    public unobserve(): void {
        this.unobserveCount++;
    }
}

class FakeDestroyRef extends DestroyRef {
    public destroyed = false;
    private readonly _callbacks: Array<() => void> = [];

    public override onDestroy(callback: () => void): () => void {
        this._callbacks.push(callback);

        return () => {
            const callbackIndex = this._callbacks.indexOf(callback);
            if (callbackIndex >= 0) {
                this._callbacks.splice(callbackIndex, 1);
            }
        };
    }

    public destroy(): void {
        if (this.destroyed) {
            return;
        }

        this.destroyed = true;
        for (const callback of this._callbacks.splice(0)) {
            callback();
        }
    }
}

let animationCallbacks: Map<number, FrameRequestCallback>;
let audioContexts: FakeAudioContext[];
let canvas: HTMLCanvasElement;
let canvasContext: FakeCanvasContext;
let canvasRectangle: DOMRect;
let configuration: WritableSignal<ILiveAudioWaveformCanvasConfiguration>;
let destroyRef: FakeDestroyRef;
let directive: LiveAudioWaveformCanvasDirective;
let errors: Error[];
let mediaStream: WritableSignal<MediaStream | null>;
let nextAnimationFrameId: number;
let resizeObservers: FakeResizeObserver[];

describe('LiveAudioWaveformComponent', () => {
    beforeEach(() => {
        animationCallbacks = new Map<number, FrameRequestCallback>();
        audioContexts = [];
        canvas = document.createElement('canvas');
        canvasContext = new FakeCanvasContext();
        canvasRectangle = createRectangle(200, 80);
        configuration = signal(DEFAULT_TEST_CONFIGURATION);
        destroyRef = new FakeDestroyRef();
        errors = [];
        mediaStream = signal<MediaStream | null>(null);
        nextAnimationFrameId = 1;
        resizeObservers = [];

        vi.stubGlobal('AudioContext', FakeAudioContext as unknown as typeof AudioContext);
        vi.stubGlobal('ResizeObserver', FakeResizeObserver as unknown as typeof ResizeObserver);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback): number => {
                const frameId = nextAnimationFrameId++;
                animationCallbacks.set(frameId, callback);

                return frameId;
            }),
        );
        vi.stubGlobal(
            'cancelAnimationFrame',
            vi.fn((frameId: number): void => {
                animationCallbacks.delete(frameId);
            }),
        );

        Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 2 });
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => canvasRectangle);
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => canvasContext as unknown as CanvasRenderingContext2D);

        TestBed.configureTestingModule({
            providers: [
                { provide: DOCUMENT, useValue: document },
                { provide: DestroyRef, useValue: destroyRef },
                { provide: ElementRef, useValue: new ElementRef(canvas) },
            ],
        });
        directive = TestBed.runInInjectionContext(() => new LiveAudioWaveformCanvasDirective(document, destroyRef, new ElementRef(canvas)));
        Object.defineProperty(directive, 'configuration', { value: configuration });
        Object.defineProperty(directive, 'mediaStream', { value: mediaStream });
        directive.audioError.subscribe((error) => errors.push(error));
        directive.ngAfterViewInit();
        TestBed.tick();
    });

    afterEach(() => {
        destroyRef.destroy();
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('should resolve all browser dependencies through the Angular directive factory', () => {
        // Arrange
        const directiveType = LiveAudioWaveformCanvasDirective as unknown as IAngularDirectiveFactory<LiveAudioWaveformCanvasDirective>;

        // Act
        const directive = TestBed.runInInjectionContext(() => directiveType.ɵfac());

        // Assert
        expect(directive).toBeInstanceOf(LiveAudioWaveformCanvasDirective);
    });

    it('should expose reference-compatible public defaults', () => {
        // Arrange
        const component = TestBed.runInInjectionContext(() => new LiveAudioWaveformComponent());

        // Act
        const defaults = {
            barGap: component.barGap(),
            barHeight: component.barHeight(),
            barRadius: component.barRadius(),
            barWidth: component.barWidth(),
            fadeEdges: component.fadeEdges(),
            fadeWidth: component.fadeWidth(),
            fftSize: component.fftSize(),
            height: component.height(),
            historySize: component.historySize(),
            mediaStream: component.mediaStream(),
            mode: component.mode(),
            sensitivity: component.sensitivity(),
            smoothingTimeConstant: component.smoothingTimeConstant(),
            state: component.state(),
            updateRate: component.updateRate(),
        };

        // Assert
        expect(defaults).toEqual({
            barGap: 1,
            barHeight: 4,
            barRadius: 1.5,
            barWidth: 3,
            fadeEdges: true,
            fadeWidth: 24,
            fftSize: 256,
            height: 64,
            historySize: 60,
            mediaStream: null,
            mode: 'static',
            sensitivity: 1,
            smoothingTimeConstant: 0.8,
            state: 'idle',
            updateRate: 30,
        });
    });

    it('should align the backing canvas with the configured device pixel ratio', () => {
        // Act
        runAnimationFrame(16);

        // Assert
        expect(canvas.width).toBe(400);
        expect(canvas.height).toBe(160);
        expect(canvasContext.transforms.at(-1)).toEqual([2, 0, 0, 2, 0, 0]);
    });

    it('should keep the idle canvas empty and inactive across animation frames', () => {
        // Arrange
        canvasContext.resetDrawCalls();

        // Act
        runAnimationFrame(16);
        const initialClearCount = canvasContext.clearCount;
        runAnimationFrame(32);
        runAnimationFrame(48);

        // Assert
        expect(canvasContext.renderedBars).toHaveLength(0);
        expect(canvasContext.clearCount).toBe(initialClearCount);
        expect(audioContexts).toHaveLength(0);
    });

    it('should draw a mirrored live spectrum while preserving caller-owned media tracks', () => {
        // Arrange
        const { stream, stop } = createMediaStream();
        mediaStream.set(stream);
        updateConfiguration({ barColor: 'gray', state: 'listening' });

        // Act
        TestBed.tick();
        runAnimationFrame(40);

        // Assert
        const audioContext = getAudioContext();
        expect(audioContext.stream).toBe(stream);
        expect(audioContext.source.connectCount).toBe(1);
        expect(canvasContext.renderedBars).toHaveLength(50);
        expect(canvasContext.renderedBars[0]?.height).toBe(canvasContext.renderedBars.at(-1)?.height);
        expect(canvasContext.renderedBars[0]?.color).toBe('gray');
        expect(canvasContext.rectangles.some((rectangle) => rectangle.compositeOperation === 'destination-out')).toBe(true);
        expect(stop).not.toHaveBeenCalled();
    });

    it('should keep only the configured scrolling history and span the visible width', () => {
        // Arrange
        const { stream } = createMediaStream();
        mediaStream.set(stream);
        updateConfiguration({ historySize: 2, mode: 'scrolling', state: 'listening' });
        TestBed.tick();
        const analyser = getAudioContext().analyser;
        analyser.sampleValue = 32;
        runAnimationFrame(40);
        analyser.sampleValue = 96;
        runAnimationFrame(80);
        analyser.sampleValue = 224;
        canvasContext.resetDrawCalls();

        // Act
        runAnimationFrame(120);

        // Assert
        expect(canvasContext.renderedBars).toHaveLength(2);
        expect(canvasContext.renderedBars[0]?.x).toBe(197);
        expect(canvasContext.renderedBars[1]?.x).toBe(0);
        expect(canvasContext.renderedBars[0]?.height ?? 0).toBeGreaterThan(canvasContext.renderedBars[1]?.height ?? 0);
    });

    it('should distribute the settings scrolling history across its complete wide surface', () => {
        // Arrange
        canvasRectangle = createRectangle(572, 80);
        getResizeObserver().trigger();
        const { stream } = createMediaStream();
        mediaStream.set(stream);
        updateConfiguration({ barGap: 2, historySize: 120, mode: 'scrolling', state: 'listening' });
        TestBed.tick();
        for (let sampleIndex = 1; sampleIndex < 120; sampleIndex++) {
            runAnimationFrame(sampleIndex * 40);
        }
        canvasContext.resetDrawCalls();

        // Act
        runAnimationFrame(120 * 40);

        // Assert
        expect(canvasContext.renderedBars).toHaveLength(114);
        expect(canvasContext.renderedBars[0]?.x).toBe(569);
        expect(canvasContext.renderedBars.at(-1)?.x).toBe(0);
    });

    it('should render processing data without opening an audio source and freeze it while paused', () => {
        // Arrange
        updateConfiguration({ state: 'processing' });
        TestBed.tick();
        runAnimationFrame(16);
        const processingHeights = canvasContext.renderedBars.map((bar) => bar.height);
        canvasContext.resetDrawCalls();
        updateConfiguration({ state: 'paused' });

        // Act
        TestBed.tick();
        runAnimationFrame(32);

        // Assert
        expect(audioContexts).toHaveLength(0);
        expect(canvasContext.renderedBars.map((bar) => bar.height)).toEqual(processingHeights);
    });

    it('should sanitize analyser configuration before applying browser constraints', () => {
        // Arrange
        const { stream } = createMediaStream();
        mediaStream.set(stream);
        updateConfiguration({ fftSize: 300, smoothingTimeConstant: 2, state: 'listening' });

        // Act
        TestBed.tick();

        // Assert
        expect(getAudioContext().analyser.fftSize).toBe(256);
        expect(getAudioContext().analyser.smoothingTimeConstant).toBe(1);
    });

    it('should emit an error when live analysis is unavailable', () => {
        // Arrange
        vi.stubGlobal('AudioContext', undefined);
        const { stream } = createMediaStream();
        mediaStream.set(stream);
        updateConfiguration({ state: 'listening' });

        // Act
        TestBed.tick();

        // Assert
        expect(errors).toHaveLength(1);
        expect(errors[0]?.message).toContain('Web Audio analysis is not available');
    });

    it('should close owned resources without stopping the external stream', () => {
        // Arrange
        const { stream, stop } = createMediaStream();
        mediaStream.set(stream);
        updateConfiguration({ state: 'listening' });
        TestBed.tick();
        const audioContext = getAudioContext();
        const resizeObserver = getResizeObserver();
        const cancelledFrameCount = vi.mocked(cancelAnimationFrame).mock.calls.length;

        // Act
        destroyRef.destroy();

        // Assert
        expect(audioContext.closeCount).toBe(1);
        expect(audioContext.source.disconnectCount).toBe(1);
        expect(resizeObserver.disconnectCount).toBe(1);
        expect(cancelAnimationFrame).toHaveBeenCalledTimes(cancelledFrameCount + 1);
        expect(stop).not.toHaveBeenCalled();
    });
});

function createMediaStream(): { readonly stop: ReturnType<typeof vi.fn>; readonly stream: MediaStream } {
    const stop = vi.fn();
    const track = { stop } as unknown as MediaStreamTrack;
    const stream = {
        active: true,
        getTracks: (): MediaStreamTrack[] => [track],
    } as unknown as MediaStream;

    return { stop, stream };
}

function createRectangle(width: number, height: number): DOMRect {
    return {
        bottom: height,
        height,
        left: 0,
        right: width,
        top: 0,
        width,
        x: 0,
        y: 0,
        toJSON: (): Record<string, number> => ({ height, width }),
    } as DOMRect;
}

function getAudioContext(): FakeAudioContext {
    const audioContext = audioContexts[0];
    if (!audioContext) {
        throw new Error('Expected an audio context to be created.');
    }

    return audioContext;
}

function getResizeObserver(): FakeResizeObserver {
    const resizeObserver = resizeObservers[0];
    if (!resizeObserver) {
        throw new Error('Expected a resize observer to be created.');
    }

    return resizeObserver;
}

function runAnimationFrame(timestamp: number): void {
    const callbacks = Array.from(animationCallbacks.values());
    animationCallbacks.clear();

    for (const callback of callbacks) {
        callback(timestamp);
    }
}

function updateConfiguration(patch: Partial<ILiveAudioWaveformCanvasConfiguration>): void {
    configuration.update((currentConfiguration) => ({
        ...currentConfiguration,
        ...patch,
    }));
}
