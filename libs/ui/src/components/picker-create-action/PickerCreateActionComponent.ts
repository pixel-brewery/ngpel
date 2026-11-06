// #region Imports

import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import { ButtonComponent, IconNameDirective } from '@pixel-brewery/mosaik-elements-angular';
import { CommandDirective } from '@pixel-brewery/ngpel-mvp';
import type { Command } from '@pixel-brewery/ngpel-mvp';

// #endregion

/**
 * Sticky primary action rendered above an entity picker list.
 *
 * @public
 */
@Component({
    selector: 'ngp-picker-create-action',
    template: `
        <div part="root" class="flex border-b border-(--mosaik-scheme-highlight) bg-(--mosaik-scheme-surface) p-4">
            <mosaik-button
                class="w-full"
                [label]="label()"
                [iconName]="'add'"
                [appearance]="'solid'"
                [variant]="'primary'"
                [ngpCommand]="{ click: createCommand() }"
            />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sticky top-0 z-10 block shrink-0',
    },
    imports: [ButtonComponent, CommandDirective, IconNameDirective],
})
export class PickerCreateActionComponent {
    // #region Fields

    /**
     * Label describing the entity create action.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Command opening the entity create workflow.
     *
     * @public
     * @readonly
     */
    public readonly createCommand: InputSignal<Command<void>> = input.required<Command<void>>();

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    // #endregion
}
