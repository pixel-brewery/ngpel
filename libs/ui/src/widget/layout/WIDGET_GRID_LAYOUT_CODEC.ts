// #region Imports

import type { IUserPreferenceCodec } from '@pixel-brewery/ngpel-core/storage';
import type { IWidgetGridItemLayout } from './IWidgetGridItemLayout';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import { clamp } from './internal/clamp';
import { isWidgetGridLayout } from './internal/isWidgetGridLayout';
import { isWidgetGridLayoutOfVersion } from './internal/isWidgetGridLayoutOfVersion';
import { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

/**
 * The schema version that placed widgets on a four-column grid.
 */
const LEGACY_WIDGET_GRID_LAYOUT_VERSION = 1;

/**
 * The number of columns a version 1 layout was written against.
 */
const LEGACY_WIDGET_GRID_COLUMN_COUNT = 4;

/**
 * The number of columns a current layout is written against.
 */
const WIDGET_GRID_COLUMN_COUNT = 6;

/**
 * The codec for a locally persisted widget-grid layout. It plugs straight into the user-preference
 * port of `@pixel-brewery/ngpel-core/storage`.
 *
 * It validates every field of an untrusted payload and rejects the payload whole when anything is
 * off, so a hand-edited or truncated entry can never be applied in part. A version 1 payload is
 * migrated instead of rejected: its column spans are rescaled proportionally from the four-column
 * grid it was written against to the current six-column one.
 *
 * @public
 *
 * @example
 * ```typescript
 * const stored = storage.read('dashboard.layout', WIDGET_GRID_LAYOUT_CODEC);
 * const layout = reconcileWidgetGridLayout(stored, zones, items);
 * storage.write('dashboard.layout', layout, WIDGET_GRID_LAYOUT_CODEC);
 * ```
 */
export const WIDGET_GRID_LAYOUT_CODEC: IUserPreferenceCodec<IWidgetGridLayout> = {
    /**
     * Validates a persisted payload and migrates it when it predates the current schema.
     *
     * @public
     * @param value The persisted payload.
     * @returns The layout, or `undefined` when the payload is malformed or of an unsupported
     * version.
     */
    parse(value: unknown): IWidgetGridLayout | undefined {
        if (isWidgetGridLayout(value)) {
            return value;
        }

        if (!isWidgetGridLayoutOfVersion(value, LEGACY_WIDGET_GRID_LAYOUT_VERSION)) {
            return undefined;
        }

        return {
            version: WIDGET_GRID_LAYOUT_VERSION,
            zones: value.zones,
            items: value.items.map((item): IWidgetGridItemLayout => ({
                ...item,
                columnSpan: clamp(Math.round((item.columnSpan * WIDGET_GRID_COLUMN_COUNT) / LEGACY_WIDGET_GRID_COLUMN_COUNT), 1, WIDGET_GRID_COLUMN_COUNT),
            })),
        };
    },

    /**
     * Serializes a layout for persistence.
     *
     * @public
     * @param value The layout.
     * @returns The payload to persist.
     */
    serialize(value: IWidgetGridLayout): unknown {
        return value;
    },
};
