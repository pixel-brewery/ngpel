// #region Imports

import type { Signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { IWidget } from '../models/IWidget';

// #endregion

/**
 * The storage port of the widget infrastructure: it keeps the registered widgets and publishes
 * them in registration-independent order. It holds definitions only — a user's placement of those
 * widgets is a separate, persisted `IWidgetGridLayout`.
 *
 * @public
 */
export interface IWidgetRegistry {
    // #region Properties

    /**
     * Every registered widget, ordered by `order` and then by id.
     */
    readonly widgets: Signal<ReadonlyArray<IWidget>>;

    /**
     * Emits after a widget was registered or unregistered, for consumers that react through RxJS
     * instead of signals.
     */
    readonly widgetChanged: Observable<void>;

    // #endregion

    // #region Methods

    /**
     * Registers a widget, replacing a widget already registered under the same id.
     *
     * @public
     * @param widget The widget to register.
     */
    register(widget: IWidget): void;

    /**
     * Unregisters a widget. Unregistering an unknown id is a no-op.
     *
     * @public
     * @param widgetId The id of the widget to unregister.
     */
    unregister(widgetId: string): void;

    /**
     * Reads every registered widget in the order {@link IWidgetRegistry.widgets} publishes.
     *
     * @public
     * @returns The registered widgets.
     */
    all(): ReadonlyArray<IWidget>;

    /**
     * Reads one registered widget.
     *
     * @public
     * @param widgetId The id of the widget.
     * @returns The widget, or `undefined` while it is not registered.
     */
    get(widgetId: string): IWidget | undefined;

    // #endregion
}
