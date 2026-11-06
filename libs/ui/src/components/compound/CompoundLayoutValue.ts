// #region Imports

import type { CompoundLayout } from './CompoundLayout';

// #endregion

/** A supported compound layout. @public */
export type CompoundLayoutValue = (typeof CompoundLayout)[keyof typeof CompoundLayout];
