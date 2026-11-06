// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The kinds of features `provideWidget(...)` accepts. The kind is multi: any number of feature
 * libraries may contribute widgets.
 *
 * @public
 */
export type WidgetFeatureKind = 'widget-item';

/**
 * The branded kind vocabulary of the widget entry point.
 *
 * @public
 */
export const WidgetFeatureKinds = {
    Item: featureKind<WidgetFeatureKind>('widget-item'),
} as const satisfies Record<string, FeatureKind<WidgetFeatureKind>>;
