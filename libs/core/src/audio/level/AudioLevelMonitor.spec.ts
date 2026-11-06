// cspell:words worklets

import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AUDIO_LEVEL_WORKLET_PROCESSOR_NAME } from './AUDIO_LEVEL_WORKLET_PROCESSOR_NAME';
import { AudioLevelMonitor } from './AudioLevelMonitor';
import { AudioLevelWorkletModuleLoader } from './AudioLevelWorkletModuleLoader';
import type { IAudioLevelMeasurement } from './IAudioLevelMeasurement';

class FakeAudioTrack extends EventTarget {
    public readyState: MediaStreamTrackState = 'live';
    public readonly stop = vi.fn();

    public end(): void {
        this.readyState = 'ended';
        this.dispatchEvent(new Event('ended'));
    }
}

class FakeWorkletNode extends EventTarget {
    public readonly connect = vi.fn();
    public readonly disconnect = vi.fn();
    public readonly port = {
        close: vi.fn(),
        onmessage: null as ((event: MessageEvent<unknown>) => void) | null,
        onmessageerror: null as (() => void) | null,
        postMessage: vi.fn(),
    };

    public constructor(
        public readonly context: unknown,
        public readonly name: string,
        public readonly options: AudioWorkletNodeOptions,
    ) {
        super();
    }

    public receive(message: unknown): void {
        this.port.onmessage?.(new MessageEvent('message', { data: message }));
    }
}

function createStream(...tracks: FakeAudioTrack[]): MediaStream {
    return { getAudioTracks: () => tracks } as unknown as MediaStream;
}

function createAudioBrowser() {
    const contexts: FakeAudioContext[] = [];
    const worklets: FakeWorkletNode[] = [];
    const resume = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
    const contextState = vi.fn<() => AudioContextState>().mockReturnValue('running');

    class FakeAudioContext {
        public readonly close = vi.fn().mockResolvedValue(undefined);
        public readonly createGain = vi.fn(() => ({ connect: vi.fn(), disconnect: vi.fn(), gain: { value: 1 } }));
        public readonly createMediaStreamSource = vi.fn(() => ({ connect: vi.fn(), disconnect: vi.fn() }));
        public readonly destination = {};
        public readonly resume = resume;
        public readonly sampleRate = 24_000;
        public readonly state = contextState();

        public constructor(public readonly options: AudioContextOptions) {
            contexts.push(this);
        }
    }

    class RecordingWorkletNode extends FakeWorkletNode {
        public constructor(context: unknown, name: string, options: AudioWorkletNodeOptions) {
            super(context, name, options);
            worklets.push(this);
        }
    }

    return {
        contexts,
        worklets,
        resume,
        contextState,
        view: {
            AudioContext: FakeAudioContext,
            AudioWorkletNode: RecordingWorkletNode,
            performance: { now: () => 125 },
        },
    };
}

describe('AudioLevelMonitor', () => {
    let browser: ReturnType<typeof createAudioBrowser>;
    let load: ReturnType<typeof vi.fn<(context: AudioContext) => Promise<void>>>;
    let monitor: AudioLevelMonitor;
    let track: FakeAudioTrack;
    let stream: MediaStream;

    beforeEach(() => {
        browser = createAudioBrowser();
        load = vi.fn<(context: AudioContext) => Promise<void>>().mockResolvedValue(undefined);
        TestBed.configureTestingModule({
            providers: [
                AudioLevelMonitor,
                { provide: DOCUMENT, useValue: { defaultView: browser.view } },
                { provide: AudioLevelWorkletModuleLoader, useValue: { load } },
            ],
        });
        monitor = TestBed.inject(AudioLevelMonitor);
        track = new FakeAudioTrack();
        stream = createStream(track);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.useRealTimers();
    });

    it('connects the borrowed stream to a muted 20 ms mono worklet through the configured loader', async () => {
        // Arrange

        // Act
        await monitor.start(stream);

        // Assert
        const context = browser.contexts[0]!;
        const worklet = browser.worklets[0]!;
        const gain = context.createGain.mock.results[0]!.value;
        expect(load).toHaveBeenCalledWith(context);
        expect(context.options).toEqual({ latencyHint: 'interactive', sampleRate: 24_000 });
        expect(context.createMediaStreamSource).toHaveBeenCalledWith(stream);
        expect(worklet.name).toBe(AUDIO_LEVEL_WORKLET_PROCESSOR_NAME);
        expect(worklet.options).toMatchObject({ channelCount: 1, channelCountMode: 'explicit', processorOptions: { samplesPerFrame: 480 } });
        expect(gain.gain.value).toBe(0);
        expect(monitor.state()).toBe('running');
    });

    it('publishes sample-derived duration and timestamps, including digital silence', async () => {
        // Arrange
        const measurements: IAudioLevelMeasurement[] = [];
        monitor.levels.subscribe((measurement) => measurements.push(measurement));
        await monitor.start(stream, { frameDurationMs: 10 });
        const worklet = browser.worklets[0]!;

        // Act
        worklet.receive({ type: 'level', sampleCount: 240, rms: 0.1, peak: 0.2 });
        worklet.receive({ type: 'level', sampleCount: 240, rms: 0, peak: 0 });

        // Assert
        expect(worklet.options.processorOptions).toEqual({ samplesPerFrame: 240 });
        expect(measurements).toEqual([
            { rms: 0.1, peak: 0.2, decibels: -20, durationMs: 10, timestampMs: 125 },
            { rms: 0, peak: 0, decibels: null, durationMs: 10, timestampMs: 135 },
        ]);
    });

    it('acknowledges pause and resume on the same graph', async () => {
        // Arrange
        await monitor.start(stream);
        const worklet = browser.worklets[0]!;
        const pausing = monitor.pause();
        worklet.receive({ type: 'command-completed', command: 'pause' });
        await pausing;
        expect(monitor.state()).toBe('paused');

        // Act
        const resuming = monitor.resume();
        worklet.receive({ type: 'command-completed', command: 'resume' });
        await resuming;

        // Assert
        expect(worklet.port.postMessage.mock.calls).toEqual([['pause'], ['resume']]);
        expect(monitor.state()).toBe('running');
        expect(browser.worklets).toHaveLength(1);
        expect(track.stop).not.toHaveBeenCalled();
    });

    it('delivers a final partial window before releasing only its own graph', async () => {
        // Arrange
        const receive = vi.fn();
        monitor.levels.subscribe(receive);
        await monitor.start(stream);
        const context = browser.contexts[0]!;
        const worklet = browser.worklets[0]!;

        // Act
        const stopping = monitor.stop();
        worklet.receive({ type: 'level', sampleCount: 120, rms: 0, peak: 0 });
        worklet.receive({ type: 'command-completed', command: 'flush' });
        await stopping;

        // Assert
        expect(receive).toHaveBeenCalledWith({ rms: 0, peak: 0, decibels: null, durationMs: 5, timestampMs: 125 });
        expect(worklet.port.postMessage).toHaveBeenCalledWith('flush');
        expect(worklet.port.close).toHaveBeenCalledOnce();
        expect(worklet.disconnect).toHaveBeenCalledOnce();
        expect(context.close).toHaveBeenCalledOnce();
        expect(track.stop).not.toHaveBeenCalled();
        expect(monitor.state()).toBe('idle');
    });

    it('lets a new capture start after stopping while a custom loader is still pending', async () => {
        // Arrange
        let finishLoading!: () => void;
        load.mockReturnValueOnce(
            new Promise<void>((resolve) => {
                finishLoading = resolve;
            }),
        );
        const firstStart = monitor.start(stream);
        await monitor.stop();
        await firstStart;
        const nextTrack = new FakeAudioTrack();
        await monitor.start(createStream(nextTrack));

        // Act
        finishLoading();
        await Promise.resolve();

        // Assert
        expect(browser.contexts[0]!.close).toHaveBeenCalledOnce();
        expect(browser.contexts[1]!.close).not.toHaveBeenCalled();
        expect(browser.worklets).toHaveLength(1);
        expect(browser.worklets[0]!.context).toBe(browser.contexts[1]);
        expect(monitor.state()).toBe('running');
        expect(track.stop).not.toHaveBeenCalled();
    });

    it('completes measurements on injector destruction and ignores a delayed context resume', async () => {
        // Arrange
        const complete = vi.fn();
        monitor.levels.subscribe({ complete });
        browser.contextState.mockReturnValue('suspended');
        let finishResuming!: () => void;
        browser.resume.mockReturnValueOnce(
            new Promise<void>((resolve) => {
                finishResuming = resolve;
            }),
        );
        const starting = monitor.start(stream);
        await Promise.resolve();
        expect(browser.resume).toHaveBeenCalledOnce();

        // Act
        TestBed.resetTestingModule();
        await starting;
        finishResuming();
        await Promise.resolve();

        // Assert
        expect(complete).toHaveBeenCalledOnce();
        expect(monitor.state()).toBe('disposed');
        expect(browser.contexts[0]!.close).toHaveBeenCalledOnce();
        expect(browser.worklets).toHaveLength(0);
        expect(track.stop).not.toHaveBeenCalled();
    });

    it('reports the end of the last borrowed track and closes the context', async () => {
        // Arrange
        const secondTrack = new FakeAudioTrack();
        await monitor.start(createStream(track, secondTrack));
        track.end();
        expect(monitor.state()).toBe('running');

        // Act
        secondTrack.end();

        // Assert
        expect(monitor.state()).toBe('error');
        expect(monitor.error()?.message).toMatch(/no live audio track/);
        expect(browser.contexts[0]!.close).toHaveBeenCalledOnce();
        expect(secondTrack.stop).not.toHaveBeenCalled();
    });

    it('releases the graph when the worklet does not acknowledge the final flush', async () => {
        // Arrange
        vi.useFakeTimers();
        await monitor.start(stream);

        // Act
        const failure = expect(monitor.stop()).rejects.toThrow('The audio level worklet did not acknowledge flush.');
        await vi.advanceTimersByTimeAsync(2_000);

        // Assert
        await failure;
        expect(monitor.state()).toBe('error');
        expect(browser.contexts[0]!.close).toHaveBeenCalledOnce();
        expect(track.stop).not.toHaveBeenCalled();
    });
});
