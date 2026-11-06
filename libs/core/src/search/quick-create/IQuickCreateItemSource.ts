import type { IQuickCreateItem } from './IQuickCreateItem';

/**
 * Interface for dynamic quick-create item sources (injectable classes).
 *
 * @public
 */
export interface IQuickCreateItemSource {
    /**
     * Returns the quick-create items provided by this source.
     */
    getItems(): ReadonlyArray<IQuickCreateItem>;
}
