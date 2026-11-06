// #region Imports

import type { DestroyRef } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { Refreshable } from './Refreshable';

// #endregion

class TestRefreshablePresenter extends Refreshable(ViewPresenter) {
    // #region Fields

    private readonly _refresh = vi.fn();

    // #endregion

    // #region Properties

    public get refresh(): ReturnType<typeof vi.fn> {
        return this._refresh;
    }

    // #endregion

    // #region Methods

    public override onExecuteRefresh(): void {
        this._refresh();
    }

    public startLoading(): void {
        this.loadingRef.enter();
    }

    public finishLoading(): void {
        this.loadingRef.leave();
    }

    // #endregion
}

function createDestroyRef(): DestroyRef {
    return {
        destroyed: false,
        onDestroy: (): (() => void) => (): void => undefined,
    };
}

describe('Refreshable presenter behavior', () => {
    it('delegates an explicit refresh while the presenter is idle', () => {
        // Arrange
        const presenter = new TestRefreshablePresenter(createDestroyRef());

        // Act
        presenter.refreshCommand.execute();

        // Assert
        expect(presenter.refresh).toHaveBeenCalledOnce();
        expect(presenter.canRefresh()).toBe(true);
    });

    it('rejects a refresh while a load is active', () => {
        // Arrange
        const presenter = new TestRefreshablePresenter(createDestroyRef());
        presenter.startLoading();

        // Act
        presenter.refreshCommand.execute();

        // Assert
        expect(presenter.canRefresh()).toBe(false);
        expect(presenter.refresh).not.toHaveBeenCalled();
    });

    it('reopens the command gate when the last active load finishes', () => {
        // Arrange
        const presenter = new TestRefreshablePresenter(createDestroyRef());
        presenter.startLoading();
        const disabled = presenter.refreshCommand.canExecute();

        // Act
        presenter.finishLoading();

        // Assert
        expect(disabled).toBe(false);
        expect(presenter.canRefresh()).toBe(true);
        expect(presenter.refreshCommand.canExecute()).toBe(true);
    });
});
