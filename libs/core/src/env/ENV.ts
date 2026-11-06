// #region Imports

import { InjectionToken } from '@angular/core';
import type { EnvExport } from './EnvExport';

// #endregion

/**
 * Injection token carrying the application's environment variables. Products provide it at the
 * composition root, for example `{ provide: ENV, useValue: environment }`.
 *
 * @public
 */
export const ENV = new InjectionToken<EnvExport>('NGPEL_ENV');
