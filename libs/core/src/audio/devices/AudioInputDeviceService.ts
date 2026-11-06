// #region Imports

import { computed, DestroyRef, DOCUMENT, inject, Injectable, type Signal, signal } from '@angular/core';
import { AudioInputDeviceError } from './AudioInputDeviceError';
import type { AudioInputDeviceErrorCode } from './AudioInputDeviceErrorCode';
import type { AudioInputPermissionState } from './AudioInputPermissionState';
import type { AudioInputSignalQuality } from './AudioInputSignalQuality';
import type { AudioInputTestState } from './AudioInputTestState';
import type { IAudioInputDevice } from './IAudioInputDevice';

// #endregion

/**
 * A window that may expose the Web Audio API under its vendor-prefixed name.
 */
interface IAudioInputWindow extends Window {
    readonly AudioContext?: typeof AudioContext;
    readonly webkitAudioContext?: typeof AudioContext;
}

const ANALYSIS_INTERVAL_MS = 100;
const CLIPPING_PEAK = 0.985;
const FAIR_RMS = 0.065;
const NO_SIGNAL_RMS = 0.008;
const POOR_RMS = 0.025;
const REQUIRED_SUCCESSFUL_SAMPLES = 3;

/**
 * Discovers browser microphones and owns one short-lived, non-recording voice test.
 *
 * The voice test acquires a stream, grades its level through an `AnalyserNode` and marks the
 * device as verified after three consecutive usable samples, so a settings page can prove a
 * microphone works before a recording depends on it. Nothing is recorded, the stream is released
 * with the test, and the media APIs — `mediaDevices`, `permissions` and `AudioContext` — are
 * reached through the injected `DOCUMENT` only. Timers remain the ambient ones.
 *
 * @public
 */
@Injectable()
export class AudioInputDeviceService {
    // #region Fields

    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _document: Document = inject(DOCUMENT);
    private readonly _activeDeviceId = signal<string | null>(null);
    private readonly _decibels = signal<number | null>(null);
    private readonly _devices = signal<ReadonlyArray<IAudioInputDevice>>([]);
    private readonly _error = signal<AudioInputDeviceError | null>(null);
    private readonly _isBusy = signal<boolean>(false);
    private readonly _isSupported = signal<boolean>(this.hasBrowserSupport());
    private readonly _mediaStream = signal<MediaStream | null>(null);
    private readonly _permissionState = signal<AudioInputPermissionState>(this.hasBrowserSupport() ? 'unknown' : 'unsupported');
    private readonly _signalQuality = signal<AudioInputSignalQuality>('unknown');
    private readonly _testState = signal<AudioInputTestState>(this.hasBrowserSupport() ? 'idle' : 'unsupported');
    private readonly _testedDeviceId = signal<string | null>(null);
    private readonly _isTesting = computed<boolean>(() => this._mediaStream() !== null || this._testState() === 'starting');
    private _activeOperations = 0;
    private _analyser: AnalyserNode | null = null;
    private _analysisBuffer: Float32Array<ArrayBuffer> | null = null;
    private _analysisTimerId: ReturnType<typeof globalThis.setInterval> | null = null;
    private _audioContext: AudioContext | null = null;
    private _deviceChangeHandler: (() => void) | null = null;
    private _generation = 0;
    private _initialized = false;
    private _mediaStreamSource: MediaStreamAudioSourceNode | null = null;
    private _permissionChangeHandler: (() => void) | null = null;
    private _permissionStatus: PermissionStatus | null = null;
    private _successfulSamples = 0;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `AudioInputDeviceService` class and guarantees the release
     * of its browser audio resources.
     *
     * @public
     */
    public constructor() {
        this._destroyRef.onDestroy(() => this.dispose());
    }

    // #endregion

    // #region Properties

    /**
     * Microphone identifier a running voice test holds a stream for.
     *
     * @public
     * @readonly
     */
    public get activeDeviceId(): Signal<string | null> {
        return this._activeDeviceId.asReadonly();
    }

    /**
     * Current signal level in dBFS, or `null` while nothing is measured.
     *
     * @public
     * @readonly
     */
    public get decibels(): Signal<number | null> {
        return this._decibels.asReadonly();
    }

    /**
     * Available browser audio-input devices.
     *
     * @public
     * @readonly
     */
    public get devices(): Signal<ReadonlyArray<IAudioInputDevice>> {
        return this._devices.asReadonly();
    }

    /**
     * Last typed discovery, permission, capture, or analysis failure.
     *
     * @public
     * @readonly
     */
    public get error(): Signal<AudioInputDeviceError | null> {
        return this._error.asReadonly();
    }

    /**
     * Indicates whether a browser operation is currently pending.
     *
     * @public
     * @readonly
     */
    public get isBusy(): Signal<boolean> {
        return this._isBusy.asReadonly();
    }

    /**
     * Indicates whether the required browser media APIs are available.
     *
     * @public
     * @readonly
     */
    public get isSupported(): Signal<boolean> {
        return this._isSupported.asReadonly();
    }

    /**
     * Indicates whether a voice test is starting or listening.
     *
     * @public
     * @readonly
     */
    public get isTesting(): Signal<boolean> {
        return this._isTesting;
    }

    /**
     * Test stream, exposed for a live waveform visualization.
     *
     * @public
     * @readonly
     */
    public get mediaStream(): Signal<MediaStream | null> {
        return this._mediaStream.asReadonly();
    }

    /**
     * Current browser microphone permission state.
     *
     * @public
     * @readonly
     */
    public get permissionState(): Signal<AudioInputPermissionState> {
        return this._permissionState.asReadonly();
    }

    /**
     * Current normalized microphone signal quality.
     *
     * @public
     * @readonly
     */
    public get signalQuality(): Signal<AudioInputSignalQuality> {
        return this._signalQuality.asReadonly();
    }

    /**
     * Current voice-test lifecycle.
     *
     * @public
     * @readonly
     */
    public get testState(): Signal<AudioInputTestState> {
        return this._testState.asReadonly();
    }

    /**
     * Device identifier that passed a voice test during this service's lifetime.
     *
     * @public
     * @readonly
     */
    public get testedDeviceId(): Signal<string | null> {
        return this._testedDeviceId.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Discovers devices, observes browser device changes, and resolves the permission state.
     *
     * @public
     * @returns A promise that resolves once devices and permission state are known.
     * @throws AudioInputDeviceError when the browser has no audio-input APIs.
     */
    public async initialize(): Promise<void> {
        this.ensureSupport();

        if (!this._initialized) {
            this.attachDeviceChangeListener();
            this._initialized = true;
        }

        await Promise.all([this.queryPermissionState(), this.refresh()]);
    }

    /**
     * Refreshes the browser's current audio-input inventory.
     *
     * @public
     * @returns A promise that resolves once the inventory is published.
     * @throws AudioInputDeviceError when enumeration is unavailable or fails.
     */
    public async refresh(): Promise<void> {
        const mediaDevices = this.resolveMediaDevices();

        if (!mediaDevices) {
            this.markUnsupported();

            throw new AudioInputDeviceError('unsupported', 'Browser audio-input APIs are unavailable.');
        }

        this.beginOperation();

        try {
            const devices = await mediaDevices.enumerateDevices();
            const audioInputDevices = devices
                .filter((device) => device.kind === 'audioinput')
                .map((device) => ({
                    deviceId: device.deviceId,
                    groupId: device.groupId,
                    label: device.label,
                }));

            this._devices.set(audioInputDevices);

            if (
                (this._permissionState() === 'prompt' || this._permissionState() === 'unknown') &&
                audioInputDevices.some((device) => device.label.trim().length > 0)
            ) {
                this._permissionState.set('granted');
            }

            this._error.set(null);
        } catch (error: unknown) {
            const deviceError = new AudioInputDeviceError('device-enumeration-failed', 'Audio-input devices could not be enumerated.', error);

            this._error.set(deviceError);

            throw deviceError;
        } finally {
            this.endOperation();
        }
    }

    /**
     * Requests microphone permission without retaining or recording the acquired stream.
     *
     * @public
     * @returns A promise that resolves once permission is granted.
     * @throws AudioInputDeviceError when the browser denies or cannot serve the request.
     */
    public async requestPermission(): Promise<void> {
        const mediaDevices = this.resolveMediaDevices();

        if (!mediaDevices) {
            this.markUnsupported();

            throw new AudioInputDeviceError('unsupported', 'Browser audio-input APIs are unavailable.');
        }

        this.beginOperation();

        try {
            const stream = await mediaDevices.getUserMedia({ audio: true });

            this.stopTracks(stream);
            this._permissionState.set('granted');
            this._error.set(null);
            await this.refresh();
        } catch (error: unknown) {
            const deviceError = this.mapCaptureError(error);

            this.applyPermissionFailure(deviceError);
            this._error.set(deviceError);

            throw deviceError;
        } finally {
            this.endOperation();
        }
    }

    /**
     * Starts a non-recording voice test for one browser microphone.
     *
     * @public
     * @param deviceId Exact browser-scoped device identifier.
     * @returns A promise that resolves once the test listens.
     * @throws AudioInputDeviceError when the device is missing, blocked, or cannot be analysed.
     */
    public async startTest(deviceId: string): Promise<void> {
        const normalizedDeviceId = deviceId.trim();
        const mediaDevices = this.resolveMediaDevices();

        if (!mediaDevices) {
            this.markUnsupported();

            throw new AudioInputDeviceError('unsupported', 'Browser audio-input APIs are unavailable.');
        }

        if (!normalizedDeviceId) {
            const deviceError = new AudioInputDeviceError('device-not-found', 'No audio-input device was selected.');

            this._error.set(deviceError);
            this._testState.set('error');

            throw deviceError;
        }

        const generation = ++this._generation;

        this.releaseTestResources(true);
        this._activeDeviceId.set(normalizedDeviceId);
        this._error.set(null);
        this._testedDeviceId.set(null);
        this._testState.set('starting');
        this.beginOperation();

        try {
            const stream = await mediaDevices.getUserMedia({
                audio: {
                    autoGainControl: true,
                    deviceId: { exact: normalizedDeviceId },
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });

            if (generation !== this._generation) {
                this.stopTracks(stream);

                return;
            }

            this._mediaStream.set(stream);
            this._permissionState.set('granted');
            await this.startAnalysis(stream, generation);

            if (generation !== this._generation) {
                return;
            }

            this._testState.set('listening');
            this._error.set(null);
            void this.refresh().catch(() => undefined);
        } catch (error: unknown) {
            if (generation !== this._generation) {
                return;
            }

            const deviceError = error instanceof AudioInputDeviceError ? error : this.mapCaptureError(error);

            this.releaseTestResources(true);
            this.applyPermissionFailure(deviceError);
            this._error.set(deviceError);
            this._testState.set(deviceError.code === 'unsupported' ? 'unsupported' : 'error');

            throw deviceError;
        } finally {
            this.endOperation();
        }
    }

    /**
     * Stops the owned test stream while preserving a successful test result.
     *
     * @public
     */
    public stopTest(): void {
        ++this._generation;

        const didPass = this._testedDeviceId() !== null;

        this.releaseTestResources(!didPass);
        this._testState.set(didPass ? 'passed' : this._isSupported() ? 'idle' : 'unsupported');
    }

    /**
     * Releases listeners, streams, timers, and Web Audio nodes.
     *
     * @public
     */
    public dispose(): void {
        ++this._generation;
        this.detachDeviceChangeListener();
        this.detachPermissionListener();
        this.releaseTestResources(true);
        this._testState.set(this._isSupported() ? 'idle' : 'unsupported');
        this._initialized = false;
    }

    /**
     * Publishes a denied permission so a user interface can explain how to restore it.
     *
     * @param error Typed capture failure.
     */
    private applyPermissionFailure(error: AudioInputDeviceError): void {
        if (error.code === 'permission-denied') {
            this._permissionState.set('denied');
        }
    }

    /**
     * Observes browser device changes so the inventory follows plugged and unplugged hardware.
     */
    private attachDeviceChangeListener(): void {
        const mediaDevices = this.resolveMediaDevices();

        if (!mediaDevices || this._deviceChangeHandler) {
            return;
        }

        this._deviceChangeHandler = (): void => {
            void this.refresh().catch(() => undefined);
        };
        mediaDevices.addEventListener('devicechange', this._deviceChangeHandler);
    }

    /**
     * Follows permission changes made outside the application.
     *
     * @param permissionStatus Browser permission status to observe.
     */
    private attachPermissionListener(permissionStatus: PermissionStatus): void {
        this.detachPermissionListener();

        this._permissionStatus = permissionStatus;
        this._permissionChangeHandler = (): void => {
            this._permissionState.set(permissionStatus.state);
        };
        permissionStatus.addEventListener('change', this._permissionChangeHandler);
    }

    /**
     * Marks one more pending browser operation.
     */
    private beginOperation(): void {
        this._activeOperations += 1;
        this._isBusy.set(true);
    }

    /**
     * Grades a sampled signal from its RMS level and peak amplitude.
     *
     * @param rms Root mean square of the sample window.
     * @param peak Highest absolute amplitude of the sample window.
     * @returns The normalized signal quality.
     */
    private classifySignal(rms: number, peak: number): AudioInputSignalQuality {
        if (peak >= CLIPPING_PEAK) {
            return 'clipping';
        }

        if (rms < NO_SIGNAL_RMS) {
            return 'no-signal';
        }

        if (rms < POOR_RMS) {
            return 'poor';
        }

        if (rms < FAIR_RMS) {
            return 'fair';
        }

        return 'good';
    }

    /**
     * Stops observing browser device changes.
     */
    private detachDeviceChangeListener(): void {
        const mediaDevices = this.resolveMediaDevices();

        if (mediaDevices && this._deviceChangeHandler) {
            mediaDevices.removeEventListener('devicechange', this._deviceChangeHandler);
        }

        this._deviceChangeHandler = null;
    }

    /**
     * Stops observing browser permission changes.
     */
    private detachPermissionListener(): void {
        if (this._permissionStatus && this._permissionChangeHandler) {
            this._permissionStatus.removeEventListener('change', this._permissionChangeHandler);
        }

        this._permissionChangeHandler = null;
        this._permissionStatus = null;
    }

    /**
     * Clears one pending browser operation.
     */
    private endOperation(): void {
        this._activeOperations = Math.max(0, this._activeOperations - 1);
        this._isBusy.set(this._activeOperations > 0);
    }

    /**
     * Verifies that the browser exposes audio-input APIs.
     */
    private ensureSupport(): void {
        if (!this.hasBrowserSupport()) {
            this.markUnsupported();

            throw new AudioInputDeviceError('unsupported', 'Browser audio-input APIs are unavailable.');
        }
    }

    /**
     * Ends a running test after an analysis failure.
     *
     * @param error Original analysis failure.
     */
    private failAnalysis(error: unknown): void {
        const deviceError =
            error instanceof AudioInputDeviceError
                ? error
                : new AudioInputDeviceError('analysis-failed', 'The microphone signal could not be analysed.', error);

        ++this._generation;
        this.releaseTestResources(true);
        this._error.set(deviceError);
        this._testState.set('error');
    }

    /**
     * Indicates whether the injected document reaches browser media devices.
     *
     * @returns `true` when microphone discovery is possible.
     */
    private hasBrowserSupport(): boolean {
        return this.resolveMediaDevices() !== null;
    }

    /**
     * Maps microphone acquisition failures to stable recovery categories.
     *
     * @param error Browser acquisition failure.
     * @returns The typed capture failure.
     */
    private mapCaptureError(error: unknown): AudioInputDeviceError {
        if (error instanceof AudioInputDeviceError) {
            return error;
        }

        const name = this.readErrorName(error);
        const code = this.mapCaptureErrorCode(name);
        const message = error instanceof Error && error.message ? error.message : 'Microphone acquisition failed.';

        return new AudioInputDeviceError(code, message, error);
    }

    /**
     * Converts browser error names into stable recovery categories.
     *
     * @param name Browser error name.
     * @returns The stable error category.
     */
    private mapCaptureErrorCode(name: string): AudioInputDeviceErrorCode {
        switch (name) {
            case 'NotAllowedError':
            case 'SecurityError':
                return 'permission-denied';
            case 'NotFoundError':
            case 'DevicesNotFoundError':
            case 'OverconstrainedError':
            case 'ConstraintNotSatisfiedError':
                return 'device-not-found';
            case 'NotReadableError':
            case 'TrackStartError':
                return 'device-busy';
            default:
                return 'capture-failed';
        }
    }

    /**
     * Publishes the terminal state of a runtime without audio-input APIs.
     */
    private markUnsupported(): void {
        this._isSupported.set(false);
        this._permissionState.set('unsupported');
        this._testState.set('unsupported');
    }

    /**
     * Resolves the permission state through the Permissions API when the browser offers it.
     *
     * @returns A promise that resolves once the permission state is published.
     */
    private queryPermissionState(): Promise<void> {
        const permissions = this._document.defaultView?.navigator?.permissions;

        if (!permissions?.query) {
            if (this._permissionState() === 'unknown') {
                this._permissionState.set('prompt');
            }

            return Promise.resolve();
        }

        return permissions
            .query({ name: 'microphone' as PermissionName })
            .then((permissionStatus) => {
                this._permissionState.set(permissionStatus.state);
                this.attachPermissionListener(permissionStatus);
            })
            .catch(() => {
                if (this._permissionState() === 'unknown') {
                    this._permissionState.set('prompt');
                }
            });
    }

    /**
     * Reads a browser error name without unsafe casts.
     *
     * @param error Unknown browser failure.
     * @returns The error name, or an empty string.
     */
    private readErrorName(error: unknown): string {
        if (error && typeof error === 'object' && 'name' in error && typeof error.name === 'string') {
            return error.name;
        }

        return '';
    }

    /**
     * Releases the test stream, its Web Audio graph, and its sampling timer.
     *
     * @param resetSignal `true` to also clear the published signal grading.
     */
    private releaseTestResources(resetSignal: boolean): void {
        if (this._analysisTimerId !== null) {
            globalThis.clearInterval(this._analysisTimerId);
            this._analysisTimerId = null;
        }

        try {
            this._mediaStreamSource?.disconnect();
        } catch {
            /** Browser nodes can already be disconnected during page teardown. */
        }

        this._mediaStreamSource = null;
        this._analyser = null;
        this._analysisBuffer = null;

        const audioContext = this._audioContext;

        this._audioContext = null;

        if (audioContext && audioContext.state !== 'closed') {
            void audioContext.close().catch(() => undefined);
        }

        const stream = this._mediaStream();

        if (stream) {
            this.stopTracks(stream);
        }

        this._mediaStream.set(null);
        this._activeDeviceId.set(null);
        this._successfulSamples = 0;

        if (resetSignal) {
            this._decibels.set(null);
            this._signalQuality.set('unknown');
        }
    }

    /**
     * Resolves the Web Audio constructor of the injected document.
     *
     * @returns The constructor, or `null` when the Web Audio API is unavailable.
     */
    private resolveAudioContextConstructor(): typeof AudioContext | null {
        const view = this._document.defaultView as IAudioInputWindow | null;

        return view?.AudioContext ?? view?.webkitAudioContext ?? null;
    }

    /**
     * Resolves the browser media devices of the injected document.
     *
     * @returns The media devices, or `null` when discovery is unavailable.
     */
    private resolveMediaDevices(): MediaDevices | null {
        const mediaDevices = this._document.defaultView?.navigator?.mediaDevices;

        if (!mediaDevices || typeof mediaDevices.getUserMedia !== 'function' || typeof mediaDevices.enumerateDevices !== 'function') {
            return null;
        }

        return mediaDevices;
    }

    /**
     * Samples the analyser once and publishes the resulting grading.
     */
    private sampleSignal(): void {
        const analyser = this._analyser;
        const analysisBuffer = this._analysisBuffer;

        if (!analyser || !analysisBuffer) {
            return;
        }

        analyser.getFloatTimeDomainData(analysisBuffer);

        let peak = 0;
        let sumOfSquares = 0;

        for (const sample of analysisBuffer) {
            const absoluteSample = Math.abs(sample);

            peak = Math.max(peak, absoluteSample);
            sumOfSquares += sample * sample;
        }

        const rms = Math.sqrt(sumOfSquares / analysisBuffer.length);
        const decibels = rms > 0 ? 20 * Math.log10(rms) : null;
        const quality = this.classifySignal(rms, peak);

        this._decibels.set(decibels === null ? null : Math.round(decibels));
        this._signalQuality.set(quality);

        if (quality === 'fair' || quality === 'good') {
            this._successfulSamples += 1;
        } else {
            this._successfulSamples = 0;
        }

        if (this._successfulSamples >= REQUIRED_SUCCESSFUL_SAMPLES) {
            this._testedDeviceId.set(this._activeDeviceId());
            this._testState.set('passed');
        }
    }

    /**
     * Samples the analyser and converts a failure into recorder state instead of an unhandled
     * timer error.
     */
    private sampleSignalSafely(): void {
        try {
            this.sampleSignal();
        } catch (error: unknown) {
            this.failAnalysis(error);
        }
    }

    /**
     * Builds the Web Audio graph that grades the test stream.
     *
     * @param stream Acquired test stream.
     * @param generation Voice test that owns the graph.
     * @returns A promise that resolves once sampling runs.
     * @throws AudioInputDeviceError when the Web Audio API is unavailable or fails.
     */
    private async startAnalysis(stream: MediaStream, generation: number): Promise<void> {
        const audioContextConstructor = this.resolveAudioContextConstructor();

        if (!audioContextConstructor) {
            throw new AudioInputDeviceError('analysis-failed', 'The Web Audio API is unavailable.');
        }

        try {
            const audioContext = new audioContextConstructor();

            this._audioContext = audioContext;

            const analyser = audioContext.createAnalyser();

            this._analyser = analyser;

            const source = audioContext.createMediaStreamSource(stream);

            this._mediaStreamSource = source;

            analyser.fftSize = 2_048;
            analyser.smoothingTimeConstant = 0.8;
            source.connect(analyser);

            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }

            if (generation !== this._generation) {
                return;
            }

            this._analysisBuffer = new Float32Array(analyser.fftSize);
            this._analysisTimerId = globalThis.setInterval(() => this.sampleSignalSafely(), ANALYSIS_INTERVAL_MS);
            this.sampleSignal();
        } catch (error: unknown) {
            throw new AudioInputDeviceError('analysis-failed', 'The microphone signal could not be analysed.', error);
        }
    }

    /**
     * Stops every track of an owned stream.
     *
     * @param stream Owned stream to close.
     */
    private stopTracks(stream: MediaStream): void {
        for (const track of stream.getTracks()) {
            track.stop();
        }
    }

    // #endregion
}
