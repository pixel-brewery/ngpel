// #region Imports

import { type DestroyRef, type Signal, signal, type WritableSignal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { Hydratable } from './Hydratable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

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

interface IRefreshable {
    readonly refreshCount: Signal<number>;
    refresh(): void;
}

function Refreshable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, IRefreshable> {
    abstract class RefreshablePresenter extends base implements IRefreshable {
        // #region Fields

        private readonly _refreshCount: WritableSignal<number> = signal(0);

        // #endregion

        // #region Properties

        public get refreshCount(): Signal<number> {
            return this._refreshCount.asReadonly();
        }

        // #endregion

        // #region Methods

        public refresh(): void {
            this._refreshCount.update((count) => count + 1);
        }

        // #endregion
    }

    return RefreshablePresenter as PresenterBehaviorReturn<T, IRefreshable>;
}

class RefreshableOrderViewPresenter extends Refreshable(ViewPresenter) {}

class HydratingRefreshableOrderViewPresenter extends Refreshable(Hydratable(ViewPresenter)) {}

class PlainOrderViewPresenter extends ViewPresenter {}

describe('Presenter behavior mixin types', () => {
    it('lets a consumer author a behavior that keeps the members of the presenter it extends', () => {
        // Arrange
        const presenter = new RefreshableOrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.refresh();

        // Assert
        expect(presenter.refreshCount()).toBe(1);
        expect(presenter.isLoading()).toBe(false);
        expect(presenter.initialized()).toBe(false);
    });

    it('stacks a consumer behavior on top of a behavior ngpel ships', () => {
        // Arrange
        const presenter = new HydratingRefreshableOrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.refresh();

        // Assert
        expect(presenter.refreshCount()).toBe(1);
        expect(presenter.isHydrating()).toBe(true);
    });

    it('does not add the behavior to a presenter it was never applied to', () => {
        // Arrange
        const presenter = new PlainOrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const actual = 'refresh' in presenter;

        // Assert
        expect(actual).toBe(false);
    });
});
