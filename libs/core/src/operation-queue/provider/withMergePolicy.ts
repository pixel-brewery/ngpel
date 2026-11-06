// #region Imports

import { Type } from '@angular/core';
import { createFeature, IFeature } from '@pixel-brewery/ngpel-core';
import { IOperationMergePolicy } from '../policies/interfaces/IOperationMergePolicy';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';
import { OperationQueueFeatureKinds } from './OperationQueueFeatureKinds';
import { OPERATION_MERGE_POLICY } from './OperationQueueTokens';

// #endregion

/**
 * Registers a merge policy for the operation queue (non-multi).
 *
 * @param policy - The merge policy class to instantiate.
 * @returns A composable feature for {@link provideOperationQueue}.
 * @public
 */
export function withMergePolicy(policy: Type<IOperationMergePolicy>): IFeature<OperationQueueFeatureKind> {
    return createFeature(
        'merge-policy',
        OperationQueueFeatureKinds.MergePolicy,
        [
            {
                provide: OPERATION_MERGE_POLICY,
                useClass: policy,
            },
        ],
        { multi: false },
    );
}
