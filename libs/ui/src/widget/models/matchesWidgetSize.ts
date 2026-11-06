// #region Imports

import type { IWidgetSize } from './IWidgetSize';
import type { IWidgetSizeCondition } from './IWidgetSizeCondition';
import type { IWidgetSizeRange } from './IWidgetSizeRange';

// #endregion

/**
 * Evaluates whether a logical widget size satisfies an exact or ranged template condition. Both
 * axes must match; an axis the condition omits is unconstrained.
 *
 * @public
 * @param size The current logical size of the widget.
 * @param condition The condition declared by the widget template.
 * @returns Whether the size satisfies the condition.
 *
 * @example
 * ```typescript
 * matchesWidgetSize({ columnSpan: 2, rowSpan: 4 }, { columns: { min: 1, max: 2 } }); // true
 * ```
 */
export function matchesWidgetSize(size: IWidgetSize, condition: IWidgetSizeCondition): boolean {
    return matchesSpan(size.columnSpan, condition.columns) && matchesSpan(size.rowSpan, condition.rows);
}

/**
 * Evaluates one axis against an exact span, an inclusive range, or no constraint at all.
 */
function matchesSpan(value: number, condition: number | IWidgetSizeRange | undefined): boolean {
    if (condition === undefined) {
        return true;
    }

    if (typeof condition === 'number') {
        return value === condition;
    }

    return (condition.min === undefined || value >= condition.min) && (condition.max === undefined || value <= condition.max);
}
