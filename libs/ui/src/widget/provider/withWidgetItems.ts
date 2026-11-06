// #region Imports

import type { Provider } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IWithWidgetItemsOptions } from './IWithWidgetItemsOptions';
import { WIDGET } from './WIDGET';
import { type WidgetFeatureKind, WidgetFeatureKinds } from './WidgetFeatureKind';

// #endregion

/**
 * Contributes widgets to the dashboard. A feature library exports one such contribution; the
 * composition root passes it to `provideWidget(...)`.
 *
 * @public
 * @param options The contribution id and its widget factories.
 * @returns A feature for `provideWidget(...)`.
 *
 * @example
 * ```typescript
 * export function withReportingWidgets(): IFeature<WidgetFeatureKind> {
 *     return withWidgetItems({ id: 'reporting', widgets: [createRevenueWidget, createPipelineWidget] });
 * }
 * ```
 */
export function withWidgetItems(options: IWithWidgetItemsOptions): IFeature<WidgetFeatureKind> {
    const providers: ReadonlyArray<Provider> = options.widgets.map((factory): Provider => ({
        provide: WIDGET,
        useFactory: factory,
        multi: true,
    }));

    return createFeature(options.id, WidgetFeatureKinds.Item, providers, { multi: true });
}
