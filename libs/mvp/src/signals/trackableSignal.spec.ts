// #region Imports

import { signal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { trackableSignal } from './trackableSignal';

// #endregion

describe('trackable signal', () => {
    it('keeps writable signal methods hidden from object enumeration', () => {
        // Arrange
        const source = signal({ body: '', subject: '' });

        // Act
        const trackable = trackableSignal(source);

        // Assert
        expect(trackable.value).toBe(source);
        expect(Object.keys(trackable.value)).not.toContain('set');
        expect(Object.keys(trackable.value)).not.toContain('update');
    });

    it('records changes from direct sets and updates', () => {
        // Arrange
        const trackable = trackableSignal({ body: '', subject: '' });

        // Act
        trackable.value.set({ body: '', subject: 'May newsletter' });
        trackable.value.update((currentValue) => ({ ...currentValue, body: 'Ready to send' }));

        // Assert
        expect(trackable.history().map((entry) => entry.value)).toEqual([
            { body: '', subject: '' },
            { body: '', subject: 'May newsletter' },
            { body: 'Ready to send', subject: 'May newsletter' },
        ]);
    });

    it('restores previous values through undo and redo', () => {
        // Arrange
        const trackable = trackableSignal({ body: '', subject: '' });
        trackable.value.set({ body: '', subject: 'May newsletter' });
        trackable.undo();
        const valueAfterUndo = trackable.value();

        // Act
        trackable.redo();

        // Assert
        expect(valueAfterUndo).toEqual({ body: '', subject: '' });
        expect(trackable.value()).toEqual({ body: '', subject: 'May newsletter' });
    });

    it('updates previously read history and command gates after a write', () => {
        // Arrange
        const source = signal(0);
        const trackable = trackableSignal(source);
        const initialHistory = trackable.history();
        expect(trackable.canUndo()).toBe(false);
        expect(trackable.canRedo()).toBe(false);

        // Act
        source.set(1);

        // Assert
        expect(initialHistory.map((entry) => entry.value)).toEqual([0]);
        expect(trackable.history().map((entry) => entry.value)).toEqual([0, 1]);
        expect(trackable.canUndo()).toBe(true);
        expect(trackable.canRedo()).toBe(false);
    });

    it('updates previously read gates after undoing a change', () => {
        // Arrange
        const trackable = trackableSignal(0);
        trackable.value.set(1);
        expect(trackable.canUndo()).toBe(true);
        expect(trackable.canRedo()).toBe(false);

        // Act
        trackable.undo();

        // Assert
        expect(trackable.value()).toBe(0);
        expect(trackable.history().map((entry) => entry.value)).toEqual([0]);
        expect(trackable.canUndo()).toBe(false);
        expect(trackable.canRedo()).toBe(true);
    });

    it('drops redo history when a new recorded value replaces an undone branch', () => {
        // Arrange
        const trackable = trackableSignal(0);
        trackable.value.set(1);
        trackable.value.set(2);
        trackable.undo();
        expect(trackable.canRedo()).toBe(true);

        // Act
        trackable.value.set(3);

        // Assert
        expect(trackable.history().map((entry) => entry.value)).toEqual([0, 1, 3]);
        expect(trackable.canRedo()).toBe(false);
    });

    it('bounds snapshots by the configured capacity', () => {
        // Arrange
        const trackable = trackableSignal(0, { capacity: 2 });
        trackable.value.set(1);

        // Act
        trackable.value.set(2);

        // Assert
        expect(trackable.history().map((entry) => entry.value)).toEqual([1, 2]);
    });

    it('updates the source even when the recording filter skips the value', () => {
        // Arrange
        const trackable = trackableSignal(0, { shouldRecord: (next) => next % 2 === 0 });

        // Act
        trackable.value.set(1);

        // Assert
        expect(trackable.value()).toBe(1);
        expect(trackable.history().map((entry) => entry.value)).toEqual([0]);
        expect(trackable.canUndo()).toBe(false);
    });

    it('does not record the same primitive value twice', () => {
        // Arrange
        const trackable = trackableSignal(0);

        // Act
        trackable.value.set(0);

        // Assert
        expect(trackable.history()).toHaveLength(1);
        expect(trackable.canUndo()).toBe(false);
    });

    it('resets history at the current undo position', () => {
        // Arrange
        const trackable = trackableSignal(0);
        trackable.value.set(1);
        trackable.value.set(2);
        trackable.undo();

        // Act
        trackable.reset();

        // Assert
        expect(trackable.value()).toBe(1);
        expect(trackable.history().map((entry) => entry.value)).toEqual([1]);
        expect(trackable.canUndo()).toBe(false);
        expect(trackable.canRedo()).toBe(false);
    });

    it('clears history while keeping the current signal value', () => {
        // Arrange
        const trackable = trackableSignal(0);
        trackable.value.set(1);
        expect(trackable.canUndo()).toBe(true);

        // Act
        trackable.clear();

        // Assert
        expect(trackable.value()).toBe(1);
        expect(trackable.history()).toEqual([]);
        expect(trackable.canUndo()).toBe(false);
        expect(trackable.canRedo()).toBe(false);
    });

    it('starts a new usable history after clearing it', () => {
        // Arrange
        const trackable = trackableSignal(0);
        trackable.value.set(1);
        trackable.clear();

        // Act
        trackable.value.set(2);

        // Assert
        expect(trackable.value()).toBe(2);
        expect(trackable.history().map((entry) => entry.value)).toEqual([1, 2]);
        expect(trackable.canUndo()).toBe(true);
    });

    it('can reset a cleared history without losing its current value', () => {
        // Arrange
        const trackable = trackableSignal(3);
        trackable.clear();

        // Act
        trackable.reset();

        // Assert
        expect(trackable.value()).toBe(3);
        expect(trackable.history().map((entry) => entry.value)).toEqual([3]);
        expect(trackable.canUndo()).toBe(false);
        expect(trackable.canRedo()).toBe(false);
    });
});
