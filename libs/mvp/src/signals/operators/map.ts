// #region Imports

import type { SignalOperator } from '../SignalOperator';
import { SignalSubject } from '../SignalSubject';

// #endregion

/**
 * Projects the current and subsequent values of a signal subject.
 *
 * @public
 * @typeParam T The source value type.
 * @typeParam R The projected value type.
 * @param project The projection applied to each emission.
 * @returns An operator that creates the projected subject.
 */
export function map<T, R>(project: (value: T) => R): SignalOperator<T, R> {
    return (source: SignalSubject<T>): SignalSubject<R> => {
        const output = new SignalSubject<R>();

        source.subscribe((value: T): void => {
            output.next(project(value));
        });

        return output;
    };
}
