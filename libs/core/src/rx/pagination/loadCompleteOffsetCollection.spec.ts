import { EMPTY, EmptyError, finalize, firstValueFrom, Observable, of, Subject, throwError } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import type { IOffsetCollectionPage } from './IOffsetCollectionPage';
import { loadCompleteOffsetCollection } from './loadCompleteOffsetCollection';

describe('loadCompleteOffsetCollection', () => {
    it('defers the first page request until subscription', () => {
        // Arrange
        const loadPage = vi.fn(() => of({ items: [1], total: 1 }));

        // Act
        loadCompleteOffsetCollection(loadPage);

        // Assert
        expect(loadPage).not.toHaveBeenCalled();
    });

    it('advances by returned items and emits the latest total', async () => {
        // Arrange
        const items = [1, 2, 3, 4, 5];
        const loadPage = vi.fn((skip: number) => of({ items: items.slice(skip, skip + 2), total: skip === 0 ? 6 : 5 }));

        // Act
        const result = await firstValueFrom(loadCompleteOffsetCollection(loadPage));

        // Assert
        expect(result).toEqual({ items, total: 5 });
        expect(loadPage.mock.calls).toEqual([
            [0, 100],
            [2, 100],
            [4, 100],
        ]);
    });

    it('starts a fresh collection on each subscription', async () => {
        // Arrange
        const loadPage = vi.fn((skip: number) => of({ items: [skip + 1], total: 2 }));
        const collection = loadCompleteOffsetCollection(loadPage, 1);

        // Act
        const results = await Promise.all([firstValueFrom(collection), firstValueFrom(collection)]);

        // Assert
        expect(results).toEqual([
            { items: [1, 2], total: 2 },
            { items: [1, 2], total: 2 },
        ]);
        expect(loadPage.mock.calls).toEqual([
            [0, 1],
            [1, 1],
            [0, 1],
            [1, 1],
        ]);
    });

    it('stops on an empty page before the reported total', async () => {
        // Arrange
        const loadPage = vi.fn((skip: number) => of({ items: skip === 0 ? [1] : [], total: 2 }));

        // Act
        const result = await firstValueFrom(loadCompleteOffsetCollection(loadPage));

        // Assert
        expect(result).toEqual({ items: [1], total: 2 });
        expect(loadPage).toHaveBeenCalledTimes(2);
    });

    it.each([
        [0, 1],
        [-5, 1],
        [2.8, 2],
        [NaN, 100],
        [Infinity, 100],
    ])('normalizes page size %s to %s', async (size, expected) => {
        // Arrange
        const loadPage = vi.fn(() => of({ items: [], total: 0 }));

        // Act
        await firstValueFrom(loadCompleteOffsetCollection(loadPage, size));

        // Assert
        expect(loadPage).toHaveBeenCalledWith(0, expected);
    });

    it('tears down each synchronous request before starting the next', async () => {
        // Arrange
        const lifecycle: string[] = [];
        const loadPage = (skip: number): Observable<IOffsetCollectionPage<number>> =>
            new Observable((subscriber) => {
                lifecycle.push(`start ${skip}`);
                subscriber.next({ items: [skip], total: 3 });
                subscriber.complete();

                return (): void => {
                    lifecycle.push(`end ${skip}`);
                };
            });

        // Act
        await firstValueFrom(loadCompleteOffsetCollection(loadPage, 1));

        // Assert
        expect(lifecycle).toEqual(['start 0', 'end 0', 'start 1', 'end 1', 'start 2', 'end 2']);
    });

    it('accumulates many synchronous pages without recursive subscriptions', async () => {
        // Arrange
        const total = 2_000;
        const loadPage = (skip: number) => of({ items: [skip], total });

        // Act
        const result = await firstValueFrom(loadCompleteOffsetCollection(loadPage, 1, { maxPages: total, maxItems: total }));

        // Assert
        expect(result.items).toHaveLength(total);
        expect(result.items.at(-1)).toBe(total - 1);
    });

    it('cancels the active request when unsubscribed', () => {
        // Arrange
        const pendingPage = new Subject<IOffsetCollectionPage<number>>();
        const onCancelled = vi.fn();
        const onNext = vi.fn();
        const loadPage = vi.fn((skip: number) => (skip === 0 ? of({ items: [1], total: 2 }) : pendingPage.pipe(finalize(onCancelled))));
        const subscription = loadCompleteOffsetCollection(loadPage).subscribe(onNext);

        // Act
        subscription.unsubscribe();

        // Assert
        expect(loadPage.mock.calls).toEqual([
            [0, 100],
            [1, 100],
        ]);
        expect(onCancelled).toHaveBeenCalledOnce();
        expect(onNext).not.toHaveBeenCalled();
    });

    it('propagates a later page error without emitting a partial collection', async () => {
        // Arrange
        const error = new Error('Page failed');
        const loadPage = (skip: number) => (skip === 0 ? of({ items: [1], total: 2 }) : throwError(() => error));

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage))).rejects.toBe(error);
    });

    it('fails if a request completes without a page response', async () => {
        // Arrange
        const loadPage = (skip: number) => (skip === 0 ? of({ items: [1], total: 2 }) : EMPTY);

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage))).rejects.toBeInstanceOf(EmptyError);
    });

    it('errors when the page limit is reached before the collection is complete', async () => {
        // Arrange
        const loadPage = vi.fn((skip: number) => of({ items: [skip], total: skip + 10 }));

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage, 1, { maxPages: 2 }))).rejects.toThrow('limit of 2 pages');
        expect(loadPage.mock.calls).toEqual([
            [0, 1],
            [1, 1],
        ]);
    });

    it('limits requested items to the remaining budget and fails if further items are reported', async () => {
        // Arrange
        const loadPage = vi.fn((skip: number, take: number) => of({ items: Array.from({ length: take }, (_, index) => skip + index), total: 5 }));

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage, 2, { maxItems: 3 }))).rejects.toThrow('limit of 3 items');
        expect(loadPage.mock.calls).toEqual([
            [0, 2],
            [2, 1],
        ]);
    });

    it('rejects a response that would overflow the item budget', async () => {
        // Arrange
        const loadPage = vi.fn(() => of({ items: [1, 2], total: 2 }));

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage, 10, { maxItems: 1 }))).rejects.toThrow('limit of 1 items');
        expect(loadPage).toHaveBeenCalledWith(0, 1);
    });

    it('rejects an infinite limit before calling the loader', async () => {
        // Arrange
        const loadPage = vi.fn(() => of({ items: [1], total: 1 }));

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage, 10, { maxPages: Infinity }))).rejects.toBeInstanceOf(RangeError);
        expect(loadPage).not.toHaveBeenCalled();
    });

    it('rejects an invalid reported total', async () => {
        // Arrange
        const loadPage = () => of({ items: [1], total: NaN });

        // Act and assert
        await expect(firstValueFrom(loadCompleteOffsetCollection(loadPage))).rejects.toThrow('invalid total');
    });
});
