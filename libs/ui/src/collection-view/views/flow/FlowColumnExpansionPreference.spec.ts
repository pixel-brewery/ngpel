// #region Imports

import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createFlowColumnExpansionPreference, type IFlowColumnExpansionPreference } from './FlowColumnExpansionPreference';

// #endregion

describe('FlowColumnExpansionPreference', () => {
    let storage: Storage;

    beforeEach(() => {
        storage = createMockStorage();
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DOCUMENT,
                    useValue: {
                        defaultView: {
                            localStorage: storage,
                            addEventListener: vi.fn(),
                            removeEventListener: vi.fn(),
                        },
                    },
                },
            ],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('persists collapsed columns and restores them in another board instance', () => {
        // arrange
        const preference = createPreference();

        // act
        preference.onColumnExpansionChanged({ columnKey: 'open', isExpanded: false });
        const restoredPreference = createPreference();

        // assert
        expect(preference.isColumnExpanded('open')).toBe(false);
        expect(restoredPreference.isColumnExpanded('open')).toBe(false);
        expect(restoredPreference.isColumnExpanded('done')).toBe(true);
        expect(storage.getItem('test.flow.collapsedColumns')).toBe('["open"]');
    });

    it('removes re-expanded columns while ignoring unknown stored and emitted keys', () => {
        // arrange
        storage.setItem('test.flow.collapsedColumns', '["done","future"]');
        const preference = createPreference();

        // act
        preference.onColumnExpansionChanged({ columnKey: 'future', isExpanded: false });
        preference.onColumnExpansionChanged({ columnKey: 'done', isExpanded: true });

        // assert
        expect(preference.isColumnExpanded('open')).toBe(true);
        expect(preference.isColumnExpanded('done')).toBe(true);
        expect(storage.getItem('test.flow.collapsedColumns')).toBe('[]');
    });

    function createPreference(): IFlowColumnExpansionPreference<'open' | 'done'> {
        return TestBed.runInInjectionContext(() => createFlowColumnExpansionPreference('test.flow.collapsedColumns', ['open', 'done']));
    }
});

function createMockStorage(): Storage {
    const values = new Map<string, string>();

    return {
        get length(): number {
            return values.size;
        },
        clear: vi.fn(() => values.clear()),
        getItem: vi.fn((key: string) => values.get(key) ?? null),
        key: vi.fn((index: number) => [...values.keys()][index] ?? null),
        removeItem: vi.fn((key: string) => values.delete(key)),
        setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    };
}
