// #region Imports

import { createFeature } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { WidgetFeatureKinds } from './WidgetFeatureKind';

// #endregion

describe('WidgetFeatureKinds', () => {
    it('brands the item kind with its stable name', () => {
        // Arrange
        const kind = WidgetFeatureKinds.Item;

        // Act
        const name: string = kind;

        // Assert
        expect(name).toBe('widget-item');
    });

    it('is accepted by the feature kernel as a kind discriminator', () => {
        // Arrange
        const providers = [{ provide: 'PROBE', useValue: 1 }];

        // Act
        const feature = createFeature('probe', WidgetFeatureKinds.Item, providers, { multi: true });

        // Assert
        expect(feature.kind).toBe(WidgetFeatureKinds.Item);
        expect(feature.provide()).toEqual(providers);
    });
});
