// #region Imports

import type { Command } from '../commands/Command';
import type { ITrackableSignal } from '../signals/ITrackableSignal';
import type { ITrackable } from './ITrackable';

// #endregion

/**
 * State shared privately by the Trackable mixin and its setup factory.
 *
 * @internal
 */
export interface ITrackableState {
    readonly ref: ITrackableSignal<unknown>;
    readonly undoCommand: Command<void>;
    readonly redoCommand: Command<void>;
}

let states: WeakMap<ITrackable, ITrackableState> | undefined;

/**
 * Reads the state previously configured for a presenter.
 *
 * @internal
 * @param host The presenter owning the state.
 * @returns Its state, if setup has run.
 */
export function getTrackableState(host: ITrackable): ITrackableState | undefined {
    return states?.get(host);
}

/**
 * Stores a presenter's state, allocating the weak registry only on first use.
 *
 * @internal
 * @param host The presenter owning the state.
 * @param state The tracked model and commands to retain.
 */
export function setTrackableState(host: ITrackable, state: ITrackableState): void {
    (states ??= new WeakMap<ITrackable, ITrackableState>()).set(host, state);
}
