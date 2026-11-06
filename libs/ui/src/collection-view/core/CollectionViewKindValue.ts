// #region Imports

import { CollectionViewKind } from './CollectionViewKind';

// #endregion

/**
 * Union of all collection-view projection kinds.
 *
 * @public
 */
export type CollectionViewKindValue = (typeof CollectionViewKind)[keyof typeof CollectionViewKind];
