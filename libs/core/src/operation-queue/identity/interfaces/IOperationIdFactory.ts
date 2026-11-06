// #region Imports

// #endregion

/**
 * Strategy for generating unique operation entry identifiers.
 *
 * @public
 */
export interface IOperationIdFactory {
    /**
     * Creates a new unique identifier string.
     *
     * @returns A unique identifier.
     * @public
     */
    create(): string;
}
