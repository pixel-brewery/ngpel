// #region Imports

import { Type } from '@angular/core';
import { createFeature, IFeature } from '@pixel-brewery/ngpel-core';
import { IOperationFailurePolicy } from '../policies/interfaces/IOperationFailurePolicy';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';
import { OperationQueueFeatureKinds } from './OperationQueueFeatureKinds';
import { OPERATION_FAILURE_POLICY } from './OperationQueueTokens';

// #endregion

/**
 * Registers a failure policy for the operation queue (non-multi).
 *
 * @param policy - The failure policy class to instantiate.
 * @returns A composable feature for {@link provideOperationQueue}.
 * @public
 */
export function withFailurePolicy(policy: Type<IOperationFailurePolicy>): IFeature<OperationQueueFeatureKind> {
    return createFeature(
        'failure-policy',
        OperationQueueFeatureKinds.FailurePolicy,
        [
            {
                provide: OPERATION_FAILURE_POLICY,
                useClass: policy,
            },
        ],
        { multi: false },
    );
}
