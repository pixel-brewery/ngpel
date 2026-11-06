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

class DefaultPagedViewPresenter extends Pageable(ViewPresenter) {}

class ConfiguredPagedViewPresenter extends Pageable(ViewPresenter, DEFAULT_PAGE_SIZE * 2) {}

describe('DEFAULT_PAGE_SIZE', () => {
    it('names a bounded page a data query can request', () => {
        // Arrange
        const size: number = DEFAULT_PAGE_SIZE;

        // Act
        const actual = Number.isSafeInteger(size) && size > 0;

        // Assert
        expect(actual).toBe(true);
        expect(size).toBe(20);
    });

    it('is the page size a composition that configures none falls back to', () => {
        // Arrange
        const presenter = new DefaultPagedViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const actual = presenter.take();

        // Assert
        expect(actual).toBe(DEFAULT_PAGE_SIZE);
    });

    it('does not override the page size a composition configured itself', () => {
        // Arrange
        const presenter = new ConfiguredPagedViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const actual = presenter.take();

        // Assert
        expect(actual).not.toBe(DEFAULT_PAGE_SIZE);
        expect(actual).toBe(40);
    });
});
