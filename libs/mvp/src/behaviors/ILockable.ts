// #region Imports

import type { Signal } from '@angular/core';
import type { LockRef } from '../refs/LockRef';

// #endregion

/**
 * Contract of the Lockable presenter behavior: a nestable interaction lock the View can bind to
 * while a mutation must not be interrupted.
 *
 * @public
 */
export interface ILockable {
    // #region Properties

    /**
     * Whether at least one explicit interaction lock is held.
     */
    readonly isLocked: Signal<boolean>;

    /**
     * Whether the View must currently prevent interaction. Covers explicit locks and, when the
     * presenter is also composed with `Hydratable`, the initial hydration phase.
     */
    readonly isInteractionLocked: Signal<boolean>;

    /**
     * Lock reference for commands and manually coordinated operations.
     *
     * @remarks
     * Public because TypeScript mixins cannot declare protected members. It is a subclass
     * integration point — do not bind it from a template.
     */
    readonly lockRef: LockRef;

    // #endregion

    // #region Methods

    /**
     * Runs an operation with the interaction lock held and always releases it, including when the
     * operation throws or rejects.
     *
     * @remarks
     * Public because TypeScript mixins cannot declare protected members. It is a subclass
     * integration point — do not call it from a template.
     *
     * @typeParam T The result of the operation.
     * @param operation The operation to run while locked.
     * @returns The result of the operation.
     */
    runLocked<T>(operation: () => PromiseLike<T> | T): Promise<T>;

    // #endregion
}
