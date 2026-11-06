import { composeProviders } from '@pixel-brewery/ngpel-core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { MEDIA_URL_OPTIONS } from './MEDIA_URL_OPTIONS';
import { MediaUrlFeatureKinds } from './MediaUrlFeatureKind';
import { withApiOrigin } from './withApiOrigin';

describe('withApiOrigin', () => {
    it('contributes a static origin as the media URL options', () => {
        // Arrange
        const feature = withApiOrigin('https://api.example.test');

        // Act
        const providers = composeProviders([], [feature]);

        // Assert
        expect(providers).toEqual([{ provide: MEDIA_URL_OPTIONS, useValue: { origin: 'https://api.example.test' } }]);
        expect(feature.kind).toBe(MediaUrlFeatureKinds.Origin);
        expect(feature.options.multi).toBe(false);
    });

    it('keeps an origin accessor unevaluated until resolution', () => {
        // Arrange
        const accessor = vi.fn(() => 'https://api.example.test');
        TestBed.configureTestingModule({ providers: [...withApiOrigin(accessor).provide()] });

        // Act
        const options = TestBed.inject(MEDIA_URL_OPTIONS);

        // Assert
        expect(options.origin).toBe(accessor);
        expect(accessor).not.toHaveBeenCalled();
    });
});
