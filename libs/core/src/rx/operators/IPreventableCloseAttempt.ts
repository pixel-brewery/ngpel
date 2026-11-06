/**
 * Close attempt contract for implicit interactions (backdrop click, Escape) that can be cancelled.
 *
 * @public
 */
export interface IPreventableCloseAttempt {
    // #region Methods

    /**
     * Prevents the current implicit close operation.
     */
    preventClose(): void;

    // #endregion
}
