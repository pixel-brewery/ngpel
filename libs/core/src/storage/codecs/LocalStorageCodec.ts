// #region Imports

import type { IValueCodec } from './IValueCodec';

// #endregion

/**
 * A codec over the string representation of Web Storage (`localStorage`/`sessionStorage`).
 * Every built-in codec of this package (`stringCodec`, `booleanCodec`, `jsonCodec`, ...) has this
 * shape; `fromNullable` lifts it to `string | null` for URL parameters.
 *
 * @typeParam T The typed application value.
 * @public
 */
export type LocalStorageCodec<T> = IValueCodec<string, T>;
