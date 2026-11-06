import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { MediaUrlResolver } from './MediaUrlResolver';
import { provideMediaUrls } from './provideMediaUrls';
import { withApiOrigin } from './withApiOrigin';

describe('provideMediaUrls', () => {
    it('scopes a resolver with the contributed origin', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideMediaUrls(withApiOrigin('https://api.example.test'))] });

        // Act
        const resolved = TestBed.inject(MediaUrlResolver).resolve('/api/v1/avatar');

        // Assert
        expect(resolved).toBe('https://api.example.test/api/v1/avatar');
    });

    it('registers a pass-through resolver without features', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideMediaUrls()] });

        // Act
        const resolved = TestBed.inject(MediaUrlResolver).resolve('/api/v1/avatar');

        // Assert
        expect(resolved).toBe('/api/v1/avatar');
    });

    it('rejects two origin features', () => {
        // Arrange
        const features = [withApiOrigin('https://one.example.test'), withApiOrigin('https://two.example.test')];

        // Act
        const act = (): unknown => provideMediaUrls(...features);

        // Assert
        expect(act).toThrowError(/non-multi kind 'origin'/);
    });
});
