// #region Imports

import {
    ApplicationRef,
    DestroyRef,
    type EnvironmentProviders,
    inject,
    makeEnvironmentProviders,
    type Provider,
    provideEnvironmentInitializer,
} from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { DEFAULT_UPDATE_INTL } from '../intl/DEFAULT_UPDATE_INTL';
import type { IUpdateIntl } from '../intl/IUpdateIntl';
import { UPDATE_INTL } from '../intl/UPDATE_INTL';
import { UpdateManager } from '../services/UpdateManager';
import type { IUpdateConfig } from './IUpdateConfig';
import { UPDATE_CHECK_ON_START } from './UPDATE_CHECK_ON_START';
import { UPDATE_SOURCE } from './UPDATE_SOURCE';
import { UPDATE_STRATEGIES } from './UPDATE_STRATEGIES';
import type { UpdateFeatureKind } from './UpdateFeatureKind';
import { UpdateKinds } from './UpdateKinds';
import { withDefaultUpdateStrategy } from './withDefaultUpdateStrategy';

// #endregion

/**
 * Root environment provider of the update lifecycle: composes the source and strategy features,
 * creates the {@link UpdateManager} eagerly and disposes it with the environment injector. Without
 * a strategy feature the console-only default is registered; a source feature is mandatory and
 * missing one fails fast when the manager is created.
 *
 * @public
 * @param config Optional lifecycle options and text overrides.
 * @param features `withUpdateSource()` / `withServiceWorkerUpdateSource()` plus any `withUpdateStrategy()`.
 */
export function provideUpdate(config?: IUpdateConfig, ...features: ReadonlyArray<IFeature<UpdateFeatureKind>>): EnvironmentProviders {
    const hasStrategy = features.some((feature) => feature.kind === UpdateKinds.Strategy);
    const resolvedFeatures = hasStrategy ? features : [...features, withDefaultUpdateStrategy()];
    const intl: IUpdateIntl = { ...DEFAULT_UPDATE_INTL, ...config?.intl };

    const providers: ReadonlyArray<Provider> = composeProviders(
        [
            { provide: UPDATE_CHECK_ON_START, useValue: config?.checkOnStart ?? false },
            { provide: UPDATE_INTL, useValue: intl },
            { provide: UpdateManager, useFactory: updateManagerFactory },
        ],
        resolvedFeatures,
    );

    return makeEnvironmentProviders([
        ...providers,
        provideEnvironmentInitializer(() => {
            inject(UpdateManager);
        }),
    ]);
}

/**
 * Creates and initializes the manager from the composed tokens.
 */
function updateManagerFactory(): UpdateManager {
    const source = inject(UPDATE_SOURCE, { optional: true });

    if (!source) {
        throw new Error(
            'provideUpdate(): no update source registered. Compose withServiceWorkerUpdateSource() from ' +
                "'@pixel-brewery/ngpel-core/update' or withUpdateSource(id, source) from '@pixel-brewery/ngpel-core/update'.",
        );
    }

    const strategies = inject(UPDATE_STRATEGIES, { optional: true }) ?? [];
    const manager = new UpdateManager(source, strategies, {
        checkOnStart: inject(UPDATE_CHECK_ON_START),
        isStable: inject(ApplicationRef).isStable,
    });

    manager.initialize();
    inject(DestroyRef).onDestroy(() => manager.dispose());

    return manager;
}
