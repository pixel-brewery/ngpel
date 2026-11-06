// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { LockRef } from '../refs/LockRef';
import type { IHydratable } from './IHydratable';
import type { ILockable } from './ILockable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

// #endregion

/**
 * The single member of {@link IHydratable} that Lockable folds into its combined lock. Declaring it
 * separately keeps the dependency on Hydratable optional and explicit instead of an unchecked cast.
 */
type HydrationState = Pick<IHydratable, 'isHydrating'>;

/**
 * Detects whether a composed presenter also carries the Hydratable behavior.
 *
 * @remarks
 * The member has to be callable, not merely present: `in` already holds for a declared field that
 * nothing assigned yet, and reading the lock must never throw because of a half-built presenter.
 *
 * @param candidate The presenter to probe.
 * @returns `true` when the presenter exposes a readable hydration signal.
 */
function hasHydrationState(candidate: object): candidate is HydrationState {
    return 'isHydrating' in candidate && typeof candidate.isHydrating === 'function';
}

/**
 * Adds a nestable interaction lock around critical presenter operations.
 *
 * @remarks
 * Explicit locks are independent of the presenter's loading state, so background reads stay
 * non-blocking while a save, an upload or a delete can block the whole View. Locks are counted:
 * nested and parallel operations keep the View locked until the last one settles. When the
 * presenter is composed with `Hydratable` — in either order — `isInteractionLocked` additionally
 * covers the initial hydration.
 *
 * @public
 * @param base The class to extend.
 * @returns An abstract class that additionally implements {@link ILockable}.
 *
 * @example
 * ```typescript
 * class OrderViewPresenter extends Lockable(Hydratable(ViewPresenter)) {
 *     public save(): Promise<void> {
 *         return this.runLocked(() => this._orders.save());
 *     }
 * }
 * ```
 */
export function Lockable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, ILockable> {
    abstract class LockablePresenter extends base implements ILockable {
        // #region Fields

        private readonly _activeLocks: WritableSignal<number> = signal(0);
        private readonly _isLocked: Signal<boolean> = computed(() => this._activeLocks() > 0);
        private readonly _isInteractionLocked: Signal<boolean> = computed(() => this._isLocked() || this.isHydrationActive());
        private readonly _lockRef: LockRef = {
            enter: (): void => this.updateLockCount(true),
            leave: (): void => this.updateLockCount(false),
        };

        // #endregion

        // #region Properties

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get isLocked(): Signal<boolean> {
            return this._isLocked;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get isInteractionLocked(): Signal<boolean> {
            return this._isInteractionLocked;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get lockRef(): LockRef {
            return this._lockRef;
        }

        // #endregion

        // #region Methods

        /**
         * Releases every held lock and disposes the presenter.
         *
         * @public
         * @override
         */
        public override dispose(): void {
            this._activeLocks.set(0);

            super.dispose();
        }

        /**
         * @inheritdoc
         *
         * @public
         */
        public async runLocked<TResult>(operation: () => PromiseLike<TResult> | TResult): Promise<TResult> {
            this._lockRef.enter();

            try {
                return await operation();
            } finally {
                this._lockRef.leave();
            }
        }

        /**
         * Reads the hydration state of a presenter that is also composed with `Hydratable`.
         */
        private isHydrationActive(): boolean {
            return hasHydrationState(this) ? this.isHydrating() : false;
        }

        /**
         * Adjusts the lock counter, clamped at zero so an unbalanced leave cannot swallow a later
         * enter.
         */
        private updateLockCount(enter: boolean): void {
            this._activeLocks.update((count) => Math.max(0, count + (enter ? 1 : -1)));
        }

        // #endregion
    }

    return LockablePresenter as PresenterBehaviorReturn<T, ILockable>;
}
