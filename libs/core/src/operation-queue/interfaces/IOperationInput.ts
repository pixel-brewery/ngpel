// #region Imports

import { IOperation } from './IOperation';
import type { IOperationDefinition } from './IOperationDefinition';

// #endregion

/**
 * Flexible input for {@link OperationQueue.enqueue}. Accepts either a full
 * {@link IOperation} or a simplified {@link IOperationDefinition}.
 *
 * @typeParam TPayload - The input data required by the operation.
 * @typeParam TResult - The result produced by a successful commit.
 * @public
 */
export type IOperationInput<TPayload, TResult = void> = IOperation<TPayload, TResult> | IOperationDefinition<TPayload, TResult>;
