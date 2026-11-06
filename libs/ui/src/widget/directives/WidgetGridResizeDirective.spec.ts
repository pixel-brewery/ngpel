// #region Imports

import { describe, expect, it } from 'vitest';
import { resolveWidgetGridResizePreview, type IWidgetGridResizeConfiguration } from './WidgetGridResizeDirective';

// #endregion

const CONFIGURATION: IWidgetGridResizeConfiguration = {
    columnSpan: 2,
    rowSpan: 2,
    minColumnSpan: 1,
    maxColumnSpan: 4,
    minRowSpan: 2,
    maxRowSpan: 4,
};

describe('WidgetGridResizeDirective', () => {
    it('snaps pointer movement to the measured canvas grid', () => {
        expect(resolveWidgetGridResizePreview(CONFIGURATION, 149, 63, { column: 200, row: 128 })).toEqual({
            columnSpan: 3,
            rowSpan: 2,
        });
        expect(resolveWidgetGridResizePreview(CONFIGURATION, 0, 65, { column: 200, row: 128 })).toEqual({
            columnSpan: 2,
            rowSpan: 3,
        });
    });

    it('clamps the preview to the widget contribution constraints', () => {
        expect(resolveWidgetGridResizePreview(CONFIGURATION, -2_000, -2_000, { column: 200, row: 128 })).toEqual({
            columnSpan: 1,
            rowSpan: 2,
        });
        expect(resolveWidgetGridResizePreview(CONFIGURATION, 2_000, 2_000, { column: 200, row: 128 })).toEqual({
            columnSpan: 4,
            rowSpan: 4,
        });
    });

    it('changes only the axis owned by an edge adornment', () => {
        expect(resolveWidgetGridResizePreview(CONFIGURATION, 250, 200, { column: 200, row: 128 }, 'right')).toEqual({
            columnSpan: 3,
            rowSpan: 2,
        });
        expect(resolveWidgetGridResizePreview(CONFIGURATION, 250, 200, { column: 200, row: 128 }, 'bottom')).toEqual({
            columnSpan: 2,
            rowSpan: 4,
        });
    });

    it('inverts pointer movement for leading edges and corners', () => {
        expect(resolveWidgetGridResizePreview(CONFIGURATION, -250, 0, { column: 200, row: 128 }, 'left')).toEqual({
            columnSpan: 3,
            rowSpan: 2,
        });
        expect(resolveWidgetGridResizePreview(CONFIGURATION, -250, -200, { column: 200, row: 128 }, 'top-left')).toEqual({
            columnSpan: 3,
            rowSpan: 4,
        });
    });
});
