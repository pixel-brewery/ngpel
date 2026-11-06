// #region Imports

import type { CompoundViewMode } from './CompoundViewMode';

// #endregion

/**
 * Supported view mode value of a compound collection.
 *
 * @public
 */
export type CompoundViewModeValue = (typeof CompoundViewMode)[keyof typeof CompoundViewMode];
