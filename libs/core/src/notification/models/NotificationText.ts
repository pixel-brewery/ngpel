// #region Imports

import type { Signal } from '@angular/core';

// #endregion

/**
 * Text of a notification. A plain string is the simple case; a signal lets a translated or
 * otherwise reactive caption keep updating after the notification was raised, which matters for a
 * notification history that outlives a language switch.
 *
 * @public
 */
export type NotificationText = Signal<string> | string;
