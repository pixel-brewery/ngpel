import { describe, expect, it } from 'vitest';
import { composeWithBase } from './composeWithBase';
import { createFeature } from './createFeature';
import { featureKind } from './FeatureKind';

describe('composeWithBase', () => {
    it('composes a single base provider with feature providers', () => {
        // Arrange
        const base = { provide: 'BASE', useValue: 0 };
        const feature = createFeature('probe', featureKind('telemetry'), [{ provide: 'A', useValue: 1 }]);

        // Act
        const providers = composeWithBase(base, [feature]);

        // Assert
        expect(providers).toEqual([base, { provide: 'A', useValue: 1 }]);
    });

    it('rejects two non-multi features of the same kind', () => {
        // Arrange
        const kind = featureKind('transcriber');
        const features = [createFeature('local', kind, []), createFeature('http', kind, [])];

        // Act
        const act = () => composeWithBase({ provide: 'BASE', useValue: 0 }, features);

        // Assert
        expect(act).toThrowError(/non-multi kind 'transcriber'/);
    });
});
