/**
 * The reason a {@link SignalCacheRegistrar} reported a change.
 *
 * @public
 */
export const SignalCacheChangedReason = {
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
 * Union of the {@link SignalCacheChangedReason} values.
 *
 * @public
 */
export type SignalCacheChangedReason = (typeof SignalCacheChangedReason)[keyof typeof SignalCacheChangedReason];
