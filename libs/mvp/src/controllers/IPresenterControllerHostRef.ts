// #region Imports

import type { Injector } from '@angular/core';
import type { IViewPresenter } from '../presenters/IViewPresenter';

// #endregion

/**
 * What a presenter controller is handed about the presenter that owns it.
 *
 * The controller is created while the presenter's own fields are still initializing, so no
 * presenter instance exists yet to hand over. What does exist is the presenter's injector, which is
 * everything a controller needs: it resolves collaborators and it is the scope the controller's own
 * lifetime is bound to.
 *
 * @public
 * @typeParam TPresenter The legacy presenter type used by existing controllers.
 */
export interface IPresenterControllerHostRef<TPresenter extends IViewPresenter = IViewPresenter> {
    // #region Properties

    /**
     * The injector of the owning presenter.
     *
     * @public
     * @readonly
     */
    readonly injector: Injector;

    /**
     * The legacy controller context, retained for source and runtime compatibility.
     *
     * @remarks
     * Historically this property contained the owning injector cast to the presenter type.
     * It continues to reference that same injector; it does not expose a presenter instance.
     *
     * @public
     * @readonly
     * @deprecated Resolve collaborators through `injector` or Angular's `inject()` instead.
     */
    readonly presenter: TPresenter;

    // #endregion
}
