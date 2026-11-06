import { createFeature, validateFeatures } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';

describe('UserPreferenceFeatureKinds', () => {
    it('brands the storage kind with its stable name', () => {
        // Arrange
        const kind = UserPreferenceFeatureKinds.Storage;

        // Act
        const name: string = kind;

        // Assert
        expect(name).toBe('storage');
    });

    it('is non-multi, so the kernel rejects a second preference-storage feature', () => {
        // Arrange
        const features = [createFeature('first', UserPreferenceFeatureKinds.Storage, []), createFeature('second', UserPreferenceFeatureKinds.Storage, [])];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).toThrow(/non-multi kind 'storage'/);
    });
});
