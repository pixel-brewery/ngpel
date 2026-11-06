// #region Imports

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type IUserPreferenceStorage, provideUserPreferences, withUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import type { IPresenterControllerHostRef } from '@pixel-brewery/ngpel-mvp';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createFilterController } from './createFilterController';

// #endregion

vi.mock('@pixel-brewery/ngpel-mvp', () => ({
    command: (execute: (value?: unknown) => void) => ({ execute }),
}));

vi.mock('./createSavedFilterController', () => ({
    createSavedFilterController: () => ({
        savedFilters: () => [],
        save: () => undefined,
        remove: () => undefined,
        find: () => undefined,
    }),
}));

describe('createFilterController', () => {
    const liveKey = 'live-filter-test';
    const host = {} as IPresenterControllerHostRef;
    const preferences = new Map<string, unknown>();
    const storage: IUserPreferenceStorage = {
        read: (key, codec) => codec.parse(preferences.get(key)),
        write: (key, value, codec) => {
            preferences.set(key, codec.serialize(value));
        },
        remove: (key) => {
            preferences.delete(key);
        },
    };

    afterEach(() => {
        preferences.clear();
        TestBed.resetTestingModule();
    });

    it('should close idempotently and reopen with the next toggle', () => {
        const controller = createFilterController({
            savedFilterStorageKey: 'filter-controller-test',
            activeFilters: signal({}),
            isFilterActive: signal(false),
            applyFilterValues: () => undefined,
        })({} as IPresenterControllerHostRef);

        controller.toggleFilterCommand.execute();

        expect(controller.isFilterVisible()).toBe(true);

        controller.closeFilterCommand.execute();
        controller.closeFilterCommand.execute();

        expect(controller.isFilterVisible()).toBe(false);

        controller.toggleFilterCommand.execute();

        expect(controller.isFilterVisible()).toBe(true);
    });

    it('restores legacy active values before applying any new filter', () => {
        // arrange
        const restoreValues = vi.fn();
        const applyFilterValues = vi.fn();
        const values = { search: 'report' };
        preferences.set(liveKey, { version: 2, values, isVisible: false });
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withUserPreferenceStorage(() => storage))] });

        // act
        const controller = TestBed.runInInjectionContext(() =>
            createFilterController({
                savedFilterStorageKey: 'named',
                livePreference: { storageKey: liveKey, openWhenActive: true, restoreValues },
                activeFilters: signal(values),
                isFilterActive: signal(true),
                applyFilterValues,
            })(host),
        );

        // assert
        expect(restoreValues).toHaveBeenCalledWith(values);
        expect(controller.isFilterVisible()).toBe(true);
        expect(applyFilterValues).not.toHaveBeenCalled();
    });

    it('removes the active preference when the filter is cleared', () => {
        // arrange
        const values = { search: 'report' };
        preferences.set(liveKey, { version: 3, values });
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withUserPreferenceStorage(() => storage))] });
        const controller = TestBed.runInInjectionContext(() =>
            createFilterController({
                savedFilterStorageKey: 'named',
                livePreference: { storageKey: liveKey, restoreValues: vi.fn() },
                activeFilters: signal(values),
                isFilterActive: signal(true),
                applyFilterValues: vi.fn(),
            })(host),
        );

        // act
        controller.applyFilterCommand.execute({});

        // assert
        expect(preferences.has(liveKey)).toBe(false);
    });
});
