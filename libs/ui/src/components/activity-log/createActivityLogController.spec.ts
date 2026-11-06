import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createActivityLogController } from './createActivityLogController';
import type { IActivityLogPage } from './IActivityLogPage';

describe(createActivityLogController.name, () => {
    afterEach(() => TestBed.resetTestingModule());

    it('retains older pages and deduplicates entries when refreshing after a change', () => {
        // Arrange
        const loadPage = vi
            .fn()
            .mockReturnValueOnce(of({ items: [3, 2], total: 4 }))
            .mockReturnValueOnce(of({ items: [1, 0], total: 4 }))
            .mockReturnValueOnce(of({ items: [4, 3], total: 5 }));
        const controller = TestBed.runInInjectionContext(() => createActivityLogController<number>({ loadPage, itemKey: (id) => id, pageSize: 2 }));
        controller.ensureLoaded();
        controller.loadMoreCommand.execute();

        // Act
        controller.refresh();

        // Assert
        expect(loadPage.mock.calls).toEqual([
            [0, 2],
            [2, 2],
            [0, 2],
        ]);
        expect(controller.entries()).toEqual([4, 3, 2, 1, 0]);
        expect(controller.hasMore()).toBe(false);
    });

    it('cancels the previous scope before accepting entries from a new scope', () => {
        // Arrange
        const first = new Subject<IActivityLogPage<number>>();
        const scope = signal('first');
        const controller = TestBed.runInInjectionContext(() =>
            createActivityLogController({ scope, itemKey: (id) => id, loadPage: () => (scope() === 'first' ? first : of({ items: [2], total: 1 })) }),
        );
        controller.ensureLoaded();

        // Act
        scope.set('second');
        TestBed.tick();
        first.next({ items: [1], total: 1 });

        // Assert
        expect(controller.entries()).toEqual([2]);
        expect(controller.state()).toBe('loaded');
    });
});
