// #region Imports

import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, Inject, effect, input, output, type AfterViewInit, type InputSignal, type OutputEmitterRef } from '@angular/core';
import type { ILiveAudioWaveformCanvasConfiguration } from './ILiveAudioWaveformCanvasConfiguration';
import type { LiveAudioWaveformMode } from './LiveAudioWaveformMode';
import type { LiveAudioWaveformState } from './LiveAudioWaveformState';

// #endregion

interface ILiveAudioWaveformWindow {
    readonly AudioContext?: typeof AudioContext;
    readonly ResizeObserver?: typeof ResizeObserver;
    readonly devicePixelRatio: number;
    readonly webkitAudioContext?: typeof AudioContext;
    cancelAnimationFrame(handle: number): void;
    getComputedStyle(element: Element): CSSStyleDeclaration;
    requestAnimationFrame(callback: FrameRequestCallback): number;
}

const DEFAULT_CONFIGURATION: ILiveAudioWaveformCanvasConfiguration = {
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

/**
 * Owns the Web Audio analysis and Canvas rendering behavior of the waveform control.
 * Rendering behavior is adapted from shadcn/ui's MIT-licensed LiveWaveform component.
 *
 * @see https://github.com/shadcn-ui/ui/blob/6a5e6da78cad8c501f6b30830af0bbb56ba48867/apps/v4/registry/bases/base/blocks/preview/cards/live-waveform.tsx
 * @internal
 */
@Directive({
    selector: 'canvas[ngpLiveAudioWaveformCanvas]',
})
export class LiveAudioWaveformCanvasDirective implements AfterViewInit {
    // #region Fields

    private readonly _canvasElement: HTMLCanvasElement;
    private readonly _defaultView: ILiveAudioWaveformWindow | null;
    private _analyser: AnalyserNode | null = null;
    private _animationFrameId: number | null = null;
    private _audioContext: AudioContext | null = null;
    private _audioSource: MediaStreamAudioSourceNode | null = null;
    private _canvasHeight = 0;
    private _canvasWidth = 0;
    private _configuration: ILiveAudioWaveformCanvasConfiguration = DEFAULT_CONFIGURATION;
    private _connectedStream: MediaStream | null = null;
    private _context: CanvasRenderingContext2D | null = null;
    private _edgeGradient: CanvasGradient | null = null;
    private _edgeGradientFadeWidth = 0;
    private _edgeGradientWidth = 0;
    private _fadeProgress = 0;
    private _frequencyData: Uint8Array<ArrayBuffer> | null = null;
    private _history: number[] = [];
    private _isDestroyed = false;
    private _isInitialized = false;
    private _lastActiveData: number[] = [];
    private _lastUpdate = 0;
    private _mediaStream: MediaStream | null = null;
    private _needsRedraw = true;
    private _processingTime = 0;
    private _resizeObserver: ResizeObserver | null = null;
    private _staticBars: number[] = [];
    private _transitionProgress = 0;

    // #endregion

    // #region Ctor

    /**
     * Creates the canvas behavior and observes all signal-based inputs.
     *
     * @param document - Browser document used to resolve platform APIs.
     * @param destroyRef - Angular lifecycle hook used for deterministic cleanup.
     * @param elementRef - Host canvas element.
     * @public
     */
    public constructor(
        @Inject(DOCUMENT) document: Document,
        @Inject(DestroyRef) destroyRef: DestroyRef,
        @Inject(ElementRef) elementRef: ElementRef<HTMLCanvasElement>,
    ) {
        this._canvasElement = elementRef.nativeElement;
        this._defaultView = document.defaultView;

        effect(() => this.applyConfiguration(this.configuration(), this.mediaStream()));
        destroyRef.onDestroy(() => this.destroy());
    }

    // #endregion

    // #region Properties

    /**
     * Complete visual and analyser configuration supplied by the public control.
     *
     * @public
     * @readonly
     */
    public readonly configuration: InputSignal<ILiveAudioWaveformCanvasConfiguration> = input.required<ILiveAudioWaveformCanvasConfiguration>();

    /**
     * Externally owned media stream to analyse without stopping its tracks.
     *
     * @public
     * @readonly
     */
    public readonly mediaStream: InputSignal<MediaStream | null> = input<MediaStream | null>(null);

    /**
     * Emits technical Canvas or Web Audio failures.
     *
     * @public
     * @readonly
     */
    public readonly audioError: OutputEmitterRef<Error> = output<Error>();

    // #endregion

    // #region Methods

    /**
     * Initializes browser resources after Angular has attached the canvas.
     *
     * @public
     */
    public ngAfterViewInit(): void {
        this._configuration = this.normalizeConfiguration(this.configuration());
        this._mediaStream = this.mediaStream();
        this._context = this._canvasElement.getContext('2d');

        if (!this._context) {
            this.reportError(new Error('Canvas 2D rendering is not available in this browser.'));
            return;
        }

        this._isInitialized = true;
        this.observeCanvasSize();
        this.enterState();
        this.scheduleAnimationFrame();
    }

    /**
     * Applies changed signal inputs and synchronizes owned browser resources.
     *
     * @param configuration - Raw rendering configuration.
     * @param mediaStream - Externally owned stream.
     * @private
     */
    private applyConfiguration(configuration: ILiveAudioWaveformCanvasConfiguration, mediaStream: MediaStream | null): void {
        const nextConfiguration = this.normalizeConfiguration(configuration);
        const previousConfiguration = this._configuration;
        const previousMediaStream = this._mediaStream;

        this._configuration = nextConfiguration;
        this._mediaStream = mediaStream;

        if (!this._isInitialized) {
            return;
        }

        if (previousConfiguration.mode !== nextConfiguration.mode) {
            this._history = [];
            this._lastActiveData = [];
            this._staticBars = [];
        }

        if (previousConfiguration.fadeWidth !== nextConfiguration.fadeWidth || previousConfiguration.fadeEdges !== nextConfiguration.fadeEdges) {
            this.invalidateEdgeGradient();
        }

        if (previousConfiguration.state !== nextConfiguration.state) {
            this.enterState();
        } else if (nextConfiguration.state === 'listening' && previousMediaStream !== mediaStream) {
            this.synchronizeAudioSource();
        }

        if (this._analyser) {
            this.configureAnalyser(this._analyser);
        }

        this._needsRedraw = true;
    }

    /**
     * Cancels animation and releases only resources owned by this directive.
     *
     * @private
     */
    private destroy(): void {
        this._isDestroyed = true;

        if (this._animationFrameId !== null && this._defaultView) {
            this._defaultView.cancelAnimationFrame(this._animationFrameId);
        }

        this._animationFrameId = null;
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        this.releaseAudioSource();
        this._history = [];
        this._lastActiveData = [];
        this._staticBars = [];
    }

    /**
     * Applies the resource and animation transition for the current state.
     *
     * @private
     */
    private enterState(): void {
        switch (this._configuration.state) {
            case 'listening':
                this._fadeProgress = 0;
                this.synchronizeAudioSource();
                break;
            case 'processing':
                this.releaseAudioSource();
                this._processingTime = 0;
                this._transitionProgress = 0;
                break;
            case 'paused':
                this.releaseAudioSource();
                break;
            case 'error':
            case 'idle':
            default:
                this.releaseAudioSource();
                this._fadeProgress = 0;
                break;
        }

        this._needsRedraw = true;
    }

    /**
     * Connects the current stream to an analyser owned by the control.
     *
     * @private
     */
    private synchronizeAudioSource(): void {
        if (this._configuration.state !== 'listening' || !this._mediaStream) {
            this.releaseAudioSource();
            return;
        }

        if (this._connectedStream === this._mediaStream && this._analyser && this._audioContext) {
            this.configureAnalyser(this._analyser);
            return;
        }

        this.releaseAudioSource();

        const AudioContextConstructor = this._defaultView?.AudioContext ?? this._defaultView?.webkitAudioContext;
        if (!AudioContextConstructor) {
            this.reportError(new Error('Web Audio analysis is not available in this browser.'));
            return;
        }

        let audioContext: AudioContext | null = null;
        let audioSource: MediaStreamAudioSourceNode | null = null;

        try {
            audioContext = new AudioContextConstructor();
            const analyser = audioContext.createAnalyser();
            this.configureAnalyser(analyser);
            audioSource = audioContext.createMediaStreamSource(this._mediaStream);
            audioSource.connect(analyser);

            this._analyser = analyser;
            this._audioContext = audioContext;
            this._audioSource = audioSource;
            this._connectedStream = this._mediaStream;
            this._frequencyData = new Uint8Array(analyser.frequencyBinCount);
            this._history = [];
            this._lastUpdate = 0;

            if (audioContext.state === 'suspended') {
                const connectedAudioContext = audioContext;
                void connectedAudioContext.resume().catch((error: unknown) => this.handleAudioResumeError(connectedAudioContext, error));
            }
        } catch (error: unknown) {
            try {
                audioSource?.disconnect();
            } catch {
                /** The partially constructed graph is already unusable. */
            }
            this.closeAudioContext(audioContext);
            this.reportError(error);
        }
    }

    /**
     * Applies sanitized analyser parameters and refreshes its sample buffer.
     *
     * @param analyser - Analyser receiving the current configuration.
     * @private
     */
    private configureAnalyser(analyser: AnalyserNode): void {
        analyser.fftSize = this._configuration.fftSize;
        analyser.smoothingTimeConstant = this._configuration.smoothingTimeConstant;

        if (!this._frequencyData || this._frequencyData.length !== analyser.frequencyBinCount) {
            this._frequencyData = new Uint8Array(analyser.frequencyBinCount);
        }
    }

    /**
     * Disconnects the owned analyser graph and closes its audio context.
     *
     * @private
     */
    private releaseAudioSource(): void {
        const audioSource = this._audioSource;
        const audioContext = this._audioContext;

        this._analyser = null;
        this._audioContext = null;
        this._audioSource = null;
        this._connectedStream = null;
        this._frequencyData = null;

        if (audioSource) {
            try {
                audioSource.disconnect();
            } catch (error: unknown) {
                if (!this._isDestroyed) {
                    this.reportError(error);
                }
            }
        }

        this.closeAudioContext(audioContext);
    }

    /**
     * Closes an owned audio context without affecting any media stream track.
     *
     * @param audioContext - Context to close.
     * @private
     */
    private closeAudioContext(audioContext: AudioContext | null): void {
        if (!audioContext || audioContext.state === 'closed') {
            return;
        }

        void audioContext.close().catch((error: unknown) => {
            if (!this._isDestroyed) {
                this.reportError(error);
            }
        });
    }

    /**
     * Handles an asynchronous resume failure only while the context is still current.
     *
     * @param audioContext - Context that failed to resume.
     * @param error - Resume failure.
     * @private
     */
    private handleAudioResumeError(audioContext: AudioContext, error: unknown): void {
        if (this._audioContext !== audioContext) {
            return;
        }

        this.reportError(error);
        this.releaseAudioSource();
    }

    /**
     * Observes the container and keeps the backing canvas aligned with its DPR-scaled size.
     *
     * @private
     */
    private observeCanvasSize(): void {
        const container = this._canvasElement.parentElement ?? this._canvasElement;
        const ResizeObserverConstructor = this._defaultView?.ResizeObserver;

        this.resizeCanvas(container);

        if (!ResizeObserverConstructor) {
            return;
        }

        this._resizeObserver = new ResizeObserverConstructor(() => this.resizeCanvas(container));
        this._resizeObserver.observe(container);
    }

    /**
     * Resizes the backing canvas and resets its transform for the current device pixel ratio.
     *
     * @param container - Element defining the visible waveform size.
     * @private
     */
    private resizeCanvas(container: Element): void {
        if (!this._context) {
            return;
        }

        const rectangle = container.getBoundingClientRect();
        const devicePixelRatio = this.normalizeNumber(this._defaultView?.devicePixelRatio ?? 1, 1, 1, 8);
        const width = Math.max(0, rectangle.width);
        const height = Math.max(0, rectangle.height);

        this._canvasElement.width = Math.max(1, Math.round(width * devicePixelRatio));
        this._canvasElement.height = Math.max(1, Math.round(height * devicePixelRatio));
        this._canvasElement.style.width = `${width}px`;
        this._canvasElement.style.height = `${height}px`;
        this._context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        this._canvasWidth = width;
        this._canvasHeight = height;
        this.invalidateEdgeGradient();
        this._needsRedraw = true;
    }

    /**
     * Schedules the single animation loop used by every state.
     *
     * @private
     */
    private scheduleAnimationFrame(): void {
        if (!this._defaultView || this._isDestroyed) {
            return;
        }

        this._animationFrameId = this._defaultView.requestAnimationFrame((timestamp: number) => this.onAnimationFrame(timestamp));
    }

    /**
     * Advances state-specific data, redraws when needed, and schedules the next frame.
     *
     * @param timestamp - Current animation timestamp.
     * @private
     */
    private onAnimationFrame(timestamp: number): void {
        if (this._isDestroyed || !this._isInitialized) {
            return;
        }

        switch (this._configuration.state) {
            case 'listening':
                this.updateListeningData(timestamp);
                break;
            case 'processing':
                this.updateProcessingData();
                break;
            case 'error':
            case 'idle':
                this.updateIdleFade();
                break;
            case 'paused':
            default:
                break;
        }

        if (this._needsRedraw) {
            this.draw();
        }

        this.scheduleAnimationFrame();
    }

    /**
     * Samples the analyser and updates the active layout at the configured rate.
     *
     * @param timestamp - Current animation timestamp.
     * @private
     */
    private updateListeningData(timestamp: number): void {
        this._needsRedraw = true;

        if (!this._analyser || !this._frequencyData || timestamp - this._lastUpdate <= this._configuration.updateRate) {
            return;
        }

        this._lastUpdate = timestamp;
        this._analyser.getByteFrequencyData(this._frequencyData);

        if (this._configuration.mode === 'static') {
            this.updateStaticListeningData(this._frequencyData);
        } else {
            this.updateScrollingListeningData(this._frequencyData);
        }
    }

    /**
     * Converts the selected voice-frequency bins into a mirrored spectrum.
     *
     * @param frequencyData - Current analyser bins.
     * @private
     */
    private updateStaticListeningData(frequencyData: Uint8Array<ArrayBuffer>): void {
        const barCount = this.getBarCount();
        const halfCount = Math.floor(barCount / 2);
        const [startFrequency, endFrequency] = this.getRelevantFrequencyRange(frequencyData.length);
        const relevantLength = endFrequency - startFrequency;

        if (halfCount <= 0 || relevantLength <= 0) {
            this._staticBars = [];
            this._lastActiveData = [];
            return;
        }

        const bars: number[] = [];
        for (let index = halfCount - 1; index >= 0; index--) {
            bars.push(this.getFrequencyValue(frequencyData, startFrequency, relevantLength, index, halfCount));
        }
        for (let index = 0; index < halfCount; index++) {
            bars.push(this.getFrequencyValue(frequencyData, startFrequency, relevantLength, index, halfCount));
        }

        this._staticBars = bars;
        this._lastActiveData = [...bars];
    }

    /**
     * Converts the selected voice-frequency bins into one scrolling history sample.
     *
     * @param frequencyData - Current analyser bins.
     * @private
     */
    private updateScrollingListeningData(frequencyData: Uint8Array<ArrayBuffer>): void {
        const [startFrequency, endFrequency] = this.getRelevantFrequencyRange(frequencyData.length);
        const relevantLength = endFrequency - startFrequency;

        if (relevantLength <= 0) {
            return;
        }

        let sum = 0;
        for (let index = startFrequency; index < endFrequency; index++) {
            sum += frequencyData[index] ?? 0;
        }

        const average = (sum / relevantLength / 255) * this._configuration.sensitivity;
        this._history.push(this.clamp(average, 0.05, 1));
        if (this._history.length > this._configuration.historySize) {
            this._history.shift();
        }
        this._lastActiveData = [...this._history];
    }

    /**
     * Resolves one normalized frequency value for a mirrored bar.
     *
     * @param frequencyData - Current analyser bins.
     * @param startFrequency - First relevant bin.
     * @param relevantLength - Number of relevant bins.
     * @param index - Bar position within one half.
     * @param halfCount - Number of bars in one half.
     * @private
     * @returns Normalized bar value.
     */
    private getFrequencyValue(
        frequencyData: Uint8Array<ArrayBuffer>,
        startFrequency: number,
        relevantLength: number,
        index: number,
        halfCount: number,
    ): number {
        const dataIndex = startFrequency + Math.floor((index / halfCount) * relevantLength);
        const value = ((frequencyData[dataIndex] ?? 0) / 255) * this._configuration.sensitivity;

        return this.clamp(value, 0.05, 1);
    }

    /**
     * Generates the deterministic synthetic processing waveform.
     *
     * @private
     */
    private updateProcessingData(): void {
        this._processingTime += 0.03;
        this._transitionProgress = Math.min(1, this._transitionProgress + 0.02);

        const barCount = this.getBarCount(200);
        const processingData: number[] = [];

        if (this._configuration.mode === 'static') {
            const halfCount = Math.max(1, Math.floor(barCount / 2));
            for (let index = 0; index < barCount; index++) {
                const normalizedPosition = (index - halfCount) / halfCount;
                processingData.push(this.getProcessingValue(index, barCount, normalizedPosition, true));
            }
            this._staticBars = processingData;
        } else {
            for (let index = 0; index < barCount; index++) {
                const normalizedPosition = (index - barCount / 2) / Math.max(1, barCount / 2);
                processingData.push(this.getProcessingValue(index, barCount, normalizedPosition, false));
            }
            this._history = processingData;
        }

        this._needsRedraw = true;
    }

    /**
     * Calculates one synthetic processing sample and blends it with the last live data.
     *
     * @param index - Current bar index.
     * @param barCount - Total amount of visible bars.
     * @param normalizedPosition - Position normalized around the center.
     * @param staticMode - Whether mirrored static rendering is active.
     * @private
     * @returns Normalized processing value.
     */
    private getProcessingValue(index: number, barCount: number, normalizedPosition: number, staticMode: boolean): number {
        const centerWeight = 1 - Math.abs(normalizedPosition) * 0.4;
        const wave1 = Math.sin(this._processingTime * 1.5 + (staticMode ? normalizedPosition * 3 : index * 0.15)) * 0.25;
        const wave2 = Math.sin(this._processingTime * 0.8 - (staticMode ? normalizedPosition * 2 : index * 0.1)) * 0.2;
        const wave3 = Math.cos(this._processingTime * 2 + (staticMode ? normalizedPosition : index * 0.05)) * 0.15;
        const processingValue = (0.2 + wave1 + wave2 + wave3) * centerWeight;

        if (this._lastActiveData.length === 0 || this._transitionProgress >= 1) {
            return this.clamp(processingValue, 0.05, 1);
        }

        const lastDataIndex = staticMode
            ? Math.min(index, this._lastActiveData.length - 1)
            : Math.min(this._lastActiveData.length - 1, Math.floor((index / Math.max(1, barCount)) * this._lastActiveData.length));
        const lastValue = this._lastActiveData[lastDataIndex] ?? 0;
        const blendedValue = lastValue * (1 - this._transitionProgress) + processingValue * this._transitionProgress;

        return this.clamp(blendedValue, 0.05, 1);
    }

    /**
     * Fades retained samples to the idle baseline.
     *
     * @private
     */
    private updateIdleFade(): void {
        const data = this._configuration.mode === 'static' ? this._staticBars : this._history;
        if (data.length === 0) {
            return;
        }

        this._fadeProgress += 0.03;
        if (this._fadeProgress >= 1) {
            if (this._configuration.mode === 'static') {
                this._staticBars = [];
            } else {
                this._history = [];
            }
        } else {
            const fadedData = data.map((value: number) => value * (1 - this._fadeProgress));
            if (this._configuration.mode === 'static') {
                this._staticBars = fadedData;
            } else {
                this._history = fadedData;
            }
        }

        this._needsRedraw = true;
    }

    /**
     * Draws the current sample data and optional edge mask.
     *
     * @private
     */
    private draw(): void {
        if (!this._context) {
            return;
        }

        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        const data = this._configuration.mode === 'static' ? this._staticBars : this._history;

        if (this._configuration.mode === 'static') {
            this.drawStaticBars(data);
        } else {
            this.drawScrollingBars(data);
        }

        this.drawEdgeFade();
        this._context.globalAlpha = 1;
        this._context.globalCompositeOperation = 'source-over';
        this._needsRedraw = this._configuration.state === 'listening';
    }

    /**
     * Draws bars from left to right for static mode.
     *
     * @param data - Normalized bar values.
     * @private
     */
    private drawStaticBars(data: ReadonlyArray<number>): void {
        const barCount = this.getBarCount();
        const step = this._configuration.barWidth + this._configuration.barGap;

        for (let index = 0; index < barCount && index < data.length; index++) {
            this.drawBar(index * step, data[index] ?? 0.1);
        }
    }

    /**
     * Draws the retained history across the complete visible width.
     *
     * @param data - Normalized history values.
     * @private
     */
    private drawScrollingBars(data: ReadonlyArray<number>): void {
        const barCount = this.getBarCount();
        const visibleHistorySize = Math.min(barCount, this._configuration.historySize);

        if (visibleHistorySize <= 0) {
            return;
        }

        const maximumX = Math.max(0, this._canvasWidth - this._configuration.barWidth);
        const step = visibleHistorySize > 1 ? maximumX / (visibleHistorySize - 1) : 0;
        const visibleDataSize = Math.min(visibleHistorySize, data.length);

        for (let index = 0; index < visibleDataSize; index++) {
            const dataIndex = data.length - 1 - index;
            const x = maximumX - index * step;
            this.drawBar(x, data[dataIndex] ?? 0.1);
        }
    }

    /**
     * Draws one centered bar with the configured shape and opacity.
     *
     * @param x - Horizontal bar position.
     * @param value - Normalized bar value.
     * @private
     */
    private drawBar(x: number, value: number): void {
        if (!this._context) {
            return;
        }

        const barHeight = Math.max(this._configuration.barHeight, value * this._canvasHeight * 0.8);
        const y = this._canvasHeight / 2 - barHeight / 2;

        this._context.fillStyle = this.resolveBarColor();
        this._context.globalAlpha = 0.4 + value * 0.6;

        if (this._configuration.barRadius > 0 && typeof this._context.roundRect === 'function') {
            this._context.beginPath();
            this._context.roundRect(x, y, this._configuration.barWidth, barHeight, this._configuration.barRadius);
            this._context.fill();
        } else {
            this._context.fillRect(x, y, this._configuration.barWidth, barHeight);
        }
    }

    /**
     * Applies the same destination-out edge fade used by the reference control.
     *
     * @private
     */
    private drawEdgeFade(): void {
        if (!this._context || !this._configuration.fadeEdges || this._configuration.fadeWidth <= 0 || this._canvasWidth <= 0) {
            return;
        }

        if (!this._edgeGradient || this._edgeGradientWidth !== this._canvasWidth || this._edgeGradientFadeWidth !== this._configuration.fadeWidth) {
            const gradient = this._context.createLinearGradient(0, 0, this._canvasWidth, 0);
            const fadePercent = Math.min(0.3, this._configuration.fadeWidth / this._canvasWidth);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(fadePercent, 'rgba(255,255,255,0)');
            gradient.addColorStop(1 - fadePercent, 'rgba(255,255,255,0)');
            gradient.addColorStop(1, 'rgba(255,255,255,1)');
            this._edgeGradient = gradient;
            this._edgeGradientFadeWidth = this._configuration.fadeWidth;
            this._edgeGradientWidth = this._canvasWidth;
        }

        this._context.globalCompositeOperation = 'destination-out';
        this._context.fillStyle = this._edgeGradient;
        this._context.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._context.globalCompositeOperation = 'source-over';
    }

    /**
     * Resolves an explicit bar color or the themed canvas text color.
     *
     * @private
     * @returns Canvas-compatible color string.
     */
    private resolveBarColor(): string {
        const configuredColor = this._configuration.barColor?.trim();
        if (configuredColor) {
            return configuredColor;
        }

        return this._defaultView?.getComputedStyle(this._canvasElement).color || '#000';
    }

    /**
     * Returns the number of bars fitting the visible width.
     *
     * @param fallbackWidth - Width used before the canvas has a measurable size.
     * @private
     * @returns Non-negative bar count.
     */
    private getBarCount(fallbackWidth = 0): number {
        const step = this._configuration.barWidth + this._configuration.barGap;
        const width = this._canvasWidth || fallbackWidth;

        return step > 0 ? Math.max(0, Math.floor(width / step)) : 0;
    }

    /**
     * Selects the lower-middle frequency range used by the reference visualization.
     *
     * @param frequencyCount - Total analyser frequency bins.
     * @private
     * @returns Inclusive start and exclusive end bin positions.
     */
    private getRelevantFrequencyRange(frequencyCount: number): readonly [number, number] {
        return [Math.floor(frequencyCount * 0.05), Math.floor(frequencyCount * 0.4)];
    }

    /**
     * Clears the cached edge mask after relevant size or configuration changes.
     *
     * @private
     */
    private invalidateEdgeGradient(): void {
        this._edgeGradient = null;
        this._edgeGradientFadeWidth = 0;
        this._edgeGradientWidth = 0;
    }

    /**
     * Sanitizes all public numeric and domain inputs before they reach browser APIs.
     *
     * @param configuration - Raw public configuration.
     * @private
     * @returns Safe rendering configuration.
     */
    private normalizeConfiguration(configuration: ILiveAudioWaveformCanvasConfiguration): ILiveAudioWaveformCanvasConfiguration {
        return {
            barColor: configuration.barColor?.trim() || null,
            barGap: this.normalizeNumber(configuration.barGap, 1, 0, 256),
            barHeight: this.normalizeNumber(configuration.barHeight, 4, 0, 4_096),
            barRadius: this.normalizeNumber(configuration.barRadius, 1.5, 0, 256),
            barWidth: this.normalizeNumber(configuration.barWidth, 3, 0.5, 256),
            fadeEdges: configuration.fadeEdges === true,
            fadeWidth: this.normalizeNumber(configuration.fadeWidth, 24, 0, 4_096),
            fftSize: this.normalizeFftSize(configuration.fftSize),
            historySize: Math.round(this.normalizeNumber(configuration.historySize, 60, 1, 10_000)),
            mode: this.normalizeMode(configuration.mode),
            sensitivity: this.normalizeNumber(configuration.sensitivity, 1, 0, 100),
            smoothingTimeConstant: this.normalizeNumber(configuration.smoothingTimeConstant, 0.8, 0, 1),
            state: this.normalizeState(configuration.state),
            updateRate: this.normalizeNumber(configuration.updateRate, 30, 0, 60_000),
        };
    }

    /**
     * Converts arbitrary FFT values to a supported power of two.
     *
     * @param value - Requested FFT size.
     * @private
     * @returns Supported FFT size.
     */
    private normalizeFftSize(value: number): number {
        const normalizedValue = this.normalizeNumber(value, 256, 32, 32_768);

        return 2 ** Math.round(Math.log2(normalizedValue));
    }

    /**
     * Normalizes an untrusted waveform mode at runtime.
     *
     * @param mode - Requested mode.
     * @private
     * @returns Supported mode.
     */
    private normalizeMode(mode: LiveAudioWaveformMode): LiveAudioWaveformMode {
        return mode === 'scrolling' ? 'scrolling' : 'static';
    }

    /**
     * Normalizes an untrusted waveform state at runtime.
     *
     * @param state - Requested state.
     * @private
     * @returns Supported state.
     */
    private normalizeState(state: LiveAudioWaveformState): LiveAudioWaveformState {
        switch (state) {
            case 'error':
            case 'listening':
            case 'paused':
            case 'processing':
                return state;
            case 'idle':
            default:
                return 'idle';
        }
    }

    /**
     * Replaces non-finite numbers and constrains valid values.
     *
     * @param value - Requested value.
     * @param fallback - Value used for non-finite input.
     * @param minimum - Inclusive minimum.
     * @param maximum - Inclusive maximum.
     * @private
     * @returns Finite constrained value.
     */
    private normalizeNumber(value: number, fallback: number, minimum: number, maximum: number): number {
        return Number.isFinite(value) ? this.clamp(value, minimum, maximum) : fallback;
    }

    /**
     * Constrains a number to an inclusive range.
     *
     * @param value - Number to constrain.
     * @param minimum - Inclusive minimum.
     * @param maximum - Inclusive maximum.
     * @private
     * @returns Constrained value.
     */
    private clamp(value: number, minimum: number, maximum: number): number {
        return Math.min(maximum, Math.max(minimum, value));
    }

    /**
     * Emits a normalized technical error while preserving caller-owned state.
     *
     * @param error - Unknown browser failure.
     * @private
     */
    private reportError(error: unknown): void {
        const normalizedError = error instanceof Error ? error : new Error(String(error));
        this.audioError.emit(normalizedError);
    }

    // #endregion
}
