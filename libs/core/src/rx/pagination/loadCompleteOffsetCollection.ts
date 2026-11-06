import { defer, EMPTY, expand, last, map, of, queueScheduler, subscribeOn, tap, type Observable } from 'rxjs';
import type { IOffsetCollectionLimits } from './IOffsetCollectionLimits';
import type { IOffsetCollectionPage } from './IOffsetCollectionPage';

const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_MAX_PAGES = 1_000;
const DEFAULT_MAX_ITEMS = 100_000;

/**
 * Loads offset pages sequentially and emits their combined items and the latest reported total.
 *
 * @remarks
 * Each subscription loads the collection afresh. Each request must emit a page and complete.
 * An empty page ends the collection even if its reported total is higher. Errors and
 * exceeded limits fail the load, and unsubscribing cancels the active request.
 *
 * @public
 * @typeParam T The collection item type.
 * @param loadPage Loads a page for the supplied offset and requested size.
 * @param pageSize Requested size per page. Finite values are truncated and raised to at least one.
 * NaN and infinite sizes use the default of 100.
 * @param limits Positive integer limits on page requests and accumulated items.
 * @returns A cold observable of the combined collection.
 */
export function loadCompleteOffsetCollection<T>(
    loadPage: (skip: number, take: number) => Observable<IOffsetCollectionPage<T>>,
    pageSize = DEFAULT_PAGE_SIZE,
    { maxPages = DEFAULT_MAX_PAGES, maxItems = DEFAULT_MAX_ITEMS }: IOffsetCollectionLimits = {},
): Observable<IOffsetCollectionPage<T>> {
    const normalizedPageSize = Number.isFinite(pageSize) ? Math.max(1, Math.trunc(pageSize)) : DEFAULT_PAGE_SIZE;

    return defer(() => {
        if (!Number.isSafeInteger(maxPages) || maxPages < 1 || !Number.isSafeInteger(maxItems) || maxItems < 1) {
            throw new RangeError('Offset collection limits must be positive safe integers.');
        }

        const items: T[] = [];
        let pages = 0;

        return of<IOffsetCollectionPage<T> | null>(null).pipe(
            expand((previous) => {
                if (previous && (previous.items.length === 0 || items.length >= previous.total)) {
                    return EMPTY;
                }

                const skip = items.length;
                const remaining = maxItems - skip;
                if (remaining === 0) {
                    throw new RangeError(`Offset collection exceeded its limit of ${maxItems} items.`);
                }
                if (pages === maxPages) {
                    throw new RangeError(`Offset collection exceeded its limit of ${maxPages} pages.`);
                }
                pages++;

                return defer(() => loadPage(skip, Math.min(normalizedPageSize, remaining))).pipe(
                    // Queue synchronous page subscriptions so the previous page can tear down first.
                    subscribeOn(queueScheduler),
                    last(),
                    tap((page): void => {
                        if (!Number.isSafeInteger(page.total) || page.total < 0) {
                            throw new RangeError('Offset collection returned an invalid total.');
                        }
                        if (page.items.length > remaining) {
                            throw new RangeError(`Offset collection exceeded its limit of ${maxItems} items.`);
                        }
                        for (const item of page.items) {
                            items.push(item);
                        }
                    }),
                );
            }, 1),
            last(),
            map((page) => ({ items, total: page?.total ?? 0 })),
        );
    });
}
