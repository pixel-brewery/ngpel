// #region Imports

import { describe, expect, it } from 'vitest';
import type { DestroyRef } from '@angular/core';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { Closeable } from './Closeable';

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

class OrderDialogViewPresenter extends Closeable(ViewPresenter) {
    // #region Fields

    private _closeCount = 0;

    // #endregion

    // #region Properties

    public get closeCount(): number {
        return this._closeCount;
    }

    // #endregion

    // #region Methods

    public override onExecuteClose(): void {
        this._closeCount += 1;
    }

    // #endregion
}

class BareDialogViewPresenter extends Closeable(ViewPresenter) {}

describe('Closeable presenter behavior', () => {
    it('runs the close hook when the close command executes', () => {
        // Arrange
        const presenter = new OrderDialogViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.closeCommand.execute();

        // Assert
        expect(presenter.closeCount).toBe(1);
        expect(presenter.canClose()).toBe(true);
    });

    it('does not run the close hook while closing is disabled', () => {
        // Arrange
        const presenter = new OrderDialogViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.setCanExecuteClose(false);

        // Act
        presenter.closeCommand.execute();

        // Assert
        expect(presenter.closeCount).toBe(0);
        expect(presenter.canClose()).toBe(false);
        expect(presenter.closeCommand.canExecute()).toBe(false);
    });

    it('allows closing again once it is re-enabled', () => {
        // Arrange
        const presenter = new OrderDialogViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.setCanExecuteClose(false);

        // Act
        presenter.setCanExecuteClose(true);

        // Assert
        expect(presenter.canClose()).toBe(true);
        expect(presenter.closeCommand.canExecute()).toBe(true);
    });

    it('does nothing when the presenter did not override the close hook', () => {
        // Arrange
        const presenter = new BareDialogViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const close = (): void => presenter.closeCommand.execute();

        // Assert
        expect(close).not.toThrow();
        expect(presenter.canClose()).toBe(true);
    });
});
