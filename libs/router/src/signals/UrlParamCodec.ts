// #region Imports

import type { IValueCodec } from '@pixel-brewery/ngpel-core/storage';

// #endregion

/**
 * A codec over the serialized representation of a URL parameter, where an absent parameter reaches
 * `parse()` as `null`. This is the same contract that backs Web Storage in
 * `@pixel-brewery/ngpel-core/storage`, so every codec of that package becomes a URL parameter
 * codec through `fromNullable(...)` — the router package deliberately ships no codec set of its own.
 *
 * @typeParam T The typed application value.
 * @public
 *
 * @example
 * ```typescript
 * import { fromNullable, positiveIntegerCodec } from '@pixel-brewery/ngpel-core/storage';
 *
 * const codec: UrlParamCodec<number> = fromNullable(positiveIntegerCodec);
 * ```
 */
export type UrlParamCodec<T> = IValueCodec<string | null, T>;
