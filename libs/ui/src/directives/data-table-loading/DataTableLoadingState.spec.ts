import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import { describe, expect, it } from 'vitest';
import { DataTableLoadingState, type ITableElement } from './DataTableLoadingState';

describe('Data table loading', () => {
    it('replaces stale cells with five skeleton rows, blocks selection and restores the response', () => {
        const state = new DataTableLoadingState();
        const attributes = new Map<string, string>();
        const nameColumn: IDataTableColumnDefinition = { key: 'name', title: 'Name', cellTemplate: () => 'old name' };
        const columns: Array<IDataTableColumnDefinition> = [nameColumn, { key: 'status', title: 'Status' }];
        const element: ITableElement = {
            source: [{ name: 'first' }, { name: 'second' }] as Array<unknown>,
            columnDefinitions: columns,
            selectionMode: 'single' as 'none' | 'single' | 'multiple',
            setAttribute: (name: string, value: string) => attributes.set(name, value),
            removeAttribute: (name: string) => attributes.delete(name),
        };

        state.update(element, true, element.source);
        expect(element.source).toHaveLength(5);
        expect(element.source).not.toContainEqual({ name: 'first' });
        expect(element.columnDefinitions).toHaveLength(2);
        expect(element.columnDefinitions.every((column) => column.cellTemplate !== undefined)).toBe(true);
        for (const column of element.columnDefinitions) {
            const skeleton = column.cellTemplate?.({}, column, '') as HTMLElement;
            expect(skeleton.localName).toBe('mosaik-skeleton');
            expect(skeleton.getAttribute('shimmer')).toBe('');
        }
        expect(element.selectionMode).toBe('none');
        expect(attributes.get('aria-busy')).toBe('true');

        const nextPage = [{ name: 'third' }];
        state.update(element, true, nextPage);
        expect(element.source).toHaveLength(5);

        state.update(element, false, nextPage);
        expect(element.source).toBe(nextPage);
        expect(element.columnDefinitions).toBe(columns);
        expect(element.columnDefinitions[0]?.cellTemplate?.({}, nameColumn, '')).toBe('old name');
        expect(element.selectionMode).toBe('single');
        expect(attributes.has('aria-busy')).toBe(false);
    });
});
