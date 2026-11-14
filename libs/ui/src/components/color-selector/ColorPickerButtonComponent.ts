import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ColorPickerComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { ColorEditorElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import chroma from 'chroma-js';

/** Opens Mosaik's color picker beside a preset palette and emits an opaque RGB hex value. @public */
@Component({
    selector: 'ngp-color-picker-button',
    imports: [ColorPickerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        :host {
            display: inline-flex;
            align-items: center;
        }
        mosaik-color-picker::part(swatch) {
            display: none;
        }
        :host([data-spectrum='hue-wheel']) {
            flex-shrink: 0;
        }
        :host([data-spectrum='hue-wheel']) mosaik-color-picker {
            --color-picker-size: calc(var(--mosaik-layout-space) * 6);
        }
        [part='spectrum'] {
            display: block;
            inline-size: calc(var(--mosaik-layout-space) * 3);
            block-size: calc(var(--mosaik-layout-space) * 3);
            border-radius: 50%;
            background: conic-gradient(
                var(--mosaik-color-danger-500),
                var(--mosaik-color-warning-500),
                var(--mosaik-color-success-500),
                var(--mosaik-color-info-500),
                var(--mosaik-color-primary-500),
                var(--mosaik-color-danger-500)
            );
        }
        :host([data-spectrum='hue-wheel']) [part='spectrum'] {
            inline-size: 1.25rem;
            block-size: 1.25rem;
            background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
        }
    `,
    template: `
        <mosaik-color-picker
            format="hex"
            [value]="value() ?? fallbackColor()"
            [showAlpha]="false"
            [showInputs]="showInputs()"
            [showEyeDropper]="true"
            [intl]="intl()"
            [disabled]="disabled()"
            [attr.aria-label]="label()"
            (colorChanged)="onColorChange($event)"
            ><span part="spectrum" aria-hidden="true"></span
        ></mosaik-color-picker>
    `,
    host: { '[attr.data-spectrum]': 'spectrum()' },
})
export class ColorPickerButtonComponent {
    // #region Properties

    /** Current editor color, when chosen. */
    public readonly value = input<string | null>(null);
    /** Starting value passed to the color editor when the owning form has no selection. */
    public readonly fallbackColor = input<string>();
    /** Accessible label for the custom color action. */
    public readonly label = input('Choose custom color');
    /** Optional localized labels for the embedded Mosaik color editor. */
    public readonly intl = input<Partial<ColorEditorElementIntl>>();
    /** Overrides whether the underlying editor shows fields for typing color values. */
    public readonly showInputs = input<boolean>();
    /** Controls whether the trigger uses theme colors or a full visible hue wheel. */
    public readonly spectrum = input<'theme' | 'hue-wheel'>('theme');
    /** Whether the editor can open. */
    public readonly disabled = input(false);
    /** Emits a six-digit uppercase RGB hex color. */
    public readonly colorChange = output<string>();

    // #endregion

    // #region Methods

    protected onColorChange(value: unknown): void {
        if (this.disabled() || typeof value !== 'string' || !chroma.valid(value)) {
            return;
        }
        const color = chroma(value);
        if (color.alpha() === 1) {
            this.colorChange.emit(color.hex('rgb').toUpperCase());
        }
    }

    // #endregion
}
