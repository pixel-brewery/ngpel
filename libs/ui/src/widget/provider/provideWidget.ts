// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { WidgetManager } from '../services/WidgetManager';
import { WidgetRegistry } from '../services/WidgetRegistry';
import type { WidgetFeatureKind } from './WidgetFeatureKind';

// #endregion

/**
 * Composes the widget infrastructure: the {@link WidgetRegistry} that stores and orders widgets,
 * the {@link WidgetManager} that collects the contributed ones, and every contribution passed in.
 * Call it once, in the application composition root.
 *
 * @public
 * @param features Contributions from `withWidgetItems(...)`.
 * @returns Environment providers for the application composition root.
 * @throws Error when two contributions share an id.
 *
 * @example
 * ```typescript
 * provideWidget(withReportingWidgets(), withFeedbackWidgets());
 * ```
 */
export function provideWidget(...features: ReadonlyArray<IFeature<WidgetFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([WidgetRegistry, WidgetManager], features));
}
