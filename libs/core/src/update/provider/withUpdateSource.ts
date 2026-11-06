// #region Imports

import type { Provider, Type } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IUpdateSource } from '../models/IUpdateSource';
import { UPDATE_SOURCE } from './UPDATE_SOURCE';
import type { UpdateFeatureKind } from './UpdateFeatureKind';
import { UpdateKinds } from './UpdateKinds';

// #endregion

/**
 * Registers the {@link IUpdateSource} the manager listens to. Only one source feature may be
 * composed; the feature kernel rejects a second one.
 *
 * @public
 * @param id Stable feature id, for example `'serviceWorker'` or `'electron'`.
 * @param source The source class (created through DI) or a ready instance.
 */
export function withUpdateSource(id: string, source: Type<IUpdateSource> | IUpdateSource): IFeature<UpdateFeatureKind> {
    const providers: ReadonlyArray<Provider> =
        typeof source === 'function'
            ? [
                  { provide: source, useClass: source },
                  { provide: UPDATE_SOURCE, useExisting: source },
              ]
            : [{ provide: UPDATE_SOURCE, useValue: source }];

    return createFeature(id, UpdateKinds.Source, providers);
}
