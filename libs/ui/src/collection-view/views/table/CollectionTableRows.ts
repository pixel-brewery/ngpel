// #region Imports

import { computed, effect, signal, untracked, type Signal } from '@angular/core';
import type { IDataTableRowsRequest, IDataTableRowsResult } from '@pixel-brewery/mosaik-elements-foundation';
import { firstValueFrom, fromEvent, takeUntil } from 'rxjs';
import { compactViewportSignal } from '../../../components/navigation/compactViewportSignal';
import type { ICollectionTablePageQuery } from './ICollectionTablePageQuery';
import type { ICollectionTableRowsOptions } from './ICollectionTableRowsOptions';

// #endregion

// The core row provider also works with Mosaik versions predating provider grouping.
interface ICollectionTableRowsRequest extends IDataTableRowsRequest {
    readonly groupBy?: ReadonlyArray<string>;
    readonly groupPath?: ReadonlyArray<unknown>;
}

interface ICollectionTableRowsResult extends IDataTableRowsResult {
    readonly groupCounts?: ReadonlyArray<{
        readonly path: ReadonlyArray<unknown>;
        readonly count: number;
    }>;
}

/** Connects existing collection queries to Mosaik's native lazy row provider. */
export class CollectionTableRows<T extends object> {
    // #region Fields

    private readonly _version = signal(0);
    private readonly _showEmptyState = signal(false);
    private readonly _options: ICollectionTableRowsOptions<T>;
    private readonly _compact: Signal<boolean> = compactViewportSignal();
    private _total = 0;
    private _loadingRequests = 0;

    // #endregion

    // #region Properties

    /** Columns enabled for sorting and grouping by the source. */
    public readonly columns = computed(() =>
        this._options.columns().map((column) => ({
            ...column,
            sortable: this._options.sortingFields.includes(column.key),
            groupable: this._options.groupingFields.includes(column.key),
        })),
    );
    /** Uses the source labels for grouped values. */
    public readonly groupTemplate = computed(() => {
        const columns = this._options.columns();
        const filters = this._options.groupLabels();
        return (group: { readonly columnKey: string; readonly value: unknown }): string => {
            const filter = filters.find((item) => item.key === group.columnKey);
            const option = filter?.options?.find((item) => String(item.value) === String(group.value));
            const title = columns.find((column) => column.key === group.columnKey)?.title ?? group.columnKey;
            const value = group.value == null || group.value === '' ? this._options.emptyGroupLabel() : String(group.value);
            const label = option?.label ?? value;
            return `${title}: ${label}`;
        };
    });
    /** Whether the current initial query completed with no rows. */
    public readonly showEmptyState = this._showEmptyState.asReadonly();
    /** The function assigned to the Mosaik rows provider. */
    public readonly provider = computed(() => {
        const version = this._version();
        return (request: ICollectionTableRowsRequest): Promise<ICollectionTableRowsResult> => this.load(request, version);
    });

    // #endregion

    // #region Ctor

    /** Creates the provider in the owning presenter's Angular injection context. */
    public constructor(options: ICollectionTableRowsOptions<T>) {
        this._options = options;
        let previous = this._compact();
        effect(() => {
            const compact = this._compact();
            if (compact === previous) return;
            previous = compact;
            untracked(() => {
                if (options.enabled?.() === false) return;
                if (compact) options.onCompact();
                else options.onDesktop();
            });
        });
    }

    // #endregion

    // #region Methods

    /** Whether this view uses its desktop provider at the current breakpoint. */
    public isDesktop(): boolean {
        return !this._compact() && this._options.enabled?.() !== false;
    }

    /** Restarts the native row provider after a source-side change. */
    public refresh(): void {
        this._showEmptyState.set(false);
        this._version.update((version) => version + 1);
    }

    private async load(request: ICollectionTableRowsRequest, version: number): Promise<ICollectionTableRowsResult> {
        const { pageIndex, pageSize, groupPath, signal: abort } = request;
        const isCurrent = (): boolean => !abort.aborted && version === this._version() && this.isDesktop();
        if (!isCurrent()) throw new DOMException('Table request superseded', 'AbortError');

        const groupBy = request.groupBy?.[0];
        const groupsOnly = !!groupBy && !groupPath?.length;
        const sort = request.sortExpressions.find((expression) => this._options.sortingFields.includes(expression.sortKey));
        const query: ICollectionTablePageQuery = {
            groupBy,
            groupValue: groupPath?.[0],
            groupsOnly: groupsOnly || undefined,
            sortBy: sort?.sortKey,
            sortDirection: sort?.sortDirection ?? 'asc',
        };
        const isInitialLoad = !groupPath?.length && pageIndex === 0;
        if (isInitialLoad) {
            this._showEmptyState.set(false);
            if (this._loadingRequests++ === 0) this._options.receiveLoading?.(true);
        }

        try {
            const page = await firstValueFrom(this._options.loadPage(pageIndex * pageSize, pageSize, query).pipe(takeUntil(fromEvent(abort, 'abort'))));
            if (!isCurrent()) throw new DOMException('Table request superseded', 'AbortError');

            if (isInitialLoad) this._showEmptyState.set(page.total === 0);

            if (groupsOnly) {
                this._total = page.total;
                this._options.receiveRows([], this._total);
                return { rows: [], totalCount: page.total, groupCounts: (page.groups ?? []).map(({ value, count }) => ({ path: [value], count })) };
            }

            if (!groupBy) this._total = page.total;

            const rows = [...page.items];
            this._options.receiveRows(rows, this._total);
            return { rows, totalCount: page.total };
        } catch (error) {
            if (isInitialLoad && isCurrent()) this._options.receiveFailure?.();
            throw error;
        } finally {
            if (isInitialLoad && --this._loadingRequests === 0) this._options.receiveLoading?.(false);
        }
    }

    // #endregion
}
