import { createFeature, validateFeatures } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { BrowserStorageFeatureKinds } from './BrowserStorageFeatureKind';

describe('BrowserStorageFeatureKinds', () => {
    it('brands the storage kind with its stable name', () => {
        // Arrange
        const kind = BrowserStorageFeatureKinds.Storage;

        // Act
        const name: string = kind;

        // Assert
        expect(name).toBe('storage');
    });

    it('is non-multi, so the kernel rejects a second storage feature', () => {
        // Arrange
        const features = [createFeature('first', BrowserStorageFeatureKinds.Storage, []), createFeature('second', BrowserStorageFeatureKinds.Storage, [])];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).toThrow(/non-multi kind 'storage'/);
    });
});
