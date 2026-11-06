// #region Imports

import type { IParsedHandle } from './IParsedHandle';
import type { NavHandle } from './NavHandle';
import type { NavHandleScheme } from './NavHandleScheme';

// #endregion

const SCHEMES: ReadonlyArray<NavHandleScheme> = ['route', 'cmd', 'ext'];

/**
 * Parses a {@link NavHandle} into its scheme, value and query parameters. The scheme ends at the
 * **first** colon, so values that contain further colons — an `https://` URL, a namespaced command
 * id — survive intact.
 *
 * @public
 * @param raw The handle to parse.
 * @returns The parsed handle.
 * @throws Error when the handle carries no value or an unknown scheme.
 *
 * @example
 * ```typescript
 * parseHandle('ext:https://example.test/docs?tab=api');
 * // { scheme: 'ext', path: 'https://example.test/docs', query: { tab: 'api' }, raw: '…' }
 * ```
 */
export function parseHandle(raw: NavHandle): IParsedHandle {
    const colonIndex = raw.indexOf(':');

    if (colonIndex === -1 || colonIndex === raw.length - 1) {
        throw new Error(`Invalid navigation handle "${raw}": missing value after the scheme.`);
    }

    const scheme = raw.slice(0, colonIndex) as NavHandleScheme;

    if (!SCHEMES.includes(scheme)) {
        throw new Error(`Invalid navigation handle "${raw}": unknown scheme "${scheme}".`);
    }

    const value = raw.slice(colonIndex + 1);
    const queryIndex = value.indexOf('?');
    const path = queryIndex === -1 ? value : value.slice(0, queryIndex);
    const query: Record<string, unknown> = {};

    if (queryIndex !== -1) {
        new URLSearchParams(value.slice(queryIndex + 1)).forEach((parameterValue, parameterName): void => {
            const decoded = decodeValue(parameterValue);
            const previous: unknown = query[parameterName];

            if (!Object.prototype.hasOwnProperty.call(query, parameterName)) {
                query[parameterName] = decoded;
            } else {
                query[parameterName] = Array.isArray(previous) ? [...previous, decoded] : [previous, decoded];
            }
        });
    }

    return { scheme, path, query, raw };
}

/**
 * Decodes the literals `true`, `false`, `null` and finite numbers; everything else stays a string.
 */
function decodeValue(value: string): unknown {
    const lowerCase = value.toLowerCase();

    if (lowerCase === 'true') {
        return true;
    }

    if (lowerCase === 'false') {
        return false;
    }

    if (lowerCase === 'null') {
        return null;
    }

    const numberValue = Number(value);

    return Number.isFinite(numberValue) && value.trim().length > 0 ? numberValue : value;
}
