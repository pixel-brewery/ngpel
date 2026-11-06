// #region Imports

import { signal, type Signal, type WritableSignal } from '@angular/core';
import { command, type Command } from '../commands/Command';
import type { ICloseable } from './ICloseable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

// #endregion

/**
 * Adds a close command with its own enable gate to a presenter.
 *
 * @remarks
 * The behavior owns the command and the gate; what closing means stays with the presenter, which
 * overrides `onExecuteClose()`. Executing the command while the gate is closed does nothing, so a
 * View can bind the command unconditionally.
 *
 * @public
 * @param base The class to extend.
 * @returns An abstract class that additionally implements {@link ICloseable}.
 *
 * @example
 * ```typescript
 * class OrderDialogViewPresenter extends Closeable(ViewPresenter) {
 *     public override onExecuteClose(): void {
 *         this._dialog.close();
 *     }
 * }
 * ```
 */
export function Closeable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, ICloseable> {
    abstract class CloseablePresenter extends base implements ICloseable {
        // #region Fields

        private readonly _canClose: WritableSignal<boolean> = signal(true);
        private readonly _closeCommand: Command<void> = command<void>(() => this.onExecuteClose(), this._canClose.asReadonly());

        // #endregion

        // #region Properties

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get canClose(): Signal<boolean> {
            return this._canClose.asReadonly();
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get closeCommand(): Command<void> {
            return this._closeCommand;
        }

        // #endregion

        // #region Methods

        /**
         * @inheritdoc
         *
         * @public
         * @virtual
         */
        public onExecuteClose(): void {
            // Nothing to close by default — override in the concrete presenter.
        }

        /**
         * @inheritdoc
         *
         * @public
         */
        public setCanExecuteClose(value: boolean): void {
            this._canClose.set(value);
        }

        // #endregion
    }

    return CloseablePresenter as PresenterBehaviorReturn<T, ICloseable>;
}
