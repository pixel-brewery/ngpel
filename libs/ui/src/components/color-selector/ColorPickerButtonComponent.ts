import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ColorPickerComponent } from '@pixel-brewery/mosaik-elements-angular';

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
    `,
    template: `
        <mosaik-color-picker
            format="hex"
            [value]="value() ?? undefined"
            [showAlpha]="false"
            [showEyeDropper]="true"
            [disabled]="disabled()"
            [attr.aria-label]="label()"
            (colorChanged)="onColorChange($event)"
            ><span part="spectrum" aria-hidden="true"></span
        ></mosaik-color-picker>
    `,
})
export class ColorPickerButtonComponent {
    // #region Properties

    /** Current editor color, when chosen. */
    public readonly value = input<string | null>(null);
    /** Accessible label for the custom color action. */
    public readonly label = input('Choose custom color');
    /** Whether the editor can open. */
    public readonly disabled = input(false);
    /** Emits a six-digit uppercase RGB hex color. */
    public readonly colorChange = output<string>();

    // #endregion

    // #region Methods

    protected onColorChange(value: unknown): void {
        if (this.disabled() || typeof value !== 'string') {
            return;
        }
        const hex = value.trim().toUpperCase();
        if (/^#[0-9A-F]{6}(?:FF)?$/u.test(hex)) {
            this.colorChange.emit(hex.slice(0, 7));
        } else if (/^#[0-9A-F]{3}F?$/u.test(hex)) {
            this.colorChange.emit('#' + [...hex.slice(1, 4)].map((digit) => digit + digit).join(''));
        }
    }

    // #endregion
}
