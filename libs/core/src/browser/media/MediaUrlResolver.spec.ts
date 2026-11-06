import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ENV } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { MediaUrlResolver } from './MediaUrlResolver';
import { provideMediaUrls } from './provideMediaUrls';
import { withApiOrigin } from './withApiOrigin';

describe('MediaUrlResolver', () => {
    it('resolves backend-owned root-relative paths against the configured origin', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideMediaUrls(withApiOrigin('https://api.example.test/'))] });
        const resolver = TestBed.inject(MediaUrlResolver);

        // Act
        const resolved = resolver.resolve('/api/v1/users/7/avatar/content?v=1');

        // Assert
        expect(resolved).toBe('https://api.example.test/api/v1/users/7/avatar/content?v=1');
    });

    it('evaluates an origin accessor inside an injection context', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [
                { provide: ENV, useValue: { API_URL: 'https://env.example.test' } },
                provideMediaUrls(withApiOrigin(() => inject(ENV)['API_URL'] ?? '')),
            ],
        });
        const resolver = TestBed.inject(MediaUrlResolver);

        // Act
        const resolved = resolver.resolve('/api/v1/avatar');

        // Assert
        expect(resolved).toBe('https://env.example.test/api/v1/avatar');
    });

    it('re-evaluates the origin accessor on every resolution', () => {
        // Arrange
        let origin = 'https://first.example.test';
        TestBed.configureTestingModule({ providers: [provideMediaUrls(withApiOrigin(() => origin))] });
        const resolver = TestBed.inject(MediaUrlResolver);
        resolver.resolve('/api/v1/avatar');
        origin = 'https://second.example.test';

        // Act
        const resolved = resolver.resolve('/api/v1/avatar');

        // Assert
        expect(resolved).toBe('https://second.example.test/api/v1/avatar');
    });

    it('passes root-relative paths through when no origin is configured', () => {
        // Arrange
        const resolver = TestBed.inject(MediaUrlResolver);

        // Act
        const resolved = resolver.resolve('/api/v1/tenants/3/logo/content?v=1');

        // Assert
        expect(resolved).toBe('/api/v1/tenants/3/logo/content?v=1');
    });

    it('preserves absolute URLs regardless of the configured origin', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideMediaUrls(withApiOrigin('https://api.example.test'))] });
        const resolver = TestBed.inject(MediaUrlResolver);

        // Act
        const resolved = resolver.resolve('https://cdn.example.test/avatar.webp');

        // Assert
        expect(resolved).toBe('https://cdn.example.test/avatar.webp');
    });
});
