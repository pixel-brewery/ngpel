// #region Imports

import type { Signal } from '@angular/core';
import type { DisposableRef } from '../refs/DisposableRef';
import type { InitializableRef } from '../refs/InitializableRef';

// #endregion

/**
 * Lifecycle and loading contract every presenter of the Model-View-Presenter triad fulfils. A
 * {@link View} drives `initialize()` and `dispose()`; the signals let the template react without
 * knowing which concrete presenter is bound.
 *
 * @public
 */
export interface IViewPresenter extends InitializableRef, DisposableRef {
    // #region Properties

    /**
     * Emits `true` while at least one tracked operation is active.
     */
    readonly isLoading: Signal<boolean>;

    /**
     * Becomes `true` after `dispose()` was called.
     */
    readonly disposed: Signal<boolean>;

    /**
     * Becomes `true` after `initialize()` was called.
     */
    readonly initialized: Signal<boolean>;

    // #endregion
}
