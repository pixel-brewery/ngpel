/**
 * Defines a reference for managing loading states.
 *
 * @public
 */
export type LoadingRef = {
    // #region Methods

    /**
     * Indicates the start of a loading operation.
     */
    enter(): void;

    /**
     * Indicates the end of a loading operation.
     */
    leave(): void;

    // #endregion
};
