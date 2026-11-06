// #region Imports

import type { ICommandItem } from './ICommandItem';

// #endregion

/**
 * A dynamic contributor of command items. Sources are injectable classes and are asked on every
 * query, so labels and permissions that resolve late (translations, session state) stay current.
 *
 * @public
 */
export interface ICommandSource {
    // #region Properties

    /**
     * Unique identifier of the source, typically the contributing feature (e.g. `'settings'`).
     */
    readonly id: string;

    // #endregion

    // #region Methods

    /**
     * Returns the commands matching the given query. An empty query asks for the complete
     * catalogue — the palette uses it to fill its suggestion list before the user types.
     * Implementations may use the signal to stop work when the caller cancels.
     *
     * @param query The trimmed query, or an empty string for "return everything you have".
     * @param signal Cancels the request when supplied by the caller.
     */
    getCommands(query: string, signal?: AbortSignal): Promise<ReadonlyArray<ICommandItem>> | ReadonlyArray<ICommandItem>;

    // #endregion
}
