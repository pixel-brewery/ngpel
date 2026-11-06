import { describe, expect, it } from 'vitest';
import { createFeature } from './createFeature';
import { featureKind } from './FeatureKind';
import { validateFeatures } from './validateFeatures';

type TestKind = 'transcriber' | 'telemetry';
const KINDS = {
    Transcriber: featureKind<TestKind>('transcriber'),
    Telemetry: featureKind<TestKind>('telemetry'),
} as const;

describe('validateFeatures', () => {
    it('accepts distinct kinds', () => {
        // Arrange
        const features = [createFeature('local', KINDS.Transcriber, []), createFeature('console', KINDS.Telemetry, [])];

        // Act
        const act = () => validateFeatures(features);

        // Assert
        expect(act).not.toThrow();
    });

    it('rejects two non-multi features of the same kind', () => {
        // Arrange
        const features = [createFeature('local', KINDS.Transcriber, []), createFeature('http', KINDS.Transcriber, [])];

        // Act
        const act = () => validateFeatures(features);

        // Assert
        expect(act).toThrowError(/non-multi kind 'transcriber'/);
    });

    it('rejects duplicate ids within a multi kind', () => {
        // Arrange
        const features = [createFeature('console', KINDS.Telemetry, [], { multi: true }), createFeature('console', KINDS.Telemetry, [], { multi: true })];

        // Act
        const act = () => validateFeatures(features);

        // Assert
        expect(act).toThrowError(/duplicate id 'console'/);
    });

    it('applies incompatibility rules', () => {
        // Arrange
        const features = [createFeature('local', KINDS.Transcriber, [])];
        const rule = { id: 'no-local', message: 'local transcription is disabled', isViolated: () => true };

        // Act
        const act = () => validateFeatures(features, [rule]);

        // Assert
        expect(act).toThrowError(/Feature incompatibility \[no-local\]/);
    });
});
