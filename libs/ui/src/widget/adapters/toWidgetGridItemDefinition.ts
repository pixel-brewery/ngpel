// #region Imports

import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';
import type { IWidget } from '../models/IWidget';

// #endregion

/**
 * Projects a registered widget onto the framework-free item contract the layout algebra works with,
 * resolving the widget's reactive text on the way. Calling it inside a `computed(...)` keeps the
 * derived definitions in step with a title that arrives with a late translation.
 *
 * It is the one bridge between the two halves of this entry point, so a host never has to restate
 * a widget's default zone and span constraints in a second shape.
 *
 * @public
 * @param widget The registered widget.
 * @returns The item definition for the layout algebra.
 */
export function toWidgetGridItemDefinition(widget: IWidget): IWidgetGridItemDefinition {
    return {
        id: widget.id,
        title: widget.title(),
        description: widget.subTitle?.(),
        iconName: widget.layout.defaultZone.iconName,
        defaultZoneId: widget.layout.defaultZone.id,
        order: widget.order,
        enabledByDefault: widget.layout.enabledByDefault,
        columnSpan: widget.layout.columnSpan,
        rowSpan: widget.layout.rowSpan,
    };
}
