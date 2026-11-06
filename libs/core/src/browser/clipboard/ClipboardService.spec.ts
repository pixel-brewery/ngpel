import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ClipboardService } from './ClipboardService';

function createService(defaultView: unknown): ClipboardService {
    TestBed.configureTestingModule({
        providers: [ClipboardService, { provide: DOCUMENT, useValue: { defaultView } }],
    });

    return TestBed.inject(ClipboardService);
}

describe('ClipboardService', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('reports a written value so the caller can confirm it to the user', async () => {
        // Arrange
        const writeText = vi.fn().mockResolvedValue(undefined);
        const service = createService({ navigator: { clipboard: { writeText } } });

        // Act
        const result = await service.writeText('https://example.test/issues/7');

        // Assert
        expect(result).toBe(true);
        expect(writeText).toHaveBeenCalledWith('https://example.test/issues/7');
    });

    it('reports failure instead of claiming a copy the platform rejected', async () => {
        // Arrange
        const writeText = vi.fn().mockRejectedValue(new Error('denied'));
        const service = createService({ navigator: { clipboard: { writeText } } });

        // Act
        const result = await service.writeText('https://example.test/issues/7');

        // Assert
        expect(result).toBe(false);
    });

    it('reports failure when no clipboard is available', async () => {
        // Arrange
        const service = createService({ navigator: {} });

        // Act
        const result = await service.writeText('https://example.test/issues/7');

        // Assert
        expect(result).toBe(false);
    });

    it('reports failure when there is no window', async () => {
        // Arrange
        const service = createService(null);

        // Act
        const result = await service.writeText('https://example.test/issues/7');

        // Assert
        expect(result).toBe(false);
    });

    it.each([undefined, ''])('copies nothing when the value is %j', async (text) => {
        // Arrange
        const writeText = vi.fn();
        const service = createService({ navigator: { clipboard: { writeText } } });

        // Act
        const result = await service.writeText(text);

        // Assert
        expect(result).toBe(false);
        expect(writeText).not.toHaveBeenCalled();
    });
});
