// #region Imports

import type { IPresenterControllerHostRef } from './IPresenterControllerHostRef';
import type { IViewPresenter } from '../presenters/IViewPresenter';

// #endregion

/**
 * A reusable, behavior-only unit hosted by a {@link ViewPresenter}.
 *
 * A presenter controller is not a service and not a binding abstraction: it encapsulates one
 * feature's behavior and its lifecycle inside the presenter's scope. Unlike an
 * {@link IReactiveController}, which is hosted by a component and reaches the DOM, a presenter
 * controller works purely in the presenter's domain.
 *
 * Create one through `usePresenterController`, which binds it to the presenter's lifetime.
 *
 * @public
 * @typeParam TPresenter The legacy presenter type used by the controller host.
 */
export interface IPresenterController<TPresenter extends IViewPresenter = IViewPresenter> {
    // #region Properties

    /**
     * The presenter that owns the controller.
     *
     * @public
     * @readonly
     */
    readonly host: IPresenterControllerHostRef<TPresenter>;

    // #endregion

    // #region Methods

    /**
     * Called once, immediately after the controller was created in the presenter's injection
     * context.
     *
     * @public
     */
    presenterConnected?(): void;

    /**
     * Called once, while the owning presenter is disposed.
     *
     * @public
     */
    presenterDisconnected?(): void;

    // #endregion
}
