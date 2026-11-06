// #region Imports

import type { IDrawerRef } from '@pixel-brewery/mosaik-elements-angular';
import type { IDocumentPreviewRequest } from './IDocumentPreviewRequest';

// #endregion

/**
 * Existing Mosaik drawer reference for dismissing or observing a document preview.
 *
 * @public
 */
export type IDocumentPreviewRef = IDrawerRef<IDocumentPreviewRequest, void>;
