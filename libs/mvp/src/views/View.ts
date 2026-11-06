// #region Imports

import { Directive, inject, type OnDestroy, type OnInit } from '@angular/core';
import { disposeViewPresenter } from '../presenters/disposeViewPresenter';
import type { IViewPresenter } from '../presenters/IViewPresenter';
import { VIEW_PRESENTER } from '../presenters/VIEW_PRESENTER';
import type { IView } from './IView';

// #endregion

/**
 * Base class for the View half of the Model-View-Presenter triad. Components extend it and provide
 * their concrete presenter through {@link VIEW_PRESENTER}, usually with `provideViewPresenter()`.
 *
 * @remarks
 * The View owns nothing but the presenter's lifecycle: `ngOnInit` initializes it, `ngOnDestroy`
 * disposes it. Everything the template binds to lives on `presenter`.
 *
 * @typeParam TPresenter The concrete presenter provided by the View.
 * @public
 * @abstract
 *
 * @example
 * ```typescript
 * @Component({ selector: 'ngp-orders', template: '{{ presenter.isLoading() }}', providers: [provideViewPresenter(OrderViewPresenter)] })
 * class OrderView extends View<OrderViewPresenter> {}
 * ```
 */
@Directive()
export abstract class View<TPresenter extends IViewPresenter> implements IView<TPresenter>, OnInit, OnDestroy {
    // #region Fields

    private readonly _presenter = inject(VIEW_PRESENTER) as TPresenter;

    // #endregion

    // #region Properties

    /**
     * @inheritdoc
     *
     * @public
     * @readonly
     */
    public get presenter(): TPresenter {
        return this._presenter;
    }

    // #endregion

    // #region Methods

    /**
     * Initializes the presenter when Angular initializes the View.
     *
     * @public
     */
    public ngOnInit(): void {
        this.initialize();
    }

    /**
     * Disposes the presenter when Angular destroys the View.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this.dispose();
    }

    /**
     * Initializes the backing presenter. Override to run View-side setup around it.
     *
     * @public
     * @virtual
     */
    public initialize(): void {
        this._presenter.initialize();
    }

    /**
     * Disposes the backing presenter. Override to run View-side teardown around it.
     *
     * @public
     * @virtual
     */
    public dispose(): void {
        disposeViewPresenter(this._presenter);
    }

    // #endregion
}
