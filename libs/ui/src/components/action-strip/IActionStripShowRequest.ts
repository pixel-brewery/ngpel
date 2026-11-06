/**
 * Information required to show an action strip for one item.
 *
 * @typeParam T - Context value exposed to the declarative content template.
 * @public
 */
export interface IActionStripShowRequest<T> {
    /** Clipping ancestors that define the item's visible viewport. */
    readonly boundaries: ReadonlyArray<Element>;

    /** Item-specific context exposed as the content template's implicit value. */
    readonly context: T;

    /** Element that owns the action strip while it is visible. */
    readonly origin: HTMLElement;
}
