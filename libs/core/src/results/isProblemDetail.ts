// #region Imports

import type { IProblemDetail } from './IProblemDetail';
import { PROBLEM_DETAIL_MEDIA_TYPE } from './PROBLEM_DETAIL_MEDIA_TYPE';

// #endregion

/**
 * Determines whether a response body is an RFC 9457 problem detail. A body qualifies when the
 * response was declared as `application/problem+json` (header detection) or when the body carries
 * a `title` together with a numeric `status` or a textual `detail` (body detection). Both
 * detection paths are treated alike so header-only and body-only producers behave the same.
 *
 * @public
 * @param value The parsed response body.
 * @param contentType The optional `Content-Type` header of the response.
 * @returns `true` when the value should be treated as a problem detail.
 */
export function isProblemDetail(value: unknown, contentType?: string | null): value is IProblemDetail {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    if (contentType?.toLowerCase().includes(PROBLEM_DETAIL_MEDIA_TYPE)) {
        return true;
    }

    const candidate = value as Record<string, unknown>;

    return typeof candidate['title'] === 'string' && (typeof candidate['status'] === 'number' || typeof candidate['detail'] === 'string');
}
