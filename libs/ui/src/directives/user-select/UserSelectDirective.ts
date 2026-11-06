// #region Imports

import { DestroyRef, Directive, inject, output } from '@angular/core';
import { SelectComponent } from '@pixel-brewery/mosaik-elements-angular';
import { resolveMosaikSelectionValue } from '../../events/resolveMosaikSelectionValue';

// #endregion

/**
 * Ignores initial and bound-value selections emitted while Mosaik reconciles items.
 *
 * @public
 */
@Directive({
    selector: 'mosaik-select[ngpUserSelect]',
})
export class UserSelectDirective {
    // #region Fields

    private readonly _select = inject(SelectComponent);

    // #endregion

    // #region Ctor

    /**
     * Subscribes to the owning Mosaik select for the directive lifetime.
     *
     * @public
     */
    public constructor() {
        const subscription = this._select.selectionChanged.subscribe((value) => {
            const selected = resolveMosaikSelectionValue(value);
            const previous = typeof value === 'object' && value !== null && 'oldValue' in value ? (value as { oldValue: unknown }).oldValue : null;
            if (previous === null || selected === null || selected === this._select.value()) {
                return;
            }
            this.userSelected.emit(selected);
        });
        inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
    }

    // #endregion

    // #region Properties

    /**
     * Emits user-originated selections.
     *
     * @public
     * @readonly
     */
    public readonly userSelected = output<string>();

    // #endregion
}
