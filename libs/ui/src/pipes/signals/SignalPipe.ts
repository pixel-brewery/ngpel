// #region Imports

import { isSignal, Pipe, type PipeTransform, type Signal, signal, type WritableSignal } from '@angular/core';

// #endregion

/**
 * Wraps a template expression in a signal, so a plain value can be handed to an input, a directive
 * or a helper that expects one: `<ngp-chart [series]="rows() | ngpSignal" />`.
 *
 * A value that already is a signal is passed through unchanged. A plain value is written into one
 * signal the pipe keeps, so the consumer sees a stable reference and merely a new value whenever
 * the expression changes. The pipe is impure by necessity: a pure pipe would not run again for a
 * changed value once the reference stayed the same.
 *
 * @public
 */
@Pipe({ name: 'ngpSignal', pure: false })
export class SignalPipe<TValue = unknown> implements PipeTransform {
    // #region Fields

    private _source: WritableSignal<TValue> | null = null;

    // #endregion

    // #region Methods

    /**
     * Returns `value` as a signal.
     *
     * @public
     * @param value The signal to pass through, or the plain value to wrap.
     * @returns The signal carrying the value.
     */
    public transform(value: Signal<TValue> | TValue): Signal<TValue> {
        if (this.isSignalValue(value)) {
            this._source = null;

            return value;
        }

        const plain = value as TValue;
        if (this._source === null) {
            this._source = signal<TValue>(plain);
        } else {
            this._source.set(plain);
        }

        return this._source;
    }

    private isSignalValue(value: Signal<TValue> | TValue): value is Signal<TValue> {
        return isSignal(value);
    }

    // #endregion
}
