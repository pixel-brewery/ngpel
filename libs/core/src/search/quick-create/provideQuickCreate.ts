// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { QuickCreateManager } from './QuickCreateManager';
import type { QuickCreateFeatureKind } from './quickCreateKind';

// #endregion

/**
 * Provides the manager for feature-owned contextual create actions.
 *
 * @public
 * @param features Registrations from `withQuickCreateItems()`.
 * @returns Environment providers for the application composition root.
 */
export function provideQuickCreate(...features: ReadonlyArray<IFeature<QuickCreateFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([QuickCreateManager], features));
}
