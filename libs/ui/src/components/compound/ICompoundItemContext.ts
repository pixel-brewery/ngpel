/**
 * Context exposed to a compound item's dynamic template.
 *
 * @typeParam T - Collection item type supplied by the consumer.
 * @public
 */
export interface ICompoundItemContext<T> {
    /**
     * Active item exposed as the template's implicit value.
     *
     * @public
     * @readonly
     */
    readonly $implicit: T;

    /**
     * Active item exposed as a named template value.
     *
     * @public
     * @readonly
     */
    readonly item: T;

    /**
     * Zero-based index of the active item.
     *
     * @public
     * @readonly
     */
    readonly index: number;

    /**
     * Total number of items in the collection.
     *
     * @public
     * @readonly
     */
    readonly count: number;
}
