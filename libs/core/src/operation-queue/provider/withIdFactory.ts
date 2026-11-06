// #region Imports

import { Type } from '@angular/core';
import { createFeature, IFeature } from '@pixel-brewery/ngpel-core';
import { IOperationIdFactory } from '../identity/interfaces/IOperationIdFactory';
import type { OperationQueueFeatureKind } from './OperationQueueFeatureKind';
import { OperationQueueFeatureKinds } from './OperationQueueFeatureKinds';
import { OPERATION_ID_FACTORY } from './OperationQueueTokens';

// #endregion

/**
 * Registers a custom ID factory for the operation queue (non-multi).
 *
 * @param factory - The ID factory class to instantiate.
 * @returns A composable feature for {@link provideOperationQueue}.
 * @public
 */
export function withIdFactory(factory: Type<IOperationIdFactory>): IFeature<OperationQueueFeatureKind> {
    return createFeature(
        'id-factory',
        OperationQueueFeatureKinds.IdFactory,
        [
            {
                provide: OPERATION_ID_FACTORY,
                useClass: factory,
            },
        ],
        { multi: false },
    );
}
