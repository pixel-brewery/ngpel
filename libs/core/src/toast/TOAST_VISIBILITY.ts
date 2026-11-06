// #region Imports

import { InjectionToken } from '@angular/core';
import type { IToastVisibility } from './IToastVisibility';

// #endregion

/**
 * Application-level toast visibility policy. Defaults to a policy that always allows toasts;
 * products override it to suppress toasts, for example while a modal surface is open.
 *
 * @public
 */
export const TOAST_VISIBILITY = new InjectionToken<IToastVisibility>('NGPEL_TOAST_VISIBILITY', {
    providedIn: 'root',
    factory: (): IToastVisibility => ({ canShow: (): boolean => true }),
});
