// #region Imports

import type { Provider, Type } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IUpdateHandlerStrategy } from '../strategies/IUpdateHandlerStrategy';
import { UPDATE_STRATEGIES } from './UPDATE_STRATEGIES';
import type { UpdateFeatureKind } from './UpdateFeatureKind';
import { UpdateKinds } from './UpdateKinds';

// #endregion

/**
 * Registers an {@link IUpdateHandlerStrategy}. Strategy features are `multi`: several may be
 * composed as long as their ids differ, and every event reaches all of them.
 *
 * @public
 * @param id Stable feature id, for example `'default'` or `'toast'`.
 * @param strategy The strategy class (created through DI) or a ready instance.
 */
export function withUpdateStrategy(id: string, strategy: Type<IUpdateHandlerStrategy> | IUpdateHandlerStrategy): IFeature<UpdateFeatureKind> {
    const providers: ReadonlyArray<Provider> =
        typeof strategy === 'function'
            ? [
                  { provide: strategy, useClass: strategy },
                  { provide: UPDATE_STRATEGIES, useExisting: strategy, multi: true },
              ]
            : [{ provide: UPDATE_STRATEGIES, useValue: strategy, multi: true }];

    return createFeature(id, UpdateKinds.Strategy, providers, { multi: true });
}
