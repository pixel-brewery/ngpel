/**
 * Template context supplied to declarative context-menu content.
 *
 * @typeParam T - Context value resolved by the trigger.
 * @public
 */
export interface IContextMenuContentContext<T> {
    /**
     * Context value resolved for the item that opened the menu.
     */
    readonly $implicit: T;
}
