/**
 * Transport-agnostic description of a failed response, the input of {@link toApiFailure}.
 * HTTP adapters map their native error type (for example Angular's `HttpErrorResponse`) onto
 * this shape; the core stays free of any transport dependency.
 *
 * @public
 */
export interface IApiFailureSource {
    // #region Properties

    /**
     * The HTTP status code of the response (`0` for network failures).
     */
    readonly status: number;

    /**
     * The HTTP status text of the response, used as the fallback problem title.
     */
    readonly statusText?: string;

    /**
     * A transport-level error message, used as the fallback problem detail.
     */
    readonly message?: string;

    /**
     * The parsed response body, inspected for an RFC 9457 problem detail.
     */
    readonly body?: unknown;

    /**
     * The `Content-Type` header of the response, enabling header-based problem detection.
     */
    readonly contentType?: string | null;

    // #endregion
}
