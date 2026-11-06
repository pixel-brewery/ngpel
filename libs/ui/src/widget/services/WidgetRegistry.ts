// #region Imports

import { Injectable, type Signal, signal, type WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import type { IWidget } from '../models/IWidget';
import type { IWidgetRegistry } from './IWidgetRegistry';

// #endregion

/**
 * The in-memory widget store. It is the single source of order: widgets are published sorted by
 * `order` and then by id, so a dashboard renders the same sequence no matter in which sequence the
 * feature libraries were composed.
 *
 * Registered by `provideWidget(...)`.
 *
 * @public
 */
@Injectable()
export class WidgetRegistry implements IWidgetRegistry {
    // #region Fields

    private readonly _widgets: Map<string, IWidget> = new Map<string, IWidget>();
    private readonly _widgetChanged: Subject<void> = new Subject<void>();
    private readonly _sortedWidgets: WritableSignal<ReadonlyArray<IWidget>> = signal<ReadonlyArray<IWidget>>([]);

    // #endregion

    // #region Properties

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get widgets(): Signal<ReadonlyArray<IWidget>> {
        return this._sortedWidgets.asReadonly();
    }

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get widgetChanged(): Observable<void> {
        return this._widgetChanged.asObservable();
    }

    // #endregion

    // #region Methods

    /**
     * @inheritdoc
     *
     * @public
     * @param widget The widget to register.
     */
    public register(widget: IWidget): void {
        this._widgets.set(widget.id, widget);
        this.publish();
    }

    /**
     * @inheritdoc
     *
     * @public
     * @param widgetId The id of the widget to unregister.
     */
    public unregister(widgetId: string): void {
        if (!this._widgets.delete(widgetId)) {
            return;
        }

        this.publish();
    }

    /**
     * @inheritdoc
     *
     * @public
     * @returns The registered widgets.
     */
    public all(): ReadonlyArray<IWidget> {
        return this._sortedWidgets();
    }

    /**
     * @inheritdoc
     *
     * @public
     * @param widgetId The id of the widget.
     * @returns The widget, or `undefined` while it is not registered.
     */
    public get(widgetId: string): IWidget | undefined {
        return this._widgets.get(widgetId);
    }

    /**
     * Republishes the sorted widget list and notifies the RxJS consumers.
     */
    private publish(): void {
        this._sortedWidgets.set([...this._widgets.values()].sort((left, right): number => left.order - right.order || left.id.localeCompare(right.id)));
        this._widgetChanged.next();
    }

    // #endregion
}
