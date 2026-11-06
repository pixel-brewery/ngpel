// #region Imports

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OperationLifecycleEvent } from './OperationLifecycleEvent';

// #endregion

/**
 * Reactive stream of operation lifecycle events.
 *
 * The queue and executor emit events here; UI adapters subscribe to drive
 * toast notifications, analytics, or any other side-effect without coupling
 * to the queue internals.
 *
 * @public
 */
@Injectable()
export class OperationLifecycle {
    // #region Fields

    private readonly _subject = new Subject<OperationLifecycleEvent>();

    // #endregion

    // #region Properties

    /**
     * Observable of all lifecycle events.
     *
     * @public
     */
    public readonly events = this._subject.asObservable();

    // #endregion

    // #region Methods

    /**
     * Emits a lifecycle event.
     *
     * @param event - The event to emit.
     * @public
     */
    public emit(event: OperationLifecycleEvent): void {
        this._subject.next(event);
    }

    // #endregion
}
