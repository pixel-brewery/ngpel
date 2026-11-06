// #region Imports

import type { LoadingRef } from '../refs/LoadingRef';

// #endregion

/**
 * Where an asynchronous command reports its loading state: a {@link LoadingRef} itself or an owner that
 * exposes one (typically a view presenter), so `asyncCommand(handler, gate, this)` reads naturally.
 *
 * @public
 */
export type LoadingRefSource = LoadingRef | { readonly loadingRef: LoadingRef };
