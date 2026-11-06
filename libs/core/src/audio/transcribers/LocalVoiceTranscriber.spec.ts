import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ILocalVoiceTranscriberOptions } from './ILocalVoiceTranscriberOptions';
import { LOCAL_VOICE_TRANSCRIBER_OPTIONS } from './LOCAL_VOICE_TRANSCRIBER_OPTIONS';
import { LocalVoiceTranscriber } from './LocalVoiceTranscriber';

interface IFakeRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    processLocally: boolean;
    onend?: (event: Event) => void;
    onerror?: (event: SpeechRecognitionErrorEvent) => void;
    onresult?: (event: SpeechRecognitionEvent) => void;
    readonly abort: ReturnType<typeof vi.fn>;
    readonly start: ReturnType<typeof vi.fn>;
    readonly stop: ReturnType<typeof vi.fn>;
}

interface IRecognitionHarness {
    readonly available?: ReturnType<typeof vi.fn>;
    readonly constructor: unknown;
    readonly install?: ReturnType<typeof vi.fn>;
    instance(): IFakeRecognition | null;
}

interface IRecognitionHarnessOptions {
    readonly available?: ReturnType<typeof vi.fn>;
    readonly install?: ReturnType<typeof vi.fn>;
    readonly onStart?: (recognition: IFakeRecognition) => void;
}

function createResultEvent(transcript: string, isFinal: boolean): SpeechRecognitionEvent {
    const result = Object.assign([{ transcript }], { isFinal });

    return { resultIndex: 0, results: [result] } as unknown as SpeechRecognitionEvent;
}

function createErrorEvent(error: SpeechRecognitionErrorCode): SpeechRecognitionErrorEvent {
    return { error, message: '' } as SpeechRecognitionErrorEvent;
}

function createRecognitionHarness(options: IRecognitionHarnessOptions = {}): IRecognitionHarness {
    let instance: IFakeRecognition | null = null;
    const captureInstance = (recognition: IFakeRecognition): void => {
        instance = recognition;
    };

    class FakeSpeechRecognition implements IFakeRecognition {
        public static readonly available = options.available;
        public static readonly install = options.install;

        public continuous = false;
        public interimResults = false;
        public lang = '';
        public maxAlternatives = 0;
        public processLocally = false;
        public onend?: (event: Event) => void;
        public onerror?: (event: SpeechRecognitionErrorEvent) => void;
        public onresult?: (event: SpeechRecognitionEvent) => void;
        public readonly abort = vi.fn();
        public readonly start = vi.fn((): void => {
            options.onStart?.(this);
        });
        public readonly stop = vi.fn(() => this.onend?.(new Event('end')));

        public constructor() {
            captureInstance(this);
        }
    }

    return {
        available: options.available,
        constructor: FakeSpeechRecognition,
        install: options.install,
        instance: (): IFakeRecognition | null => instance,
    };
}

let activeTranscriber: LocalVoiceTranscriber | null = null;

function createTranscriber(view: unknown, options?: ILocalVoiceTranscriberOptions): LocalVoiceTranscriber {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        providers: [
            LocalVoiceTranscriber,
            { provide: DOCUMENT, useValue: { defaultView: view } },
            ...(options ? [{ provide: LOCAL_VOICE_TRANSCRIBER_OPTIONS, useValue: options }] : []),
        ],
    });
    activeTranscriber = TestBed.inject(LocalVoiceTranscriber);

    return activeTranscriber;
}

describe('LocalVoiceTranscriber', () => {
    afterEach(() => {
        activeTranscriber?.cancelSession();
        activeTranscriber = null;
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('recognizes one utterance and reports it as the transcript', async () => {
        // Arrange
        const harness = createRecognitionHarness({
            onStart: (recognition) => recognition.onresult?.(createResultEvent('Hello world', true)),
        });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor }, { language: 'de-DE', interimResults: false, maxAlternatives: 1 });

        // Act
        const transcript = await transcriber.transcribe({ blob: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        expect(transcript).toBe('Hello world');
        expect(harness.instance()).toMatchObject({
            continuous: false,
            interimResults: false,
            lang: 'de-DE',
            maxAlternatives: 1,
        });
    });

    it('recognizes through the vendor-prefixed engine when the standard one is absent', async () => {
        // Arrange
        const harness = createRecognitionHarness({
            onStart: (recognition) => recognition.onresult?.(createResultEvent('Webkit transcript', true)),
        });
        const transcriber = createTranscriber({ webkitSpeechRecognition: harness.constructor });

        // Act
        const transcript = await transcriber.transcribe({ blob: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        expect(transcript).toBe('Webkit transcript');
    });

    it('applies the documented defaults when no options are composed', async () => {
        // Arrange
        const harness = createRecognitionHarness({
            onStart: (recognition) => recognition.onresult?.(createResultEvent('Default', true)),
        });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });

        // Act
        await transcriber.transcribe({ blob: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        expect(harness.instance()).toMatchObject({ interimResults: false, lang: 'en-US', maxAlternatives: 1 });
    });

    it('fails when the browser has no speech recognition', async () => {
        // Arrange
        const transcriber = createTranscriber({});

        // Act
        const transcription = transcriber.transcribe({ blob: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        await expect(transcription).rejects.toThrow('SpeechRecognition API not supported');
    });

    it('reports a recognition failure instead of an empty transcript', async () => {
        // Arrange
        const harness = createRecognitionHarness({
            onStart: (recognition) => recognition.onerror?.(createErrorEvent('not-allowed')),
        });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });

        // Act
        const transcription = transcriber.transcribe({ blob: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        await expect(transcription).rejects.toThrow('not-allowed');
    });

    it('keeps a live session running until it is explicitly stopped', async () => {
        // Arrange
        const harness = createRecognitionHarness();
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor }, { language: 'de-DE' });
        await transcriber.startSession();
        harness.instance()?.onresult?.(createResultEvent('Erster Satz', true));
        harness.instance()?.onresult?.(createResultEvent('zweiter Satz', true));

        // Act
        const transcript = await transcriber.stopSession();

        // Assert
        expect(transcript).toBe('Erster Satz zweiter Satz');
        expect(harness.instance()).toMatchObject({ continuous: true, interimResults: true, lang: 'de-DE' });
        expect(harness.instance()?.stop).toHaveBeenCalledOnce();
    });

    it('restarts the engine when the browser ends a live session after a speech pause', async () => {
        // Arrange
        const harness = createRecognitionHarness();
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });
        await transcriber.startSession();

        // Act
        harness.instance()?.onend?.(new Event('end'));

        // Assert
        await Promise.resolve();
        expect(harness.instance()?.start).toHaveBeenCalledTimes(2);
    });

    it('survives the silence error of a live session instead of ending it', async () => {
        // Arrange
        const harness = createRecognitionHarness();
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });
        await transcriber.startSession();
        harness.instance()?.onresult?.(createResultEvent('Recognized before the pause', true));

        // Act
        harness.instance()?.onerror?.(createErrorEvent('no-speech'));

        // Assert
        await expect(transcriber.stopSession()).resolves.toBe('Recognized before the pause');
    });

    it('discards the recognized text of a cancelled session', async () => {
        // Arrange
        const harness = createRecognitionHarness();
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });
        await transcriber.startSession();
        harness.instance()?.onresult?.(createResultEvent('Confidential', true));

        // Act
        transcriber.cancelSession();

        // Assert
        expect(harness.instance()?.abort).toHaveBeenCalledOnce();
        await expect(transcriber.stopSession()).resolves.toBe('');
    });

    it('rejects a second session instead of replacing the running one', async () => {
        // Arrange
        const harness = createRecognitionHarness();
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });
        await transcriber.startSession();

        // Act
        const secondSession = transcriber.startSession();

        // Assert
        await expect(secondSession).rejects.toThrow('already active');
        expect(harness.instance()?.start).toHaveBeenCalledOnce();
    });

    it('recognizes on the device and on the already authorized microphone track', async () => {
        // Arrange
        const available = vi.fn().mockResolvedValue('available');
        const install = vi.fn();
        const harness = createRecognitionHarness({ available, install });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor }, { language: 'de-DE' });
        const audioTrack = { readyState: 'live' } as MediaStreamTrack;

        // Act
        await transcriber.startSession(audioTrack);

        // Assert
        expect(available).toHaveBeenCalledWith({ langs: ['de-DE'], processLocally: true, quality: 'dictation' });
        expect(install).not.toHaveBeenCalled();
        expect(harness.instance()?.processLocally).toBe(true);
        expect(harness.instance()?.start).toHaveBeenCalledWith(audioTrack);
    });

    it('downloads a missing dictation language pack without delaying the running session', async () => {
        // Arrange
        const available = vi.fn().mockResolvedValue('downloadable');
        const install = vi.fn().mockResolvedValue(true);
        const harness = createRecognitionHarness({ available, install });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });

        // Act
        await transcriber.startSession();

        // Assert
        expect(install).toHaveBeenCalledWith({ langs: ['en-US'], processLocally: true, quality: 'dictation' });
        expect(harness.instance()?.processLocally).toBe(false);
        expect(harness.instance()?.start).toHaveBeenCalledOnce();
    });

    it('falls back to browser recognition when no dictation pack is available', async () => {
        // Arrange
        const available = vi.fn().mockResolvedValue('unavailable');
        const harness = createRecognitionHarness({ available });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });

        // Act
        await transcriber.startSession();

        // Assert
        expect(harness.instance()?.processLocally).toBe(false);
    });

    it('does not start recognition after the user stopped during language-pack preparation', async () => {
        // Arrange
        let resolveAvailability: (availability: string) => void = () => undefined;
        const available = vi.fn(
            () =>
                new Promise<string>((resolve) => {
                    resolveAvailability = resolve;
                }),
        );
        const harness = createRecognitionHarness({ available });
        const transcriber = createTranscriber({ SpeechRecognition: harness.constructor });
        const startPromise = transcriber.startSession();

        // Act
        const transcript = await transcriber.stopSession();

        resolveAvailability('available');
        await startPromise;

        // Assert
        expect(transcript).toBe('');
        expect(harness.instance()).toBeNull();
    });
});
