/**
 * Provides a strongly typed reference to the hosting Angular component instance
 * and its host DOM element.
 *
 * This reference represents the explicit and type-safe equivalent of Lit's
 * implicit `this` inside a controller.
 *
 * @public
 * @template TComponent The concrete component instance type.
 * @template TElement The concrete host element type.
 */
export interface IControllerHostRef<TComponent extends object, TElement extends HTMLElement = HTMLElement> {
    // #region Properties

    /**
     * The Angular component instance that owns the controller.
     *
     * @public
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
