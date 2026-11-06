/**
 * Provides the host DOM element and the original Angular environment context to a component controller.
 *
 * @public
 * @template TComponent The concrete component instance type.
 * @template TElement The concrete host element type.
 */
export interface IControllerHostRef<TComponent extends object, TElement extends HTMLElement = HTMLElement> {
    // #region Properties

    /**
     * Legacy environment injector cast to the component type.
     *
     * @public
     * @deprecated Resolve scoped collaborators with Angular's `inject()` during construction.
     */
    readonly component: TComponent;

    /**
     * The host DOM element of the component instance.
     *
     * @public
     */
    readonly element: TElement;

    // #endregion
}
