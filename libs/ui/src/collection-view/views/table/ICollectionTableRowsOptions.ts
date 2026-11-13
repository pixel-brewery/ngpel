import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import type { Observable } from 'rxjs';
import type { ICollectionTablePage } from './ICollectionTablePage';
import type { ICollectionTablePageQuery } from './ICollectionTablePageQuery';

/** Host capabilities and data callbacks for a desktop table backed by a paged source. */
export interface ICollectionTableRowsOptions<T> {
    readonly groupingFields: ReadonlyArray<string>;
    readonly sortingFields: ReadonlyArray<string>;
    readonly columns: () => ReadonlyArray<IDataTableColumnDefinition<unknown>>;
    readonly groupLabels: () => ReadonlyArray<{
        readonly key: string;
        readonly options?: ReadonlyArray<{ readonly value: unknown; readonly label: string }>;
    }>;
    readonly emptyGroupLabel: () => string;
    readonly loadPage: (skip: number, take: number, query: ICollectionTablePageQuery) => Observable<ICollectionTablePage<T>>;
    readonly receiveRows: (items: T[], total: number) => void;
    readonly receiveFailure?: () => void;
    readonly receiveLoading?: (loading: boolean) => void;
    readonly enabled?: () => boolean;
    readonly onDesktop: () => void;
    readonly onCompact: () => void;
}
