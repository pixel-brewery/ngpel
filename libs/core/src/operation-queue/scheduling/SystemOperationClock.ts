// #region Imports

import { IOperationClock } from './interfaces/IOperationClock';

// #endregion

/**
 * Clock implementation delegating to {@link Date.now}.
 *
 * @public
 */
export class SystemOperationClock implements IOperationClock {
    // #region Methods

    /**
     * Returns the current timestamp in milliseconds.
     *
     * @returns Current system time.
     * @public
     */
    public now(): number {
        return Date.now();
    }

    // #endregion
}
