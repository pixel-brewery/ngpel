/**
 * The reason a {@link ReactiveCacheRegistrar} reported a change.
 *
 * @public
 */
export const ReactiveCacheChangedReason = {
    /**
     * One or more items were added to the collection.
     */
    Add: 'add',

    /**
     * One or more items were removed from the collection.
     */
    Remove: 'remove',

    /**
     * The contents of the collection changed dramatically.
     */
    Reset: 'reset',
} as const satisfies Record<string, string>;

/**
 * Union of the {@link ReactiveCacheChangedReason} values.
 *
 * @public
 */
export type ReactiveCacheChangedReason = (typeof ReactiveCacheChangedReason)[keyof typeof ReactiveCacheChangedReason];
