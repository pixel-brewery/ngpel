// #region Imports

import { describe, expect, it } from 'vitest';
import { WIDGET_GRID_LAYOUT_CODEC } from './WIDGET_GRID_LAYOUT_CODEC';
import { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

describe('WIDGET_GRID_LAYOUT_VERSION', () => {
    it('is the version the codec accepts without migrating', () => {
        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse({ version: WIDGET_GRID_LAYOUT_VERSION, zones: [], items: [] });

        // Assert
        expect(result?.version).toBe(WIDGET_GRID_LAYOUT_VERSION);
    });

    it('is not the version of a payload the codec has to reject', () => {
        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse({ version: WIDGET_GRID_LAYOUT_VERSION + 1, zones: [], items: [] });

        // Assert
        expect(result).toBeUndefined();
    });
});
