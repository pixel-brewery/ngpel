// #region Imports

import type { Signal } from '@angular/core';
import type { Command } from '../commands/Command';
import type { ITrackable } from './ITrackable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';
import { getTrackableState, type ITrackableState } from './trackableState';

// #endregion

/**
 * Adds undo and redo commands for a model configured through {@link withUndoRedo}.
 *
 * @remarks
 * The factory owns the model and commands; this mixin exposes them to the View and clears the
 * history when its presenter is disposed.
 *
 * @public
 * @param base The presenter class to extend.
 * @returns An abstract class that additionally implements {@link ITrackable}.
 */
export function Trackable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, ITrackable> {
    abstract class TrackablePresenter extends base implements ITrackable {
        // #region Properties

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get undoCommand(): Command<void> {
            return this.getState().undoCommand;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get redoCommand(): Command<void> {
            return this.getState().redoCommand;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get canUndo(): Signal<boolean> {
            return this.getState().ref.canUndo;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get canRedo(): Signal<boolean> {
            return this.getState().ref.canRedo;
        }

        // #endregion

        // #region Methods

        /**
         * Releases undo and redo history before disposing the presenter.
         *
         * @public
         * @override
         */
        public override dispose(): void {
            getTrackableState(this)?.ref.clear();

            super.dispose();
        }

        /**
         * Resolves the model configured by the concrete presenter's setup factory.
         *
         * @returns The configured model and commands.
         * @throws Error when the presenter did not call `withUndoRedo()` during construction.
         */
        private getState(): ITrackableState {
            const state = getTrackableState(this);

            if (!state) {
                throw new Error('withUndoRedo() must be called in the constructor before accessing Trackable properties.');
            }

            return state;
        }

        // #endregion
    }

    return TrackablePresenter as PresenterBehaviorReturn<T, ITrackable>;
}
