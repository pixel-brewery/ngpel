// #region Imports

import { command } from '../commands/Command';
import type { ITrackableSignal } from '../signals/ITrackableSignal';
import { trackableSignal } from '../signals/trackableSignal';
import type { TrackableSignalOptions } from '../signals/TrackableSignalOptions';
import type { ITrackable } from './ITrackable';
import { setTrackableState } from './trackableState';

// #endregion

/**
 * Creates a tracked model and connects its history to the presenter's commands and gates.
 *
 * @remarks
 * Call once from the concrete presenter's constructor, before reading its Trackable members.
 *
 * @public
 * @typeParam TModel The model value retained in history.
 * @param host The presenter to configure.
 * @param initialValue The initial model value.
 * @param options Optional history capacity and recording filters.
 * @returns The tracked model owned by the presenter.
 */
export function withUndoRedo<TModel>(host: ITrackable, initialValue: TModel, options?: TrackableSignalOptions<TModel>): ITrackableSignal<TModel> {
    const trackable = trackableSignal(initialValue, options);

    setTrackableState(host, {
        ref: trackable as ITrackableSignal<unknown>,
        undoCommand: command<void>(() => trackable.undo(), trackable.canUndo),
        redoCommand: command<void>(() => trackable.redo(), trackable.canRedo),
    });

    return trackable;
}
