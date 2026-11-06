// #region Imports

import { describe, expect, it } from 'vitest';
import { matchesWidgetSize } from './matchesWidgetSize';

// #endregion

describe('matchesWidgetSize', () => {
    it('matches an exact span on both axes', () => {
        // Act
        const result = matchesWidgetSize({ columnSpan: 2, rowSpan: 3 }, { columns: 2, rows: 3 });

        // Assert
        expect(result).toBe(true);
    });

    it('rejects a span that differs on one axis', () => {
        // Act
        const result = matchesWidgetSize({ columnSpan: 2, rowSpan: 4 }, { columns: 2, rows: 3 });

        // Assert
        expect(result).toBe(false);
    });

    it('matches an inclusive range and leaves the omitted axis unconstrained', () => {
        // Act
        const result = matchesWidgetSize({ columnSpan: 1, rowSpan: 4 }, { columns: { min: 1, max: 2 } });

        // Assert
        expect(result).toBe(true);
    });

    it('rejects a span outside an inclusive range', () => {
        // Act
        const result = matchesWidgetSize({ columnSpan: 3, rowSpan: 2 }, { columns: { min: 1, max: 2 } });

        // Assert
        expect(result).toBe(false);
    });

    it('matches every size for a condition without constraints', () => {
        // Act
        const result = matchesWidgetSize({ columnSpan: 1, rowSpan: 1 }, {});

        // Assert
        expect(result).toBe(true);
    });
});
