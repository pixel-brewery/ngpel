// #region Imports

import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetGridItemLayout } from './IWidgetGridItemLayout';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import { clamp } from './internal/clamp';

// #endregion

/**
 * Grows or shrinks one widget by a number of grid cells, clamped to the constraints the widget
 * itself declares. A resize gesture therefore never has to be validated by the pointer code: an
 * over-long drag simply stops at the widget's own maximum.
 *
 * @public
 * @param layout The current layout.
 * @param definition The definition carrying the widget's span constraints.
 * @param columnDelta The number of columns to add, negative to remove.
 * @param rowDelta The number of rows to add, negative to remove.
 * @returns The layout with the resized widget, or the unchanged layout when the widget has no
 * placement.
 */
export function resizeWidgetGridItem(
    layout: IWidgetGridLayout,
    definition: IWidgetGridItemDefinition,
    columnDelta: number,
    rowDelta: number,
): IWidgetGridLayout {
    return {
        ...layout,
        items: layout.items.map((item): IWidgetGridItemLayout =>
            item.widgetId === definition.id
                ? {
                      ...item,
                      columnSpan: clamp(item.columnSpan + columnDelta, definition.columnSpan.min, definition.columnSpan.max),
                      rowSpan: clamp(item.rowSpan + rowDelta, definition.rowSpan.min, definition.rowSpan.max),
                  }
                : item,
        ),
    };
}
