// #region Imports

import type { ImageMarkupTool } from './ImageMarkupTool';

// #endregion

/**
 * Value accepted as an image markup tool.
 *
 * @public
 */
export type ImageMarkupToolValue = (typeof ImageMarkupTool)[keyof typeof ImageMarkupTool];
