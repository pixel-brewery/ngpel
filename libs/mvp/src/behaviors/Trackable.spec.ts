// #region Imports

import type { DestroyRef } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { ViewPresenter } from '../presenters/ViewPresenter';
import type { ITrackableSignal } from '../signals/ITrackableSignal';
import { Closeable } from './Closeable';
import { Trackable } from './Trackable';
import { withUndoRedo } from './withUndoRedo';

// #endregion

class TrackedPresenter extends Trackable(Closeable(ViewPresenter)) {
    // #region Fields

    public readonly model: ITrackableSignal<number> = withUndoRedo(this, 0);

    // #endregion
}

class UnconfiguredPresenter extends Trackable(ViewPresenter) {}

function createDestroyRef(): DestroyRef {
    return {
        destroyed: false,
        onDestroy: (): (() => void) => (): void => undefined,
    };
}

describe('Trackable presenter behavior', () => {
    it('opens the undo command gate after the model changes', () => {
        // Arrange
        const presenter = new TrackedPresenter(createDestroyRef());
        const initiallyEnabled = presenter.undoCommand.canExecute();

        // Act
        presenter.model.value.set(1);

        // Assert
        expect(initiallyEnabled).toBe(false);
        expect(presenter.canUndo()).toBe(true);
        expect(presenter.undoCommand.canExecute()).toBe(true);
        expect(presenter.closeCommand.canExecute()).toBe(true);
    });

    it('restores the previous model through its undo command', () => {
        // Arrange
        const presenter = new TrackedPresenter(createDestroyRef());
        presenter.model.value.set(1);

        // Act
        presenter.undoCommand.execute();

        // Assert
        expect(presenter.model.value()).toBe(0);
        expect(presenter.canUndo()).toBe(false);
        expect(presenter.canRedo()).toBe(true);
        expect(presenter.redoCommand.canExecute()).toBe(true);
    });

    it('restores an undone value through its redo command', () => {
        // Arrange
        const presenter = new TrackedPresenter(createDestroyRef());
        presenter.model.value.set(1);
        presenter.undoCommand.execute();

        // Act
        presenter.redoCommand.execute();

        // Assert
        expect(presenter.model.value()).toBe(1);
        expect(presenter.canUndo()).toBe(true);
        expect(presenter.canRedo()).toBe(false);
    });

    it('clears both history directions when disposed', () => {
        // Arrange
        const presenter = new TrackedPresenter(createDestroyRef());
        presenter.model.value.set(1);
        presenter.model.value.set(2);
        presenter.undoCommand.execute();

        // Act
        presenter.dispose();

        // Assert
        expect(presenter.model.history()).toEqual([]);
        expect(presenter.canUndo()).toBe(false);
        expect(presenter.canRedo()).toBe(false);
        expect(presenter.disposed()).toBe(true);
    });

    it('keeps independently configured presenter histories separate', () => {
        // Arrange
        const first = new TrackedPresenter(createDestroyRef());
        const second = new TrackedPresenter(createDestroyRef());
        first.model.value.set(1);
        second.model.value.set(9);

        // Act
        first.undoCommand.execute();

        // Assert
        expect(first.model.value()).toBe(0);
        expect(second.model.value()).toBe(9);
        expect(second.canUndo()).toBe(true);
    });

    it('explains a missing setup when a Trackable member is read', () => {
        // Arrange
        const presenter = new UnconfiguredPresenter(createDestroyRef());

        // Act
        const readCommand = (): unknown => presenter.undoCommand;

        // Assert
        expect(readCommand).toThrow('withUndoRedo() must be called in the constructor before accessing Trackable properties.');
    });
});
