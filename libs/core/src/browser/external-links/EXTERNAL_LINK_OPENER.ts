// #region Imports

import { InjectionToken } from '@angular/core';
import type { IExternalLinkOpener } from './IExternalLinkOpener';

// #endregion

/**
 * Injection token for the {@link IExternalLinkOpener} port. Registered by `withExternalLinks()`
 * through `provideBrowser(...)`.
 *
 * @public
 */
export const EXTERNAL_LINK_OPENER = new InjectionToken<IExternalLinkOpener>('NGPEL_EXTERNAL_LINK_OPENER');
