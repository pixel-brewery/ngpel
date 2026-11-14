// #region Imports

import type { Signal } from '@angular/core';
import type { IWidgetData } from './IWidgetData';
import type { IWidgetLayout } from './IWidgetLayout';
import type { IWidgetViews } from './IWidgetViews';
import type { IWidgetVisualConfig } from './IWidgetVisualConfig';

// #endregion

/**
 * One dashboard widget, contributed as plain data so any host can render the same registry: its
 * identity and order, its reactive display text, the default placement and resize constraints it
 * asks for, and the lazily loaded components that make up its faces.
 *
 * A widget describes itself and nothing else. Where it currently sits is user state and lives in a
 * persisted `IWidgetGridLayout`; what it renders is the host's business.
 *
 * @typeParam TData The shape of the optional payload the widget's views read back.
 * @public
 *
 * @example
 * ```typescript
 * const widget: IWidget = {
 *     id: 'pipeline',
 *     order: 10,
 *     title: computed(() => translate('widgets.pipeline.title')),
 *     layout: {
 *         defaultZone: { id: 'operations', iconName: 'board', order: 0 },
 *         enabledByDefault: true,
 *         columnSpan: { default: 3, min: 1, max: 6 },
 *         rowSpan: { default: 2, min: 1, max: 4 }
 *     },
 *     views: { front: async () => (await import('./PipelineWidgetView')).PipelineWidgetView }
 * };
 * ```
 */
export interface IWidget<TData extends IWidgetData = IWidgetData> {
    // #region Properties

    /**
     * The unique identifier of the widget. Registering a second widget under the same id replaces
     * the first one.
     */
    readonly id: string;

    /**
     * The display order within a zone. Lower values come first; ties are broken by id so the order
     * never depends on registration timing.
     */
    readonly order: number;

    /**
     * The widget title, as a signal so a host may resolve it from a translation that arrives late.
     */
    readonly title: Signal<string>;

    /**
     * The widget subtitle, as a signal.
     */
    readonly subTitle?: Signal<string>;

    /**
     * The default grid placement and the resize constraints of the widget.
     */
    readonly layout: IWidgetLayout;

    /**
     * The lazily loaded components rendered for this widget.
     */
    readonly views: IWidgetViews;

    /** Optional appearance of the widget card. */
    readonly visual?: IWidgetVisualConfig;

    /**
     * Decides whether the widget is available at all — a permission check, a licence, a feature
     * flag. An absent predicate means the widget is always available.
     */
    readonly canActivate?: () => boolean;

    /**
     * The payload handed to the widget's views, usually through the `WIDGET_DATA` token.
     */
    readonly data?: TData;

    // #endregion
}
