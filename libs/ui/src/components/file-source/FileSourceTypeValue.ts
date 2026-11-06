// #region Imports

import type { FileSourceType } from './FileSourceType';

// #endregion

/**
 * Value represented by {@link FileSourceType}.
 *
 * @public
 */
export type FileSourceTypeValue = (typeof FileSourceType)[keyof typeof FileSourceType];
