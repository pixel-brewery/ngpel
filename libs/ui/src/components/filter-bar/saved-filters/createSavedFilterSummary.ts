// #region Imports

import { fromCalendarDate } from '@pixel-brewery/ngpel-core';
import type { FilterBarComponentIntl } from '../FilterBarComponentIntl';
import {
    FilterBarMode,
    FilterCondition,
    FilterOperator,
    FilterType,
    type AdvancedFilterNode,
    type FilterOperatorValue,
    type FilterValues,
    type IAdvancedFilterGroup,
    type IAdvancedFilterRule,
    type IAdvancedFilterValues,
    type IFilterDefinition,
} from '../IFilterDefinition';
import { isAdvancedFilterGroup, isAdvancedFilterRule } from '../filterConditions';
import type { ISavedFilterSummaryItem } from './ISavedFilterSummaryItem';

// #endregion

// #region Constants

const NO_VALUE_OPERATORS: ReadonlySet<FilterOperatorValue> = new Set<FilterOperatorValue>([
    FilterOperator.IsTrue,
    FilterOperator.IsFalse,
    FilterOperator.IsEmpty,
    FilterOperator.IsNotEmpty,
]);

// #endregion

/**
 * Creates display-ready summary rows for standard and advanced filter values.
 *
 * @param filters - Available filter definitions.
 * @param values - Active filter values.
 * @param intl - Filter bar labels.
 * @param language - Application language in which a chosen day is shown.
 * @public
 */
export function createSavedFilterSummary(
    filters: ReadonlyArray<IFilterDefinition>,
    values: FilterValues,
    intl: FilterBarComponentIntl,
    language?: string,
): ReadonlyArray<ISavedFilterSummaryItem> {
    if (isAdvancedFilterValues(values)) {
        return createAdvancedSummary(filters, values.root, intl, language);
    }

    return createStandardSummary(filters, values, language);
}

function createStandardSummary(filters: ReadonlyArray<IFilterDefinition>, values: FilterValues, language?: string): ReadonlyArray<ISavedFilterSummaryItem> {
    return Object.entries(values)
        .filter(([key, value]) => key !== 'mode' && key !== 'root' && hasFilterValue(value))
        .map(([key, value]) => {
            const filter = filters.find((candidate) => candidate.key === key);

            return {
                id: `standard:${key}`,
                kind: 'rule',
                depth: 0,
                fieldLabel: filter?.label ?? key,
                valueLabel: formatFilterValue(filter, value, language),
            };
        });
}

function createAdvancedSummary(
    filters: ReadonlyArray<IFilterDefinition>,
    root: IAdvancedFilterGroup,
    intl: FilterBarComponentIntl,
    language?: string,
): ReadonlyArray<ISavedFilterSummaryItem> {
    const items: ISavedFilterSummaryItem[] = [];

    appendAdvancedNodeSummary(items, filters, root, intl, language, 0);

    return items;
}

function appendAdvancedNodeSummary(
    items: Array<ISavedFilterSummaryItem>,
    filters: ReadonlyArray<IFilterDefinition>,
    node: AdvancedFilterNode,
    intl: FilterBarComponentIntl,
    language: string | undefined,
    depth: number,
): void {
    if (isAdvancedFilterGroup(node)) {
        items.push({
            id: `group:${node.id}`,
            kind: 'group',
            depth,
            condition: node.condition,
            conditionLabel: node.condition === FilterCondition.And ? intl.andConditionLabel : intl.orConditionLabel,
        });

        for (const child of node.children) {
            appendAdvancedNodeSummary(items, filters, child, intl, language, depth + 1);
        }

        return;
    }

    if (isAdvancedFilterRule(node)) {
        items.push(createAdvancedRuleSummary(filters, node, intl, language, depth));
    }
}

function createAdvancedRuleSummary(
    filters: ReadonlyArray<IFilterDefinition>,
    rule: IAdvancedFilterRule,
    intl: FilterBarComponentIntl,
    language: string | undefined,
    depth: number,
): ISavedFilterSummaryItem {
    const filter = filters.find((candidate) => candidate.key === rule.fieldKey);

    return {
        id: `rule:${rule.id}`,
        kind: 'rule',
        depth,
        fieldLabel: filter?.label ?? rule.fieldKey,
        operatorLabel: intl.getOperatorLabel(rule.operator),
        valueLabel: NO_VALUE_OPERATORS.has(rule.operator) ? undefined : formatFilterValue(filter, rule.value, language),
    };
}

function formatFilterValue(filter: IFilterDefinition | undefined, value: unknown, language?: string): string {
    if (!hasFilterValue(value)) {
        return '';
    }

    if (Array.isArray(value)) {
        return value.map((item) => formatFilterValue(filter, item, language)).join(', ');
    }

    const option = filter?.options?.find((candidate) => candidate.value === String(value));

    if (option) {
        return option.label;
    }

    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }

    const day = value instanceof Date ? value : resolveRestoredDay(filter, value);

    if (day) {
        return day.toLocaleDateString(language);
    }

    return String(value);
}

/**
 * A restored filter carries the chosen day as text, `YYYY-MM-DD` or the JSON form of the date control's local midnight;
 * both name the chosen local day, whereas the raw text would show the UTC day.
 */
function resolveRestoredDay(filter: IFilterDefinition | undefined, value: unknown): Date | null {
    const isDayFilter = filter?.type === FilterType.Date || filter?.type === FilterType.DateRange;

    return isDayFilter && typeof value === 'string' ? fromCalendarDate(value) : null;
}

function hasFilterValue(value: unknown): boolean {
    return value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0);
}

function isAdvancedFilterValues(values: FilterValues): values is IAdvancedFilterValues {
    return values['mode'] === FilterBarMode.Advanced && isAdvancedFilterGroup(values['root'] as AdvancedFilterNode);
}
