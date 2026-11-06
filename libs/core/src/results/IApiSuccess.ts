/**
 * Represents a successful API response.
 *
 * @public
 */
export interface IApiSuccess<TData> {
    // #region Properties

    /**
     * Discriminator indicating a successful response.
     */
    readonly success: true;

    /**
     * The HTTP status code of the response.
     */
    readonly status: number;

    /**
     * The typed response data.
     */
    readonly data: TData;

    // #endregion
}
