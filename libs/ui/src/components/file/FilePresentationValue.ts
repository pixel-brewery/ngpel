// #region Imports

import { FilePresentation } from './FilePresentation';

// #endregion

/**
 * Union of semantic file presentation values.
 *
 * @public
 */
export type FilePresentationValue = (typeof FilePresentation)[keyof typeof FilePresentation];
