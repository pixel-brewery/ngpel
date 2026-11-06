// #region Imports

import { computed, isWritableSignal, signal, type WritableSignal } from '@angular/core';
import type { ITrackableSignal } from './ITrackableSignal';
import type { ITrackableSignalRecord } from './ITrackableSignalRecord';
import type { TrackableSignalOptions } from './TrackableSignalOptions';

// #endregion

/**
 * Tracks writes to an existing signal or a new signal created from an initial value.
 *
 * @remarks
 * An existing writable signal keeps its identity. Its own `set()` and `update()` methods are
 * replaced with non-enumerable tracking methods; Angular's signal prototype is unchanged.
 * Undo and redo restore snapshots without recording another write. After `clear()`, the next
 * write starts a new history from the then-current value.
 *
 * @public
 * @typeParam T The signal value type.
 * @param source The writable signal to wrap or its initial value.
 * @param options History capacity and optional recording filter.
 * @returns The signal and its reactive history controls.
 */
export function trackableSignal<T>(source: WritableSignal<T> | T, options?: TrackableSignalOptions<T>): ITrackableSignal<T> {
    const requestedCapacity = options?.capacity ?? 100;
    const capacity = Number.isFinite(requestedCapacity) ? Math.max(1, Math.floor(requestedCapacity)) : 100;
    const signalSource: WritableSignal<T> = isWritableSignal(source) ? source : signal(source);
    const undoStack = signal<Array<ITrackableSignalRecord<T>>>([{ value: signalSource(), timestamp: Date.now() }]);
    const redoStack = signal<Array<ITrackableSignalRecord<T>>>([]);
    const originalSet = signalSource.set.bind(signalSource);

    const trackedSet = (newValue: T): void => {
        const recorded = undoStack();
        const previous = recorded.at(-1) ?? { value: signalSource(), timestamp: Date.now() };
        const shouldRecord = newValue !== previous.value && (options?.shouldRecord?.(newValue, previous.value) ?? true);

        originalSet(newValue);

        if (shouldRecord) {
            const baseline = recorded.length === 0 ? [previous] : recorded;

            undoStack.set([...baseline, { value: newValue, timestamp: Date.now() }].slice(-capacity));
            redoStack.set([]);
        } else if (recorded.length === 0) {
            undoStack.set([previous]);
        }
    };

    const trackedUpdate = (update: (currentValue: T) => T): void => {
        trackedSet(update(signalSource()));
    };

    Object.defineProperties(signalSource, {
        set: { configurable: true, enumerable: false, value: trackedSet, writable: true },
        update: { configurable: true, enumerable: false, value: trackedUpdate, writable: true },
    });

    function undo(): void {
        const recorded = undoStack();
        const previous = recorded.at(-2);
        const current = recorded.at(-1);

        if (previous === undefined || current === undefined) {
            return;
        }

        originalSet(previous.value);
        undoStack.set(recorded.slice(0, -1));
        redoStack.set([current, ...redoStack()]);
    }

    function redo(): void {
        const undone = redoStack();
        const next = undone[0];

        if (next === undefined) {
            return;
        }

        originalSet(next.value);
        undoStack.set([...undoStack(), next]);
        redoStack.set(undone.slice(1));
    }

    function reset(): void {
        const current = undoStack().at(-1) ?? { value: signalSource(), timestamp: Date.now() };

        originalSet(current.value);
        undoStack.set([current]);
        redoStack.set([]);
    }

    function clear(): void {
        undoStack.set([]);
        redoStack.set([]);
    }

    return {
        value: signalSource,
        history: computed(() => [...undoStack()]),
        canUndo: computed(() => undoStack().length > 1),
        canRedo: computed(() => redoStack().length > 0),
        undo,
        redo,
        reset,
        clear,
    };
}
