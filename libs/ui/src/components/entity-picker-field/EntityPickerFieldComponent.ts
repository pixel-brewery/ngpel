// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ButtonComponent, FormFieldStateDirective, IconNameDirective, StackComponent, TextBoxComponent } from '@pixel-brewery/mosaik-elements-angular';
import { type Command, CommandDirective } from '@pixel-brewery/ngpel-mvp';

// #endregion

/**
 * Presents the label of a selected entity and delegates choosing or clearing it to caller commands.
 * The value of a surrounding form field can remain an identifier independent of the display text.
 *
 * @public
 */
@Component({
    selector: 'ngp-entity-picker-field',
    imports: [ButtonComponent, CommandDirective, IconNameDirective, StackComponent, TextBoxComponent],
    template: `
        <mosaik-textbox
            [attr.test-id]="testId()"
            [value]="value()"
            [variant]="'primary'"
            [label]="label()"
            [placeholder]="placeholder()"
            [required]="required()"
            [readonly]="true"
            [invalid]="invalid()"
            [disabled]="disabled()"
        >
            @if (actionsAvailable()) {
                <mosaik-stack slot="suffix" [orientation]="'horizontal'" [gap]="'tiny'">
                    @if (availableClearCommand(); as command) {
                        <mosaik-button
                            [attr.test-id]="actionTestId('clear')"
                            [attr.aria-label]="clearActionLabel()"
                            [attr.title]="clearActionLabel()"
                            [iconName]="'dismiss'"
                            [appearance]="'plain'"
                            [size]="'small'"
                            [type]="'button'"
                            [ngpCommand]="{ click: command }"
                            [ngpCommandParameter]="commandParameter()"
                        />
                    }
                    <mosaik-button
                        [attr.test-id]="actionTestId('open')"
                        [attr.aria-label]="openActionLabel()"
                        [attr.title]="openActionLabel()"
                        [iconName]="'moreHorizontal'"
                        [appearance]="'plain'"
                        [size]="'small'"
                        [type]="'button'"
                        [ngpCommand]="{ click: openCommand() }"
                        [ngpCommandParameter]="commandParameter()"
                    />
                </mosaik-stack>
            }
        </mosaik-textbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'block' },
})
export class EntityPickerFieldComponent {
    // #region Fields

    private readonly _formField = inject(FormFieldStateDirective, { optional: true });

    // #endregion

    // #region Properties

    /** Display value of the selected entity. */
    public readonly value = input('');

    /** Visible field label. */
    public readonly label = input.required<string>();

    /** Hint displayed when the selection has no label. */
    public readonly placeholder = input('');

    /** Whether the selection is required. */
    public readonly required = input(false);

    /** Disables the field and its picker actions. */
    public readonly disabled = input(false);

    /** Allows selection changes through the picker actions. */
    public readonly editable = input(true);

    /** Allows clearing the current selection. */
    public readonly clearable = input(true);

    /** Indicates whether an entity is selected, independently of its display label. */
    public readonly selected = input(false);

    /** Accessible label required to show the clear action. */
    public readonly clearActionLabel = input('');

    /** Accessible label for the picker action. */
    public readonly openActionLabel = input.required<string>();

    /** Command that clears the current selection. */
    public readonly clearCommand = input<Command<unknown>>();

    /** Command that opens the picker. */
    public readonly openCommand = input.required<Command<unknown>>();

    /** Optional parameter passed to either command. */
    public readonly commandParameter = input<unknown>();

    /** Automation identifier for the textbox. */
    public readonly testId = input<string>();

    /** Optional explicit automation identifier for the clear action. */
    public readonly clearActionTestId = input<string>();

    /** Optional explicit automation identifier for the picker action. */
    public readonly openActionTestId = input<string>();

    protected readonly actionsAvailable = computed(() => this.editable() && !this.disabled());
    protected readonly availableClearCommand = computed(() =>
        this.clearable() && this.selected() && this.clearActionLabel().trim() ? this.clearCommand() : undefined,
    );
    protected readonly invalid = computed(() => {
        const state = this._formField?.fieldState();

        return state?.invalid() === true && state.touched();
    });

    // #endregion

    // #region Methods

    protected actionTestId(action: 'clear' | 'open'): string | undefined {
        const explicitTestId = action === 'clear' ? this.clearActionTestId() : this.openActionTestId();
        const testId = this.testId();

        return explicitTestId ?? (testId ? `${testId}-${action}` : undefined);
    }

    // #endregion
}
