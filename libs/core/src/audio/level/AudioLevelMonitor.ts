// #region Imports

import { DestroyRef, DOCUMENT, inject, Injectable, type Signal, signal } from '@angular/core';
import { type Observable, Subject } from 'rxjs';
import { AUDIO_LEVEL_WORKLET_PROCESSOR_NAME } from './AUDIO_LEVEL_WORKLET_PROCESSOR_NAME';
import type { AudioLevelMonitorState } from './AudioLevelMonitorState';
import { AudioLevelWorkletModuleLoader } from './AudioLevelWorkletModuleLoader';
import type { IAudioLevelMeasurement } from './IAudioLevelMeasurement';
import type { IAudioLevelMonitorOptions } from './IAudioLevelMonitorOptions';

// #endregion

interface IAudioLevelWindow extends Window {
    readonly AudioContext?: typeof AudioContext;
    readonly AudioWorkletNode?: typeof AudioWorkletNode;
    readonly webkitAudioContext?: typeof AudioContext;
}

type AudioLevelWorkletCommand = 'pause' | 'resume' | 'flush';

interface IAudioLevelWorkletMeasurement {
    readonly sampleCount: number;
    readonly rms: number;
    readonly peak: number;
}

interface IPendingAudioLevelCommand {
    readonly name: AudioLevelWorkletCommand;
    readonly promise: Promise<void>;
    readonly complete: (error?: Error) => void;
}

interface IAudioLevelCapture {
    readonly context: AudioContext;
    readonly cancelStart: () => void;
    readonly onProcessorError: () => void;
    readonly onTrackEnded: () => void;
    readonly samplesPerFrame: number;
    readonly startedAtMs: number;
    readonly tracks: ReadonlyArray<MediaStreamTrack>;
    command: IPendingAudioLevelCommand | null;
    emittedSamples: number;
    failure: Error | null;
    gainNode: GainNode | null;
    sourceNode: MediaStreamAudioSourceNode | null;
    workletNode: AudioWorkletNode | null;
}

const SAMPLE_RATE = 24_000;
const DEFAULT_FRAME_DURATION_MS = 20;
const COMMAND_TIMEOUT_MS = 2_000;

/**
 * Measures a borrowed stream in sample-aligned mono windows at 24 kHz. Provide a separate monitor
 * for each independent capture. Only the analysis graph is owned by the monitor.
 *
 * @public
 */
@Injectable()
export class AudioLevelMonitor {
    // #region Fields

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _window = inject(DOCUMENT).defaultView as IAudioLevelWindow | null;
    private readonly _loader = inject(AudioLevelWorkletModuleLoader);
    private readonly _error = signal<Error | null>(null);
    private readonly _state = signal<AudioLevelMonitorState>('idle');
    private readonly _measurements = new Subject<IAudioLevelMeasurement>();
    private readonly _levels = this._measurements.asObservable();
    private _capture: IAudioLevelCapture | null = null;
    private _stopPromise: Promise<void> | null = null;

    // #endregion

    // #region Ctor

    /** Releases the graph when the providing injector is destroyed. */
    public constructor() {
        this._destroyRef.onDestroy(() => this.dispose());
    }

    // #endregion

    // #region Properties

    /** The latest browser or worklet failure, cleared when starting a new capture. */
    public get error(): Signal<Error | null> {
        return this._error.asReadonly();
    }

    /** Ordered level measurements, including the last partial window on graceful stop. */
    public get levels(): Observable<IAudioLevelMeasurement> {
        return this._levels;
    }

    /** The current lifecycle state of the monitor. */
    public get state(): Signal<AudioLevelMonitorState> {
        return this._state.asReadonly();
    }

    // #endregion

    // #region Methods

    /** Indicates whether the browser exposes the required Web Audio constructors. */
    public isSupported(): boolean {
        return typeof this.getAudioContextConstructor() === 'function' && typeof this._window?.AudioWorkletNode === 'function';
    }

    /** Starts monitoring a stream with at least one live audio track. */
    public async start(stream: MediaStream, options: IAudioLevelMonitorOptions = {}): Promise<void> {
        if (this._state() === 'disposed' || this._capture || this._stopPromise) {
            throw new Error('The audio level monitor is already in use or disposed.');
        }

        const duration = options.frameDurationMs ?? DEFAULT_FRAME_DURATION_MS;
        if (!Number.isFinite(duration) || duration < 5 || duration > 1_000) {
            throw new RangeError('The audio measurement window must be between 5 and 1000 milliseconds.');
        }

        const tracks = stream.getAudioTracks();
        if (!tracks.some((track) => track.readyState === 'live')) {
            throw new Error('Audio level monitoring requires a live audio track.');
        }

        const AudioContextConstructor = this.getAudioContextConstructor();
        const WorkletNode = this._window?.AudioWorkletNode;
        if (!AudioContextConstructor || !WorkletNode) {
            throw new Error('Web Audio and AudioWorklet are required for audio level monitoring.');
        }

        this._error.set(null);
        this._state.set('starting');
        let capture: IAudioLevelCapture | null = null;

        try {
            const context = new AudioContextConstructor({ latencyHint: 'interactive', sampleRate: SAMPLE_RATE });
            let cancelStart!: () => void;
            const cancelled = new Promise<void>((resolve) => {
                cancelStart = resolve;
            });

            capture = this.createCapture(context, tracks, Math.round((duration * SAMPLE_RATE) / 1_000), cancelStart);
            this._capture = capture;

            for (const track of tracks) {
                track.addEventListener('ended', capture.onTrackEnded);
            }

            await Promise.race([this.connectCapture(capture, stream, WorkletNode), cancelled]);
            if (capture.failure) {
                throw capture.failure;
            }
        } catch (reason: unknown) {
            if (capture && this._capture !== capture) {
                if (capture.failure) {
                    throw capture.failure;
                }

                return;
            }

            const error = this.reportFailure(reason);
            if (capture) {
                await this.release(capture);
            }

            throw error;
        }
    }

    /** Pauses measurements while retaining the borrowed stream and the graph. */
    public pause(): Promise<void> {
        return this.changePausedState('pause', 'running', 'paused');
    }

    /** Resumes measurement of the same stream. */
    public resume(): Promise<void> {
        return this.changePausedState('resume', 'paused', 'running');
    }

    /** Flushes any partial measurement and releases the graph without ending the stream. */
    public stop(): Promise<void> {
        if (this._stopPromise) {
            return this._stopPromise;
        }

        if (!this._capture) {
            return Promise.resolve();
        }

        this._state.set('stopping');
        this._stopPromise = this.stopCapture(this._capture);

        return this._stopPromise;
    }

    /** Permanently releases the graph immediately and completes the measurement stream. */
    public dispose(): void {
        this._state.set('disposed');

        if (this._capture) {
            void this.release(this._capture);
        }

        this._measurements.complete();
    }

    private getAudioContextConstructor(): typeof AudioContext | undefined {
        return this._window?.AudioContext ?? this._window?.webkitAudioContext;
    }

    private createCapture(
        context: AudioContext,
        tracks: ReadonlyArray<MediaStreamTrack>,
        samplesPerFrame: number,
        cancelStart: () => void,
    ): IAudioLevelCapture {
        const capture: IAudioLevelCapture = {
            context,
            cancelStart,
            onProcessorError: () => {
                void this.failCapture(capture, new Error('The audio level worklet processor failed.'));
            },
            onTrackEnded: () => {
                if (this._state() !== 'stopping' && tracks.every((track) => track.readyState === 'ended')) {
                    void this.failCapture(capture, new Error('The monitored stream has no live audio track.'));
                }
            },
            samplesPerFrame,
            startedAtMs: this._window?.performance?.now() ?? 0,
            tracks,
            command: null,
            emittedSamples: 0,
            failure: null,
            gainNode: null,
            sourceNode: null,
            workletNode: null,
        };

        return capture;
    }

    private async connectCapture(capture: IAudioLevelCapture, stream: MediaStream, WorkletNode: typeof AudioWorkletNode): Promise<void> {
        const { context } = capture;

        if (context.sampleRate !== SAMPLE_RATE) {
            throw new Error(`Audio level monitoring requires a ${SAMPLE_RATE} Hz audio context.`);
        }

        await this._loader.load(context);
        if (this._capture !== capture) {
            return;
        }

        if (context.state === 'suspended') {
            await context.resume();
        }

        if (this._capture !== capture) {
            return;
        }

        const source = (capture.sourceNode = context.createMediaStreamSource(stream));
        const worklet = (capture.workletNode = new WorkletNode(context, AUDIO_LEVEL_WORKLET_PROCESSOR_NAME, {
            channelCount: 1,
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers',
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [1],
            processorOptions: { samplesPerFrame: capture.samplesPerFrame },
        }));
        const gain = (capture.gainNode = context.createGain());
        gain.gain.value = 0;

        worklet.port.onmessage = (event: MessageEvent<unknown>) => this.onWorkletMessage(capture, event.data);
        worklet.port.onmessageerror = capture.onProcessorError;
        worklet.addEventListener('processorerror', capture.onProcessorError);
        source.connect(worklet);
        worklet.connect(gain);
        gain.connect(context.destination);
        this._state.set('running');
    }

    private async changePausedState(command: 'pause' | 'resume', from: 'running' | 'paused', to: 'running' | 'paused'): Promise<void> {
        const capture = this._capture;
        const worklet = capture?.workletNode;

        if (!capture || !worklet || this._state() !== from) {
            return;
        }

        try {
            await (capture.command?.promise ?? this.requestCommand(capture, worklet, command));

            if (this._capture === capture && this._state() === from) {
                this._state.set(to);
            }
        } catch (reason: unknown) {
            if (this._capture === capture) {
                throw await this.failCapture(capture, reason);
            }
        }
    }

    private async stopCapture(capture: IAudioLevelCapture): Promise<void> {
        try {
            if (capture.command) {
                await capture.command.promise;
            }

            if (this._capture === capture && capture.workletNode) {
                await this.requestCommand(capture, capture.workletNode, 'flush');
            }

            if (capture.failure) {
                throw capture.failure;
            }

            await this.release(capture);
            if (this._state() === 'stopping') {
                this._state.set('idle');
            }
        } catch (reason: unknown) {
            if (this._state() !== 'disposed') {
                throw await this.failCapture(capture, reason);
            }
        } finally {
            this._stopPromise = null;
        }
    }

    private requestCommand(capture: IAudioLevelCapture, worklet: AudioWorkletNode, name: AudioLevelWorkletCommand): Promise<void> {
        let complete!: (error?: Error) => void;
        const promise = new Promise<void>((resolve, reject) => {
            const timeout = globalThis.setTimeout(() => {
                this.completeCommand(capture, new Error(`The audio level worklet did not acknowledge ${name}.`));
            }, COMMAND_TIMEOUT_MS);

            complete = (error) => {
                globalThis.clearTimeout(timeout);

                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            };
        });

        capture.command = { name, promise, complete };

        try {
            worklet.port.postMessage(name);
        } catch (reason: unknown) {
            this.completeCommand(capture, this.asError(reason));
        }

        return promise;
    }

    private completeCommand(capture: IAudioLevelCapture, error?: Error): void {
        const command = capture.command;
        capture.command = null;
        command?.complete(error);
    }

    private onWorkletMessage(capture: IAudioLevelCapture, message: unknown): void {
        if (this._capture !== capture || !message || typeof message !== 'object' || !('type' in message)) {
            return;
        }

        if (message.type === 'level') {
            this.publishLevel(capture, message as Partial<IAudioLevelWorkletMeasurement>);
        } else if (message.type === 'command-completed' && 'command' in message && capture.command?.name === message.command) {
            this.completeCommand(capture);
        }
    }

    private publishLevel(capture: IAudioLevelCapture, { sampleCount, rms, peak }: Partial<IAudioLevelWorkletMeasurement>): void {
        if (
            typeof sampleCount !== 'number' ||
            !Number.isSafeInteger(sampleCount) ||
            sampleCount < 1 ||
            sampleCount > capture.samplesPerFrame ||
            typeof rms !== 'number' ||
            !(rms >= 0 && rms <= 1) ||
            typeof peak !== 'number' ||
            !(peak >= 0 && peak <= 1)
        ) {
            void this.failCapture(capture, new Error('The audio level worklet sent an invalid measurement.'));

            return;
        }

        const timestampMs = capture.startedAtMs + (capture.emittedSamples / SAMPLE_RATE) * 1_000;
        capture.emittedSamples += sampleCount;
        this._measurements.next({
            rms,
            peak,
            decibels: rms > 0 ? 20 * Math.log10(rms) : null,
            durationMs: (sampleCount / SAMPLE_RATE) * 1_000,
            timestampMs,
        });
    }

    private async failCapture(capture: IAudioLevelCapture, reason: unknown): Promise<Error> {
        const failure = capture.failure ?? this.asError(reason);

        if (this._capture === capture) {
            capture.failure = this.reportFailure(failure);
            await this.release(capture);
        }

        return failure;
    }

    private reportFailure(reason: unknown): Error {
        const error = this.asError(reason);
        this._error.set(error);
        this._state.set('error');

        return error;
    }

    private asError(reason: unknown): Error {
        return reason instanceof Error ? reason : new Error('Audio level monitoring failed.', { cause: reason });
    }

    private async release(capture: IAudioLevelCapture): Promise<void> {
        if (this._capture !== capture) {
            return;
        }

        this._capture = null;
        capture.cancelStart();

        if (capture.command) {
            this.completeCommand(capture, capture.failure ?? new Error('The audio level monitor was closed.'));
        }

        for (const track of capture.tracks) {
            track.removeEventListener('ended', capture.onTrackEnded);
        }

        const { context, workletNode } = capture;
        if (workletNode) {
            workletNode.port.onmessage = null;
            workletNode.port.onmessageerror = null;
            workletNode.port.close();
            workletNode.removeEventListener('processorerror', capture.onProcessorError);
        }

        for (const node of [capture.sourceNode, workletNode, capture.gainNode]) {
            try {
                node?.disconnect();
            } catch {
                // The browser may already have disconnected a node during teardown.
            }
        }

        if (context.state !== 'closed') {
            await context.close().catch(() => undefined);
        }
    }

    // #endregion
}
