// #region Imports

import type { IWidgetGridItemLayout } from '../IWidgetGridItemLayout';
import type { IWidgetGridZoneLayout } from '../IWidgetGridZoneLayout';
import type { IWidgetGridLayoutPayload } from './IWidgetGridLayoutPayload';

// #endregion

/**
 * Validates an untrusted persisted payload against one schema version, field by field. Persisted
 * user state is never trusted as a type assertion: a payload that fails here is discarded whole, so
 * a corrupted entry cannot be applied in part.
 *
 * @param value The untrusted payload.
 * @param version The schema version the payload must declare.
 * @returns Whether the payload is a structurally valid layout of that version.
 */
export function isWidgetGridLayoutOfVersion(value: unknown, version: number): value is IWidgetGridLayoutPayload {
    return (
        isRecord(value) &&
        value['version'] === version &&
        Array.isArray(value['zones']) &&
        value['zones'].every(isZoneLayout) &&
        Array.isArray(value['items']) &&
        value['items'].every(isItemLayout)
    );
}

/**
 * Validates one persisted zone entry.
 */
function isZoneLayout(value: unknown): value is IWidgetGridZoneLayout {
    return isRecord(value) && typeof value['zoneId'] === 'string' && isNonNegativeInteger(value['order']);
}

/**
 * Validates one persisted placement entry.
 */
function isItemLayout(value: unknown): value is IWidgetGridItemLayout {
    return (
        isRecord(value) &&
        typeof value['widgetId'] === 'string' &&
        typeof value['zoneId'] === 'string' &&
        isNonNegativeInteger(value['order']) &&
        isPositiveInteger(value['columnSpan']) &&
        isPositiveInteger(value['rowSpan']) &&
        typeof value['enabled'] === 'boolean'
    );
}

/**
 * Narrows an untrusted value to an indexable object.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

/**
 * Validates a persisted position.
 */
function isNonNegativeInteger(value: unknown): value is number {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * Validates a persisted span.
 */
function isPositiveInteger(value: unknown): value is number {
    return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
