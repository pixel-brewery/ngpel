import { signal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { defineTableCollectionView } from '../views/table/defineTableCollectionView';
import { createCollectionView } from './createCollectionView';

interface Item {
    readonly id: number;
    readonly category: string;
}

const table = defineTableCollectionView<Item, 'table'>({ type: 'table', label: 'Table' });

describe('createCollectionView', () => {
    it('projects late-arriving filter options without resetting the active criteria', () => {
        const options = signal<ReadonlyArray<{ value: string; label: string }>>([]);
        const collection = createCollectionView<Item, 'table'>({
            fields: [{ key: 'category', title: 'Category', filter: { type: 'select', options } }],
            views: [table],
            defaultView: 'table',
        });
        collection.setFilterValues({ category: 'wood' });
        expect(collection.filterDefinitions()[0]?.options).toEqual([]);

        options.set([{ value: 'wood', label: 'Wood' }]);

        expect(collection.filterDefinitions()[0]?.options).toEqual([{ value: 'wood', label: 'Wood' }]);
        expect(collection.activeFilters()).toEqual({ category: 'wood' });
    });

    it('preserves the whole-number filter constraint in the filter definition', () => {
        const collection = createCollectionView<Item, 'table'>({
            fields: [{ key: 'id', title: 'ID', filter: { type: 'number', integer: true } }],
            views: [table],
            defaultView: 'table',
        });

        expect(collection.filterDefinitions()[0]?.integer).toBe(true);
    });
});
