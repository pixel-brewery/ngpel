// #region Imports

import type { ICollectionField } from './ICollectionField';

// #endregion

/**
 * Defines a collection field with full type inference.
 *
 * @param field - The collection field configuration.
 * @returns The field configuration.
 *
 * @public
 */
export function defineCollectionField<TItem>(field: ICollectionField<TItem>): ICollectionField<TItem> {
    return field;
}
