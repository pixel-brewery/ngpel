// #region Imports

import type { SignalOperator } from './SignalOperator';
import type { SignalSubject } from './SignalSubject';

// #endregion

/**
 * Applies a sequence of signal operators to a subject.
 *
 * @public
 * @typeParam T The source value type.
 * @typeParam R The final value type.
 * @param input The source subject.
 * @param operators The transformations to apply in order.
 * @returns The final subject, or the original subject when no operators are supplied.
 */
// Type-erased intermediate values permit operators to change the value type in a chain.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pipe<T, R>(input: SignalSubject<T>, ...operators: Array<SignalOperator<any, any>>): SignalSubject<R> {
    let output = input as unknown as SignalSubject<unknown>;

    for (const operator of operators) {
        output = operator(output);
    }

    return output as unknown as SignalSubject<R>;
}
