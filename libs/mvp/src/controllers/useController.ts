// #region Imports

import { DestroyRef, ElementRef, EnvironmentInjector, inject } from '@angular/core';
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
    const destroyRef = inject(DestroyRef);
    const controller = new controllerType({
        component: inject(EnvironmentInjector) as unknown as TComponent,
        element: inject(ElementRef<TElement>).nativeElement,
    });

    destroyRef.onDestroy(() => controller.hostDisconnected?.());
    controller.hostConnected?.();
    return controller;
}
