// #region Imports

import type { IProblemDetail } from './IProblemDetail';

// #endregion

/**
 * Represents a failed API response with Problem Detail information.
 *
 * @public
 */
export interface IApiFailure {
    // #region Properties

    /**
     * Discriminator indicating a failed response.
     */
    readonly success: false;

    /**
     * The HTTP status code of the error response.
     */
    readonly status: number;

    /**
     * The structured Problem Detail error information.
     */
    readonly problem: IProblemDetail;

    // #endregion
}
