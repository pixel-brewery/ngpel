// #region Imports

import type { SignalSubject } from './SignalSubject';

// #endregion

/**
 * Transforms one signal subject into another.
 *
 * @public
 * @typeParam T The source value type.
 * @typeParam R The resulting value type.
 */
export type SignalOperator<T, R> = (source: SignalSubject<T>) => SignalSubject<R>;
