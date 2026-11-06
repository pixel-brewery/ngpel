// #region Imports

import type { IProblemDetail } from './IProblemDetail';

// #endregion

/**
 * Error thrown when an API call returns a failure result. Wraps the {@link IProblemDetail}
 * so callers can inspect the structured error information in their error handler.
 *
 * @public
 */
export class ApiResultError extends Error {
    // #region Fields

    private readonly _problem: IProblemDetail;
    private readonly _status: number;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ApiResultError` class.
     *
     * @public
     * @param problem The structured problem detail of the failed response.
     * @param status The HTTP status code of the failed response.
     */
    public constructor(problem: IProblemDetail, status: number) {
        super(problem.detail ?? problem.title);
        this.name = 'ApiResultError';
        this._problem = problem;
        this._status = status;
    }

    // #endregion

    // #region Properties

    /**
     * The structured Problem Detail from the API response.
     *
     * @public
     */
    public get problem(): IProblemDetail {
        return this._problem;
    }

    /**
     * The HTTP status code of the failed response.
     *
     * @public
     */
    public get status(): number {
        return this._status;
    }

    // #endregion
}
