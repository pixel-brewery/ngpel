// #region Imports

import { InjectionToken } from '@angular/core';
import type { IFileDownloader } from './IFileDownloader';

// #endregion

/**
 * Injection token for the {@link IFileDownloader} port. Registered by `withFileDownload()`
 * through `provideBrowser(...)`.
 *
 * @public
 */
export const FILE_DOWNLOADER = new InjectionToken<IFileDownloader>('NGPEL_FILE_DOWNLOADER');
