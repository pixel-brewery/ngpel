/**
 * Represents a type that can be disposed.
 *
 * @public
 */
export type DisposableRef = {
    // #region Methods

    /**
     * Disposes the instance and releases resources.
     */
    dispose(): void;

    // #endregion
};
