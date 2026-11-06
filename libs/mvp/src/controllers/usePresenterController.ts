// #region Imports

import { DestroyRef, EnvironmentInjector, inject, Injector, runInInjectionContext } from '@angular/core';
import type { IPresenterController } from './IPresenterController';
import type { IPresenterControllerHostRef } from './IPresenterControllerHostRef';
import type { PresenterControllerFactory } from './PresenterControllerFactory';
import type { IViewPresenter } from '../presenters/IViewPresenter';

// #endregion

/**
 * Manages the controller lifetimes of one presenter instance. Exactly one exists per presenter, and
 * it is created lazily with the first controller.
 */
class PresenterControllerHost {
    // #region Fields

    private readonly _controllers = new Set<IPresenterController>();

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `PresenterControllerHost` class.
     *
     * @param destroyRef The lifetime of the owning presenter.
     */
    public constructor(destroyRef: DestroyRef) {
        destroyRef.onDestroy(() => this.disconnectAll());
    }

    // #endregion

    // #region Methods

    /**
     * Registers a controller and connects it immediately.
     *
     * @param controller The controller to register.
     */
    public add(controller: IPresenterController): void {
        this._controllers.add(controller);
        controller.presenterConnected?.();
    }

    /**
     * Disconnects every registered controller.
     */
    private disconnectAll(): void {
        for (const controller of this._controllers) {
            controller.presenterDisconnected?.();
        }

        this._controllers.clear();
    }

    // #endregion
}

/** One controller host per presenter injector; the injector is the presenter's identity here. */
let presenterControllerHosts: WeakMap<Injector, PresenterControllerHost> | undefined;

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
    const environmentInjector = inject(EnvironmentInjector);
    const hosts = (presenterControllerHosts ??= new WeakMap<Injector, PresenterControllerHost>());
    let host = hosts.get(environmentInjector);

    if (host === undefined) {
        host = runInInjectionContext(environmentInjector, () => new PresenterControllerHost(inject(DestroyRef)));
        hosts.set(environmentInjector, host);
    }

    const hostRef: IPresenterControllerHostRef = {
        injector: environmentInjector,
        // Preserve the original runtime context without changing the supported injector API.
        presenter: environmentInjector as unknown as IViewPresenter,
    };
    const isConstructor = controllerFactory.prototype?.constructor === controllerFactory;
    const controller = runInInjectionContext(environmentInjector, () =>
        isConstructor
            ? new (controllerFactory as new (host: IPresenterControllerHostRef) => IPresenterController)(hostRef)
            : (controllerFactory as (host: IPresenterControllerHostRef) => IPresenterController)(hostRef),
    );

    host.add(controller);

    return controller;
}
