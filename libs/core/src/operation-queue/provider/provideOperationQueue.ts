// #region Imports

import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, IFeature, IFeatureIncompatibilityRule } from '@pixel-brewery/ngpel-core';
import { CryptoOperationIdFactory } from '../identity/CryptoOperationIdFactory';
import { IOperationQueueOptions } from '../interfaces/IOperationQueueOptions';
import { KeepOptimisticOnFailurePolicy } from '../policies/KeepOptimisticOnFailurePolicy';
import { NoOperationMergePolicy } from '../policies/NoOperationMergePolicy';
import { OperationExecutor } from '../queue/OperationExecutor';
import { OperationQueue } from '../queue/OperationQueue';
import { OperationScheduler } from '../queue/OperationScheduler';
import { OperationStateStore } from '../queue/OperationStateStore';
import { SystemOperationClock } from '../scheduling/SystemOperationClock';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';
import { OPERATION_CLOCK, OPERATION_FAILURE_POLICY, OPERATION_ID_FACTORY, OPERATION_MERGE_POLICY, OPERATION_QUEUE_OPTIONS } from './OperationQueueTokens';

// #endregion

/**
 * @private
 */
const OPERATION_QUEUE_RULES: ReadonlyArray<IFeatureIncompatibilityRule<OperationQueueFeatureKind>> = [];

/**
 * @private
 */
const DEFAULT_OPTIONS: IOperationQueueOptions = {
    defaultDelayInMilliseconds: 8000,
    countdownIntervalInMilliseconds: 1000,
};

/**
 * Registers the operation queue with composable features.
 *
 * @param options - Optional overrides for the default queue configuration.
 * @param features - Composable features such as {@link withFailurePolicy} or {@link withMergePolicy}.
 * @returns Environment providers for Angular DI.
 *
 * @example
 * ```typescript
 * provideOperationQueue(
 *     { defaultDelayInMilliseconds: 5000 },
 *     withFailurePolicy(RollbackOnFailurePolicy),
 *     withMergePolicy(ReplacePendingByMergeKeyPolicy)
 * )
 * ```
 *
 * @public
 */
export function provideOperationQueue(
    options?: Partial<IOperationQueueOptions>,
    ...features: ReadonlyArray<IFeature<OperationQueueFeatureKind>>
): EnvironmentProviders {
    return makeEnvironmentProviders([
        ...composeProviders(
            [
                {
                    provide: OPERATION_QUEUE_OPTIONS,
                    useValue: {
                        ...DEFAULT_OPTIONS,
                        ...options,
                    } satisfies IOperationQueueOptions,
                },
                {
                    provide: OPERATION_CLOCK,
                    useClass: SystemOperationClock,
                },
                {
                    provide: OPERATION_ID_FACTORY,
                    useClass: CryptoOperationIdFactory,
                },
                {
                    provide: OPERATION_FAILURE_POLICY,
                    useClass: KeepOptimisticOnFailurePolicy,
                },
                {
                    provide: OPERATION_MERGE_POLICY,
                    useClass: NoOperationMergePolicy,
                },
                {
                    provide: OperationStateStore,
                    useClass: OperationStateStore,
                },
                {
                    provide: OperationExecutor,
                    useClass: OperationExecutor,
                },
                {
                    provide: OperationScheduler,
                    useClass: OperationScheduler,
                },
                {
                    provide: OperationQueue,
                    useClass: OperationQueue,
                },
            ],
            features,
            OPERATION_QUEUE_RULES,
        ),
    ]);
}
