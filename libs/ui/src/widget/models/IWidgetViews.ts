// #region Imports

import type { Type } from '@angular/core';

// #endregion

/**
 * The lazily loaded components of one widget: the face it normally shows and an optional back side
 * a shell may flip to. Both are loaders rather than component references, so a dashboard only pays
 * for the widgets it actually renders.
 *
 * @public
 */
export interface IWidgetViews {
    // #region Properties

    /**
     * Loads the component shown on the widget's front.
     */
    readonly front: () => Promise<Type<unknown>>;

    /**
     * Loads the component shown on the widget's back.
     */
    readonly back?: () => Promise<Type<unknown>>;

    // #endregion
}
