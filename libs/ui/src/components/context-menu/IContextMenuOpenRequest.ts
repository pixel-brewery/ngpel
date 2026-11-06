/**
 * Describes one request to open a context menu at a viewport position.
 *
 * @typeParam T - Context value associated with the invoking item.
 * @public
 */
export interface IContextMenuOpenRequest<T> {
    /**
     * Horizontal viewport coordinate of the invocation.
     */
    readonly clientX: number;

    /**
     * Vertical viewport coordinate of the invocation.
     */
    readonly clientY: number;

    /**
     * Item-specific value exposed to the declarative menu template.
     */
    readonly context: T;

    /**
     * Element that initiated the menu and receives focus again after keyboard use.
     */
    readonly origin: HTMLElement;
}
