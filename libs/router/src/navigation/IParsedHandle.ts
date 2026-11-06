// #region Imports

import type { NavHandle } from './NavHandle';
import type { NavHandleScheme } from './NavHandleScheme';

// #endregion

/**
 * The parsed representation of a {@link NavHandle}.
 *
 * @public
 */
export interface IParsedHandle {
    // #region Properties

    /**
     * The scheme in front of the first colon.
     */
    readonly scheme: NavHandleScheme;

    /**
     * The value without scheme and without the query part, for example `/main/users` or
     * `dialog.open.settings`.
     */
    readonly path: string;

    /**
     * The decoded query parameters; a repeated parameter becomes an array.
     */
    readonly query: Readonly<Record<string, unknown>>;

    /**
     * The handle this representation was parsed from.
     */
    readonly raw: NavHandle;

    // #endregion
}
