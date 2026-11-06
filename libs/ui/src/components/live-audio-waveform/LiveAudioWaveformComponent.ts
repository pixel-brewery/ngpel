// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, output, type InputSignal, type OutputEmitterRef, type Signal } from '@angular/core';
import type { ILiveAudioWaveformCanvasConfiguration } from './ILiveAudioWaveformCanvasConfiguration';
import { LiveAudioWaveformCanvasDirective } from './LiveAudioWaveformCanvasDirective';
import type { LiveAudioWaveformMode } from './LiveAudioWaveformMode';
import type { LiveAudioWaveformState } from './LiveAudioWaveformState';

// #endregion

/**
 * Renders a reusable live audio spectrum without taking ownership of its media stream.
 *
 * @public
 */
@Component({
    selector: 'ngp-live-audio-waveform',
    template: `
        <div part="root" class="relative h-full w-full overflow-hidden" role="img" [attr.aria-label]="resolvedAriaLabel()" [style.height]="heightStyle()">
            @if (showsIdleBaseline()) {
                <div part="baseline" class="absolute top-1/2 right-0 left-0 -translate-y-1/2 border-t-2 border-dotted border-current opacity-20"></div>
            }
            <canvas
                ngpLiveAudioWaveformCanvas
                part="canvas"
                class="block h-full w-full"
                aria-hidden="true"
                [configuration]="canvasConfiguration()"
                [mediaStream]="mediaStream()"
                (audioError)="audioError.emit($event)"
            ></canvas>
        </div>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
            color: var(--mosaik-scheme-foreground-subtle);
        }

        [part='canvas'] {
            color: var(--mosaik-scheme-foreground-subtle);
        }
    `,
    exportAs: 'liveAudioWaveform',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LiveAudioWaveformCanvasDirective],
})
export class LiveAudioWaveformComponent {
    // #region Properties

    /**
     * Accessible label that overrides the state-specific default label.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Optional CSS color used to draw the waveform bars.
     *
     * @public
     * @readonly
     */
    public readonly barColor: InputSignal<null | string> = input<null | string>(null);

    /**
     * Horizontal gap between bars in CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly barGap: InputSignal<number> = input<number>(1);

    /**
     * Minimum rendered bar height in CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly barHeight: InputSignal<number> = input<number>(4);

    /**
     * Corner radius of each waveform bar in CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly barRadius: InputSignal<number> = input<number>(1.5);

    /**
     * Width of each waveform bar in CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly barWidth: InputSignal<number> = input<number>(3);

    /**
     * Emits a technical Web Audio or Canvas error without changing the visual state.
     *
     * @public
     * @readonly
     */
    public readonly audioError: OutputEmitterRef<Error> = output<Error>();

    /**
     * Indicates whether the waveform should fade at both horizontal edges.
     *
     * @public
     * @readonly
     */
    public readonly fadeEdges: InputSignal<boolean> = input<boolean>(true);

    /**
     * Width of each horizontal edge fade in CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly fadeWidth: InputSignal<number> = input<number>(24);

    /**
     * Fast Fourier transform size used by the internal analyser.
     *
     * @public
     * @readonly
     */
    public readonly fftSize: InputSignal<number> = input<number>(256);

    /**
     * Visible component height as a CSS length or pixel number.
     *
     * @public
     * @readonly
     */
    public readonly height: InputSignal<number | string> = input<number | string>(64);

    /**
     * Maximum amount of samples retained by scrolling mode.
     *
     * @public
     * @readonly
     */
    public readonly historySize: InputSignal<number> = input<number>(60);

    /**
     * Externally owned media stream analysed while the state is `listening`.
     *
     * @public
     * @readonly
     */
    public readonly mediaStream: InputSignal<MediaStream | null> = input<MediaStream | null>(null);

    /**
     * Selects a mirrored spectrum or a right-to-left sample history.
     *
     * @public
     * @readonly
     */
    public readonly mode: InputSignal<LiveAudioWaveformMode> = input<LiveAudioWaveformMode>('static');

    /**
     * Multiplier applied to analyser values before rendering.
     *
     * @public
     * @readonly
     */
    public readonly sensitivity: InputSignal<number> = input<number>(1);

    /**
     * Smoothing value applied by the Web Audio analyser.
     *
     * @public
     * @readonly
     */
    public readonly smoothingTimeConstant: InputSignal<number> = input<number>(0.8);

    /**
     * Current visual and analysis state.
     *
     * @public
     * @readonly
     */
    public readonly state: InputSignal<LiveAudioWaveformState> = input<LiveAudioWaveformState>('idle');

    /**
     * Minimum delay between live analyser samples in milliseconds.
     *
     * @public
     * @readonly
     */
    public readonly updateRate: InputSignal<number> = input<number>(30);

    /**
     * Internal canvas configuration derived from the public inputs.
     *
     * @protected
     * @readonly
     */
    protected readonly canvasConfiguration: Signal<ILiveAudioWaveformCanvasConfiguration> = computed(() => ({
        barColor: this.barColor(),
        barGap: this.barGap(),
        barHeight: this.barHeight(),
        barRadius: this.barRadius(),
        barWidth: this.barWidth(),
        fadeEdges: this.fadeEdges(),
        fadeWidth: this.fadeWidth(),
        fftSize: this.fftSize(),
        historySize: this.historySize(),
        mode: this.mode(),
        sensitivity: this.sensitivity(),
        smoothingTimeConstant: this.smoothingTimeConstant(),
        state: this.state(),
        updateRate: this.updateRate(),
    }));

    /**
     * CSS height applied to the waveform container.
     *
     * @protected
     * @readonly
     */
    protected readonly heightStyle: Signal<string> = computed(() => {
        const height = this.height();

        return typeof height === 'number' ? `${Math.max(0, height)}px` : height;
    });

    /**
     * Accessible state description exposed by the control.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedAriaLabel: Signal<string> = computed(() => {
        const ariaLabel = this.ariaLabel()?.trim();

        return ariaLabel || this.getDefaultAriaLabel(this.state());
    });

    /**
     * Indicates whether the reference-compatible dotted idle baseline is visible.
     *
     * @protected
     * @readonly
     */
    protected readonly showsIdleBaseline: Signal<boolean> = computed(() => {
        const state = this.state();

        return state === 'error' || state === 'idle';
    });

    // #endregion

    // #region Methods

    /**
     * Resolves the default accessible label for a visual state.
     *
     * @param state - Current waveform state.
     * @private
     * @returns Accessible state label.
     */
    private getDefaultAriaLabel(state: LiveAudioWaveformState): string {
        switch (state) {
            case 'listening':
                return 'Live audio waveform';
            case 'processing':
                return 'Processing audio';
            case 'paused':
                return 'Audio waveform paused';
            case 'error':
                return 'Audio waveform unavailable';
            case 'idle':
            default:
                return 'Audio waveform idle';
        }
    }

    // #endregion
}
