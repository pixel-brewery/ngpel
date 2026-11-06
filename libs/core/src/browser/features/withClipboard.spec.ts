import { composeProviders } from '@pixel-brewery/ngpel-core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { CLIPBOARD } from '../clipboard/CLIPBOARD';
import { ClipboardService } from '../clipboard/ClipboardService';
import type { IClipboard } from '../clipboard/IClipboard';
import { BrowserFeatureKinds } from './BrowserFeatureKind';
import { provideBrowser } from './provideBrowser';
import { withClipboard } from './withClipboard';

class RecordingClipboard implements IClipboard {
    public writeText(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

describe('withClipboard', () => {
    it('contributes the default adapter under the clipboard port', () => {
        // Arrange
        const feature = withClipboard();

        // Act
        const providers = composeProviders([], [feature]);

        // Assert
        expect(providers).toEqual([{ provide: CLIPBOARD, useClass: ClipboardService }]);
        expect(feature.kind).toBe(BrowserFeatureKinds.Clipboard);
        expect(feature.options.multi).toBe(false);
    });

    it('instantiates a custom adapter through the port', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideBrowser(withClipboard(RecordingClipboard))] });

        // Act
        const clipboard = TestBed.inject(CLIPBOARD);

        // Assert
        expect(clipboard).toBeInstanceOf(RecordingClipboard);
    });
});
