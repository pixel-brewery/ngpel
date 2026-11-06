// #region Imports

import type { IWidgetGridItemLayout } from './IWidgetGridItemLayout';
import type { IWidgetGridLayout } from './IWidgetGridLayout';

// #endregion

/**
 * Shows or hides one widget while keeping its placement, so bringing it back puts it exactly where
 * the user last had it.
 *
 * @public
 * @param layout The current layout.
 * @param widgetId The id of the widget to show or hide.
 * @param enabled Whether the widget is visible.
 * @returns The layout with the visibility applied, or the unchanged layout when the widget is
 * unknown.
 */
export function setWidgetGridItemEnabled(layout: IWidgetGridLayout, widgetId: string, enabled: boolean): IWidgetGridLayout {
    return {
        ...layout,
        items: layout.items.map((item): IWidgetGridItemLayout => (item.widgetId === widgetId ? { ...item, enabled } : item)),
    };
}
