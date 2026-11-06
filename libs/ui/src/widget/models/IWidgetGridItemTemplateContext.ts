// #region Imports

import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';

// #endregion

/**
 * The context a widget grid hands to the template that renders one item.
 *
 * @public
 */
export interface IWidgetGridItemTemplateContext {
    // #region Properties

    /**
     * The item being rendered.
     *
     * @public
     * @readonly
     */
    readonly $implicit: IWidgetGridItemDefinition;

    /**
     * The logical size of the item, including a live resize preview while the user drags a handle.
     *
     * @public
     * @readonly
     */
    readonly size: {
        readonly columnSpan: number;
        readonly rowSpan: number;
    };

    // #endregion
}
