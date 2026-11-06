// #region Imports

import type { ImageMarkupSymbol } from './ImageMarkupSymbol';

// #endregion

/**
 * Value accepted as an image markup symbol.
 *
 * @public
 */
export type ImageMarkupSymbolValue = (typeof ImageMarkupSymbol)[keyof typeof ImageMarkupSymbol];
