// #region Imports

import type { AdvancedFilterNode, FilterOperatorValue, FilterValues, IAdvancedFilterValues } from './IFilterDefinition';
import { FilterBarMode, FilterOperator } from './IFilterDefinition';

// #endregion

// #region Models

/**
 * Date range resolved from a filter value.
 *
 * @public
 */
export interface IDateFilterRange {
    readonly from?: string;
    readonly to?: string;
}

// #endregion

// #region Methods

/**
 * Resolves a trimmed string filter value.
 *
 * @public
 */
export function getTextFilterValue(values: FilterValues, key: string): string | undefined {
    const value = getFilterValue(values, key, [FilterOperator.Contains, FilterOperator.Equals, FilterOperator.StartsWith, FilterOperator.EndsWith]);
    const normalized = typeof value === 'string' ? value.trim() : undefined;

    return normalized ? normalized : undefined;
}

/**
 * Resolves a finite number filter value.
 *
 * @public
 */
export function getNumberFilterValue(values: FilterValues, key: string): number | undefined {
    const value = getFilterValue(values, key, [FilterOperator.Equals]);

    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === 'string' && value.trim().length > 0) {
        const parsed = Number(value);

        return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
}

/**
 * Resolves a boolean filter value.
 *
 * @public
 */
export function getBooleanFilterValue(values: FilterValues, key: string): boolean | undefined {
    const operator = getAdvancedFilterOperator(values, key);
    const value = getFilterValue(values, key, [FilterOperator.Equals, FilterOperator.IsTrue, FilterOperator.IsFalse]);

    if (operator === FilterOperator.IsTrue) {
        return true;
    }

    if (operator === FilterOperator.IsFalse) {
        return false;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    return undefined;
}

/**
 * Resolves an option value when it is part of the allowed backend enum values.
 *
 * @public
 */
export function getOptionFilterValue<TValue extends string>(values: FilterValues, key: string, allowedValues: ReadonlyArray<TValue>): TValue | undefined {
    const value = getTextFilterValue(values, key);

    return value && allowedValues.includes(value as TValue) ? (value as TValue) : undefined;
}

/**
 * Resolves a date filter to a full-day UTC range.
 *
 * @public
 */
export function getDateFilterRange(values: FilterValues, key: string): IDateFilterRange {
    const date = resolveDate(getFilterValue(values, key, [FilterOperator.Equals, FilterOperator.On]));

    if (!date) {
        return {};
    }

    return {
        from: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)).toISOString(),
        to: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)).toISOString(),
    };
}

function getFilterValue(values: FilterValues, key: string, supportedAdvancedOperators: ReadonlyArray<FilterOperatorValue>): unknown {
    if (isAdvancedFilterValues(values)) {
        return findAdvancedFilterValue(values.root.children, key, supportedAdvancedOperators);
    }

    return values[key];
}

function getAdvancedFilterOperator(values: FilterValues, key: string): FilterOperatorValue | undefined {
    if (!isAdvancedFilterValues(values)) {
        return undefined;
    }

    return findAdvancedFilterOperator(values.root.children, key);
}

function isAdvancedFilterValues(values: FilterValues): values is IAdvancedFilterValues {
    return values['mode'] === FilterBarMode.Advanced && typeof values['root'] === 'object' && values['root'] !== null;
}

function findAdvancedFilterValue(nodes: ReadonlyArray<AdvancedFilterNode>, key: string, supportedOperators: ReadonlyArray<FilterOperatorValue>): unknown {
    for (const node of nodes) {
        if (node.kind === 'group') {
            const value = findAdvancedFilterValue(node.children, key, supportedOperators);

            if (value !== undefined) {
                return value;
            }

            continue;
        }

        if (node.fieldKey === key && supportedOperators.includes(node.operator)) {
            return node.value;
        }
    }

    return undefined;
}

function findAdvancedFilterOperator(nodes: ReadonlyArray<AdvancedFilterNode>, key: string): FilterOperatorValue | undefined {
    for (const node of nodes) {
        if (node.kind === 'group') {
            const operator = findAdvancedFilterOperator(node.children, key);

            if (operator) {
                return operator;
            }

            continue;
        }

        if (node.fieldKey === key) {
            return node.operator;
        }
    }

    return undefined;
}

function resolveDate(value: unknown): Date | undefined {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }

    if (typeof value !== 'string' || value.trim().length === 0) {
        return undefined;
    }

    const parsed = new Date(value);

    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

// #endregion
