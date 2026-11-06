// #region Imports

import type { Observable } from 'rxjs';
import type { IPreventableCloseAttempt } from './IPreventableCloseAttempt';

// #endregion

/**
 * Structural contract of a UI surface (drawer, dialog) that exposes implicit close attempts and
 * can request the user's attention. Typed structurally so any UI kit's surface ref satisfies it.
 *
 * @public
 */
export interface IAttentionRequestRef<TAttempt extends IPreventableCloseAttempt = IPreventableCloseAttempt> {
    // #region Properties

    /**
     * Emits before an implicit close operation, for example backdrop click or Escape.
     */
    readonly closeAttempted: Observable<TAttempt>;

    // #endregion

    // #region Methods

    /**
     * Requests non-destructive visual attention for the surface.
     */
    requestAttention(): Promise<boolean>;

    // #endregion
}
