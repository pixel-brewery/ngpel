// #region Imports

import { Provider } from '@angular/core';
import { createFeature, IFeature } from '@pixel-brewery/ngpel-core';
import { OperationLifecycle } from '../lifecycle/OperationLifecycle';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';
import { OperationQueueFeatureKinds } from './OperationQueueFeatureKinds';
import { OPERATION_LIFECYCLE } from './OperationQueueTokens';

// #endregion

/**
 * Feature that enables lifecycle event emission on the operation queue.
 *
 * When active, the queue emits {@link OperationLifecycleEvent} instances through
 * the {@link OperationLifecycle} service. UI adapters subscribe to these events
 * to drive toast notifications, analytics, or other side-effects.
 *
 * @example
 * ```typescript
 * provideOperationQueue(undefined, withLifecycleEvents())
 * ```
 *
 * @public
 */
export function withLifecycleEvents(): IFeature<OperationQueueFeatureKind> {
    return createFeature(
        'lifecycle',
        OperationQueueFeatureKinds.Lifecycle,
        [
            {
                provide: OperationLifecycle,
                useClass: OperationLifecycle,
            },
            {
                provide: OPERATION_LIFECYCLE,
                useExisting: OperationLifecycle,
            },
        ] as ReadonlyArray<Provider>,
        { multi: false },
    );
}
