import { composeProviders } from '@pixel-brewery/ngpel-core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { FILE_DOWNLOADER } from '../download/FILE_DOWNLOADER';
import { FileDownloadService } from '../download/FileDownloadService';
import type { IFileDownloader } from '../download/IFileDownloader';
import { BrowserFeatureKinds } from './BrowserFeatureKind';
import { provideBrowser } from './provideBrowser';
import { withFileDownload } from './withFileDownload';

class RecordingDownloader implements IFileDownloader {
    public downloadBlobAs(): void {
        /* noop */
    }
}

describe('withFileDownload', () => {
    it('contributes the default adapter under the file download port', () => {
        // Arrange
        const feature = withFileDownload();

        // Act
        const providers = composeProviders([], [feature]);

        // Assert
        expect(providers).toEqual([{ provide: FILE_DOWNLOADER, useClass: FileDownloadService }]);
        expect(feature.kind).toBe(BrowserFeatureKinds.FileDownload);
        expect(feature.options.multi).toBe(false);
    });

    it('instantiates a custom adapter through the port', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideBrowser(withFileDownload(RecordingDownloader))] });

        // Act
        const downloader = TestBed.inject(FILE_DOWNLOADER);

        // Assert
        expect(downloader).toBeInstanceOf(RecordingDownloader);
    });
});
