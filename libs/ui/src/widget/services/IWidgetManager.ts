// #region Imports

import type { Signal } from '@angular/core';
import type { IWidget } from '../models/IWidget';

// #endregion

/**
 * The composition port of the widget infrastructure: it collects the widgets contributed through
 * DI and lets a host add or drop widgets at runtime. Storage and ordering are delegated to the
 * {@link IWidgetRegistry}.
 *
 * @public
 */
export interface IWidgetManager {
    // #region Properties

    /**
     * Every registered widget, ordered by `order` and then by id.
     */
    readonly widgets: Signal<ReadonlyArray<IWidget>>;

    // #endregion

    // #region Methods

    /**
     * Registers a widget, replacing a widget already registered under the same id.
     *
     * @public
     * @param widget The widget to register.
     */
    registerWidget(widget: IWidget): void;

    /**
     * Unregisters a widget. Unregistering an unknown id is a no-op.
     *
     * @public
     * @param widgetId The id of the widget to unregister.
     */
    unregisterWidget(widgetId: string): void;

    /**
     * Reads every registered widget in the order {@link IWidgetManager.widgets} publishes.
     *
     * @public
     * @returns The registered widgets.
     */
    allWidgets(): ReadonlyArray<IWidget>;

    // #endregion
}
