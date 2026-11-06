// #region Imports

import { Injectable } from '@angular/core';
import type { FieldState } from '@angular/forms/signals';

// #endregion

/**
 * Minimal Signal Forms state used to associate a validation scope with its triggers.
 *
 * @public
 */
export type ScrollToErrorState = Pick<FieldState<unknown>, 'invalid'>;

/**
 * Validation scope that can reveal its first invalid control.
 *
 * @internal
 */
export interface IScrollToErrorTarget {
    revealFirstInvalidControl(): void;
}

/**
 * Associates Signal Forms validation scopes with triggers that may live elsewhere in the DOM.
 *
 * @internal
 */
@Injectable({
    providedIn: 'root',
})
export class ScrollToErrorRegistry {
    // #region Fields

    private readonly _targets = new WeakMap<ScrollToErrorState, IScrollToErrorTarget>();

    // #endregion

    // #region Ctor

    public constructor() {
        // noop
    }

    // #endregion

    // #region Methods

    public register(state: ScrollToErrorState, target: IScrollToErrorTarget): void {
        this._targets.set(state, target);
    }

    public unregister(state: ScrollToErrorState, target: IScrollToErrorTarget): void {
        if (this._targets.get(state) === target) {
            this._targets.delete(state);
        }
    }

    public reveal(state: ScrollToErrorState): void {
        this._targets.get(state)?.revealFirstInvalidControl();
    }

    // #endregion
}
