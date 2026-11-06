// #region Imports

import type { DestroyRef, Signal } from '@angular/core';
import { Subject } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { Hydratable } from './Hydratable';
import type { HydrationOperation } from './HydrationOperation';
import { Lockable } from './Lockable';

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

class OrderViewPresenter extends Lockable(ViewPresenter) {
    // #region Methods

    public enterLock(): void {
        this.lockRef.enter();
    }

    public leaveLock(): void {
        this.lockRef.leave();
    }

    // #endregion
}

class HydratingOrderViewPresenter extends Lockable(Hydratable(ViewPresenter)) {
    // #region Fields

    private readonly _hydration: Subject<void> = new Subject<void>();

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        return this._hydration.asObservable();
    }

    public completeHydration(): void {
        this._hydration.complete();
    }

    // #endregion
}

class ReversedOrderViewPresenter extends Hydratable(Lockable(ViewPresenter)) {
    // #region Fields

    private readonly _hydration: Subject<void> = new Subject<void>();

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        return this._hydration.asObservable();
    }

    // #endregion
}

class HalfBuiltOrderViewPresenter extends Lockable(ViewPresenter) {
    // #region Fields

    public readonly isHydrating: Signal<boolean> | undefined = undefined;

    // #endregion
}

describe('Lockable presenter behavior', () => {
    it('stays locked until every nested lock is released', () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.enterLock();
        presenter.enterLock();

        // Act
        presenter.leaveLock();

        // Assert
        expect(presenter.isLocked()).toBe(true);
        expect(presenter.isInteractionLocked()).toBe(true);
    });

    it('locks the View while an operation runs', () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        void presenter.runLocked(() => new Promise<string>(() => undefined));

        // Assert
        expect(presenter.isInteractionLocked()).toBe(true);
    });

    it('releases the lock once the operation resolved', async () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);
        let complete: ((value: string) => void) | undefined;
        const running = presenter.runLocked(
            () =>
                new Promise<string>((resolve) => {
                    complete = resolve;
                }),
        );

        // Act
        complete?.('saved');

        // Assert
        await expect(running).resolves.toBe('saved');
        expect(presenter.isInteractionLocked()).toBe(false);
    });

    it('releases the lock when the operation throws', async () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const running = presenter.runLocked(() => {
            throw new Error('Save failed');
        });

        // Assert
        await expect(running).rejects.toThrow('Save failed');
        expect(presenter.isLocked()).toBe(false);
    });

    it('does not lock interaction while nothing holds a lock', () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.isLocked()).toBe(false);
        expect(presenter.isInteractionLocked()).toBe(false);
    });

    it('folds the hydration of a composed presenter into the interaction lock', () => {
        // Arrange
        const presenter = new HydratingOrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.isLocked()).toBe(false);
        expect(presenter.isInteractionLocked()).toBe(true);
    });

    it('unlocks interaction once the composed hydration finished', () => {
        // Arrange
        const presenter = new HydratingOrderViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.initialize();

        // Act
        presenter.completeHydration();

        // Assert
        expect(presenter.isInteractionLocked()).toBe(false);
    });

    it('folds the hydration in regardless of the order the behaviors were composed in', () => {
        // Arrange
        const presenter = new ReversedOrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.isInteractionLocked()).toBe(true);
    });

    it('reports no hydration for a presenter that declared the signal but never assigned it', () => {
        // Arrange
        const presenter = new HalfBuiltOrderViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const actual = presenter.isInteractionLocked();

        // Assert
        expect(actual).toBe(false);
        expect(presenter.isLocked()).toBe(false);
    });

    it('releases every held lock when the presenter is disposed', () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.enterLock();

        // Act
        presenter.dispose();

        // Assert
        expect(presenter.isLocked()).toBe(false);
        expect(presenter.disposed()).toBe(true);
    });

    it('does not let an unbalanced release hide a later lock', () => {
        // Arrange
        const presenter = new OrderViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.leaveLock();

        // Act
        presenter.enterLock();

        // Assert
        expect(presenter.isLocked()).toBe(true);
    });
});
