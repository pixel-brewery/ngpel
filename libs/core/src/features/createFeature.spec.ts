import { describe, expect, it } from 'vitest';
import { createFeature } from './createFeature';
import { featureKind } from './FeatureKind';

describe('createFeature', () => {
    it('creates a frozen feature that contributes a defensive copy of its providers', () => {
        // Arrange
        const providers = [{ provide: 'TOKEN', useValue: 1 }];

        // Act
        const feature = createFeature('local', featureKind('transcriber'), providers, { multi: true });

        // Assert
        expect(feature.id).toBe('local');
        expect(feature.kind).toBe('transcriber');
        expect(feature.options).toEqual({ multi: true });
        expect(feature.provide()).toEqual(providers);
        expect(feature.provide()).not.toBe(providers);
        expect(Object.isFrozen(feature)).toBe(true);
        expect(Object.isFrozen(feature.options)).toBe(true);
    });

    it('defaults multi to false when options are omitted or incomplete', () => {
        // Arrange
        const kind = featureKind('telemetry');

        // Act
        const features = [createFeature('a', kind, []), createFeature('b', kind, [], {})];

        // Assert
        expect(features.map((feature) => feature.options.multi)).toEqual([false, false]);
    });
});
