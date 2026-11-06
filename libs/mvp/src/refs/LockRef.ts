/**
 * Controls a nestable interaction lock.
 *
 * @public
 */
export type LockRef = {
    // #region Methods

    /**
     * Acquires one interaction lock.
     */
    enter(): void;

    /**
     * Releases one interaction lock.
     */
    leave(): void;

    // #endregion
};
