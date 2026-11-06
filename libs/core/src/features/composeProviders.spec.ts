import { describe, expect, it } from 'vitest';
import { composeProviders } from './composeProviders';
import { createFeature } from './createFeature';
import { featureKind } from './FeatureKind';

describe('composeProviders', () => {
    it('appends validated feature providers after the base providers in registration order', () => {
        // Arrange
        const base = [{ provide: 'BASE', useValue: 0 }];
        const first = createFeature('first', featureKind('telemetry'), [{ provide: 'A', useValue: 1 }], { multi: true });
        const second = createFeature('second', featureKind('telemetry'), [{ provide: 'B', useValue: 2 }], { multi: true });

        // Act
        const providers = composeProviders(base, [first, second]);

        // Assert
        expect(providers).toEqual([
            { provide: 'BASE', useValue: 0 },
            { provide: 'A', useValue: 1 },
            { provide: 'B', useValue: 2 },
        ]);
    });

    it('fails fast when the feature set violates a rule', () => {
        // Arrange
        const feature = createFeature('local', featureKind('transcriber'), []);
        const rule = { id: 'no-local', message: 'local transcription is disabled', isViolated: () => true };

        // Act
        const act = () => composeProviders([], [feature], [rule]);

        // Assert
        expect(act).toThrowError('Feature incompatibility [no-local]: local transcription is disabled');
    });
});
