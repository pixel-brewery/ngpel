// #region Imports

import type { FileState } from './FileState';

// #endregion

/**
 * Union of visual states supported by the file component.
 *
 * @public
 */
export type FileStateValue = (typeof FileState)[keyof typeof FileState];
