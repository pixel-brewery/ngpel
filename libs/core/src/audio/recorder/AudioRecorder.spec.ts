import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { VOICE_TRANSCRIBER } from '../transcribers/VOICE_TRANSCRIBER';
import { AudioRecorder } from './AudioRecorder';
import { AudioRecorderError } from './AudioRecorderError';
import type { IAudioRecorderChunk } from './IAudioRecorderChunk';
import type { IAudioRecordingResult } from './IAudioRecordingResult';

interface IDeferred<T> {
    readonly promise: Promise<T>;
    readonly resolve: (value: T) => void;
}

interface IMediaRecorderController {
    constructedOptions: MediaRecorderOptions | null;
    constructedStream: MediaStream | null;
    readonly instance: MediaRecorder;
    readonly pause: ReturnType<typeof vi.fn>;
    readonly requestData: ReturnType<typeof vi.fn>;
    readonly resume: ReturnType<typeof vi.fn>;
    readonly start: ReturnType<typeof vi.fn>;
    readonly stop: ReturnType<typeof vi.fn>;
    emitChunk(blob: Blob, timecodeMs?: number): void;
    emitError(error: DOMException): void;
    emitStop(): void;
}

interface IMockMediaStream {
    readonly stopTrack: ReturnType<typeof vi.fn>;
    readonly stream: MediaStream;
    readonly track: MediaStreamTrack;
}

function createDeferred<T>(): IDeferred<T> {
    let resolvePromise: (value: T) => void = () => undefined;
    const promise = new Promise<T>((resolve) => {
        resolvePromise = resolve;
    });

    return { promise, resolve: resolvePromise };
}

function createMediaStream(): IMockMediaStream {
    const stopTrack = vi.fn();
    const track = { enabled: true, kind: 'audio', readyState: 'live', stop: stopTrack } as unknown as MediaStreamTrack;

    return {
        stopTrack,
        stream: { getAudioTracks: () => [track], getTracks: () => [track] } as unknown as MediaStream,
        track,
    };
}

function createMediaRecorderController(): IMediaRecorderController {
    let onDataAvailable: ((event: BlobEvent) => void) | null = null;
    let onError: ((event: Event) => void) | null = null;
    let onStop: (() => void) | null = null;
    let state: RecordingState = 'inactive';
    const pause = vi.fn(() => {
        state = 'paused';
    });
    const requestData = vi.fn();
    const resume = vi.fn(() => {
        state = 'recording';
    });
    const start = vi.fn(() => {
        state = 'recording';
    });
    const stop = vi.fn(() => {
        state = 'inactive';
    });
    const instance = {
        get state(): RecordingState {
            return state;
        },
        mimeType: 'audio/webm;codecs=opus',
        pause,
        requestData,
        resume,
        start,
        stop,
        get ondataavailable(): ((event: BlobEvent) => void) | null {
            return onDataAvailable;
        },
        set ondataavailable(handler: ((event: BlobEvent) => void) | null) {
            onDataAvailable = handler;
        },
        get onerror(): ((event: Event) => void) | null {
            return onError;
        },
        set onerror(handler: ((event: Event) => void) | null) {
            onError = handler;
        },
        get onstop(): (() => void) | null {
            return onStop;
        },
        set onstop(handler: (() => void) | null) {
            onStop = handler;
        },
    } as unknown as MediaRecorder;

    return {
        constructedOptions: null,
        constructedStream: null,
        instance,
        pause,
        requestData,
        resume,
        start,
        stop,
        emitChunk(blob: Blob, timecodeMs = 0): void {
            onDataAvailable?.({ data: blob, timecode: timecodeMs } as BlobEvent);
        },
        emitError(error: DOMException): void {
            onError?.({ error } as Event & { readonly error: DOMException });
        },
        emitStop(): void {
            state = 'inactive';
            onStop?.();
        },
    };
}

function createRecorderView(controller: IMediaRecorderController | null, getUserMedia: ReturnType<typeof vi.fn>): Record<string, unknown> {
    class FakeMediaRecorder {
        public static readonly isTypeSupported = vi.fn((mimeType: string) => mimeType.startsWith('audio/webm'));

        public constructor(stream: MediaStream, options?: MediaRecorderOptions) {
            if (!controller) {
                throw new Error('Encoder unavailable');
            }

            controller.constructedStream = stream;
            controller.constructedOptions = options ?? null;

            return controller.instance as unknown as FakeMediaRecorder;
        }
    }

    return {
        MediaRecorder: FakeMediaRecorder,
        URL: { createObjectURL: vi.fn(() => 'blob:recording'), revokeObjectURL: vi.fn() },
        navigator: { mediaDevices: { getUserMedia } },
    };
}

function createRecorder(view: unknown, transcriber: unknown = null): AudioRecorder {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        providers: [AudioRecorder, { provide: DOCUMENT, useValue: { defaultView: view } }, { provide: VOICE_TRANSCRIBER, useValue: transcriber }],
    });

    return TestBed.inject(AudioRecorder);
}

describe('AudioRecorder', () => {
    let controller: IMediaRecorderController;
    let getUserMedia: ReturnType<typeof vi.fn>;
    let mediaStream: IMockMediaStream;
    let recorder: AudioRecorder;
    let view: Record<string, unknown>;

    beforeEach(() => {
        controller = createMediaRecorderController();
        mediaStream = createMediaStream();
        getUserMedia = vi.fn().mockResolvedValue(mediaStream.stream);
        view = createRecorderView(controller, getUserMedia);
        vi.useFakeTimers();
        recorder = createRecorder(view);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('starts idle without retained or live resources', () => {
        // Arrange

        // Act
        const snapshot = {
            blob: recorder.audioBlob(),
            chunk: recorder.latestChunk(),
            duration: recorder.durationMs(),
            error: recorder.error(),
            isActive: recorder.isActive(),
            state: recorder.state(),
            stream: recorder.mediaStream(),
        };

        // Assert
        expect(snapshot).toEqual({
            blob: null,
            chunk: null,
            duration: 0,
            error: null,
            isActive: false,
            state: 'idle',
            stream: null,
        });
        expect(recorder.durationLabel()).toBe('00:00');
    });

    it('reports browser support only when acquisition and encoding both exist', () => {
        // Arrange
        const unsupportedRecorder = createRecorder({ navigator: { mediaDevices: { getUserMedia } } });

        // Act
        const isSupported = unsupportedRecorder.isSupported();

        // Assert
        expect(isSupported).toBe(false);
        expect(recorder.isSupported()).toBe(true);
    });

    it('acquires the requested microphone and starts periodic chunking', async () => {
        // Arrange
        const options = {
            audioBitsPerSecond: 96_000,
            audioConstraints: { echoCancellation: true, noiseSuppression: true, sampleRate: 48_000 },
            audioDeviceId: ' microphone-2 ',
            chunkIntervalMs: 2_500,
            preferredMimeTypes: ['audio/webm;codecs=opus'],
        };

        // Act
        await recorder.start(options);

        // Assert
        expect(getUserMedia).toHaveBeenCalledWith({
            audio: {
                deviceId: { exact: 'microphone-2' },
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 48_000,
            },
        });
        expect(controller.constructedStream).toBe(mediaStream.stream);
        expect(controller.constructedOptions).toEqual({
            audioBitsPerSecond: 96_000,
            mimeType: 'audio/webm;codecs=opus',
        });
        expect(controller.start).toHaveBeenCalledWith(2_500);
    });

    it('exposes the live stream and the effective encoder state after acquisition', async () => {
        // Arrange

        // Act
        await recorder.start();

        // Assert
        expect(recorder.mediaStream()).toBe(mediaStream.stream);
        expect(recorder.mimeType()).toBe('audio/webm;codecs=opus');
        expect(recorder.state()).toBe('recording');
        expect(recorder.isRecording()).toBe(true);
    });

    it('publishes the acquiring state while microphone permission is pending', async () => {
        // Arrange
        const deferredStream = createDeferred<MediaStream>();
        getUserMedia.mockReturnValueOnce(deferredStream.promise);

        // Act
        const startPromise = recorder.start();
        const stateWhilePending = recorder.state();

        deferredStream.resolve(mediaStream.stream);
        await startPromise;

        // Assert
        expect(stateWhilePending).toBe('acquiring');
        expect(recorder.state()).toBe('recording');
    });

    it('rejects a second start without replacing the active stream', async () => {
        // Arrange
        await recorder.start();

        // Act
        const secondStart = recorder.start();

        // Assert
        await expect(secondStart).rejects.toMatchObject({ code: 'invalid-state' });
        expect(getUserMedia).toHaveBeenCalledOnce();
        expect(mediaStream.stopTrack).not.toHaveBeenCalled();
        expect(recorder.state()).toBe('recording');
    });

    it('maps denied microphone access to a stable recoverable failure', async () => {
        // Arrange
        getUserMedia.mockRejectedValueOnce(new DOMException('Permission denied', 'NotAllowedError'));

        // Act
        const startPromise = recorder.start();

        // Assert
        await expect(startPromise).rejects.toMatchObject({ code: 'permission-denied' });
        expect(recorder.error()?.code).toBe('permission-denied');
        expect(recorder.state()).toBe('error');
    });

    it('reports an unsupported browser instead of acquiring a microphone it cannot encode', async () => {
        // Arrange
        const unsupportedRecorder = createRecorder({ navigator: { mediaDevices: { getUserMedia } } });

        // Act
        const startPromise = unsupportedRecorder.start();

        // Assert
        await expect(startPromise).rejects.toMatchObject({ code: 'unsupported' });
        expect(getUserMedia).not.toHaveBeenCalled();
    });

    it('releases an acquired stream when encoder construction fails', async () => {
        // Arrange
        const failingRecorder = createRecorder(createRecorderView(null, getUserMedia));

        // Act
        const startPromise = failingRecorder.start();

        // Assert
        await expect(startPromise).rejects.toMatchObject({ code: 'recorder-failed' });
        expect(mediaStream.stopTrack).toHaveBeenCalledOnce();
        expect(failingRecorder.mediaStream()).toBeNull();
        expect(failingRecorder.state()).toBe('error');
    });

    it('rejects an invalid chunk interval before requesting microphone access', async () => {
        // Arrange

        // Act
        const startPromise = recorder.start({ chunkIntervalMs: 0 });

        // Assert
        await expect(startPromise).rejects.toThrow('chunkIntervalMs');
        expect(getUserMedia).not.toHaveBeenCalled();
        expect(recorder.state()).toBe('idle');
    });

    it('releases a late stream after the acquisition was cancelled', async () => {
        // Arrange
        const deferredStream = createDeferred<MediaStream>();
        getUserMedia.mockReturnValueOnce(deferredStream.promise);
        const startPromise = recorder.start();
        await recorder.stop();

        // Act
        deferredStream.resolve(mediaStream.stream);

        // Assert
        await startPromise;
        expect(mediaStream.stopTrack).toHaveBeenCalledOnce();
        expect(controller.start).not.toHaveBeenCalled();
        expect(recorder.state()).toBe('idle');
    });

    it('emits ordered chunks while the recording is still active', async () => {
        // Arrange
        const chunks: IAudioRecorderChunk[] = [];
        recorder.chunkAvailable.subscribe((chunk) => chunks.push(chunk));
        await recorder.start();
        vi.advanceTimersByTime(1_250);
        const firstBlob = new Blob(['first'], { type: 'audio/webm' });
        const secondBlob = new Blob(['second'], { type: 'audio/webm' });

        // Act
        controller.emitChunk(firstBlob, 1_000);
        controller.emitChunk(secondBlob, 2_000);

        // Assert
        expect(chunks.map((chunk) => chunk.sequence)).toEqual([0, 1]);
        expect(chunks[0]).toMatchObject({ blob: firstBlob, mimeType: 'audio/webm', timecodeMs: 1_000 });
        expect(chunks[0]?.elapsedMs).toBeGreaterThan(0);
        expect(recorder.latestChunk()).toBe(chunks[1]);
        expect(recorder.state()).toBe('recording');
    });

    it('ignores an empty browser chunk without creating a sequence gap', async () => {
        // Arrange
        const chunks: IAudioRecorderChunk[] = [];
        recorder.chunkAvailable.subscribe((chunk) => chunks.push(chunk));
        await recorder.start();

        // Act
        controller.emitChunk(new Blob([], { type: 'audio/webm' }));

        // Assert
        expect(chunks).toHaveLength(0);
        expect(recorder.latestChunk()).toBeNull();
    });

    it('flushes the active browser encoder on request', async () => {
        // Arrange
        await recorder.start();

        // Act
        recorder.requestData();

        // Assert
        expect(controller.requestData).toHaveBeenCalledOnce();
    });

    it('streams chunks without assembling an in-memory recording', async () => {
        // Arrange
        await recorder.start({ retention: 'none' });
        controller.emitChunk(new Blob(['bounded'], { type: 'audio/webm' }));
        const stopPromise = recorder.stop();

        // Act
        controller.emitStop();

        // Assert
        await expect(stopPromise).resolves.toMatchObject({ blob: null, chunkCount: 1, retention: 'none' });
        expect(recorder.audioBlob()).toBeNull();
        expect(recorder.audioUrl()).toBeNull();
    });

    it('excludes paused time from the recording duration', async () => {
        // Arrange
        await recorder.start();
        vi.advanceTimersByTime(1_000);
        recorder.pause();
        vi.advanceTimersByTime(5_000);

        // Act
        recorder.resume();
        vi.advanceTimersByTime(1_000);

        // Assert
        expect(controller.pause).toHaveBeenCalledOnce();
        expect(controller.resume).toHaveBeenCalledOnce();
        expect(recorder.durationMs()).toBe(2_000);
        expect(recorder.durationLabel()).toBe('00:02');
    });

    it('mutes the live microphone without pausing or ending it', async () => {
        // Arrange
        await recorder.start();

        // Act
        recorder.setMuted(true);

        // Assert
        expect(mediaStream.track.enabled).toBe(false);
        expect(recorder.isMuted()).toBe(true);
        expect(recorder.state()).toBe('recording');
    });

    it('keeps the microphone until the browser delivered its final chunk', async () => {
        // Arrange
        await recorder.start();

        // Act
        void recorder.stop();

        // Assert
        expect(recorder.state()).toBe('stopping');
        expect(mediaStream.stopTrack).not.toHaveBeenCalled();
    });

    it('returns and publishes the final recording metadata', async () => {
        // Arrange
        const completions: IAudioRecordingResult[] = [];
        recorder.recordingCompleted.subscribe((result) => completions.push(result));
        await recorder.start();
        controller.emitChunk(new Blob(['one'], { type: 'audio/webm' }));
        controller.emitChunk(new Blob(['two'], { type: 'audio/webm' }));
        const stopPromise = recorder.stop();

        // Act
        controller.emitStop();

        // Assert
        const result = await stopPromise;

        expect(result).toMatchObject({ chunkCount: 2, mimeType: 'audio/webm;codecs=opus', retention: 'memory' });
        expect(result?.blob).toBeInstanceOf(Blob);
        expect(recorder.audioUrl()).toBe('blob:recording');
        expect(recorder.state()).toBe('idle');
        expect(completions).toEqual([result]);
        expect(mediaStream.stopTrack).toHaveBeenCalledOnce();
    });

    it('shares one completion across repeated stop calls', async () => {
        // Arrange
        await recorder.start();
        const firstStop = recorder.stop();

        // Act
        const secondStop = recorder.stop();
        controller.emitStop();

        // Assert
        expect(secondStop).toBe(firstStop);
        await expect(firstStop).resolves.toMatchObject({ retention: 'memory' });
        expect(controller.stop).toHaveBeenCalledOnce();
    });

    it('treats stop outside an active session as an idempotent no-op', async () => {
        // Arrange

        // Act
        const result = await recorder.stop();

        // Assert
        expect(result).toBeNull();
        expect(controller.stop).not.toHaveBeenCalled();
        expect(recorder.state()).toBe('idle');
    });

    it('discards chunks and retained output when the session is cancelled', async () => {
        // Arrange
        await recorder.start();
        controller.emitChunk(new Blob(['private'], { type: 'audio/webm' }));
        const cancelPromise = recorder.cancel();

        // Act
        controller.emitStop();

        // Assert
        await cancelPromise;
        expect(recorder.audioBlob()).toBeNull();
        expect(recorder.audioUrl()).toBeNull();
        expect(recorder.latestChunk()).toBeNull();
        expect(recorder.recordingResult()).toBeNull();
        expect(recorder.state()).toBe('idle');
    });

    it('rejects a pending stop and releases resources after an encoder failure', async () => {
        // Arrange
        await recorder.start();
        const stopPromise = recorder.stop();

        // Act
        controller.emitError(new DOMException('Device disconnected', 'UnknownError'));

        // Assert
        await expect(stopPromise).rejects.toMatchObject({ code: 'recorder-failed' });
        expect(recorder.error()).toBeInstanceOf(AudioRecorderError);
        expect(recorder.state()).toBe('error');
        expect(recorder.mediaStream()).toBeNull();
        expect(mediaStream.stopTrack).toHaveBeenCalledOnce();
    });

    it('starts a fresh session after an acquisition failure', async () => {
        // Arrange
        getUserMedia.mockRejectedValueOnce(new DOMException('Missing device', 'NotFoundError'));
        await expect(recorder.start()).rejects.toMatchObject({ code: 'device-not-found' });

        // Act
        await recorder.start();

        // Assert
        expect(recorder.error()).toBeNull();
        expect(recorder.state()).toBe('recording');
        expect(getUserMedia).toHaveBeenCalledTimes(2);
    });

    it('transcribes a retained recording through the configured strategy', async () => {
        // Arrange
        const transcriber = { transcribe: vi.fn().mockResolvedValue('recognized text') };
        const transcribingRecorder = createRecorder(view, transcriber);
        await transcribingRecorder.start();
        controller.emitChunk(new Blob(['voice'], { type: 'audio/webm' }));
        const stopPromise = transcribingRecorder.stop();
        controller.emitStop();
        await stopPromise;

        // Act
        const text = await transcribingRecorder.transcribe('consultation.webm');

        // Assert
        expect(text).toBe('recognized text');
        expect(transcriber.transcribe).toHaveBeenCalledWith({
            blob: expect.any(Blob),
            filename: 'consultation.webm',
            mimeType: 'audio/webm;codecs=opus',
        });
    });

    it('rejects transcription when no transcriber is registered', async () => {
        // Arrange
        await recorder.start();
        controller.emitChunk(new Blob(['voice'], { type: 'audio/webm' }));
        const stopPromise = recorder.stop();
        controller.emitStop();
        await stopPromise;

        // Act
        const transcription = recorder.transcribe();

        // Assert
        await expect(transcription).rejects.toThrow('no voice transcriber is registered');
    });

    it('rejects transcription when streaming retention deliberately kept no recording', async () => {
        // Arrange
        await recorder.start({ retention: 'none' });
        controller.emitChunk(new Blob(['voice'], { type: 'audio/webm' }));
        const stopPromise = recorder.stop();
        controller.emitStop();
        await stopPromise;

        // Act
        const transcription = recorder.transcribe();

        // Assert
        await expect(transcription).rejects.toThrow('No retained audio');
    });

    it('releases an active microphone and permanently closes the instance', async () => {
        // Arrange
        await recorder.start();

        // Act
        recorder.dispose();

        // Assert
        expect(mediaStream.stopTrack).toHaveBeenCalledOnce();
        expect(recorder.mediaStream()).toBeNull();
        expect(recorder.state()).toBe('disposed');
        await expect(recorder.start()).rejects.toMatchObject({ code: 'invalid-state' });
    });

    it('is safe to dispose repeatedly', () => {
        // Arrange
        recorder.dispose();

        // Act
        recorder.dispose();

        // Assert
        expect(recorder.state()).toBe('disposed');
        expect(controller.stop).not.toHaveBeenCalled();
    });
});
