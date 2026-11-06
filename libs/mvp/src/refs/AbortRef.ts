/**
 * Represents a reference to an AbortController's signal and abort method.
 *
 * @public
 */
export type AbortRef = {
    // #region Properties

    /**
     * AbortSignal to be passed to async operations.
     */
    readonly signal: AbortSignal;

    // #endregion

    // #region Methods

    /**
     * Aborts the current operation.
     */
    abort(): void;

    // #endregion
};
