// #region Imports

import type { IControllerHostRef } from './IControllerHostRef';

// #endregion

/**
 * Represents a reusable, behavior-only unit hosted by an Angular component.
 *
 * A reactive controller is not a service and not a binding abstraction.
 * Its sole responsibility is to encapsulate feature-specific behavior
 * and lifecycle-related logic.
 *
 * Controllers are created via {@link useController} and are automatically
 * connected to the hosting component's lifetime.
 *
 * @public
 * @template TComponent The concrete component instance type.
 * @template TElement The concrete host element type.
 */
export interface IReactiveController<TComponent extends object = object, TElement extends HTMLElement = HTMLElement> {
    // #region Properties

    /**
     * Provides access to the owning component instance and host element.
     *
     * @public
     */
    readonly host: IControllerHostRef<TComponent, TElement>;

    // #endregion

    // #region Methods

    /**
     * Called once when the controller is connected to the host component.
     *
     * @public
     */
    hostConnected?(): void;

    /**
     * Called once when the host component is destroyed.
     *
     * @public
     */
    hostDisconnected?(): void;

    // #endregion
}
