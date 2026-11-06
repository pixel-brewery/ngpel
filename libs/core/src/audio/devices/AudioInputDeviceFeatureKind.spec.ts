import { createFeature, validateFeatures } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { AudioInputDeviceFeatureKinds } from './AudioInputDeviceFeatureKind';

describe('AudioInputDeviceFeatureKinds', () => {
    it('brands the preference-key kind with its stable name', () => {
        // Arrange
        const kind = AudioInputDeviceFeatureKinds.PreferenceKey;

        // Act
        const name: string = kind;

        // Assert
        expect(name).toBe('preference-key');
    });

    it('is non-multi, so the kernel rejects a second preference key', () => {
        // Arrange
        const features = [
            createFeature('first', AudioInputDeviceFeatureKinds.PreferenceKey, []),
            createFeature('second', AudioInputDeviceFeatureKinds.PreferenceKey, []),
        ];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).toThrow(/non-multi kind 'preference-key'/);
    });
});
