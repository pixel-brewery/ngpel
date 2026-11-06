// #region Imports

import type { IWidgetSpanRange } from './IWidgetSpanRange';
import type { IWidgetZone } from './IWidgetZone';

// #endregion

/**
 * The default placement and the resize constraints contributed by one widget. A persisted user
 * layout overrides the defaults without ever mutating the registered widget definition.
 *
 * @public
 */
export interface IWidgetLayout {
    // #region Properties

    /**
     * The dynamically contributed semantic zone used until the user moves the widget.
     */
    readonly defaultZone: IWidgetZone;

    /**
     * Whether the widget is visible before a user layout exists.
     */
    readonly enabledByDefault: boolean;

    /**
     * The supported column-span range and the initial column span.
     */
    readonly columnSpan: IWidgetSpanRange;

    /**
     * The supported row-span range and the initial row span.
     */
    readonly rowSpan: IWidgetSpanRange;

    // #endregion
}
