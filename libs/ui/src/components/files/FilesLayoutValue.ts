// #region Imports

import type { FilesLayout } from './FilesLayout';

// #endregion

/**
 * Value represented by {@link FilesLayout}.
 *
 * @public
 */
export type FilesLayoutValue = (typeof FilesLayout)[keyof typeof FilesLayout];
