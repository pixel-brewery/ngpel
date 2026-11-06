// #region Imports

import type { IApiFailure } from './IApiFailure';
import type { IApiFailureSource } from './IApiFailureSource';
import type { IProblemDetail } from './IProblemDetail';
import { isProblemDetail } from './isProblemDetail';

// #endregion

const UNKNOWN_ERROR_TITLE = 'Unknown Error';

/**
 * Creates a failed API result envelope from a transport-agnostic failure source. When the body is
 * a problem detail it is carried over (missing `title`/`status` members are backfilled from the
 * response); otherwise a synthetic problem is built from the status text and message.
 *
 * @public
 * @param source The failed response.
 * @returns The failure envelope.
 */
export function toApiFailure(source: IApiFailureSource): IApiFailure {
    const problem = isProblemDetail(source.body, source.contentType) ? normalizeProblem(source.body, source) : fallbackProblem(source);

    return { success: false, status: source.status, problem };
}

function normalizeProblem(body: IProblemDetail, source: IApiFailureSource): IProblemDetail {
    const title = typeof body.title === 'string' && body.title.length > 0 ? body.title : fallbackTitle(source);
    const status = typeof body.status === 'number' ? body.status : source.status;

    return { ...body, title, status };
}

function fallbackProblem(source: IApiFailureSource): IProblemDetail {
    const problem: IProblemDetail = { title: fallbackTitle(source), status: source.status };

    return source.message ? { ...problem, detail: source.message } : problem;
}

function fallbackTitle(source: IApiFailureSource): string {
    return source.statusText || UNKNOWN_ERROR_TITLE;
}
