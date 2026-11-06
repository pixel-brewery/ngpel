// #region Imports

import { IOperation } from '../interfaces/IOperation';
import { IOperationContext } from '../interfaces/IOperationContext';
import type { IOperationDefinition } from '../interfaces/IOperationDefinition';

// #endregion

const DEFAULT_TYPE = 'anonymous';

// #region Helpers

function isFullOperation<TPayload, TResult>(
    input: IOperation<TPayload, TResult> | IOperationDefinition<TPayload, TResult>,
): input is IOperation<TPayload, TResult> {
    const def: IOperationDefinition<TPayload, TResult> = input as IOperationDefinition<TPayload, TResult>;

    return typeof def['commit'] === 'function' && typeof def['apply'] === 'function' && typeof def['rollback'] === 'function';
}

// #endregion

/**
 * Creates a full {@link IOperation} from a simplified {@link IOperationDefinition}.
 *
 * Only `commit` is required. All other fields receive sensible defaults:
 * - `type` → `"anonymous"`
 * * `payload` → `undefined`
 * * `label` → the `type` value
 * * `apply` → no-op
 * * `rollback` → no-op
 *
 * If the input is already a full {@link IOperation} (has `apply`, `commit`,
 * and `rollback`), it is returned as-is without wrapping.
 *
 * @typeParam TPayload - The input data required by the operation.
 * @typeParam TResult - The result produced by a successful commit.
 * @param input - A full operation or a simplified definition.
 * @returns A fully conformant {@link IOperation}.
 * @public
 */
export function operation<TPayload, TResult = void>(
    input: IOperation<TPayload, TResult> | IOperationDefinition<TPayload, TResult>,
): IOperation<TPayload, TResult> {
    if (isFullOperation(input)) {
        return input;
    }

    const def: IOperationDefinition<TPayload, TResult> = input;
    const type: string = def.type ?? DEFAULT_TYPE;

    return {
        type,
        payload: def.payload as TPayload,
        label: def.label ?? type,
        delayInMilliseconds: def.delayInMilliseconds,
        mergeKey: def.mergeKey,
        apply: def.apply ?? noop,
        commit: def.commit,
        rollback: def.rollback ?? noop,
        onCommitted: def.onCommitted,
        onRejected: def.onRejected,
        onFailed: def.onFailed,
    };
}

// #region Defaults

function noop(_context: IOperationContext): void {
    // Intentional no-op default for apply/rollback.
}

// #endregion
