// #region Imports

import { featureKind, FeatureKind } from '@pixel-brewery/ngpel-core';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';

// #endregion

/**
 * Branded feature kind constants for the operation queue.
 *
 * @public
 */
export const OperationQueueFeatureKinds = {
    FailurePolicy: featureKind<OperationQueueFeatureKind>('failure-policy'),
    MergePolicy: featureKind<OperationQueueFeatureKind>('merge-policy'),
    Clock: featureKind<OperationQueueFeatureKind>('clock'),
    IdFactory: featureKind<OperationQueueFeatureKind>('id-factory'),
    Lifecycle: featureKind<OperationQueueFeatureKind>('lifecycle'),
} as const satisfies Record<string, FeatureKind<OperationQueueFeatureKind>>;
