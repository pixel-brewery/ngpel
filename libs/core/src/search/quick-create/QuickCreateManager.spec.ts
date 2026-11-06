// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IQuickCreateItem } from './IQuickCreateItem';
import type { IQuickCreateItemSource } from './IQuickCreateItemSource';
import { provideQuickCreate } from './provideQuickCreate';
import { withQuickCreateItems } from './withQuickCreateItems';
import { QuickCreateManager } from './QuickCreateManager';

// #endregion

describe('Contextual create actions', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('exposes permitted static and dynamic actions while hiding denied actions', () => {
        // arrange
        const staticItem = createItem('static:create');
        const dynamicItem = createItem('dynamic:create');
        const deniedItem = createItem('denied:create', false);
        const manager = createManager([staticItem, deniedItem], [createSource(dynamicItem)]);

        // act
        const items = manager.items;

        // assert
        expect(items).toEqual([staticItem, dynamicItem]);
        expect(manager.getItem(deniedItem.id)).toBeUndefined();
    });

    it('executes the action identified by a navigation item', async () => {
        // arrange
        const execute = vi.fn(async () => undefined);
        const item = createItem('action-a', true, execute);
        const manager = createManager([item]);

        // act
        await manager.execute(item.id);

        // assert
        expect(execute).toHaveBeenCalledOnce();
    });

    it('resolves feature-owned action identifiers through provider registrations', () => {
        // arrange
        const item = createItem('action-a', true, vi.fn(), 'navigation-a');
        const manager = createManager([item]);

        // act
        const resolvedItem = manager.getItemForNavigation('navigation-a');

        // assert
        expect(resolvedItem).toBe(item);
        expect(manager.getItemForNavigation('navigation-b')).toBeUndefined();
    });

    it('rejects actions that are unknown or no longer permitted', async () => {
        // arrange
        const execute = vi.fn();
        const item = createItem('action-a', false, execute);
        const manager = createManager([item]);

        // act
        const operation = manager.execute(item.id);

        // assert
        await expect(operation).rejects.toThrow('Quick-create item is unavailable: "action-a".');
        expect(execute).not.toHaveBeenCalled();
    });

    it('rejects duplicate identifiers before exposing ambiguous actions', () => {
        // arrange
        const manager = createManager([createItem('action-a'), createItem('action-a')]);

        // act
        const readItems = (): ReadonlyArray<IQuickCreateItem> => manager.items;

        // assert
        expect(readItems).toThrow('Duplicate quick-create item id: "action-a".');
    });

    it('rejects multiple feature registrations for the same navigation item', () => {
        // arrange
        const manager = createManager([createItem('action-a', true, vi.fn(), 'navigation-a'), createItem('action-b', true, vi.fn(), 'navigation-a')]);

        // act
        const resolveItem = (): IQuickCreateItem | undefined => manager.getItemForNavigation('navigation-a');

        // assert
        expect(resolveItem).toThrow('Duplicate quick-create navigation registration: "navigation-a".');
    });
});

function createItem(id: string, canExecute = true, execute: () => void | Promise<void> = vi.fn(), navigationItemKey?: string): IQuickCreateItem {
    return {
        id,
        navigationItemKey,
        label: id,
        canExecute: () => canExecute,
        execute,
    };
}

function createSource(...items: ReadonlyArray<IQuickCreateItem>): IQuickCreateItemSource {
    return {
        getItems: () => items,
    };
}

function createManager(staticItems: ReadonlyArray<IQuickCreateItem>, sources: ReadonlyArray<IQuickCreateItemSource> = []): QuickCreateManager {
    const sourceClasses = sources.map(
        (source) =>
            class implements IQuickCreateItemSource {
                public getItems(): ReadonlyArray<IQuickCreateItem> {
                    return source.getItems();
                }
            },
    );
    TestBed.configureTestingModule({
        providers: [
            provideQuickCreate(withQuickCreateItems({ id: 'static', items: staticItems }), withQuickCreateItems({ id: 'dynamic', sources: sourceClasses })),
        ],
    });

    return TestBed.inject(QuickCreateManager);
}
