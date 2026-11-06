// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { CompoundComponent } from './CompoundComponent';
import { CompoundViewMode } from './CompoundViewMode';
import type { CompoundViewModeValue } from './CompoundViewModeValue';

// #endregion

/** Reads the inline `template` of a component source, so a spec can assert on its markup. */
function inlineTemplateOf(fileName: string): string {
    return inlineBlockOf(fileName, 'template');
}

/** Extracts one backtick-delimited decorator block, resolving the escapes a template literal needs. */
function inlineBlockOf(fileName: string, key: 'styles' | 'template'): string {
    const source = readFileSync(join(import.meta.dirname, fileName), 'utf8');
    const start = source.indexOf(`${key}: \``);

    if (start === -1) {
        throw new Error(`${fileName} has no inline ${key}.`);
    }

    let index = start + key.length + 3;
    let block = '';

    while (index < source.length && source[index] !== '`') {
        if (source[index] === '\\') {
            block += source[index + 1];
            index += 2;
            continue;
        }

        block += source[index];
        index += 1;
    }

    // The block was indented when it moved into the decorator; assertions quote the original markup.
    const lines = block.split('\n');
    const indent = Math.min(...lines.filter((line) => line.trim() !== '').map((line) => line.length - line.trimStart().length));

    return lines
        .map((line) => line.slice(indent))
        .join('\n')
        .trim();
}

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    BadgeComponent: class BadgeComponent {},
    ButtonComponent: class ButtonComponent {},
    createTourAccessorTarget: vi.fn(() => ({})),
    IconNameDirective: class IconNameDirective {},
    IndicatorComponent: class IndicatorComponent {},
    ListComponent: class ListComponent {},
    ListItemComponent: class ListItemComponent {},
    SegmentComponent: class SegmentComponent {},
    SegmentItemComponent: class SegmentItemComponent {},
    TextComponent: class TextComponent {},
    TOUR_ACCESSOR: Symbol('TOUR_ACCESSOR'),
    TypographyDirective: class TypographyDirective {},
}));

interface ICompoundItemTestContext {
    readonly $implicit: string;
    readonly item: string;
    readonly index: number;
    readonly count: number;
}

interface ICompoundComponentTestApi {
    readonly items: Signal<ReadonlyArray<string>>;
    readonly selectedIndex: WritableSignal<number>;
    readonly viewMode: WritableSignal<CompoundViewModeValue>;
    readonly initialViewMode: WritableSignal<CompoundViewModeValue | undefined>;
    readonly canAdd: Signal<boolean>;
    readonly canOpenItemsFromList: WritableSignal<boolean>;
    readonly itemKey: WritableSignal<((item: string, index: number) => unknown) | undefined>;
    readonly listItemDisabled: WritableSignal<((item: string, index: number) => boolean) | undefined>;
    readonly listItemTestId: WritableSignal<((item: string, index: number) => string | undefined) | undefined>;
    readonly selectLastOnCollectionGrowth: Signal<boolean>;
    readonly itemCount: Signal<number>;
    readonly listSelectionMode: Signal<'none' | 'single'>;
    readonly activeIndex: Signal<number>;
    readonly hasViewModeSwitch: Signal<boolean>;
    readonly hasNext: Signal<boolean>;
    readonly hasPrevious: Signal<boolean>;
    readonly addRequested: { emit(): void };
    _hasObservedNonEmptyCollection: boolean;
    _previousItemCount: number;
    _selectLastAfterCollectionGrowth: boolean;

    resolveItemKey(context: ICompoundItemTestContext | null): unknown;

    requestAdd(event?: Event): void;

    requestAddFromTour(): boolean;

    ngOnInit(): void;

    isListItemDisabled(context: ICompoundItemTestContext): boolean;

    openItemFromList(context: ICompoundItemTestContext): void;

    resolveListItemTestId(context: ICompoundItemTestContext): string | undefined;

    selectFromIndicator(event: unknown): void;

    selectNext(): void;

    selectNextFromTour(): boolean;

    selectPrevious(): void;

    selectPreviousFromTour(): boolean;

    selectSingleViewFromTour(): boolean;

    selectViewMode(viewMode: CompoundViewModeValue): void;

    synchronizeSelection(itemCount: number): void;
}

describe('CompoundComponent', () => {
    it('should expose stable component targets without embedding feature tour directives', () => {
        // arrange
        const template = inlineTemplateOf('CompoundComponent.ts');

        // assert
        expect(template).toContain('#activeItemTarget');
        expect(template).toContain('#addTarget');
        expect(template).toContain('#nextTarget');
        expect(template).toContain('#previousTarget');
        expect(template).toContain('#singleViewTarget');
        expect(template).not.toContain('mosaikTourAnchor');
        expect(template).not.toContain('mosaikTourId');
    });

    it('should key the projected item view so a new active item cannot reuse the previous view', () => {
        // arrange
        const template = inlineTemplateOf('CompoundComponent.ts');

        // assert
        expect(template).toContain('@for (itemKey of [activeItemKey()]; track itemKey)');
        expect(template).toContain('[attr.test-id]="previousTestId()"');
        expect(template).toContain('[attr.test-id]="nextTestId()"');
    });

    it('should render the list through the consumer template and expose stable selection targets', () => {
        // arrange
        const template = inlineTemplateOf('CompoundComponent.ts');

        // assert
        expect(template).toContain('<mosaik-list part="list"');
        expect(template).toContain('slot="header" part="list-header"');
        expect(template).toContain('[ngTemplateOutlet]="headerTemplate.templateRef"');
        expect(template).toContain('[ngTemplateOutlet]="template.templateRef"');
        expect(template).toContain('[attr.test-id]="resolveListItemTestId(context)"');
        expect(template).toContain('(click)="openItemFromList(context)"');
    });

    it('should identify the active item by its position when the consumer supplies no resolver', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);

        // assert
        expect(api.resolveItemKey({ $implicit: 'Second', item: 'Second', index: 1, count: 2 })).toBe(1);
        expect(api.resolveItemKey(null)).toBeNull();
    });

    it('should identify the active item by the consumer resolver so a replacement is never reused', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);
        api.itemKey.set((item: string, index: number) => (item === 'Second' ? undefined : `${item}-${index}`));

        // assert
        expect(api.resolveItemKey({ $implicit: 'First', item: 'First', index: 0, count: 2 })).toBe('First-0');
        expect(api.resolveItemKey({ $implicit: 'Second', item: 'Second', index: 1, count: 2 })).toBe(1);
    });

    it('should navigate within the available collection range', () => {
        const { api } = createComponentApi(['First', 'Second']);

        api.selectPrevious();
        expect(api.selectedIndex()).toBe(0);

        api.selectNext();
        expect(api.selectedIndex()).toBe(1);

        api.selectNext();
        expect(api.selectedIndex()).toBe(1);

        api.selectPrevious();
        expect(api.selectedIndex()).toBe(0);
    });

    it('should expose the requested view mode as component state', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);

        // act
        api.selectViewMode(CompoundViewMode.List);

        // assert
        expect(api.viewMode()).toBe(CompoundViewMode.List);
    });

    it('should apply the initial view mode when Angular initializes the component', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);
        api.initialViewMode.set(CompoundViewMode.List);

        // act
        api.ngOnInit();

        // assert
        expect(api.viewMode()).toBe(CompoundViewMode.List);
    });

    it('should expose the single view through the component tour contract', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);
        api.viewMode.set(CompoundViewMode.List);

        // act
        const selected = api.selectSingleViewFromTour();

        // assert
        expect(selected).toBe(true);
        expect(api.viewMode()).toBe(CompoundViewMode.Single);
    });

    it('should open an enabled list item in the single view', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);
        api.viewMode.set(CompoundViewMode.List);

        // act
        api.openItemFromList({ $implicit: 'Second', item: 'Second', index: 1, count: 2 });

        // assert
        expect(api.selectedIndex()).toBe(1);
        expect(api.viewMode()).toBe(CompoundViewMode.Single);
    });

    it('should keep the list view when opening list items is disabled', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);
        api.viewMode.set(CompoundViewMode.List);
        api.canOpenItemsFromList.set(false);

        // act
        api.openItemFromList({ $implicit: 'Second', item: 'Second', index: 1, count: 2 });

        // assert
        expect(api.selectedIndex()).toBe(0);
        expect(api.viewMode()).toBe(CompoundViewMode.List);
        expect(api.listSelectionMode()).toBe('none');
    });

    it('should keep a disabled list item from changing the active view', () => {
        // arrange
        const { api } = createComponentApi(['First', 'Second']);
        api.viewMode.set(CompoundViewMode.List);
        api.listItemDisabled.set((item: string) => item === 'Second');

        // act
        api.openItemFromList({ $implicit: 'Second', item: 'Second', index: 1, count: 2 });

        // assert
        expect(api.selectedIndex()).toBe(0);
        expect(api.viewMode()).toBe(CompoundViewMode.List);
    });

    it('should reject a stale list item position after the collection changed', () => {
        // arrange
        const { api } = createComponentApi(['First']);
        api.viewMode.set(CompoundViewMode.List);

        // act
        api.openItemFromList({ $implicit: 'Second', item: 'Second', index: 1, count: 2 });

        // assert
        expect(api.selectedIndex()).toBe(0);
        expect(api.viewMode()).toBe(CompoundViewMode.List);
    });

    it('should resolve consumer-owned list item test identifiers', () => {
        // arrange
        const { api } = createComponentApi(['First']);
        api.listItemTestId.set((item: string, index: number) => `contact-${index}-${item.toLowerCase()}`);

        // act
        const testId = api.resolveListItemTestId({ $implicit: 'First', item: 'First', index: 0, count: 1 });

        // assert
        expect(testId).toBe('contact-0-first');
    });

    it('should select an item requested by direct and native indicator payloads', () => {
        const { api } = createComponentApi(['First', 'Second', 'Third']);

        api.selectFromIndicator(1);
        expect(api.selectedIndex()).toBe(1);

        api.selectFromIndicator({ detail: { index: 2 } });
        expect(api.selectedIndex()).toBe(2);

        api.selectFromIndicator({ index: 99 });
        expect(api.selectedIndex()).toBe(2);
    });

    it('should emit an add request and select the appended item', () => {
        const { api, addRequested, items } = createComponentApi(['First', 'Second']);
        api.viewMode.set(CompoundViewMode.List);

        api.requestAdd();
        items.update((currentItems) => [...currentItems, 'Third']);
        api.synchronizeSelection(items().length);

        expect(addRequested).toHaveBeenCalledOnce();
        expect(api.selectedIndex()).toBe(2);
        expect(api.viewMode()).toBe(CompoundViewMode.Single);
    });

    it('should keep the add action out of the owning form submission flow', () => {
        const { api, addRequested } = createComponentApi([]);
        const event = { preventDefault: vi.fn() } as unknown as Event;

        api.requestAdd(event);

        expect(event.preventDefault).toHaveBeenCalledOnce();
        expect(addRequested).toHaveBeenCalledOnce();
    });

    it('should not request an item when adding is disabled', () => {
        const { api, addRequested } = createComponentApi(['First'], false);

        api.requestAdd();

        expect(addRequested).not.toHaveBeenCalled();
    });

    it('should run add and navigation through component-owned tour actions', () => {
        // arrange
        const { api, addRequested } = createComponentApi(['First', 'Second']);

        // act and assert
        expect(api.selectPreviousFromTour()).toBe(false);
        expect(api.selectNextFromTour()).toBe(true);
        expect(api.selectedIndex()).toBe(1);
        expect(api.selectNextFromTour()).toBe(false);
        expect(api.selectPreviousFromTour()).toBe(true);
        expect(api.selectedIndex()).toBe(0);
        expect(api.requestAddFromTour()).toBe(true);
        expect(addRequested).toHaveBeenCalledOnce();
    });

    it('should reject the tour add action when adding is disabled', () => {
        // arrange
        const { api, addRequested } = createComponentApi(['First'], false);

        // act
        const requested = api.requestAddFromTour();

        // assert
        expect(requested).toBe(false);
        expect(addRequested).not.toHaveBeenCalled();
    });

    it('should clamp the selection when items are removed', () => {
        const { api, items } = createComponentApi(['First', 'Second', 'Third']);

        api.selectedIndex.set(2);
        items.set(['First']);
        api.synchronizeSelection(items().length);

        expect(api.selectedIndex()).toBe(0);
    });

    it('should keep the first item selected during asynchronous initial hydration', () => {
        // arrange
        const { api, items } = createComponentApi([], true, true);

        // act
        items.set(['First', 'Second', 'Third']);
        api.synchronizeSelection(items().length);

        // assert
        expect(api.selectedIndex()).toBe(0);
    });

    it('should select the appended item after the collection has been hydrated', () => {
        // arrange
        const { api, items } = createComponentApi(['First', 'Second'], true, true);

        // act
        items.update((currentItems) => [...currentItems, 'Third']);
        api.synchronizeSelection(items().length);

        // assert
        expect(api.selectedIndex()).toBe(2);
    });
});

function createComponentApi(
    initialItems: ReadonlyArray<string>,
    canAdd = true,
    selectLastOnCollectionGrowth = false,
): {
    readonly api: ICompoundComponentTestApi;
    readonly addRequested: ReturnType<typeof vi.fn>;
    readonly items: WritableSignal<ReadonlyArray<string>>;
} {
    const items = signal(initialItems);
    const selectedIndex = signal(0);
    const viewMode = signal<CompoundViewModeValue>(CompoundViewMode.Single);
    const addRequested = vi.fn();
    const api = Object.create(CompoundComponent.prototype) as ICompoundComponentTestApi;

    Object.assign(api, {
        items,
        selectedIndex,
        viewMode,
        initialViewMode: signal<CompoundViewModeValue | undefined>(undefined),
        canAdd: signal(canAdd),
        canOpenItemsFromList: signal(true),
        itemKey: signal<((item: string, index: number) => unknown) | undefined>(undefined),
        listItemDisabled: signal<((item: string, index: number) => boolean) | undefined>(undefined),
        listItemTestId: signal<((item: string, index: number) => string | undefined) | undefined>(undefined),
        selectLastOnCollectionGrowth: signal(selectLastOnCollectionGrowth),
        itemCount: computed(() => items().length),
        listSelectionMode: computed(() => (api.canOpenItemsFromList() ? 'single' : 'none')),
        hasViewModeSwitch: signal(true),
        activeIndex: computed(() => {
            if (items().length === 0) {
                return 0;
            }

            return Math.min(Math.max(selectedIndex(), 0), items().length - 1);
        }),
        hasNext: computed(() => items().length > 0 && selectedIndex() < items().length - 1),
        hasPrevious: computed(() => items().length > 0 && selectedIndex() > 0),
        addRequested: { emit: addRequested },
        _hasObservedNonEmptyCollection: initialItems.length > 0,
        _previousItemCount: items().length,
        _selectLastAfterCollectionGrowth: false,
    });

    return { api, addRequested, items };
}
