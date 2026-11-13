// #region Imports

import { TestBed } from '@angular/core/testing';
import { BreakpointService } from '@pixel-brewery/mosaik-elements-angular';
import type { IDataTableRowsRequest } from '@pixel-brewery/mosaik-elements-foundation';
import { of, Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CollectionTableRows } from './CollectionTableRows';
import type { ICollectionTablePageQuery } from './ICollectionTablePageQuery';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({ BreakpointService: class BreakpointService {} }));

// #endregion

interface ITestRow {
    readonly id: number;
}

describe('CollectionTableRows', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: BreakpointService,
                    useValue: { observe: () => of(false), isMatched: () => false },
                },
            ],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('requests exact group counts before fetching only the next page of one expanded group', async () => {
        const loadPage = vi.fn((_skip: number, _take: number, query: ICollectionTablePageQuery) =>
            query.groupsOnly
                ? of({
                      items: [],
                      total: 12,
                      groups: [
                          { value: 'OPEN', count: 9 },
                          { value: null, count: 3 },
                      ],
                  })
                : of({ items: [{ id: 6 }], total: 9 }),
        );
        const receiveRows = vi.fn();
        const rows = createRows(loadPage, receiveRows);
        const nativeProvider = rows.provider();

        await expect(nativeProvider({ ...request(), groupBy: ['status'] })).resolves.toEqual({
            rows: [],
            totalCount: 12,
            groupCounts: [
                { path: ['OPEN'], count: 9 },
                { path: [null], count: 3 },
            ],
        });
        expect(loadPage).toHaveBeenCalledExactlyOnceWith(0, 5, {
            groupBy: 'status',
            groupValue: undefined,
            groupsOnly: true,
            sortBy: 'id',
            sortDirection: 'desc',
        });

        await expect(nativeProvider({ ...request(1), groupBy: ['status'], groupPath: ['OPEN'] })).resolves.toEqual({
            rows: [{ id: 6 }],
            totalCount: 9,
        });
        expect(loadPage).toHaveBeenLastCalledWith(5, 5, {
            groupBy: 'status',
            groupValue: 'OPEN',
            groupsOnly: undefined,
            sortBy: 'id',
            sortDirection: 'desc',
        });
        expect(receiveRows.mock.calls).toEqual([
            [[], 12],
            [[{ id: 6 }], 12],
        ]);
    });

    it('cancels a superseded row request before it can replace the presenter page', async () => {
        const page = new Subject<{ items: ITestRow[]; total: number }>();
        const receiveRows = vi.fn();
        const rows = createRows(() => page, receiveRows);
        const abort = new AbortController();
        const obsolete = rows.provider()({ ...request(), signal: abort.signal });

        rows.refresh();
        abort.abort();

        await expect(obsolete).rejects.toBeDefined();
        expect(page.observed).toBe(false);
        expect(receiveRows).not.toHaveBeenCalled();
    });

    function createRows(
        loadPage: ConstructorParameters<typeof CollectionTableRows<ITestRow>>[0]['loadPage'],
        receiveRows = vi.fn(),
    ): CollectionTableRows<ITestRow> {
        return TestBed.runInInjectionContext(() => {
            const rows = new CollectionTableRows<ITestRow>({
                groupingFields: ['status', 'priority'],
                sortingFields: ['id'],
                columns: () => [],
                groupLabels: () => [],
                emptyGroupLabel: () => 'None',
                loadPage,
                receiveRows,
                onDesktop: () => undefined,
                onCompact: () => undefined,
            });
            return rows;
        });
    }

    function request(pageIndex = 0): IDataTableRowsRequest {
        return {
            sortExpressions: [{ sortKey: 'id', sortDirection: 'desc' }],
            filters: [],
            quickFilter: '',
            pageIndex,
            pageSize: 5,
            signal: new AbortController().signal,
        };
    }
});
