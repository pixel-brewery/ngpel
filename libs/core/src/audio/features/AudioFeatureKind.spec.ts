import { createFeature, validateFeatures } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { AudioFeatureKinds } from './AudioFeatureKind';

describe('AudioFeatureKinds', () => {
    it('brands the audio kinds with their stable names', () => {
        // Arrange
        const kinds = AudioFeatureKinds;

        // Act
        const names: ReadonlyArray<string> = [kinds.Transcriber, kinds.Telemetry];

        // Assert
        expect(names).toEqual(['transcriber', 'telemetry']);
    });

    it('rejects a second transcriber, because one recorder recognizes through one strategy', () => {
        // Arrange
        const features = [createFeature('first', AudioFeatureKinds.Transcriber, []), createFeature('second', AudioFeatureKinds.Transcriber, [])];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).toThrow(/non-multi kind 'transcriber'/);
    });

    it('accepts several telemetry contributions', () => {
        // Arrange
        const features = [
            createFeature('first', AudioFeatureKinds.Telemetry, [], { multi: true }),
            createFeature('second', AudioFeatureKinds.Telemetry, [], { multi: true }),
        ];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).not.toThrow();
    });
});
