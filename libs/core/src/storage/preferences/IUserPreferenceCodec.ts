// #region Imports

import type { IValueCodec } from '../codecs/IValueCodec';

// #endregion

/**
 * A codec over the JSON payload of a user preference. The storage adapter owns the JSON
 * serialization, so the codec sees the parsed payload as `unknown` and must validate it.
 *
 * @typeParam T The preference value type.
 * @public
 */
export type IUserPreferenceCodec<T> = IValueCodec<unknown, T>;
