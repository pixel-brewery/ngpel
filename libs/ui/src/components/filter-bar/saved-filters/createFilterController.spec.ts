// #region Imports

import { signal } from '@angular/core';
import type { IPresenterControllerHostRef } from '@pixel-brewery/ngpel-mvp';
import { describe, expect, it, vi } from 'vitest';
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
});
