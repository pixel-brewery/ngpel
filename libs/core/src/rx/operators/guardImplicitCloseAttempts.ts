// #region Imports

import type { Subscription } from 'rxjs';
import type { IAttentionRequestRef } from './IAttentionRequestRef';
import type { IPreventableCloseAttempt } from './IPreventableCloseAttempt';

// #endregion

/**
 * Prevents implicit close attempts while the supplied predicate reports unsaved state, requesting
 * attention for the surface instead.
 *
 * @public
 * @param ref Surface ref that emits preventable close attempts.
 * @param shouldPreventClose Predicate evaluated for every close attempt.
 * @param onPreventClose Callback invoked after a close attempt has been prevented.
 * @returns Subscription for presenter lifecycle cleanup.
 */
export function guardImplicitCloseAttempts<TAttempt extends IPreventableCloseAttempt>(
    ref: IAttentionRequestRef<TAttempt>,
    shouldPreventClose: () => boolean,
    onPreventClose?: (attempt: TAttempt) => void,
): Subscription {
    return ref.closeAttempted.subscribe((attempt) => {
        if (!shouldPreventClose()) {
            return;
        }

        attempt.preventClose();
        void ref.requestAttention();
        onPreventClose?.(attempt);
    });
}
