// #region Imports

import { Directive, inject, type Signal, signal } from '@angular/core';
import type { IWidgetSize } from '../models/IWidgetSize';
import type { IWidgetSizeCondition } from '../models/IWidgetSizeCondition';
import { matchesWidgetSize } from '../models/matchesWidgetSize';
import { WIDGET_SIZE } from '../provider/WIDGET_SIZE';

// #endregion

/**
 * The size a widget view assumes when no shell publishes one: rendering unconstrained is the safe
 * default, because a view that guesses "small" would hide content it has room for.
 */
const UNCONSTRAINED_WIDGET_SIZE: IWidgetSize = {
    columnSpan: Number.MAX_SAFE_INTEGER,
    rowSpan: Number.MAX_SAFE_INTEGER,
};

/**
 * Exposes the logical grid size of the surrounding widget to its own template, so a view can trade
 * detail for space without knowing anything about the grid that placed it.
 *
 * @public
 *
 * @example
 * ```html
 * <ng-container ngpWidgetView #view="ngpWidgetView">
 *     @if (view.matches({ columns: { min: 3 } })) {
 *         <ngp-revenue-chart />
 *     } @else {
 *         <ngp-widget-summary label="Revenue" [value]="total()" />
 *     }
 * </ng-container>
 * ```
 */
@Directive({
    selector: '[ngpWidgetView]',
    exportAs: 'ngpWidgetView',
})
export class WidgetViewDirective {
    // #region Fields

    private readonly _size: Signal<IWidgetSize> = inject(WIDGET_SIZE, { optional: true }) ?? signal(UNCONSTRAINED_WIDGET_SIZE).asReadonly();

    // #endregion

    // #region Properties

    /**
     * The current grid span of the surrounding widget, including an active resize preview.
     *
     * @public
     * @readonly
     */
    public get size(): Signal<IWidgetSize> {
        return this._size;
    }

    // #endregion

    // #region Methods

    /**
     * Evaluates whether the current grid span satisfies a template condition.
     *
     * @public
     * @param condition The condition declared by the template.
     * @returns Whether the current span satisfies the condition.
     */
    public matches(condition: IWidgetSizeCondition): boolean {
        return matchesWidgetSize(this._size(), condition);
    }

    // #endregion
}
