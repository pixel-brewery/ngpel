// #region Imports

import { CollectionViewType } from './CollectionViewType';

// #endregion

/**
 * Union of all built-in collection view types.
 *
 * @public
 */
export type CollectionViewTypeValue = (typeof CollectionViewType)[keyof typeof CollectionViewType];
