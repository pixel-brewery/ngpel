// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, output, type InputSignal, type OutputEmitterRef, type Signal } from '@angular/core';
import { IconComponent } from '@pixel-brewery/mosaik-elements-angular';
import { LiveAudioWaveformComponent } from '../live-audio-waveform/LiveAudioWaveformComponent';
import type { LiveAudioWaveformState } from '../live-audio-waveform/LiveAudioWaveformState';
import type { AudioActivityState } from './AudioActivityState';

// #endregion

/**
 * Renders the central audio activity surface for listening and speaking experiences.
 *
 * The consumer owns all audio resources. This component only visualizes a supplied
 * stream and normalized activity level.
 *
 * @public
 */

@Component({
    selector: 'ngp-audio-activity-orb',
    imports: [IconComponent, LiveAudioWaveformComponent],
    template: `
        <div
            part="root"
            class="orb"
            role="img"
            [attr.aria-label]="ariaLabel()"
            [attr.data-state]="state()"
            [attr.data-compact]="compact() ? '' : null"
            [attr.data-waveform]="waveformVisible() ? null : 'hidden'"
            [style.--ngp-audio-orb-aurora-opacity]="auroraOpacityStyle()"
            [style.--ngp-audio-orb-aurora-scale]="auroraScaleStyle()"
            [style.--ngp-audio-orb-level]="normalizedActivityLevel()"
            [style.--ngp-audio-orb-size]="sizeStyle()"
        >
            <div part="aurora" class="aurora" aria-hidden="true"></div>
            <div part="pulse" class="pulse" aria-hidden="true"></div>
            <div part="surface" class="surface">
                <div part="icon-surface" class="icon-surface" aria-hidden="true">
                    <mosaik-icon part="icon" class="icon" [icon]="iconName()" />
                </div>

                @if (waveformVisible()) {
                    <ngp-live-audio-waveform
                        part="waveform"
                        class="waveform"
                        aria-hidden="true"
                        [ariaLabel]="ariaLabel()"
                        [barGap]="2"
                        [barHeight]="3"
                        [barRadius]="2"
                        [barWidth]="3"
                        [fadeEdges]="true"
                        [height]="compact() ? 16 : 64"
                        [mediaStream]="mediaStream()"
                        [mode]="'static'"
                        [sensitivity]="1.15"
                        [state]="waveformState()"
                        (audioError)="audioError.emit($event)"
                    />
                }
            </div>
        </div>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: inline-grid;
            color: var(--mosaik-scheme-foreground);
            place-items: center;
        }

        .orb {
            --ngp-audio-orb-aurora-opacity: 0.22;
            --ngp-audio-orb-aurora-scale: 1;
            --ngp-audio-orb-level: 0;
            --ngp-audio-orb-size: 288px;
            --ngp-audio-orb-accent: var(--mosaik-color-highlight-500, #814dde);

            position: relative;
            display: grid;
            width: var(--ngp-audio-orb-size);
            height: var(--ngp-audio-orb-size);
            max-width: min(82vw, var(--ngp-audio-orb-size));
            max-height: min(82vw, var(--ngp-audio-orb-size));
            place-items: center;
            isolation: isolate;
        }

        .aurora,
        .pulse {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }

        .aurora {
            inset: 8%;
            opacity: var(--ngp-audio-orb-aurora-opacity);
            background:
                radial-gradient(circle at 30% 28%, color-mix(in srgb, var(--ngp-audio-orb-accent) 92%, white), transparent 42%),
                radial-gradient(circle at 72% 68%, color-mix(in srgb, var(--mosaik-color-info-500, #2f80ed) 78%, transparent), transparent 46%),
                conic-gradient(
                    from 120deg,
                    color-mix(in srgb, var(--ngp-audio-orb-accent) 72%, transparent),
                    color-mix(in srgb, var(--mosaik-color-secondary-400, #d946ef) 56%, transparent),
                    color-mix(in srgb, var(--mosaik-color-info-400, #38bdf8) 60%, transparent),
                    color-mix(in srgb, var(--ngp-audio-orb-accent) 72%, transparent)
                );
            filter: blur(clamp(1.5rem, 4vw, 3.5rem));
            transform: scale(var(--ngp-audio-orb-aurora-scale));
            transition:
                opacity 120ms ease-out,
                transform 120ms ease-out;
        }

        .pulse {
            inset: 13%;
            border: 1px solid color-mix(in srgb, var(--ngp-audio-orb-accent) 46%, transparent);
            box-shadow: 0 0 3rem color-mix(in srgb, var(--ngp-audio-orb-accent) 18%, transparent);
        }

        .surface {
            position: relative;
            display: grid;
            width: 70%;
            height: 70%;
            padding: 15%;
            border: 1px solid color-mix(in srgb, var(--mosaik-scheme-foreground) 12%, transparent);
            border-radius: 50%;
            background: linear-gradient(
                145deg,
                color-mix(in srgb, var(--mosaik-scheme-surface) 96%, white),
                color-mix(in srgb, var(--mosaik-scheme-surface) 88%, var(--ngp-audio-orb-accent))
            );
            box-shadow:
                0 1.5rem 4rem color-mix(in srgb, var(--mosaik-scheme-foreground) 14%, transparent),
                inset 0 1px 0 color-mix(in srgb, white 68%, transparent);
            align-content: center;
            gap: clamp(0.35rem, 1vw, 0.75rem);
            justify-items: stretch;
        }

        .icon-surface {
            display: grid;
            width: clamp(2.75rem, 18%, 4.25rem);
            aspect-ratio: 1;
            margin-inline: auto;
            border-radius: 50%;
            color: var(--ngp-audio-orb-accent);
            background: color-mix(in srgb, var(--ngp-audio-orb-accent) 12%, transparent);
            place-items: center;
        }

        .icon {
            width: 52%;
            height: 52%;
        }

        .waveform {
            width: 100%;
            color: var(--ngp-audio-orb-accent);
        }

        .orb[data-waveform='hidden'] .icon-surface {
            width: 80%;
        }

        .orb[data-compact] {
            transform: scale(calc(1 + var(--ngp-audio-orb-level) * 0.1));
            transition: transform 120ms ease-out;
        }

        .orb[data-compact] .aurora {
            inset: -10%;
            filter: blur(calc(var(--ngp-audio-orb-size) * 0.16));
        }

        .orb[data-compact] .pulse {
            inset: calc(7% - 3px);
            border-width: 2px;
            box-shadow: none;
        }

        .orb[data-compact] .surface {
            width: 86%;
            height: 86%;
            padding: 0;
            gap: calc(var(--ngp-audio-orb-size) * 0.02);
            box-shadow: 0 calc(var(--ngp-audio-orb-size) * 0.05) calc(var(--ngp-audio-orb-size) * 0.2)
                color-mix(in srgb, var(--mosaik-scheme-foreground) 14%, transparent);
        }

        .orb[data-compact]:not([data-waveform='hidden']) .icon-surface {
            width: 45%;
        }

        .orb[data-state='completed'] {
            --ngp-audio-orb-accent: var(--mosaik-color-success-600, #15803d);
        }

        .orb[data-state='completed'] .aurora {
            background: radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--ngp-audio-orb-accent) 72%, transparent), transparent 62%);
        }

        .orb[data-state='error'] {
            --ngp-audio-orb-accent: var(--mosaik-color-danger-600, #c62828);
        }

        .orb[data-state='paused'] {
            --ngp-audio-orb-accent: var(--mosaik-scheme-foreground-subtle);
        }

        .orb[data-state='speaking'] {
            --ngp-audio-orb-accent: var(--mosaik-color-info-600, #0969da);
        }

        .orb[data-state='listening'] .pulse,
        .orb[data-state='speaking'] .pulse {
            animation: ngp-audio-orb-pulse 2.2s ease-out infinite;
        }

        .orb[data-state='thinking'] .aurora {
            animation: ngp-audio-orb-rotate 6s linear infinite;
        }

        .orb[data-compact][data-state='listening'] .pulse,
        .orb[data-compact][data-state='speaking'] .pulse {
            animation-name: ngp-audio-orb-ring;
        }

        @keyframes ngp-audio-orb-ring {
            0%,
            100% {
                opacity: 0.45;
            }

            50% {
                opacity: 1;
            }
        }

        @keyframes ngp-audio-orb-pulse {
            0%,
            100% {
                opacity: 0.4;
                transform: scale(0.94);
            }

            50% {
                opacity: 0.9;
                transform: scale(1.05);
            }
        }

        @keyframes ngp-audio-orb-rotate {
            from {
                rotate: 0deg;
            }

            to {
                rotate: 360deg;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .aurora,
            .pulse {
                animation: none !important;
                transition: none;
            }

            .orb[data-compact] {
                transform: none;
                transition: none;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioActivityOrbComponent {
    // #region Properties

    /**
     * Normalized audio activity from zero to one.
     *
     * @public
     * @readonly
     */
    public readonly activityLevel: InputSignal<number> = input<number>(0);

    /**
     * Accessible description of the currently visualized activity.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel: InputSignal<string> = input.required<string>();

    /**
     * Emits Web Audio or Canvas errors raised by the embedded waveform.
     *
     * @public
     * @readonly
     */
    public readonly audioError: OutputEmitterRef<Error> = output<Error>();

    /** Scales the orb's effects and waveform to fit a compact surface. */
    public readonly compact = input(false);

    /**
     * Mosaik icon rendered in the center of the orb.
     *
     * @public
     * @readonly
     */
    public readonly iconName: InputSignal<string> = input<string>('mic');

    /**
     * Externally owned stream visualized by the embedded waveform.
     *
     * @public
     * @readonly
     */
    public readonly mediaStream: InputSignal<MediaStream | null> = input<MediaStream | null>(null);

    /**
     * Diameter of the complete orb. Numeric values are interpreted as CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly size: InputSignal<number | string> = input<number | string>(288);

    /**
     * Current visual activity state.
     *
     * @public
     * @readonly
     */
    public readonly state: InputSignal<AudioActivityState> = input<AudioActivityState>('idle');

    /**
     * Indicates whether the embedded waveform is rendered.
     *
     * @public
     * @readonly
     */
    public readonly waveformVisible: InputSignal<boolean> = input<boolean>(true);

    /**
     * Opacity used by the audio-reactive aurora.
     *
     * @protected
     * @readonly
     */
    protected readonly auroraOpacityStyle: Signal<string> = computed(() => {
        const activityLevel = this.normalizedActivityLevel();

        return (0.22 + activityLevel * 0.58).toFixed(3);
    });

    /**
     * Scale used by the audio-reactive aurora.
     *
     * @protected
     * @readonly
     */
    protected readonly auroraScaleStyle: Signal<string> = computed(() => {
        const activityLevel = this.normalizedActivityLevel();

        return (1 + activityLevel * 0.2).toFixed(3);
    });

    /**
     * Activity level restricted to the supported visual range.
     *
     * @protected
     * @readonly
     */
    protected readonly normalizedActivityLevel: Signal<number> = computed(() => {
        const activityLevel = this.activityLevel();

        return Number.isFinite(activityLevel) ? Math.min(1, Math.max(0, activityLevel)) : 0;
    });

    /**
     * CSS size applied to the component root.
     *
     * @protected
     * @readonly
     */
    protected readonly sizeStyle: Signal<string> = computed(() => {
        const size = this.size();

        return typeof size === 'number' ? `${Math.max(0, size)}px` : size;
    });

    /**
     * Waveform state derived from the richer orb activity state.
     *
     * @protected
     * @readonly
     */
    protected readonly waveformState: Signal<LiveAudioWaveformState> = computed(() => {
        switch (this.state()) {
            case 'error':
                return 'error';
            case 'listening':
                return 'listening';
            case 'paused':
                return 'paused';
            case 'speaking':
                return this.mediaStream() === null ? 'processing' : 'listening';
            case 'thinking':
                return 'processing';
            case 'completed':
            case 'idle':
            default:
                return 'idle';
        }
    });

    // #endregion
}
