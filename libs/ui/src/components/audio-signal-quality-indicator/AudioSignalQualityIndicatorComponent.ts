// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import type { AudioSignalQuality } from './AudioSignalQuality';

// #endregion

/**
 * Displays an accessible, business-agnostic audio signal quality state.
 *
 * @public
 */

@Component({
    selector: 'ngp-audio-signal-quality-indicator',
    imports: [],
    template: `
        <div part="root" class="indicator" role="status" aria-live="polite" aria-atomic="true" [attr.data-quality]="quality()">
            @if (showMeter()) {
                <span part="meter" class="meter" aria-hidden="true">
                    @for (bar of bars; track bar) {
                        <span part="bar" class="bar" [class.bar--active]="bar <= activeBarCount()"></span>
                    }
                </span>
            }

            <span part="copy" class="copy">
                <span part="label" class="label">{{ label() }}</span>
                @if (description()) {
                    <span part="description" class="description">{{ description() }}</span>
                }
            </span>
        </div>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: inline-block;
        }

        .indicator {
            --ngp-audio-signal-color: var(--mosaik-scheme-foreground-subtle);

            display: inline-flex;
            max-width: 100%;
            align-items: center;
            gap: 0.625rem;
            color: var(--ngp-audio-signal-color);
        }

        .meter {
            display: inline-flex;
            height: 1.125rem;
            flex: 0 0 auto;
            align-items: flex-end;
            gap: 0.1875rem;
        }

        .bar {
            display: block;
            width: 0.1875rem;
            min-height: 0.25rem;
            border-radius: 999px;
            background: color-mix(in srgb, currentcolor 20%, transparent);
            transition:
                background-color 160ms ease-out,
                transform 160ms ease-out;
        }

        .bar:nth-child(1) {
            height: 28%;
        }

        .bar:nth-child(2) {
            height: 50%;
        }

        .bar:nth-child(3) {
            height: 74%;
        }

        .bar:nth-child(4) {
            height: 100%;
        }

        .bar--active {
            background: currentcolor;
            transform: scaleY(1.04);
            transform-origin: bottom;
        }

        .copy {
            display: flex;
            min-width: 0;
            flex-direction: column;
            gap: 0.0625rem;
        }

        .label {
            overflow: hidden;
            font: var(--mosaik-typography-body2);
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .description {
            overflow: hidden;
            color: var(--mosaik-scheme-foreground-subtle);
            font: var(--mosaik-typography-supporting);
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .indicator[data-quality='good'] {
            --ngp-audio-signal-color: var(--mosaik-color-success-600, #15803d);
        }

        .indicator[data-quality='fair'] {
            --ngp-audio-signal-color: var(--mosaik-color-warning-600, #a16207);
        }

        .indicator[data-quality='poor'],
        .indicator[data-quality='no-signal'],
        .indicator[data-quality='clipping'] {
            --ngp-audio-signal-color: var(--mosaik-color-danger-600, #c62828);
        }

        .indicator[data-quality='clipping'] .meter {
            animation: ngp-audio-signal-clipping 900ms ease-in-out infinite;
        }

        @keyframes ngp-audio-signal-clipping {
            50% {
                opacity: 0.45;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .bar {
                transition: none;
            }

            .indicator[data-quality='clipping'] .meter {
                animation: none;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioSignalQualityIndicatorComponent {
    // #region Fields

    /**
     * Stable bar identifiers used by the signal-strength meter.
     *
     * @protected
     * @readonly
     */
    protected readonly bars: ReadonlyArray<number> = [1, 2, 3, 4];

    // #endregion

    // #region Properties

    /**
     * Optional supporting description, for example a measured decibel value.
     *
     * @public
     * @readonly
     */
    public readonly description: InputSignal<null | string> = input<null | string>(null);

    /**
     * Human-readable, localized label for the current quality state.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Current technical audio signal quality.
     *
     * @public
     * @readonly
     */
    public readonly quality: InputSignal<AudioSignalQuality> = input<AudioSignalQuality>('unknown');

    /**
     * Indicates whether the four-bar signal meter is rendered.
     *
     * @public
     * @readonly
     */
    public readonly showMeter: InputSignal<boolean> = input<boolean>(true);

    /**
     * Number of active meter bars derived from the current quality.
     *
     * @protected
     * @readonly
     */
    protected readonly activeBarCount: Signal<number> = computed(() => {
        switch (this.quality()) {
            case 'clipping':
            case 'good':
                return 4;
            case 'fair':
                return 3;
            case 'poor':
                return 1;
            case 'no-signal':
            case 'unknown':
            default:
                return 0;
        }
    });

    // #endregion
}
