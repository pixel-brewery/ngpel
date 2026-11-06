// #region Imports

import { Type } from '@angular/core';
import { createFeature, IFeature } from '@pixel-brewery/ngpel-core';
import { IOperationClock } from '../scheduling/interfaces/IOperationClock';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';
import { OperationQueueFeatureKinds } from './OperationQueueFeatureKinds';
import { OPERATION_CLOCK } from './OperationQueueTokens';

// #endregion

/**
 * Registers a custom clock for the operation queue (non-multi).
 *
 * @param clock - The clock class to instantiate.
 * @returns A composable feature for {@link provideOperationQueue}.
 * @public
 */
export function withClock(clock: Type<IOperationClock>): IFeature<OperationQueueFeatureKind> {
    return createFeature(
        'clock',
        OperationQueueFeatureKinds.Clock,
        [
            {
                provide: OPERATION_CLOCK,
                useClass: clock,
            },
        ],
        { multi: false },
    );
}
