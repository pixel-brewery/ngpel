// #region Imports

import { DestroyRef, ElementRef, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import type { IControllerHostRef } from './IControllerHostRef';
import type { IReactiveController } from './IReactiveController';

// #endregion

/**
 * Creates a controller instance and binds it automatically to the current
 * component instance lifecycle.
 *
 * This function must be called within a component class body.
 * No `new` keyword is required in user code.
 *
 * Cleanup is guaranteed via {@link DestroyRef} without patching or forwarding
 * Angular lifecycle hooks.
 *
 * @public
 * @template TComponent The concrete component instance type.
 * @template TElement The concrete host element type.
 * @template TController The concrete controller type.
 * @param controllerType The controller class to instantiate.
 * @returns The instantiated controller.
 * @example
 * ```ts
 * export class MyComponent {
 *     public readonly controller = useController(MyController);
 * }
 * ```
 */
export function useController<TComponent extends object, TElement extends HTMLElement, TController extends IReactiveController<TComponent, TElement>>(
    controllerType: new (host: IControllerHostRef<TComponent, TElement>) => TController,
): TController {
    // #region Fields

    const environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);
    const componentKey: TComponent = environmentInjector as unknown as TComponent;

    // #endregion

    // #region Methods

    let internalHost: ControllerHostImpl | undefined = CONTROLLER_HOSTS.get(componentKey);

    if (!internalHost) {
        internalHost = runInInjectionContext(environmentInjector, (): ControllerHostImpl => {
            const destroyRef: DestroyRef = inject(DestroyRef);
            return new ControllerHostImpl(destroyRef);
        });

        CONTROLLER_HOSTS.set(componentKey, internalHost);
    }

    const elementRef: ElementRef<TElement> = inject(ElementRef<TElement>);
    const hostRef: IControllerHostRef<TComponent, TElement> = {
        component: componentKey,
        element: elementRef.nativeElement,
    };
    const controller: TController = runInInjectionContext(environmentInjector, (): TController => new controllerType(hostRef));

    internalHost.add(controller);
    return controller;

    // #endregion
}

/**
 * Manages controller lifetimes for a single component instance.
 *
 * Exactly one instance exists per component instance.
 * It is created lazily when the first controller is requested.
 *
 * @private
 */
class ControllerHostImpl {
    // #region Fields

    private readonly _controllers: Set<IReactiveController>;
    private readonly _destroyRef: DestroyRef;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the {@link ControllerHostImpl} class.
     *
     * @param destroyRef The destroy reference bound to the component instance.
     */
    public constructor(destroyRef: DestroyRef) {
        this._controllers = new Set<IReactiveController>();
        this._destroyRef = destroyRef;

        this._destroyRef.onDestroy((): void => {
            this.disconnectAll();
        });
    }

    // #endregion

    // #region Methods

    /**
     * Adds a controller and connects it immediately.
     *
     * @param controller The controller to register.
     */
    public add(controller: IReactiveController): void {
        this._controllers.add(controller);
        controller.hostConnected?.();
    }

    /**
     * Disconnects all controllers and clears internal state.
     */
    private disconnectAll(): void {
        for (const controller of this._controllers) {
            controller.hostDisconnected?.();
        }
        this._controllers.clear();
    }

    // #endregion
}

/**
 * Associates component instances with their internal controller hosts.
 *
 * A {@link WeakMap} is used to ensure component instances can be garbage
 * collected naturally.
 *
 * @private
 */
const CONTROLLER_HOSTS = new WeakMap<object, ControllerHostImpl>();
