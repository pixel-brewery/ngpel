import type { Signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { IActivityLogPage } from './IActivityLogPage';

/** Data and identity supplied by the host for a paged activity log. @public */
export interface IActivityLogControllerOptions<T> {
    /** Loads one page. Unsubscription cancels work when the host's loader supports it. */
    loadPage(offset: number, limit: number): Observable<IActivityLogPage<T>>;
    /** Stable entry key used for deduplication and tracking. */
    itemKey(item: T): string | number;
    /** Changing this key discards the current pages and loads the new scope after first use. */
    readonly scope?: Signal<unknown>;
    /** Requested page size. Defaults to 100. */
    readonly pageSize?: number;
}
