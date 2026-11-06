// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, output, type InputSignal, type OutputEmitterRef } from '@angular/core';
import { ButtonComponent, IconNameDirective, PressButtonComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IVoiceSessionControlLabels } from './IVoiceSessionControlLabels';

// #endregion

/**
 * Renders externally controlled actions for a long-running voice session.
 *
 * The component does not mutate audio, transport or session state. It emits the
 * user's requested state transitions and waits for the consumer to update its inputs.
 *
 * @public
 */

@Component({
    selector: 'ngp-voice-session-controls',
    imports: [ButtonComponent, IconNameDirective, PressButtonComponent],
    template: `
        <div part="root" class="controls" role="toolbar" [attr.aria-label]="labels().toolbar" [class.controls--compact]="compact()">
            <div part="primary-actions" class="action-group">
                <mosaik-button
                    data-action="microphone"
                    [appearance]="microphoneMuted() ? 'soft' : 'plain'"
                    [attr.aria-label]="microphoneMuted() ? labels().microphoneUnmute : labels().microphoneMute"
                    [attr.aria-pressed]="microphoneMuted()"
                    [attr.title]="microphoneMuted() ? labels().microphoneUnmute : labels().microphoneMute"
                    [disabled]="disabled()"
                    [iconName]="'mic'"
                    [size]="actionSize()"
                    [variant]="microphoneMuted() ? 'danger' : 'tertiary'"
                    (click)="toggleMicrophoneMuted()"
                />

                @if (canPause()) {
                    <mosaik-button
                        data-action="pause"
                        [appearance]="paused() ? 'soft' : 'plain'"
                        [attr.aria-label]="paused() ? labels().resume : labels().pause"
                        [attr.aria-pressed]="paused()"
                        [attr.title]="paused() ? labels().resume : labels().pause"
                        [disabled]="disabled()"
                        [iconName]="paused() ? 'play' : 'pause'"
                        [size]="actionSize()"
                        [variant]="paused() ? 'warning' : 'tertiary'"
                        (click)="togglePaused()"
                    />
                }
                @if (showAssistantControl()) {
                    @if (assistantSpeaking() || assistantAudioAvailable() !== undefined) {
                        <mosaik-button
                            data-action="assistant-stop"
                            [appearance]="'soft'"
                            [attr.aria-label]="labels().assistantStop"
                            [attr.title]="labels().assistantStop"
                            [disabled]="assistantActionsDisabled() || !assistantSpeaking()"
                            [iconName]="'dismiss'"
                            [size]="actionSize()"
                            [variant]="'warning'"
                            (click)="requestAssistantStop()"
                        />
                    }

                    <mosaik-button
                        data-action="assistant-mute"
                        [appearance]="assistantMuted() ? 'soft' : 'plain'"
                        [attr.aria-label]="assistantMuted() ? labels().assistantUnmute : labels().assistantMute"
                        [attr.aria-pressed]="assistantMuted()"
                        [attr.title]="assistantMuted() ? labels().assistantUnmute : labels().assistantMute"
                        [disabled]="assistantActionsDisabled()"
                        [iconName]="assistantMuted() ? 'speakerOff' : 'speaker'"
                        [size]="actionSize()"
                        [variant]="assistantMuted() ? 'danger' : 'tertiary'"
                        (click)="toggleAssistantMuted()"
                    />
                }
            </div>

            <div part="secondary-actions" class="action-group secondary-actions">
                <ng-content select="[ngpVoiceSessionControlsSecondary]" />
            </div>

            @if (canEnd()) {
                <span part="separator" class="separator" aria-hidden="true"></span>

                <mosaik-press-button
                    data-action="end"
                    [attr.test-id]="'voice-session-end'"
                    part="end-action"
                    class="end-action"
                    [appearance]="'solid'"
                    [attr.aria-label]="labels().end"
                    [attr.title]="labels().end"
                    [disabled]="disabled() || endBusy()"
                    [iconName]="'dismiss'"
                    [isBusy]="endBusy()"
                    [label]="compact() ? '' : labels().end"
                    [size]="actionSize()"
                    [variant]="'danger'"
                    (pressed)="requestEnd()"
                />
            }
        </div>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: inline-block;
            max-width: 100%;
        }

        .controls {
            display: flex;
            max-width: 100%;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 0.5rem;
            border: 1px solid color-mix(in srgb, var(--mosaik-scheme-foreground) 10%, transparent);
            border-radius: calc(var(--mosaik-layout-radius, 0.5rem) * 2);
            background: color-mix(in srgb, var(--mosaik-scheme-surface) 90%, transparent);
            box-shadow: 0 0.75rem 2.5rem color-mix(in srgb, var(--mosaik-scheme-foreground) 10%, transparent);
            backdrop-filter: blur(18px);
        }

        .action-group {
            display: flex;
            min-width: 0;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
        }

        .controls--compact {
            gap: 0.375rem;
            padding: 0.375rem;
        }

        .secondary-actions:empty {
            display: none;
        }

        .separator {
            width: 1px;
            height: 2rem;
            flex: 0 0 auto;
            background: color-mix(in srgb, var(--mosaik-scheme-foreground) 14%, transparent);
        }

        .end-action {
            flex: 0 0 auto;
        }

        @media (width < 34rem) {
            .controls {
                width: 100%;
                justify-content: space-between;
                gap: 0.375rem;
                overflow-x: auto;
                padding: 0.375rem;
                overscroll-behavior-inline: contain;
                scrollbar-width: none;
            }

            .controls::-webkit-scrollbar {
                display: none;
            }

            .action-group {
                justify-content: flex-start;
            }
        }

        @media (prefers-reduced-transparency: reduce) {
            .controls {
                background: var(--mosaik-scheme-surface);
                backdrop-filter: none;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoiceSessionControlsComponent {
    // #region Properties

    /**
     * Whether assistant audio actions are available. Providing a value keeps the stop control
     * mounted between utterances. When omitted, the stop control appears only while speaking.
     */
    public readonly assistantAudioAvailable = input<boolean>();

    /**
     * Indicates whether assistant audio output is currently muted.
     *
     * @public
     * @readonly
     */
    public readonly assistantMuted: InputSignal<boolean> = input<boolean>(false);

    /**
     * Emits the requested assistant-audio mute state.
     *
     * @public
     * @readonly
     */
    public readonly assistantMutedChange: OutputEmitterRef<boolean> = output<boolean>();

    /**
     * Indicates whether the assistant is currently emitting spoken audio.
     *
     * @public
     * @readonly
     */
    public readonly assistantSpeaking: InputSignal<boolean> = input<boolean>(false);

    /**
     * Requests interruption of the assistant's current spoken response.
     *
     * @public
     * @readonly
     */
    public readonly assistantStopRequested: OutputEmitterRef<void> = output<void>();

    /**
     * Indicates whether pause and resume actions are available.
     *
     * @public
     * @readonly
     */
    public readonly canPause: InputSignal<boolean> = input<boolean>(true);

    /** Whether the toolbar offers an end-session action. */
    public readonly canEnd = input(true);

    /** Uses compact action sizes and displays the end action as an accessible icon button. */
    public readonly compact = input(false);

    /**
     * Disables every control except while an end request is already busy.
     *
     * @public
     * @readonly
     */
    public readonly disabled: InputSignal<boolean> = input<boolean>(false);

    /**
     * Indicates that an end-session request is currently being processed.
     *
     * @public
     * @readonly
     */
    public readonly endBusy: InputSignal<boolean> = input<boolean>(false);

    /**
     * Requests the consumer-owned session termination flow.
     *
     * @public
     * @readonly
     */
    public readonly endRequested: OutputEmitterRef<void> = output<void>();

    /**
     * Localized labels and accessible names used by every control.
     *
     * @public
     * @readonly
     */
    public readonly labels: InputSignal<IVoiceSessionControlLabels> = input.required<IVoiceSessionControlLabels>();

    /**
     * Indicates whether microphone input is currently muted.
     *
     * @public
     * @readonly
     */
    public readonly microphoneMuted: InputSignal<boolean> = input<boolean>(false);

    /**
     * Emits the requested microphone mute state.
     *
     * @public
     * @readonly
     */
    public readonly microphoneMutedChange: OutputEmitterRef<boolean> = output<boolean>();

    /**
     * Indicates whether the complete session is paused.
     *
     * @public
     * @readonly
     */
    public readonly paused: InputSignal<boolean> = input<boolean>(false);

    /**
     * Emits the requested pause state.
     *
     * @public
     * @readonly
     */
    public readonly pausedChange: OutputEmitterRef<boolean> = output<boolean>();

    /**
     * Indicates whether assistant-audio actions are rendered.
     *
     * @public
     * @readonly
     */
    public readonly showAssistantControl: InputSignal<boolean> = input<boolean>(true);

    protected readonly actionSize = computed(() => (this.compact() ? 'small' : 'large'));
    protected readonly assistantActionsDisabled = computed(() => this.disabled() || this.assistantAudioAvailable() === false);

    // #endregion

    // #region Methods

    /**
     * Emits the inverse of the current assistant-audio mute state.
     *
     * @protected
     */
    protected toggleAssistantMuted(): void {
        if (this.showAssistantControl() && !this.assistantActionsDisabled()) {
            this.assistantMutedChange.emit(!this.assistantMuted());
        }
    }

    /**
     * Emits the inverse of the current microphone mute state.
     *
     * @protected
     */
    protected toggleMicrophoneMuted(): void {
        this.microphoneMutedChange.emit(!this.microphoneMuted());
    }

    /**
     * Emits the inverse of the current pause state.
     *
     * @protected
     */
    protected togglePaused(): void {
        this.pausedChange.emit(!this.paused());
    }

    protected requestAssistantStop(): void {
        if (this.showAssistantControl() && !this.assistantActionsDisabled() && this.assistantSpeaking()) {
            this.assistantStopRequested.emit();
        }
    }

    protected requestEnd(): void {
        if (this.canEnd() && !this.disabled() && !this.endBusy()) {
            this.endRequested.emit();
        }
    }

    // #endregion
}
