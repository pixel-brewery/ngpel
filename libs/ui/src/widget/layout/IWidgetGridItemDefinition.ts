// #region Imports

import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';

// #endregion

/**
 * One item a widget grid can place, with its text already resolved. It is the framework-free
 * projection of an `IWidget`: `toWidgetGridItemDefinition(...)` derives it, and a host that has no
 * widget registry at all can build it by hand.
 *
 * @public
 */
export interface IWidgetGridItemDefinition {
    // #region Properties

    /**
     * The stable item identifier, equal to the id of the widget it represents.
     */
    readonly id: string;

    /**
     * The resolved item title shown in the editor toolbox.
     */
    readonly title: string;

    /**
     * The resolved item description shown in the editor toolbox.
     */
    readonly description?: string;

    /**
     * The icon shown in the editor toolbox, named in the host's icon vocabulary.
     */
    readonly iconName?: string;

    /**
     * The zone the item starts out in.
     */
    readonly defaultZoneId: string;

    /**
     * The item order within its zone, used until the user reorders the zone.
     */
    readonly order: number;

    /**
     * Whether a newly discovered item is visible before the user customizes it.
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
