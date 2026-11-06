// #region Imports

import { inject, Injectable, type Signal } from '@angular/core';
import type { IWidget } from '../models/IWidget';
import { WIDGET } from '../provider/WIDGET';
import type { IWidgetManager } from './IWidgetManager';
import { WidgetRegistry } from './WidgetRegistry';

// #endregion

/**
 * Collects the widgets contributed under the {@link WIDGET} multi-token and registers them in the
 * {@link WidgetRegistry}, which stays the only store and the only order. A host may still add or
 * drop widgets afterwards — a widget that only exists for one tenant, or one that a background
 * capability check turns out to allow.
 *
 * Registered by `provideWidget(...)`.
 *
 * @public
 */
@Injectable()
export class WidgetManager implements IWidgetManager {
    // #region Fields

    private readonly _registry: WidgetRegistry = inject(WidgetRegistry);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `WidgetManager` class.
     *
     * @public
     */
    public constructor() {
        for (const widget of inject(WIDGET, { optional: true }) ?? []) {
            this._registry.register(widget);
        }
    }

    // #endregion

    // #region Properties

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get widgets(): Signal<ReadonlyArray<IWidget>> {
        return this._registry.widgets;
    }

    // #endregion

    // #region Methods

    /**
     * @inheritdoc
     *
     * @public
     * @param widget The widget to register.
     */
    public registerWidget(widget: IWidget): void {
        this._registry.register(widget);
    }

    /**
     * @inheritdoc
     *
     * @public
     * @param widgetId The id of the widget to unregister.
     */
    public unregisterWidget(widgetId: string): void {
        this._registry.unregister(widgetId);
    }

    /**
     * @inheritdoc
     *
     * @public
     * @returns The registered widgets.
     */
    public allWidgets(): ReadonlyArray<IWidget> {
        return this._registry.all();
    }

    // #endregion
}
