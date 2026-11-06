// #region Imports

import type { Type } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { FILE_DOWNLOADER } from '../download/FILE_DOWNLOADER';
import { FileDownloadService } from '../download/FileDownloadService';
import type { IFileDownloader } from '../download/IFileDownloader';
import { type BrowserFeatureKind, BrowserFeatureKinds } from './BrowserFeatureKind';

// #endregion

/**
 * Registers the {@link FILE_DOWNLOADER} port.
 *
 * @public
 * @param adapter The adapter class to instantiate; defaults to the anchor-based
 * {@link FileDownloadService}.
 * @returns A feature for `provideBrowser(...)`.
 */
export function withFileDownload(adapter: Type<IFileDownloader> = FileDownloadService): IFeature<BrowserFeatureKind> {
    return createFeature('file-download', BrowserFeatureKinds.FileDownload, [{ provide: FILE_DOWNLOADER, useClass: adapter }]);
}
