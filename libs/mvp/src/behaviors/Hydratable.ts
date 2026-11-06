// #region Imports

import { signal, type Signal, type WritableSignal } from '@angular/core';
import { finalize, isObservable, type Subscription } from 'rxjs';
import type { HydrationOperation } from './HydrationOperation';
import type { IHydratable } from './IHydratable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

// #endregion

/**
 * Adds a one-time initial hydration to a presenter, separate from the loading state of everything
 * that happens afterwards.
 *
 * @remarks
 * The presenter starts out hydrating, before the first render, and leaves that state when the
 * operation returned by `onHydrate()` completes, fails, or is torn down — an unsubscribed stream
 * ends hydration too, so a cancelled load never strands the View in a skeleton. Each
 * `initialize()` starts a new generation: a completion belonging to an earlier one is ignored, so
 * a re-initialize or a disposal cannot be undone by a straggler. An empty hydration is finished in
 * a microtask rather than synchronously, because a synchronous finish inside `ngOnInit` can leave
 * an `OnPush` control-flow block empty. Whichever shape the operation had, hydration ends before
 * `onHydrationError()` runs, so a handler that reads `isHydrating()` always sees the settled state.
 *
 * @public
 * @param base The class to extend.
 * @returns An abstract class that additionally implements {@link IHydratable}.
 *
 * @example
 * ```typescript
 * class OrderViewPresenter extends Hydratable(ViewPresenter) {
 *     public override onHydrate(): HydrationOperation {
 *         return this._orders.load();
 *     }
 * }
 * ```
 */
export function Hydratable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, IHydratable> {
    abstract class HydratablePresenter extends base implements IHydratable {
        // #region Fields

        private readonly _isHydrating: WritableSignal<boolean> = signal(true);
        private _hydrationSubscription: Subscription | undefined = undefined;
        private _hydrationGeneration = 0;

        // #endregion

        // #region Properties

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get isHydrating(): Signal<boolean> {
            return this._isHydrating.asReadonly();
        }

        // #endregion

        // #region Methods

        /**
         * Starts a new hydration and keeps the presenter hydrating until it settles.
         *
         * @public
         * @override
         */
        public override initialize(): void {
            super.initialize();

            const generation = ++this._hydrationGeneration;

            this._hydrationSubscription?.unsubscribe();
            this._hydrationSubscription = undefined;
            this._isHydrating.set(true);

            let hydration: HydrationOperation;

            try {
                hydration = this.onHydrate();
            } catch (error: unknown) {
                this.finishHydration(generation);
                this.onHydrationError(error);

                return;
            }

            if (hydration === undefined) {
                queueMicrotask(() => this.finishHydration(generation));

                return;
            }

            if (isObservable(hydration)) {
                this._hydrationSubscription = hydration.pipe(finalize(() => this.finishHydration(generation))).subscribe({
                    error: (error: unknown) => {
                        this.finishHydration(generation);
                        this.onHydrationError(error);
                    },
                });

                return;
            }

            void hydration.then(
                () => this.finishHydration(generation),
                (error: unknown) => {
                    this.finishHydration(generation);
                    this.onHydrationError(error);
                },
            );
        }

        /**
         * Cancels a running hydration and leaves the hydrating state.
         *
         * @public
         * @override
         */
        public override dispose(): void {
            this._hydrationGeneration += 1;
            this._hydrationSubscription?.unsubscribe();
            this._hydrationSubscription = undefined;
            this._isHydrating.set(false);

            super.dispose();
        }

        /**
         * @inheritdoc
         *
         * @public
         * @virtual
         */
        public onHydrate(): HydrationOperation {
            return undefined;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @virtual
         */
        public onHydrationError(error: unknown): void {
            throw error;
        }

        /**
         * Leaves the hydrating state unless the operation belongs to a superseded generation.
         */
        private finishHydration(generation: number): void {
            if (generation !== this._hydrationGeneration) {
                return;
            }

            this._isHydrating.set(false);
        }

        // #endregion
    }

    return HydratablePresenter as PresenterBehaviorReturn<T, IHydratable>;
}
