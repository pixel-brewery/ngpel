// #region Imports

import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, input, model, output, signal, untracked } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { FieldState } from '@angular/forms/signals';
import { AvatarComponent, ButtonComponent, FilePickerComponent, IconNameDirective, PressButtonComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { Appearance, IFilesPickedEventDetail, Size } from '@pixel-brewery/mosaik-elements-foundation';
import { MediaUrlPipe } from '@pixel-brewery/ngpel-core/browser';

// #endregion

/**
 * Event emitted when a file is selected via the file picker.
 *
 * @public
 */
export interface IImageAddedEvent {
    /**
     * The selected file.
     *
     * @public
     * @readonly
     */
    readonly file: File;
}

/**
 * Event emitted when the image is removed.
 *
 * @public
 */
export interface IImageRemovedEvent {
    /**
     * The previous image URL that was removed.
     *
     * @public
     * @readonly
     */
    readonly previousUrl: string | undefined;
}

/**
 * A reusable image editor component with avatar display, file picker, and remove button.
 * Implements ControlValueAccessor for Reactive Forms integration.
 *
 * @public
 */
@Component({
    selector: 'ngp-image-editor',
    imports: [AvatarComponent, ButtonComponent, PressButtonComponent, FilePickerComponent, IconNameDirective, MediaUrlPipe],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageEditorComponent),
            multi: true,
        },
    ],
    template: `
        <div class="flex flex-row items-center gap-2">
            <mosaik-avatar [src]="value() | ngpMediaUrl" [size]="size()" [appearance]="appearance()" [iconName]="iconName()" />
            <div class="flex flex-row gap-1">
                <mosaik-file-picker [accept]="accept()" [disabled]="isInteractionDisabled()" (filesPicked)="onFilesPicked($any($event))">
                    <mosaik-button [appearance]="'solid'" [size]="'small'" [iconName]="'edit'" [disabled]="isInteractionDisabled()" />
                </mosaik-file-picker>
                <mosaik-press-button
                    [appearance]="'solid'"
                    [size]="'small'"
                    [iconName]="'delete'"
                    [variant]="'danger'"
                    [disabled]="isRemoveDisabled()"
                    (pressed)="onRemove()"
                />
            </div>
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-disabled]': 'disabled()',
        '[class.disabled]': 'disabled()',
        '[class.readonly]': 'readonly()',
    },
})
export class ImageEditorComponent implements ControlValueAccessor {
    // #region Fields

    private readonly _instanceId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onChange: (value: string | null) => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onTouched: () => void = () => {};
    private readonly _isDisabled = signal(false);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ImageEditorComponent` class.
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

    /**
     * The current image URL value.
     *
     * @public
     * @readonly
     */
    public readonly value = model<string>();

    /**
     * Emitted when a new image file is selected.
     *
     * @public
     * @readonly
     */
    public readonly imageAdded = output<IImageAddedEvent>();

    /**
     * Emitted when the image is removed.
     *
     * @public
     * @readonly
     */
    public readonly imageRemoved = output<IImageRemovedEvent>();

    /**
     * Unique identifier for the component.
     *
     * @public
     * @readonly
     */
    public readonly id = input<string | null>(null);

    /**
     * Disables the image editor.
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
     * The icon to display when no image is set.
     *
     * @public
     * @readonly
     */
    public readonly iconName = input('person');

    /**
     * The size of the avatar.
     *
     * @public
     * @readonly
     */
    public readonly size = input<Size>('large');

    /**
     * The appearance style of the avatar.
     *
     * @public
     * @readonly
     */
    public readonly appearance = input<Appearance>('soft');

    /**
     * Accepted file types for the file picker.
     *
     * @public
     * @readonly
     */
    public readonly accept = input<Array<string>>(['image/*']);

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

        return explicitId?.trim() ? explicitId : `image-editor-${this._instanceId}`;
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
     * Whether the remove button should be disabled.
     *
     * @protected
     * @readonly
     */
    protected readonly isRemoveDisabled = computed(() => this.isInteractionDisabled() || !this.value());

    // #endregion

    // #region Methods

    /**
     * Handles file selection from the file picker.
     *
     * @param event - The files picked event detail.
     * @protected
     */
    protected onFilesPicked(event: IFilesPickedEventDetail): void {
        if (this.isInteractionDisabled()) {
            return;
        }

        if (event.files.length > 0) {
            const file = event.files.item(0);
            if (file) {
                const previewUrl = URL.createObjectURL(file);
                this.updateValue(previewUrl);
                this.imageAdded.emit({ file });
            }
        }
    }

    /**
     * Handles the remove button click.
     *
     * @protected
     */
    protected onRemove(): void {
        if (this.isInteractionDisabled() || !this.value()) {
            return;
        }

        const previousUrl = this.value();
        this.updateValue(undefined);
        this.imageRemoved.emit({ previousUrl });
    }

    /**
     * Updates the internal value and notifies form control.
     *
     * @param newValue - The new value to set.
     * @private
     */
    private updateValue(newValue: string | undefined): void {
        this.value.set(newValue);
        this._onChange(newValue ?? null);
        this._onTouched();

        const fieldFn = this.formField();
        if (fieldFn) {
            fieldFn().value.set(newValue ?? '');
        }
    }

    /**
     * Writes a new value from the form model.
     *
     * @param value - The value to write.
     * @public
     */
    public writeValue(value: string | null): void {
        this.value.set(value ?? undefined);
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
