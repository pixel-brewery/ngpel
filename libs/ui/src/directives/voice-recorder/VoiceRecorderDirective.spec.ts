// #region Imports

import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { IMentionDocument } from '@pixel-brewery/mosaik-elements-foundation';
import { AudioInputDevicePreferenceService, AudioRecorder, VOICE_TRANSCRIBER, type AudioRecorderState } from '@pixel-brewery/ngpel-core/audio';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VoiceRecorderDirective } from './VoiceRecorderDirective';

// #endregion

// Load the real mention utility without evaluating unrelated browser controls in the Mosaik barrel.
vi.mock('@pixel-brewery/mosaik-elements-foundation', async () => ({
    trimMentionDocument: (await import('@pixel-brewery/mosaik-elements-foundation/dist/controls/components/inputs/text-suggestions/trimMentionDocument'))
        .trimMentionDocument,
}));

type RecorderState = 'idle' | 'paused' | 'recording' | 'stopped';

class PromptBoxMock extends EventTarget {
    // #region Fields

    public focused = false;
    public mentionDocument: IMentionDocument = { text: '', mentions: [] };

    // #endregion

    // #region Properties

    public get value(): string {
        return this.mentionDocument.text;
    }

    public set value(text: string) {
        this.mentionDocument = { text, mentions: [] };
    }

    // #endregion

    // #region Methods

    public focus(): void {
        this.focused = true;
    }

    // #endregion
}

class VoiceRecorderToolMock {
    // #region Fields

    public canPause = false;
    public disabled = false;
    public elapsedTime = 0;
    public objectUrl: string | null = null;
    public state: RecorderState = 'idle';

    private readonly _promptBox: PromptBoxMock;

    // #endregion

    // #region Ctor

    public constructor(promptBox: PromptBoxMock) {
        this._promptBox = promptBox;
    }

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    public closest<T extends Element = Element>(selectors: string): T | null {
        void selectors;

        return this._promptBox as unknown as T;
    }

    // #endregion
}

class AudioRecorderMock {
    // #region Fields

    public readonly audioUrl = signal<string | null>(null);
    public readonly cancel = vi.fn(async (): Promise<void> => {
        this.audioUrl.set(null);
        this.durationMs.set(0);
        this.isActive.set(false);
        this.isRecording.set(false);
        this.state.set('idle');
    });
    public readonly durationMs = signal(0);
    public readonly isActive = signal(false);
    public readonly isRecording = signal(false);
    public readonly mediaStream = signal<MediaStream | null>({
        getAudioTracks: () => [this.audioTrack],
    } as MediaStream);
    public readonly pause = vi.fn((): void => {
        this.isRecording.set(true);
        this.state.set('paused');
    });
    public readonly resume = vi.fn((): void => {
        this.isRecording.set(true);
        this.state.set('recording');
    });
    public readonly start = vi.fn(async (): Promise<void> => {
        this.isActive.set(true);
        this.isRecording.set(true);
        this.state.set('recording');
    });
    public readonly state = signal<AudioRecorderState>('idle');
    public readonly stop = vi.fn(async () => {
        this.isActive.set(false);
        this.isRecording.set(false);
        this.state.set('idle');

        return {
            blob: new Blob(['voice'], { type: 'audio/webm' }),
            chunkCount: 1,
            durationMs: 1_000,
            mimeType: 'audio/webm',
            retention: 'memory' as const,
        };
    });
    public readonly transcribe = vi.fn(async (): Promise<string> => 'dictated text');

    public readonly audioTrack = { readyState: 'live' } as MediaStreamTrack;

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    // #endregion
}

class LiveVoiceTranscriberMock {
    // #region Fields

    public readonly supportsLiveSessions = true as const;
    public readonly cancelSession = vi.fn();
    public readonly startSession = vi.fn(async (audioTrack?: MediaStreamTrack): Promise<void> => {
        void audioTrack;
    });
    public readonly stopSession = vi.fn(async (): Promise<string> => 'dictated text');
    public readonly transcribe = vi.fn(async (): Promise<string> => 'unused recorded transcription');

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    // #endregion
}

describe('VoiceRecorderDirective', () => {
    let audioRecorder: AudioRecorderMock;
    let directive: VoiceRecorderDirective;
    let enabled: ReturnType<typeof signal<boolean>>;
    let liveVoiceTranscriber: LiveVoiceTranscriberMock;
    let promptBox: PromptBoxMock;
    let tool: VoiceRecorderToolMock;

    beforeEach(() => {
        audioRecorder = new AudioRecorderMock();
        liveVoiceTranscriber = new LiveVoiceTranscriberMock();
        promptBox = new PromptBoxMock();
        tool = new VoiceRecorderToolMock(promptBox);
        enabled = signal(true);

        TestBed.configureTestingModule({
            providers: [
                VoiceRecorderDirective,
                {
                    provide: AudioInputDevicePreferenceService,
                    useValue: {
                        preference: signal({
                            deviceId: 'microphone-2',
                            label: 'Conference microphone',
                            schemaVersion: 1,
                            testedAt: '2026-07-27T12:00:00.000Z',
                        }),
                    },
                },
                {
                    provide: AudioRecorder,
                    useValue: audioRecorder,
                },
                {
                    provide: VOICE_TRANSCRIBER,
                    useValue: liveVoiceTranscriber,
                },
                {
                    provide: ElementRef,
                    useValue: new ElementRef(tool),
                },
            ],
        });

        directive = TestBed.inject(VoiceRecorderDirective);
        Object.defineProperty(directive, 'enabled', { value: enabled });
        TestBed.flushEffects();
    });

    it('starts Core recording with the verified microphone and mirrors the active state', async () => {
        // Arrange
        audioRecorder.durationMs.set(2_500);

        // Act
        await directive.onRecorderStart();
        TestBed.flushEffects();

        // Assert
        expect(audioRecorder.start).toHaveBeenCalledWith({ audioDeviceId: 'microphone-2' });
        expect(liveVoiceTranscriber.startSession).toHaveBeenCalledWith(audioRecorder.audioTrack);
        expect(directive.isRecording()).toBe(true);
        expect(tool).toMatchObject({
            canPause: true,
            disabled: false,
            elapsedTime: 2_500,
            state: 'recording',
        });
    });

    it('appends the transcription and emits the normal Prompt Box input event', async () => {
        // Arrange
        const inputListener = vi.fn();
        const received = vi.fn(() => promptBox.value);
        directive.transcribed.subscribe(received);
        promptBox.value = 'Existing prompt';
        promptBox.addEventListener('input', inputListener);
        await directive.onRecorderStart();

        // Act
        await directive.onRecorderStop();
        TestBed.flushEffects();

        // Assert
        expect(audioRecorder.stop).toHaveBeenCalledOnce();
        expect(liveVoiceTranscriber.stopSession).toHaveBeenCalledOnce();
        expect(audioRecorder.transcribe).not.toHaveBeenCalled();
        expect(audioRecorder.cancel).toHaveBeenCalledOnce();
        expect(promptBox.value).toBe('Existing prompt dictated text');
        expect(inputListener).toHaveBeenCalledOnce();
        expect(received).toHaveBeenCalledWith('dictated text');
        expect(received).toHaveReturnedWith('Existing prompt dictated text');
        expect(promptBox.focused).toBe(true);
        expect(tool.state).toBe('idle');
    });

    it('preserves mention identity and range when adding dictated text', async () => {
        // Arrange
        promptBox.mentionDocument = {
            text: '  @Ada existing prompt  ',
            mentions: [{ id: 'ada', label: 'Ada', start: 2, end: 6 }],
        };
        const observed = vi.fn(() => promptBox.mentionDocument);
        promptBox.addEventListener('input', observed);
        await directive.onRecorderStart();

        // Act
        await directive.onRecorderStop();

        // Assert
        expect(observed).toHaveReturnedWith({
            text: '@Ada existing prompt dictated text',
            mentions: [{ id: 'ada', label: 'Ada', start: 0, end: 4 }],
        });
    });

    it('does not request microphone access while the owning surface disables capture', async () => {
        // Arrange
        enabled.set(false);
        TestBed.flushEffects();

        // Act
        await directive.onRecorderStart();

        // Assert
        expect(audioRecorder.start).not.toHaveBeenCalled();
        expect(directive.isActive()).toBe(false);
        expect(tool.disabled).toBe(true);
    });

    it('does not append or emit a late transcription after cancellation', async () => {
        // Arrange
        const received = vi.fn();
        directive.transcribed.subscribe(received);
        let finishTranscription!: (text: string) => void;
        liveVoiceTranscriber.stopSession.mockReturnValueOnce(
            new Promise<string>((resolve) => {
                finishTranscription = resolve;
            }),
        );
        await directive.onRecorderStart();
        const stopping = directive.onRecorderStop();
        await directive.onRecorderCancel();

        // Act
        finishTranscription('obsolete transcript');
        await stopping;

        // Assert
        expect(received).not.toHaveBeenCalled();
        expect(promptBox.value).toBe('');
        expect(audioRecorder.cancel).toHaveBeenCalledOnce();
    });

    it('cancels an owned recording without transcribing or changing the prompt', async () => {
        // Arrange
        promptBox.value = 'Keep this text';
        await directive.onRecorderStart();

        // Act
        await directive.onRecorderCancel();
        TestBed.flushEffects();

        // Assert
        expect(audioRecorder.cancel).toHaveBeenCalledOnce();
        expect(liveVoiceTranscriber.cancelSession).toHaveBeenCalledOnce();
        expect(audioRecorder.transcribe).not.toHaveBeenCalled();
        expect(promptBox.value).toBe('Keep this text');
        expect(directive.isRecording()).toBe(false);
    });

    it('forwards pause and resume requests only while it owns the recording', async () => {
        // Arrange
        directive.onRecorderPause();
        directive.onRecorderResume();
        await directive.onRecorderStart();

        // Act
        directive.onRecorderPause();
        directive.onRecorderResume();

        // Assert
        expect(audioRecorder.pause).toHaveBeenCalledOnce();
        expect(audioRecorder.resume).toHaveBeenCalledOnce();
    });

    it('keeps the stopped controls visible and disabled while the live transcript is finalized', async () => {
        // Arrange
        let resolveTranscript!: (transcript: string) => void;
        liveVoiceTranscriber.stopSession.mockImplementationOnce(
            () =>
                new Promise<string>((resolve) => {
                    resolveTranscript = resolve;
                }),
        );
        await directive.onRecorderStart();

        // Act
        const stopPromise = directive.onRecorderStop();
        await Promise.resolve();
        TestBed.flushEffects();

        // Assert
        expect(tool).toMatchObject({
            disabled: true,
            state: 'stopped',
        });

        resolveTranscript('dictated text');
        await stopPromise;
        TestBed.flushEffects();
        expect(tool.state).toBe('idle');
    });

    it('reports a transcription failure and preserves the existing prompt', async () => {
        // Arrange
        const failure = new Error('Transcription failed');
        const failureListener = vi.fn();
        promptBox.value = 'Existing prompt';
        liveVoiceTranscriber.stopSession.mockRejectedValueOnce(failure);
        directive.failed.subscribe(failureListener);
        await directive.onRecorderStart();

        // Act
        await directive.onRecorderStop();

        // Assert
        expect(failureListener).toHaveBeenCalledWith(failure);
        expect(promptBox.value).toBe('Existing prompt');
        expect(audioRecorder.cancel).toHaveBeenCalledOnce();
    });

    it('ignores stop requests when this Prompt Box does not own the recorder', async () => {
        // Arrange

        // Act
        await directive.onRecorderStop();

        // Assert
        expect(audioRecorder.stop).not.toHaveBeenCalled();
        expect(audioRecorder.transcribe).not.toHaveBeenCalled();
        expect(liveVoiceTranscriber.stopSession).not.toHaveBeenCalled();
    });
});
