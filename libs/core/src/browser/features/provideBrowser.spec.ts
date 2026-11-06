import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { CLIPBOARD } from '../clipboard/CLIPBOARD';
import { ClipboardService } from '../clipboard/ClipboardService';
import { FILE_DOWNLOADER } from '../download/FILE_DOWNLOADER';
import { FileDownloadService } from '../download/FileDownloadService';
import { EXTERNAL_LINK_OPENER } from '../external-links/EXTERNAL_LINK_OPENER';
import { ExternalLinkService } from '../external-links/ExternalLinkService';
import { provideBrowser } from './provideBrowser';
import { withClipboard } from './withClipboard';
import { withExternalLinks } from './withExternalLinks';
import { withFileDownload } from './withFileDownload';

describe('provideBrowser', () => {
    it('registers every contributed capability port', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideBrowser(withClipboard(), withExternalLinks(), withFileDownload())],
        });

        // Act
        const ports = [TestBed.inject(CLIPBOARD), TestBed.inject(EXTERNAL_LINK_OPENER), TestBed.inject(FILE_DOWNLOADER)];

        // Assert
        expect(ports[0]).toBeInstanceOf(ClipboardService);
        expect(ports[1]).toBeInstanceOf(ExternalLinkService);
        expect(ports[2]).toBeInstanceOf(FileDownloadService);
    });

    it('registers nothing without features', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideBrowser()] });

        // Act
        const clipboard = TestBed.inject(CLIPBOARD, null);

        // Assert
        expect(clipboard).toBeNull();
    });

    it('rejects two features of the same kind', () => {
        // Arrange
        const features = [withClipboard(), withClipboard()];

        // Act
        const act = (): unknown => provideBrowser(...features);

        // Assert
        expect(act).toThrowError(/non-multi kind 'clipboard'/);
    });
});
