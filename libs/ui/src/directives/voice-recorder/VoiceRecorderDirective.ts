// #region Imports

import {
    DestroyRef,
    Directive,
    ElementRef,
    Signal,
    computed,
    effect,
    inject,
    input,
    output,
    signal,
    type OutputEmitterRef,
    type WritableSignal,
} from '@angular/core';
import {
    AudioInputDevicePreferenceService,
    AudioRecorder,
    VOICE_TRANSCRIBER,
    isLiveVoiceTranscriber,
    type AudioRecorderState,
    type ILiveVoiceTranscriber,
    type IVoiceTranscriber,
} from '@pixel-brewery/ngpel-core/audio';

// #endregion

interface IPromptBoxElement extends HTMLElement {
    value: string;
    focus(): void;
}

interface IPromptBoxVoiceRecorderToolElement extends HTMLElement {
    canPause: boolean;
    disabled: boolean;
    elapsedTime: number;
    objectUrl: string | null;
    state: MosaikRecorderState;
}

type MosaikRecorderState = 'idle' | 'paused' | 'recording' | 'stopped';

/**
 * Connects the Mosaik prompt box voice controls to the audio recorder and transcriber of `ngpel-core`.
 *
 * The directive keeps ownership of the recording in the core services while Mosaik renders the controls.
 * A completed transcription is appended to the surrounding Prompt Box and announced through
 * its normal input event so existing value accessors and listeners observe the dictated text.
 *
 * @example
 * ```html
 * <mosaik-prompt-box>
 *     <mosaik-prompt-box-voice-recorder-tool ngpVoiceRecorder />
 * </mosaik-prompt-box>
 * ```
 *
 * @public
 */
@Directive({
    selector: 'mosaik-prompt-box-voice-recorder-tool[ngpVoiceRecorder]',
    exportAs: 'ngpVoiceRecorder',
    host: {
        '(recorderCancel)': 'onRecorderCancel()',
        '(recorderPause)': 'onRecorderPause()',
        '(recorderResume)': 'onRecorderResume()',
        '(recorderStart)': 'onRecorderStart()',
        '(recorderStop)': 'onRecorderStop()',
    },
})
export class VoiceRecorderDirective {
    // #region Fields

    private readonly _audioInputDevicePreferenceService: AudioInputDevicePreferenceService = inject(AudioInputDevicePreferenceService);
    private readonly _audioRecorder: AudioRecorder = inject(AudioRecorder);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _elementRef: ElementRef<IPromptBoxVoiceRecorderToolElement> = inject(ElementRef);
    private readonly _isRecording: Signal<boolean> = computed(() => this._ownsRecording() && this._audioRecorder.isRecording());
    private readonly _isTranscribing: WritableSignal<boolean> = signal(false);
    private readonly _ownsRecording: WritableSignal<boolean> = signal(false);
    private readonly _isActive = computed(() => this._ownsRecording() && (this._audioRecorder.isActive() || this._isTranscribing()));
    private readonly _isAcquiring = computed(() => this._ownsRecording() && this._audioRecorder.state() === 'acquiring');
    private readonly _voiceTranscriber: IVoiceTranscriber | null = inject(VOICE_TRANSCRIBER, { optional: true });

    private _generation = 0;
    private _isDestroyed = false;

    // #endregion

    // #region Ctor

    /**
     * Creates the Prompt Box voice bridge and synchronizes Core recorder state with Mosaik.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            this.synchronizeToolState(
                this._audioRecorder.state(),
                this._audioRecorder.durationMs(),
                this._audioRecorder.audioUrl(),
                this._ownsRecording(),
                this._isTranscribing(),
            );
        });

        this._destroyRef.onDestroy(() => {
            this._isDestroyed = true;
            void this.cancelRecording();
        });
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether this Prompt Box currently owns an active recording.
     *
     * @public
     * @readonly
     */
    public get isRecording(): Signal<boolean> {
        return this._isRecording;
    }

    /** Whether this tool is acquiring, recording, or transcribing its own audio. */
    public get isActive(): Signal<boolean> {
        return this._isActive;
    }

    /** Whether this tool is waiting for access to the microphone. */
    public get isAcquiring(): Signal<boolean> {
        return this._isAcquiring;
    }

    /** Whether this tool is converting a stopped recording to text. */
    public get isTranscribing(): Signal<boolean> {
        return this._isTranscribing.asReadonly();
    }

    /** Allows the owning surface to prevent new microphone captures. */
    public readonly enabled = input(true, { alias: 'ngpVoiceRecorderEnabled' });

    /** Emits the completed transcript after updating the surrounding prompt box when present. */
    public readonly transcribed = output<string>({ alias: 'ngpVoiceRecorderTranscribed' });

    /**
     * Emits recorder or transcription failures for application-level feedback.
     *
     * @public
     * @readonly
     */
    public readonly failed: OutputEmitterRef<unknown> = output<unknown>({
        alias: 'ngpVoiceRecorderFailed',
    });

    // #endregion

    // #region Methods

    /**
     * Cancels the active recording and discards its retained audio.
     *
     * @protected
     */
    public onRecorderCancel(): Promise<void> {
        return this.cancelRecording();
    }

    /**
     * Pauses the recording owned by this Prompt Box.
     *
     * @protected
     */
    public onRecorderPause(): void {
        if (!this._ownsRecording()) {
            return;
        }

        try {
            this._audioRecorder.pause();
        } catch (error: unknown) {
            this.failed.emit(error);
        }
    }

    /**
     * Resumes the recording owned by this Prompt Box.
     *
     * @protected
     */
    public onRecorderResume(): void {
        if (!this._ownsRecording()) {
            return;
        }

        try {
            this._audioRecorder.resume();
        } catch (error: unknown) {
            this.failed.emit(error);
        }
    }

    /**
     * Starts recording with the last successfully tested browser microphone when available.
     *
     * @protected
     */
    public onRecorderStart(): Promise<void> {
        return this.startRecording();
    }

    /**
     * Stops, transcribes and writes the dictated text into the surrounding Prompt Box.
     *
     * @protected
     */
    public onRecorderStop(): Promise<void> {
        return this.stopAndTranscribe();
    }

    private appendTranscript(transcript: string): void {
        const promptBox = this.findPromptBox();

        if (!promptBox) {
            return;
        }

        promptBox.value = this.joinText(promptBox.value, transcript);
        promptBox.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            }),
        );
        promptBox.focus();
    }

    private async cancelRecording(): Promise<void> {
        if (!this._ownsRecording()) {
            return;
        }

        const generation = ++this._generation;

        try {
            this.liveVoiceTranscriber()?.cancelSession();
        } catch (error: unknown) {
            if (this.isCurrent(generation)) {
                this.failed.emit(error);
            }
        } finally {
            await this.releaseRecording(generation);
        }
    }

    private isCurrent(generation: number): boolean {
        return !this._isDestroyed && this._ownsRecording() && this._generation === generation;
    }

    private async releaseRecording(generation: number): Promise<void> {
        try {
            await this._audioRecorder.cancel();
        } catch (error: unknown) {
            if (this.isCurrent(generation)) {
                this.failed.emit(error);
            }
        } finally {
            if (this._generation === generation) {
                this._isTranscribing.set(false);
                this._ownsRecording.set(false);
            }
        }
    }

    private findPromptBox(): IPromptBoxElement | null {
        return this._elementRef.nativeElement.closest<IPromptBoxElement>('mosaik-chat-prompt-box, mosaik-prompt-box');
    }

    private joinText(existingText: string, transcript: string): string {
        const normalizedExistingText = existingText.trim();
        const normalizedTranscript = transcript.trim();

        if (!normalizedExistingText) {
            return normalizedTranscript;
        }

        if (!normalizedTranscript) {
            return normalizedExistingText;
        }

        return `${normalizedExistingText} ${normalizedTranscript}`;
    }

    private liveVoiceTranscriber(): ILiveVoiceTranscriber | null {
        return isLiveVoiceTranscriber(this._voiceTranscriber) ? this._voiceTranscriber : null;
    }

    private resolveToolState(recorderState: AudioRecorderState, ownsRecording: boolean, isTranscribing: boolean): MosaikRecorderState {
        if (!ownsRecording) {
            return 'idle';
        }

        if (isTranscribing) {
            return 'stopped';
        }

        if (recorderState === 'paused') {
            return 'paused';
        }

        if (recorderState === 'acquiring' || recorderState === 'recording' || recorderState === 'stopping') {
            return 'recording';
        }

        return 'idle';
    }

    private async startRecording(): Promise<void> {
        if (this._isDestroyed || !this.enabled() || this._ownsRecording() || this._audioRecorder.isActive()) {
            return;
        }

        const generation = ++this._generation;
        this._ownsRecording.set(true);

        try {
            await this._audioRecorder.start({
                audioDeviceId: this._audioInputDevicePreferenceService.preference()?.deviceId ?? null,
            });
            if (!this.isCurrent(generation)) {
                return;
            }

            const audioTrack = this._audioRecorder.mediaStream()?.getAudioTracks()[0];

            await this.liveVoiceTranscriber()?.startSession(audioTrack);
        } catch (error: unknown) {
            if (this.isCurrent(generation)) {
                this.failed.emit(error);

                if (this.isCurrent(generation)) {
                    await this.cancelRecording();
                }
            }
        }
    }

    private async stopAndTranscribe(): Promise<void> {
        if (!this._ownsRecording() || this._isTranscribing()) {
            return;
        }

        const generation = this._generation;
        this._isTranscribing.set(true);

        try {
            const liveTranscript = this.liveVoiceTranscriber()?.stopSession() ?? null;
            const [recording, liveText] = await Promise.all([this._audioRecorder.stop(), liveTranscript]);

            if ((!recording?.blob && !liveTranscript) || !this.isCurrent(generation)) {
                return;
            }

            const transcript = (liveText ?? (await this._audioRecorder.transcribe())).trim();

            if (transcript && this.isCurrent(generation)) {
                this.appendTranscript(transcript);

                if (this.isCurrent(generation)) {
                    this.transcribed.emit(transcript);
                }
            }
        } catch (error: unknown) {
            if (this.isCurrent(generation)) {
                this.failed.emit(error);
            }
        } finally {
            if (this.isCurrent(generation)) {
                await this.releaseRecording(generation);
            }
        }
    }

    private synchronizeToolState(
        recorderState: AudioRecorderState,
        elapsedTime: number,
        objectUrl: string | null,
        ownsRecording: boolean,
        isTranscribing: boolean,
    ): void {
        const tool = this._elementRef.nativeElement;

        tool.state = this.resolveToolState(recorderState, ownsRecording, isTranscribing);
        tool.elapsedTime = ownsRecording ? elapsedTime : 0;
        tool.objectUrl = ownsRecording ? objectUrl : null;
        tool.canPause = true;
        tool.disabled = isTranscribing || (!ownsRecording && (!this.enabled() || this._audioRecorder.isActive())) || recorderState === 'disposed';
    }

    // #endregion
}
