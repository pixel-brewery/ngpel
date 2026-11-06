// #region Imports

import type { IViewPresenter } from '../presenters/IViewPresenter';

// #endregion

/**
 * Contract of the View half of the Model-View-Presenter triad: it exposes exactly one presenter to
 * its template and owns that presenter's lifecycle.
 *
 * @typeParam TPresenter The concrete presenter the View provides.
 * @public
 */
export interface IView<TPresenter extends IViewPresenter> {
    // #region Properties

    /**
     * The presenter backing this view.
     */
    readonly presenter: TPresenter;

    // #endregion
}
