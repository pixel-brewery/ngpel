// #region Imports

import type { IPresenterController } from './IPresenterController';
import type { IPresenterControllerHostRef } from './IPresenterControllerHostRef';
import type { IViewPresenter } from '../presenters/IViewPresenter';

// #endregion

/**
 * A class or factory function that produces a presenter controller for a host.
 *
 * @remarks
 * Both `PresenterControllerFactory<Controller>` and the original
 * `PresenterControllerFactory<Presenter, Controller>` spelling are supported.
 *
 * @typeParam TPresenterOrController The presenter type, or the controller for the one-argument form.
 * @typeParam TController The concrete controller type for the two-argument form.
 * @public
 */
export type PresenterControllerFactory<
    TPresenterOrController extends IViewPresenter | IPresenterController,
    TController extends IPresenterController = FactoryController<TPresenterOrController>,
> =
    | ((host: IPresenterControllerHostRef<HostPresenter<TPresenterOrController>>) => TController)
    | (new (host: IPresenterControllerHostRef<HostPresenter<TPresenterOrController>>) => TController);

type HostPresenter<T> = T extends IViewPresenter ? T : IViewPresenter;

type FactoryController<T> = T extends IPresenterController ? T : IPresenterController<HostPresenter<T>>;
