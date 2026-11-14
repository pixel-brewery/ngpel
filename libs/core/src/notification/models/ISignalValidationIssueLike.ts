/**
 * Structural shape of a Signal Forms validation issue, for reporting without a dependency on Angular Forms. Each entry of {@link ISignalValidationIssueLike.errors}
 * is inspected for a user-facing message — a string, a signal of a string, or an object carrying
 * either under `message`.
 *
 * @public
 */
export interface ISignalValidationIssueLike {
    // #region Properties

    /**
     * The errors the validator produced for one field.
     */
    readonly errors: ReadonlyArray<unknown>;

    // #endregion
}
