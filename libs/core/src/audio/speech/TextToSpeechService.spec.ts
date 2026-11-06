import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TextToSpeechService } from './TextToSpeechService';

type SpeakBehavior = 'end' | 'error' | 'interrupted' | 'none';

interface IFakeUtterance extends SpeechSynthesisUtterance {
    readonly spokenText: string;
}

interface ISynthesisHarness {
    behavior: SpeakBehavior;
    cancel: ReturnType<typeof vi.fn>;
    pause: ReturnType<typeof vi.fn>;
    resume: ReturnType<typeof vi.fn>;
    speak: ReturnType<typeof vi.fn>;
    view: Record<string, unknown>;
    voices: ReadonlyArray<SpeechSynthesisVoice>;
    emitVoicesChanged(): void;
    utterance(): IFakeUtterance | null;
}

const GERMAN_VOICE = { lang: 'de-DE', name: 'Anna' } as SpeechSynthesisVoice;
const ENGLISH_VOICE = { lang: 'en-US', name: 'Alex' } as SpeechSynthesisVoice;

function createSynthesisHarness(): ISynthesisHarness {
    const listeners: Array<() => void> = [];
    let utterance: IFakeUtterance | null = null;
    const harness: ISynthesisHarness = {
        behavior: 'end',
        cancel: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        speak: vi.fn(),
        view: {},
        voices: [GERMAN_VOICE, ENGLISH_VOICE],
        emitVoicesChanged(): void {
            for (const listener of listeners) {
                listener();
            }
        },
        utterance: (): IFakeUtterance | null => utterance,
    };

    class FakeSpeechSynthesisUtterance {
        public lang = '';
        public pitch = 1;
        public rate = 1;
        public voice: SpeechSynthesisVoice | null = null;
        public volume = 1;
        public onend: (() => void) | null = null;
        public onerror: ((event: SpeechSynthesisErrorEvent) => void) | null = null;
        public onpause: (() => void) | null = null;
        public onresume: (() => void) | null = null;
        public onstart: (() => void) | null = null;

        public constructor(public readonly spokenText: string) {
            utterance = this as unknown as IFakeUtterance;
        }
    }

    harness.pause = vi.fn((): void => {
        utterance?.onpause?.(new Event('pause') as SpeechSynthesisEvent);
    });
    harness.resume = vi.fn((): void => {
        utterance?.onresume?.(new Event('resume') as SpeechSynthesisEvent);
    });
    harness.speak = vi.fn((): void => {
        utterance?.onstart?.(new Event('start') as SpeechSynthesisEvent);

        if (harness.behavior === 'end') {
            utterance?.onend?.(new Event('end') as SpeechSynthesisEvent);
        }

        if (harness.behavior === 'error') {
            utterance?.onerror?.({ error: 'synthesis-failed' } as SpeechSynthesisErrorEvent);
        }

        if (harness.behavior === 'interrupted') {
            utterance?.onerror?.({ error: 'interrupted' } as SpeechSynthesisErrorEvent);
        }
    });
    harness.view = {
        SpeechSynthesisUtterance: FakeSpeechSynthesisUtterance,
        speechSynthesis: {
            addEventListener: vi.fn((_type: string, listener: () => void) => listeners.push(listener)),
            cancel: harness.cancel,
            getVoices: vi.fn(() => harness.voices),
            pause: harness.pause,
            resume: harness.resume,
            speak: harness.speak,
        },
    };

    return harness;
}

function createService(view: unknown): TextToSpeechService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        providers: [TextToSpeechService, { provide: DOCUMENT, useValue: { defaultView: view } }],
    });

    return TestBed.inject(TextToSpeechService);
}

describe('TextToSpeechService', () => {
    let harness: ISynthesisHarness;

    beforeEach(() => {
        harness = createSynthesisHarness();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('reports support and publishes the voices the browser offers', () => {
        // Arrange

        // Act
        const service = createService(harness.view);

        // Assert
        expect(service.isSupported()).toBe(true);
        expect(service.voices()).toEqual([GERMAN_VOICE, ENGLISH_VOICE]);
    });

    it('stays inert when the browser cannot synthesize speech', async () => {
        // Arrange
        const service = createService({});

        // Act
        const speech = service.speak('Guten Morgen');

        // Assert
        await expect(speech).rejects.toThrow('not supported');
        expect(service.isSupported()).toBe(false);
        expect(service.error()).toBe('Text-to-speech is not supported in this browser.');
    });

    it('speaks with clamped options and the requested voice', async () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        await service.speak('Guten Morgen', { lang: 'de-DE', pitch: 9, rate: 99, volume: 5, voiceName: 'Anna' });

        // Assert
        expect(harness.speak).toHaveBeenCalledOnce();
        expect(harness.utterance()).toMatchObject({
            lang: 'de-DE',
            pitch: 2,
            rate: 10,
            spokenText: 'Guten Morgen',
            voice: GERMAN_VOICE,
            volume: 1,
        });
    });

    it('keeps the browser default voice when the requested one is unknown', async () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        await service.speak('Guten Morgen', { voiceName: 'Missing voice' });

        // Assert
        expect(harness.utterance()?.voice).toBeNull();
    });

    it('reports a synthesis failure instead of resolving silently', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'error';

        // Act
        const speech = service.speak('Guten Morgen');

        // Assert
        await expect(speech).rejects.toThrow('Speech synthesis error: synthesis-failed');
        expect(service.error()).toBe('Speech synthesis error: synthesis-failed');
        expect(service.isSpeaking()).toBe(false);
    });

    it('treats an interrupted utterance as a completed one', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'interrupted';

        // Act
        const speech = service.speak('Guten Morgen');

        // Assert
        await expect(speech).resolves.toBeUndefined();
        expect(service.error()).toBeNull();
    });

    it('cancels a running utterance before starting the next one', async () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        await service.speak('Guten Morgen');

        // Assert
        expect(harness.cancel).toHaveBeenCalledOnce();
    });

    it('follows the voice list the browser publishes asynchronously', () => {
        // Arrange
        const service = createService(harness.view);
        harness.voices = [GERMAN_VOICE];

        // Act
        harness.emitVoicesChanged();

        // Assert
        expect(service.voices()).toEqual([GERMAN_VOICE]);
        expect(harness.view['speechSynthesis']).toMatchObject({ addEventListener: expect.any(Function) });
    });

    it('pauses the running utterance', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'none';
        void service.speak('Guten Morgen');

        // Act
        service.pause();

        // Assert
        expect(harness.pause).toHaveBeenCalledOnce();
        expect(service.isPaused()).toBe(true);
    });

    it('does not pause while nothing is spoken', () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        service.pause();

        // Assert
        expect(harness.pause).not.toHaveBeenCalled();
    });

    it('resumes a paused utterance', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'none';
        void service.speak('Guten Morgen');
        service.pause();

        // Act
        service.resume();

        // Assert
        expect(harness.resume).toHaveBeenCalledOnce();
        expect(service.isPaused()).toBe(false);
    });

    it('does not resume while nothing is paused', () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        service.resume();

        // Assert
        expect(harness.resume).not.toHaveBeenCalled();
    });

    it('stops a running utterance when it is toggled', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'none';
        void service.speak('Guten Morgen');

        // Act
        await service.toggle('Guten Abend');

        // Assert
        expect(harness.speak).toHaveBeenCalledOnce();
        expect(service.isSpeaking()).toBe(false);
    });

    it('speaks when nothing is running while it is toggled', async () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        await service.toggle('Guten Abend');

        // Assert
        expect(harness.utterance()?.spokenText).toBe('Guten Abend');
    });

    it('returns the voices of one language', () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        const voices = service.getVoicesForLanguage('DE');

        // Assert
        expect(voices).toEqual([GERMAN_VOICE]);
    });

    it('returns no voices for a language the browser does not offer', () => {
        // Arrange
        const service = createService(harness.view);

        // Act
        const voices = service.getVoicesForLanguage('fr');

        // Assert
        expect(voices).toEqual([]);
    });

    it('silences the running utterance when it is disposed', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'none';
        void service.speak('Guten Morgen');

        // Act
        service.dispose();

        // Assert
        expect(harness.cancel).toHaveBeenCalledTimes(2);
        expect(service.isSpeaking()).toBe(false);
    });

    it('stays inert while a service without a synthesizer is disposed', () => {
        // Arrange
        const service = createService({});

        // Act
        const act = (): void => service.dispose();

        // Assert
        expect(act).not.toThrow();
        expect(harness.cancel).not.toHaveBeenCalled();
    });

    it('silences speech when the owning injector is destroyed', async () => {
        // Arrange
        const service = createService(harness.view);
        harness.behavior = 'none';
        void service.speak('Guten Morgen');

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(harness.cancel).toHaveBeenCalledTimes(2);
        expect(service.isSpeaking()).toBe(false);
    });
});
