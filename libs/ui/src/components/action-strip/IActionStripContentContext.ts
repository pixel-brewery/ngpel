/**
 * Template context supplied to declarative action-strip content.
 *
 * @typeParam T - Context value resolved by the trigger.
 * @public
 */
export interface IActionStripContentContext<T> {
    /**
     * Context value resolved for the item currently hosting the strip.
     */
    readonly $implicit: T;
}
