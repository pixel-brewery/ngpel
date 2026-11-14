// #region Imports

import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, input, model, output, signal, untracked } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { FieldState } from '@angular/forms/signals';
import {
    ButtonComponent,
    ColorSwatchComponent,
    DividerComponent,
    HintComponent,
    IconNameDirective,
    TextComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import { IColorPalette } from '@pixel-brewery/mosaik-elements-foundation';
import { ColorSelectorComponentIntl, provideColorSelectorComponentIntl } from './ColorSelectorComponentIntl';
import { EyeDropperDirective, type IEyeDropperColorChange } from '../../directives/eye-dropper/EyeDropperDirective';

// #endregion

/**
 * Event emitted when a color is selected.
 *
 * @public
 */
export interface IColorSelectedEvent {
    /**
     * The selected color value (hex string).
     *
     * @public
     * @readonly
     */
    readonly color: string;
}

/**
 * A reusable color selector component with palette selection and eye dropper support.
 * Implements ControlValueAccessor for Reactive Forms integration.
 *
 * @public
 */
@Component({
    selector: 'ngp-color-selector',
    imports: [ButtonComponent, ColorSwatchComponent, DividerComponent, EyeDropperDirective, HintComponent, IconNameDirective, TextComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorSelectorComponent),
            multi: true,
        },
        provideColorSelectorComponentIntl({
            colorAriaLabel: 'loc.colorSelector.colorAriaLabel',
        }),
    ],
    template: `
        <div
            class="flex flex-col border border-(--mosaik-scheme-highlight) rounded-(--mosaik-layout-radius) bg-(--mosaik-scheme-surface) px-3 py-2 shadow-(--mosaik-elevation-light)"
        >
            @if (label(); as labelText) {
                <div class="flex flex-row items-center">
                    <mosaik-text class="flex-1 surface-input-text" [text]="labelText" />
                </div>
            }
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2 items-center">
                    <div class="flex flex-1 flex-row items-center gap-1 flex-wrap">
                        @for (color of colorPalette(); track color) {
                            <button
                                type="button"
                                class="color-swatch-button cursor-pointer border-0 rounded p-0 bg-transparent"
                                [class.selected]="isSelected(color)"
                                [class.disabled]="isInteractionDisabled()"
                                [attr.disabled]="isInteractionDisabled() ? '' : null"
                                [attr.aria-label]="_intl.colorAriaLabel.replace('{0}', color)"
                                [attr.aria-pressed]="isSelected(color)"
                                (click)="selectColor(color)"
                            >
                                <mosaik-color-swatch [value]="color" />
                            </button>
                        }
                    </div>
                    @if (showEyeDropper()) {
                        <mosaik-divider orientation="vertical" class="h-6" />
                        <div class="relative">
                            <mosaik-button
                                [iconName]="'eyeDropper'"
                                [attr.aria-label]="eyeDropperLabel() || null"
                                [disabled]="isInteractionDisabled()"
                                ngpEyeDropper
                                (colorChange)="onEyeDropperColorChange($event)"
                            >
                                @if (eyeDropperIcon() === 'hue-wheel') {
                                    <span slot="icon" part="spectrum" aria-hidden="true"></span>
                                }
                            </mosaik-button>
                            @if (customColor(); as color) {
                                <span class="h-1 rounded-(--mosaik-layout-radius) absolute left-0 right-0 -bottom-2" [style.background-color]="color"></span>
                            }
                        </div>
                    }
                </div>
                @if (hint(); as hintText) {
                    <mosaik-hint [textOverflow]="'wrap'" [text]="hintText" />
                }
            </div>
        </div>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;

            [part='spectrum'] {
                display: block;
                inline-size: 1rem;
                block-size: 1rem;
                flex-shrink: 0;
                border-radius: 50%;
                background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
            }

            &.disabled {
                pointer-events: none;
                opacity: 0.5;
            }

            &.readonly {
                pointer-events: none;
            }

            .color-swatch-button {
                transition:
                    transform 0.1s ease-in-out,
                    box-shadow 0.1s ease-in-out;
                outline: none;

                &:hover:not(.disabled) {
                    transform: scale(1.1);
                }

                &:focus-visible {
                    box-shadow: 0 0 0 2px var(--mosaik-color-primary-500);
                    border-radius: var(--mosaik-layout-radius);
                }

                &.selected {
                    transform: scale(1.15);
                    box-shadow: 0 0 0 2px var(--mosaik-color-primary-500);
                    border-radius: var(--mosaik-layout-radius);
                }

                &.disabled {
                    cursor: not-allowed;
                }
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-disabled]': 'disabled()',
        '[class.disabled]': 'disabled()',
        '[class.readonly]': 'readonly()',
    },
})
export class ColorSelectorComponent implements ControlValueAccessor {
    // #region Fields

    protected readonly _intl: ColorSelectorComponentIntl = inject(ColorSelectorComponentIntl, { optional: true }) ?? new ColorSelectorComponentIntl();

    private readonly _instanceId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onChange: (value: string | null) => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onTouched: () => void = () => {};
    private readonly _isDisabled = signal(false);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ColorSelectorComponent` class.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            const fieldFn = this.formField();
            if (!fieldFn) {
                return;
            }

            const fieldState = fieldFn();
            const fieldValue = fieldState.value();

            untracked(() => {
                const currentValue = this.value();
                if (currentValue !== fieldValue) {
                    this.value.set(fieldValue);
                }
            });
        });
    }

    // #endregion

    // #region Properties

    /** Accessible label for the eye dropper action. */
    public readonly eyeDropperLabel = input('');

    /** Uses a hue wheel in the eye dropper's icon slot when requested. */
    public readonly eyeDropperIcon = input<'eye-dropper' | 'hue-wheel'>('eye-dropper');

    /**
     * The currently selected color value (hex string).
     *
     * @public
     * @readonly
     */
    public readonly value = model<string | null>(null);

    /**
     * Emitted when a color is selected.
     *
     * @public
     * @readonly
     */
    public readonly colorSelected = output<IColorSelectedEvent>();

    /**
     * Unique identifier for the component.
     *
     * @public
     * @readonly
     */
    public readonly id = input<string | null>(null);

    /**
     * Optional label text displayed above the color selector.
     *
     * @public
     * @readonly
     */
    public readonly label = input('');

    /**
     * Optional hint text displayed below the color selector.
     *
     * @public
     * @readonly
     */
    public readonly hint = input('');

    /**
     * Disables color selection.
     *
     * @public
     * @readonly
     */
    public readonly disabled = input(false);

    /**
     * Marks control as readonly.
     *
     * @public
     * @readonly
     */
    public readonly readonly = input(false);

    /**
     * The color palette to display. Defaults to Tailwind palette.
     *
     * @public
     * @readonly
     */
    public readonly colorPalette = input<ReadonlyArray<string>>(IColorPalette.TAILWIND_PALETTE.colors);

    /**
     * Whether to show the eye dropper button.
     *
     * @public
     * @readonly
     */
    public readonly showEyeDropper = input(true);

    /**
     * Optional Signal Forms field binding.
     * When provided, the component syncs its value with the form field.
     *
     * @public
     * @readonly
     */
    public readonly formField = input<(() => FieldState<string>) | null>(null);

    /**
     * Resolved unique identifier.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedId = computed(() => {
        const explicitId = this.id();

        return explicitId?.trim() ? explicitId : `color-selector-${this._instanceId}`;
    });

    /**
     * Computed disabled state combining input and form control state.
     *
     * @protected
     * @readonly
     */
    protected readonly isDisabled = computed(() => this.disabled() || this._isDisabled());

    /**
     * Computed interaction disabled state.
     *
     * @protected
     * @readonly
     */
    protected readonly isInteractionDisabled = computed(() => this.isDisabled() || this.readonly());

    /**
     * Returns the custom color if the current value is not in the palette.
     *
     * @protected
     * @readonly
     */
    protected readonly customColor = computed(() => {
        const currentValue = this.value();
        if (!currentValue) {
            return null;
        }

        const palette = this.colorPalette();
        const isInPalette = palette.some((color) => color.toLowerCase() === currentValue.toLowerCase());

        return isInPalette ? null : currentValue;
    });

    // #endregion

    // #region Methods

    /**
     * Selects a color from the palette.
     *
     * @param color - The color value to select.
     * @protected
     */
    protected selectColor(color: string): void {
        if (this.isInteractionDisabled()) {
            return;
        }

        this.value.set(color);
        this._onChange(color);
        this._onTouched();
        this.colorSelected.emit({ color });

        const fieldFn = this.formField();
        if (fieldFn) {
            fieldFn().value.set(color);
        }
    }

    /**
     * Handles color selection from the eye dropper.
     *
     * @param event - The eye dropper color change event.
     * @protected
     */
    protected onEyeDropperColorChange(event: IEyeDropperColorChange): void {
        if (this.isInteractionDisabled()) {
            return;
        }

        this.selectColor(event.color);
    }

    /**
     * Checks if a color is currently selected.
     *
     * @param color - The color to check.
     * @returns True if the color is selected.
     * @protected
     */
    protected isSelected(color: string): boolean {
        return this.value()?.toLowerCase() === color.toLowerCase();
    }

    /**
     * Writes a new value from the form model.
     *
     * @param value - The value to write.
     * @public
     */
    public writeValue(value: string | null): void {
        this.value.set(value);
    }

    /**
     * Registers a callback for value changes.
     *
     * @param fn - The callback function.
     * @public
     */
    public registerOnChange(fn: (value: string | null) => void): void {
        this._onChange = fn;
    }

    /**
     * Registers a callback for touch events.
     *
     * @param fn - The callback function.
     * @public
     */
    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    /**
     * Sets the disabled state from the form control.
     *
     * @param isDisabled - Whether the control should be disabled.
     * @public
     */
    public setDisabledState(isDisabled: boolean): void {
        this._isDisabled.set(isDisabled);
    }

    // #endregion
}
