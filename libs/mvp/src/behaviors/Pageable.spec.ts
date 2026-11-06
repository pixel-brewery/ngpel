// #region Imports

import { describe, expect, it } from 'vitest';
import type { DestroyRef } from '@angular/core';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { DEFAULT_PAGE_SIZE } from './DEFAULT_PAGE_SIZE';
import { Pageable } from './Pageable';

// #endregion

/** A destruction scope the spec drives by hand: it hands out a `DestroyRef` and replays its callbacks. */
interface IFakeDestroyScope {
    readonly destroyRef: DestroyRef;
    destroy(): void;
}

/** Creates a destruction scope for a consumer constructed directly instead of through `TestBed`. */
function createFakeDestroyScope(): IFakeDestroyScope {
    const callbacks: Array<() => void> = [];
    const destroyRef: DestroyRef = {
        destroyed: false,
        onDestroy: (callback: () => void): (() => void) => {
            callbacks.push(callback);

            return (): void => {
                const index = callbacks.indexOf(callback);

                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            };
        },
    };

    return {
        destroyRef,
        destroy: (): void => {
            for (const callback of [...callbacks]) {
                callback();
            }
        },
    };
}

class OrderListViewPresenter extends Pageable(ViewPresenter) {
    // #region Fields

    private _pageChangedCount = 0;

    // #endregion

    // #region Properties

    public get pageChangedCount(): number {
        return this._pageChangedCount;
    }

    // #endregion

    // #region Methods

    public override onPageChanged(): void {
        this._pageChangedCount += 1;
    }

    // #endregion
}

class WideOrderListViewPresenter extends Pageable(ViewPresenter, 50) {}

describe('Pageable presenter behavior', () => {
    it('starts on the first page with the default page size', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const actual = presenter.currentPage();

        // Assert
        expect(actual).toBe(1);
        expect(presenter.skip()).toBe(0);
        expect(presenter.take()).toBe(DEFAULT_PAGE_SIZE);
        expect(presenter.total()).toBe(0);
    });

    it('moves the paging window for a one-based page number', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.pageChangedCommand.execute(3);

        // Assert
        expect(presenter.skip()).toBe(2 * DEFAULT_PAGE_SIZE);
        expect(presenter.currentPage()).toBe(3);
        expect(presenter.pageChangedCount).toBe(1);
    });

    it('moves the paging window for a zero-based page index', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.pageChangedCommand.execute({ pageIndex: 2 });

        // Assert
        expect(presenter.currentPage()).toBe(3);
        expect(presenter.pageChangedCount).toBe(1);
    });

    it('moves the paging window for a custom event carrying a page index', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.pageChangedCommand.execute({ detail: { pageIndex: 1 } });

        // Assert
        expect(presenter.currentPage()).toBe(2);
        expect(presenter.pageChangedCount).toBe(1);
    });

    it('ignores a parameter that names no page', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.pageChangedCommand.execute('second');

        // Assert
        expect(presenter.currentPage()).toBe(1);
        expect(presenter.pageChangedCount).toBe(0);
    });

    it('ignores a page number below the first page', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.pageChangedCommand.execute(0);

        // Assert
        expect(presenter.skip()).toBe(0);
        expect(presenter.pageChangedCount).toBe(0);
    });

    it('reports the total the presenter loaded', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.setTotal(120);

        // Assert
        expect(presenter.total()).toBe(120);
    });

    it('returns to the first page when the paging is reset', () => {
        // Arrange
        const presenter = new OrderListViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.pageChangedCommand.execute(3);

        // Act
        presenter.resetPage();

        // Assert
        expect(presenter.skip()).toBe(0);
        expect(presenter.currentPage()).toBe(1);
    });

    it('uses the page size the composition configured', () => {
        // Arrange
        const presenter = new WideOrderListViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.pageChangedCommand.execute(2);

        // Assert
        expect(presenter.take()).toBe(50);
        expect(presenter.skip()).toBe(50);
    });
});
