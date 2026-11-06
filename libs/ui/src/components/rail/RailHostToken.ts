// #region Imports

import { InjectionToken } from '@angular/core';
import type { IRailHost } from './IRailHost';

// #endregion

/**
 * Resolves the generic coordinator shared by rail actions and rail content.
 *
 * @public
 */
export const RAIL_HOST = new InjectionToken<IRailHost>('RAIL_HOST');
