// #region Imports

import { DestroyRef, EnvironmentInjector, inject, Injector } from '@angular/core';
import type { IPresenterController } from './IPresenterController';
import type { IPresenterControllerHostRef } from './IPresenterControllerHostRef';
import type { PresenterControllerFactory } from './PresenterControllerFactory';
import type { IViewPresenter } from '../presenters/IViewPresenter';

// #endregion

/**
 * Creates a presenter controller and binds it to the lifetime of the presenter that creates it.
 *
 * Call it from a field initializer or the constructor of a presenter. The controller is constructed
 * inside the presenter's injection context, so it may `inject()` whatever it needs, and it is
 * disconnected when the presenter's injector is destroyed — no lifecycle hook has to be forwarded.
 *
 * @typeParam TController The concrete controller type.
 * @public
 * @param controllerFactory The controller class, or a factory that builds one from the host.
 * @returns The connected controller.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class OrderListViewPresenter extends ViewPresenter {
 *     public readonly filters = usePresenterController(FilterController);
 *     public readonly presence = usePresenterController((host) => new PresenceController(host, config));
 * }
 * ```
 */
export function usePresenterController<TController extends IPresenterController>(controllerFactory: PresenterControllerFactory<TController>): TController;
export function usePresenterController<TPresenter extends IViewPresenter, TController extends IPresenterController<TPresenter>>(
    controllerFactory: ((host: IPresenterControllerHostRef<TPresenter>) => TController) | (new (host: IPresenterControllerHostRef<TPresenter>) => TController),
): TController;
export function usePresenterController(controllerFactory: PresenterControllerFactory<IViewPresenter, IPresenterController>): IPresenterController {
    const destroyRef = inject(DestroyRef);
    const hostRef: IPresenterControllerHostRef = {
        injector: inject(Injector),
        presenter: inject(EnvironmentInjector) as unknown as IViewPresenter,
    };
    const isConstructor = controllerFactory.prototype?.constructor === controllerFactory;
    const controller = isConstructor
        ? new (controllerFactory as new (host: IPresenterControllerHostRef) => IPresenterController)(hostRef)
        : (controllerFactory as (host: IPresenterControllerHostRef) => IPresenterController)(hostRef);

    destroyRef.onDestroy(() => controller.presenterDisconnected?.());
    controller.presenterConnected?.();

    return controller;
}
