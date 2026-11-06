// #region Imports

import { computed, type Signal } from '@angular/core';
import { command, type Command } from '../commands/Command';
import type { IRefreshable } from './IRefreshable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

// #endregion

/**
 * Adds an explicit refresh command that is disabled while the presenter is loading.
 *
 * @public
 * @param base The presenter class to extend.
 * @returns An abstract class that additionally implements {@link IRefreshable}.
 */
export function Refreshable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, IRefreshable> {
    abstract class RefreshablePresenter extends base implements IRefreshable {
        // #region Fields

        private readonly _canRefresh: Signal<boolean> = computed(() => !this.isLoading());
        private readonly _refreshCommand: Command<void> = command<void>(() => this.onExecuteRefresh(), this._canRefresh);

        // #endregion

        // #region Properties

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get canRefresh(): Signal<boolean> {
            return this._canRefresh;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get refreshCommand(): Command<void> {
            return this._refreshCommand;
        }

        // #endregion

        // #region Methods

        /**
         * @inheritdoc
         *
         * @public
         * @virtual
         */
        public onExecuteRefresh(): void {
            // Reloading belongs to the concrete presenter.
        }

        // #endregion
    }

    return RefreshablePresenter as PresenterBehaviorReturn<T, IRefreshable>;
}
