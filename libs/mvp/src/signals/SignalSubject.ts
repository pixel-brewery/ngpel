// #region Imports

import { signal, type Signal, type WritableSignal } from '@angular/core';
import type { SignalOperator } from './SignalOperator';
import { pipe } from './pipe';

// #endregion

/**
 * Holds its latest value as an Angular signal and synchronously notifies subscribers.
 *
 * @public
 * @typeParam T The emitted value type.
 */
export class SignalSubject<T> {
    // #region Fields

    private readonly _state: WritableSignal<T | undefined>;
    private readonly _observers: Set<(value: T) => void> = new Set();

    // #endregion

    // #region Ctor

    /**
     * Creates a subject with an optional initial value.
     *
     * @public
     * @param initial The value replayed to new subscribers; `undefined` is not replayed.
     */
    public constructor(initial?: T) {
        this._state = signal(initial);
    }

    // #endregion

    // #region Properties

    /**
     * The latest emitted value, or `undefined` before the first emission.
     *
     * @public
     * @readonly
     */
    public get value(): T | undefined {
        return this._state();
    }

    // #endregion

    // #region Methods

    /**
     * Updates the signal and notifies each current subscriber, including for repeated values.
     *
     * @public
     * @param value The value to emit.
     */
    public next(value: T): void {
        this._state.set(value);

        for (const observer of Array.from(this._observers)) {
            observer(value);
        }
    }

    /**
     * Subscribes and immediately replays the latest value when it is defined.
     *
     * @public
     * @param callback The observer invoked for each emission.
     * @returns A function that removes the observer.
     */
    public subscribe(callback: (value: T) => void): () => void {
        this._observers.add(callback);

        const current = this._state();
        if (current !== undefined) {
            callback(current);
        }

        return (): void => {
            this._observers.delete(callback);
        };
    }

    /**
     * Applies signal operators in order.
     *
     * @public
     * @typeParam R The final value type.
     * @param operators The transformations to apply.
     * @returns The transformed subject.
     */
    // Type-erased intermediate values permit operators to change the value type in a chain.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public pipe<R>(...operators: Array<SignalOperator<any, any>>): SignalSubject<R> {
        return pipe<T, R>(this, ...operators);
    }

    /**
     * Returns a read-only signal that follows the latest emitted value.
     *
     * @public
     * @returns The subject's read-only signal.
     */
    public asReadonly(): Signal<T | undefined> {
        return this._state.asReadonly();
    }

    // #endregion
}
