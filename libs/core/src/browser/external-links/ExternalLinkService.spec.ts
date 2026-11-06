import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExternalLinkService } from './ExternalLinkService';

function createService(defaultView: unknown): ExternalLinkService {
    TestBed.configureTestingModule({
        providers: [ExternalLinkService, { provide: DOCUMENT, useValue: { defaultView } }],
    });

    return TestBed.inject(ExternalLinkService);
}

describe('ExternalLinkService', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('opens external URLs in a new, isolated browsing context', () => {
        // Arrange
        const open = vi.fn();
        const service = createService({ open });

        // Act
        service.open('https://example.test/repo/actions/runs/1');

        // Assert
        expect(open).toHaveBeenCalledTimes(1);
        expect(open).toHaveBeenCalledWith('https://example.test/repo/actions/runs/1', '_blank', 'noopener,noreferrer');
    });

    it.each([undefined, ''])('ignores an empty URL (%j)', (url) => {
        // Arrange
        const open = vi.fn();
        const service = createService({ open });

        // Act
        service.open(url);

        // Assert
        expect(open).not.toHaveBeenCalled();
    });

    it('does nothing when there is no window', () => {
        // Arrange
        const service = createService(null);

        // Act
        const act = (): void => service.open('https://example.test');

        // Assert
        expect(act).not.toThrow();
    });
});
