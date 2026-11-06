// #region Imports

import { InjectionToken } from '@angular/core';
import type { IClipboard } from './IClipboard';

// #endregion

/**
 * Injection token for the {@link IClipboard} port. Registered by `withClipboard()` through
 * `provideBrowser(...)`; nothing is registered by default, so a missing composition surfaces as a
 * `NullInjectorError` instead of a silently inert clipboard.
 *
 * @public
 */
export const CLIPBOARD = new InjectionToken<IClipboard>('NGPEL_CLIPBOARD');
