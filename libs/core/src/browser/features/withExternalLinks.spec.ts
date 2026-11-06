import { composeProviders } from '@pixel-brewery/ngpel-core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { EXTERNAL_LINK_OPENER } from '../external-links/EXTERNAL_LINK_OPENER';
import { ExternalLinkService } from '../external-links/ExternalLinkService';
import type { IExternalLinkOpener } from '../external-links/IExternalLinkOpener';
import { BrowserFeatureKinds } from './BrowserFeatureKind';
import { provideBrowser } from './provideBrowser';
import { withExternalLinks } from './withExternalLinks';

class RecordingOpener implements IExternalLinkOpener {
    public open(): void {
        /* noop */
    }
}

describe('withExternalLinks', () => {
    it('contributes the default adapter under the external link port', () => {
        // Arrange
        const feature = withExternalLinks();

        // Act
        const providers = composeProviders([], [feature]);

        // Assert
        expect(providers).toEqual([{ provide: EXTERNAL_LINK_OPENER, useClass: ExternalLinkService }]);
        expect(feature.kind).toBe(BrowserFeatureKinds.ExternalLinks);
        expect(feature.options.multi).toBe(false);
    });

    it('instantiates a custom adapter through the port', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideBrowser(withExternalLinks(RecordingOpener))] });

        // Act
        const opener = TestBed.inject(EXTERNAL_LINK_OPENER);

        // Assert
        expect(opener).toBeInstanceOf(RecordingOpener);
    });
});
