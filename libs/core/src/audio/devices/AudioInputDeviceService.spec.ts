import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioInputDeviceService } from './AudioInputDeviceService';

interface IMockMediaStream {
    readonly stopTrack: ReturnType<typeof vi.fn>;
    readonly stream: MediaStream;
}

interface IWebAudioController {
    amplitude: number;
    audioContextConstructor: unknown;
    close: ReturnType<typeof vi.fn>;
    failure: Error | null;
    resume: ReturnType<typeof vi.fn<() => Promise<void>>>;
    state: AudioContextState;
}

const AUDIO_INPUT_DEVICE = {
    deviceId: 'microphone-1',
    groupId: 'group-1',
    kind: 'audioinput',
    label: 'Desk microphone',
} as MediaDeviceInfo;

const AUDIO_OUTPUT_DEVICE = {
    deviceId: 'speaker-1',
    groupId: 'group-2',
    kind: 'audiooutput',
    label: 'Desk speakers',
} as MediaDeviceInfo;

function createMediaStream(): IMockMediaStream {
    const stopTrack = vi.fn();
    const track = { kind: 'audio', stop: stopTrack } as unknown as MediaStreamTrack;

    return { stopTrack, stream: { getTracks: () => [track] } as unknown as MediaStream };
}

function createWebAudio(): IWebAudioController {
    const controller: IWebAudioController = {
        amplitude: 0.08,
        audioContextConstructor: null,
        close: vi.fn().mockResolvedValue(undefined),
        failure: null,
        resume: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
        state: 'running',
    };
    const analyser = {
        fftSize: 2_048,
        smoothingTimeConstant: 0,
        getFloatTimeDomainData: vi.fn((buffer: Float32Array<ArrayBuffer>) => {
            if (controller.failure) {
                throw controller.failure;
            }

            buffer.fill(controller.amplitude);
        }),
    } as unknown as AnalyserNode;
    const source = { connect: vi.fn(), disconnect: vi.fn() } as unknown as MediaStreamAudioSourceNode;

    class FakeAudioContext {
        public readonly state = controller.state;
        public readonly close = controller.close;
        public readonly resume = controller.resume;

        public createAnalyser(): AnalyserNode {
            return analyser;
        }

        public createMediaStreamSource(): MediaStreamAudioSourceNode {
            return source;
        }
    }

    controller.audioContextConstructor = FakeAudioContext;

    return controller;
}

function delayResume(webAudio: IWebAudioController): { readonly started: Promise<void>; readonly finish: () => void } {
    let finish!: () => void;
    const pending = new Promise<void>((resolve) => {
        finish = resolve;
    });
    const started = new Promise<void>((resolve) => {
        webAudio.resume.mockImplementationOnce(() => {
            resolve();

            return pending;
        });
    });

    webAudio.state = 'suspended';

    return { started, finish };
}

function createService(view: unknown): AudioInputDeviceService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        providers: [AudioInputDeviceService, { provide: DOCUMENT, useValue: { defaultView: view } }],
    });

    return TestBed.inject(AudioInputDeviceService);
}

describe('AudioInputDeviceService', () => {
    let addEventListener: ReturnType<typeof vi.fn>;
    let enumerateDevices: ReturnType<typeof vi.fn>;
    let getUserMedia: ReturnType<typeof vi.fn>;
    let service: AudioInputDeviceService;
    let view: Record<string, unknown>;
    let webAudio: IWebAudioController;

    beforeEach(() => {
        addEventListener = vi.fn();
        enumerateDevices = vi.fn().mockResolvedValue([AUDIO_INPUT_DEVICE, AUDIO_OUTPUT_DEVICE]);
        getUserMedia = vi.fn();
        webAudio = createWebAudio();
        view = {
            AudioContext: webAudio.audioContextConstructor,
            navigator: {
                mediaDevices: { addEventListener, enumerateDevices, getUserMedia, removeEventListener: vi.fn() },
            },
        };
        vi.useFakeTimers();
        service = createService(view);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('discovers only audio-input devices and infers granted access from visible labels', async () => {
        // Arrange

        // Act
        await service.initialize();

        // Assert
        expect(service.devices()).toEqual([{ deviceId: 'microphone-1', groupId: 'group-1', label: 'Desk microphone' }]);
        expect(service.permissionState()).toBe('granted');
        expect(addEventListener).toHaveBeenCalledWith('devicechange', expect.any(Function));
    });

    it('reports an unsupported runtime instead of pretending to discover devices', async () => {
        // Arrange
        const unsupportedService = createService({});

        // Act
        const initialization = unsupportedService.initialize();

        // Assert
        await expect(initialization).rejects.toMatchObject({ code: 'unsupported' });
        expect(unsupportedService.isSupported()).toBe(false);
        expect(unsupportedService.testState()).toBe('unsupported');
    });

    it('publishes a typed failure when the browser cannot enumerate devices', async () => {
        // Arrange
        enumerateDevices.mockRejectedValueOnce(new Error('Enumeration blocked'));

        // Act
        const refresh = service.refresh();

        // Assert
        await expect(refresh).rejects.toMatchObject({ code: 'device-enumeration-failed' });
        expect(service.error()?.code).toBe('device-enumeration-failed');
        expect(service.isBusy()).toBe(false);
    });

    it('requests permission without retaining the temporary browser stream', async () => {
        // Arrange
        const temporaryStream = createMediaStream();
        getUserMedia.mockResolvedValue(temporaryStream.stream);

        // Act
        await service.requestPermission();

        // Assert
        expect(getUserMedia).toHaveBeenCalledWith({ audio: true });
        expect(temporaryStream.stopTrack).toHaveBeenCalledOnce();
        expect(service.mediaStream()).toBeNull();
        expect(service.permissionState()).toBe('granted');
    });

    it('maps blocked permission to a stable typed failure', async () => {
        // Arrange
        getUserMedia.mockRejectedValue(new DOMException('Permission denied', 'NotAllowedError'));

        // Act
        const permissionRequest = service.requestPermission();

        // Assert
        await expect(permissionRequest).rejects.toMatchObject({ code: 'permission-denied' });
        expect(service.permissionState()).toBe('denied');
    });

    it('verifies a selected microphone after consecutive usable signal samples', async () => {
        // Arrange
        const testStream = createMediaStream();
        getUserMedia.mockResolvedValue(testStream.stream);
        await service.startTest('microphone-1');

        // Act
        await vi.advanceTimersByTimeAsync(200);

        // Assert
        expect(getUserMedia).toHaveBeenCalledWith({
            audio: {
                autoGainControl: true,
                deviceId: { exact: 'microphone-1' },
                echoCancellation: true,
                noiseSuppression: true,
            },
        });
        expect(service.signalQuality()).toBe('good');
        expect(service.testedDeviceId()).toBe('microphone-1');
        expect(service.testState()).toBe('passed');
    });

    it('keeps a passed test result when the stream is released', async () => {
        // Arrange
        const testStream = createMediaStream();
        getUserMedia.mockResolvedValue(testStream.stream);
        await service.startTest('microphone-1');
        await vi.advanceTimersByTimeAsync(200);

        // Act
        service.stopTest();

        // Assert
        expect(testStream.stopTrack).toHaveBeenCalledOnce();
        expect(service.mediaStream()).toBeNull();
        expect(service.testState()).toBe('passed');
    });

    it('does not restart sampling when a stopped test finishes resuming its audio context', async () => {
        // Arrange
        const testStream = createMediaStream();
        const delayedResume = delayResume(webAudio);
        getUserMedia.mockResolvedValue(testStream.stream);
        const timerCount = vi.getTimerCount();
        const starting = service.startTest('microphone-1');
        await delayedResume.started;
        service.stopTest();

        // Act
        delayedResume.finish();
        await starting;

        // Assert
        expect(service.testState()).toBe('idle');
        expect(service.mediaStream()).toBeNull();
        expect(webAudio.close).toHaveBeenCalledOnce();
        expect(testStream.stopTrack).toHaveBeenCalledOnce();
        expect(vi.getTimerCount()).toBe(timerCount);
    });

    it('keeps the newer device test when the previous audio context resumes late', async () => {
        // Arrange
        const previousStream = createMediaStream();
        const currentStream = createMediaStream();
        const delayedResume = delayResume(webAudio);
        getUserMedia.mockResolvedValueOnce(previousStream.stream).mockResolvedValueOnce(currentStream.stream);
        const previousStart = service.startTest('microphone-1');
        await delayedResume.started;
        await service.startTest('microphone-2');
        await vi.advanceTimersByTimeAsync(200);
        const timerCount = vi.getTimerCount();

        // Act
        delayedResume.finish();
        await previousStart;

        // Assert
        expect(service.activeDeviceId()).toBe('microphone-2');
        expect(service.mediaStream()).toBe(currentStream.stream);
        expect(service.testState()).toBe('passed');
        expect(previousStream.stopTrack).toHaveBeenCalledOnce();
        expect(currentStream.stopTrack).not.toHaveBeenCalled();
        expect(webAudio.close).toHaveBeenCalledOnce();
        expect(vi.getTimerCount()).toBe(timerCount);
    });

    it('does not install a sampling timer when the injector was destroyed during resume', async () => {
        // Arrange
        const testStream = createMediaStream();
        const delayedResume = delayResume(webAudio);
        getUserMedia.mockResolvedValue(testStream.stream);
        const timerCount = vi.getTimerCount();
        const starting = service.startTest('microphone-1');
        await delayedResume.started;
        TestBed.resetTestingModule();

        // Act
        delayedResume.finish();
        await starting;

        // Assert
        expect(service.testState()).toBe('idle');
        expect(service.mediaStream()).toBeNull();
        expect(webAudio.close).toHaveBeenCalledOnce();
        expect(testStream.stopTrack).toHaveBeenCalledOnce();
        expect(vi.getTimerCount()).toBe(timerCount);
    });

    it('refuses a test without a selected device', async () => {
        // Arrange

        // Act
        const testStart = service.startTest('   ');

        // Assert
        await expect(testStart).rejects.toMatchObject({ code: 'device-not-found' });
        expect(getUserMedia).not.toHaveBeenCalled();
        expect(service.testState()).toBe('error');
    });

    it('releases the acquired stream when the signal cannot be analysed', async () => {
        // Arrange
        const testStream = createMediaStream();
        getUserMedia.mockResolvedValue(testStream.stream);
        webAudio.failure = new Error('Analysis failed');

        // Act
        const testStart = service.startTest('microphone-1');

        // Assert
        await expect(testStart).rejects.toMatchObject({ code: 'analysis-failed' });
        expect(testStream.stopTrack).toHaveBeenCalledOnce();
        expect(service.mediaStream()).toBeNull();
        expect(service.testState()).toBe('error');
    });

    it('grades a silent microphone as unusable instead of verifying it', async () => {
        // Arrange
        const testStream = createMediaStream();
        getUserMedia.mockResolvedValue(testStream.stream);
        webAudio.amplitude = 0;
        await service.startTest('microphone-1');

        // Act
        await vi.advanceTimersByTimeAsync(200);

        // Assert
        expect(service.signalQuality()).toBe('no-signal');
        expect(service.testedDeviceId()).toBeNull();
        expect(service.testState()).toBe('listening');
    });

    it('releases every browser resource when the owning injector is destroyed', async () => {
        // Arrange
        const testStream = createMediaStream();
        getUserMedia.mockResolvedValue(testStream.stream);
        await service.startTest('microphone-1');

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(testStream.stopTrack).toHaveBeenCalledOnce();
        expect(webAudio.close).toHaveBeenCalledOnce();
        expect(service.mediaStream()).toBeNull();
    });
});
