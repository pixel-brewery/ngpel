import { createFeature } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { SearchKinds } from './SearchKinds';

describe('SearchKinds', () => {
    it('brands every kind with its stable name', () => {
        // Arrange
        const kinds = SearchKinds;

        // Act
        const names: ReadonlyArray<string> = [kinds.Commands, kinds.Providers, kinds.Renderers];

        // Assert
        expect(names).toEqual(['search-commands', 'search-providers', 'search-renderers']);
    });

    it('is accepted by the feature kernel as a kind discriminator', () => {
        // Arrange
        const providers = [{ provide: 'PROBE', useValue: 1 }];

        // Act
        const feature = createFeature('probe', SearchKinds.Providers, providers, { multi: true });

        // Assert
        expect(feature.kind).toBe(SearchKinds.Providers);
        expect(feature.provide()).toEqual(providers);
    });

    it('keeps the three kinds distinct so contributions never collide', () => {
        // Arrange
        const kinds = SearchKinds;

        // Act
        const distinctKinds = new Set<string>([kinds.Commands, kinds.Providers, kinds.Renderers]);

        // Assert
        expect(distinctKinds.size).toBe(3);
    });
});
