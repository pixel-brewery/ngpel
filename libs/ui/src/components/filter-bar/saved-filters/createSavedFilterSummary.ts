// #region Imports

import { FilterBarComponentIntl } from '../FilterBarComponentIntl';
import {
    FilterBarMode,
    FilterCondition,
    FilterOperator,
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
 * @public
 */
export function createSavedFilterSummary(
    filters: ReadonlyArray<IFilterDefinition>,
    values: FilterValues,
    intl: FilterBarComponentIntl,
): ReadonlyArray<ISavedFilterSummaryItem> {
    if (isAdvancedFilterValues(values)) {
        return createAdvancedSummary(filters, values.root, intl);
    }

    return createStandardSummary(filters, values);
}

function createStandardSummary(filters: ReadonlyArray<IFilterDefinition>, values: FilterValues): ReadonlyArray<ISavedFilterSummaryItem> {
    return Object.entries(values)
        .filter(([key, value]) => key !== 'mode' && key !== 'root' && hasFilterValue(value))
        .map(([key, value]) => {
            const filter = filters.find((candidate) => candidate.key === key);

            return {
                id: `standard:${key}`,
                kind: 'rule',
                depth: 0,
                fieldLabel: filter?.label ?? key,
                valueLabel: formatFilterValue(filter, value),
            };
        });
}

function createAdvancedSummary(
    filters: ReadonlyArray<IFilterDefinition>,
    root: IAdvancedFilterGroup,
    intl: FilterBarComponentIntl,
): ReadonlyArray<ISavedFilterSummaryItem> {
    const items: ISavedFilterSummaryItem[] = [];

    appendAdvancedNodeSummary(items, filters, root, intl, 0);

    return items;
}

function appendAdvancedNodeSummary(
    items: Array<ISavedFilterSummaryItem>,
    filters: ReadonlyArray<IFilterDefinition>,
    node: AdvancedFilterNode,
    intl: FilterBarComponentIntl,
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
            appendAdvancedNodeSummary(items, filters, child, intl, depth + 1);
        }

        return;
    }

    if (isAdvancedFilterRule(node)) {
        items.push(createAdvancedRuleSummary(filters, node, intl, depth));
    }
}

function createAdvancedRuleSummary(
    filters: ReadonlyArray<IFilterDefinition>,
    rule: IAdvancedFilterRule,
    intl: FilterBarComponentIntl,
    depth: number,
): ISavedFilterSummaryItem {
    const filter = filters.find((candidate) => candidate.key === rule.fieldKey);

    return {
        id: `rule:${rule.id}`,
        kind: 'rule',
        depth,
        fieldLabel: filter?.label ?? rule.fieldKey,
        operatorLabel: intl.getOperatorLabel(rule.operator),
        valueLabel: NO_VALUE_OPERATORS.has(rule.operator) ? undefined : formatFilterValue(filter, rule.value),
    };
}

function formatFilterValue(filter: IFilterDefinition | undefined, value: unknown): string {
    if (!hasFilterValue(value)) {
        return '';
    }

    if (Array.isArray(value)) {
        return value.map((item) => formatFilterValue(filter, item)).join(', ');
    }

    const option = filter?.options?.find((candidate) => candidate.value === String(value));

    if (option) {
        return option.label;
    }

    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }

    if (value instanceof Date) {
        return value.toLocaleDateString();
    }

    return String(value);
}

function hasFilterValue(value: unknown): boolean {
    return value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0);
}

function isAdvancedFilterValues(values: FilterValues): values is IAdvancedFilterValues {
    return values['mode'] === FilterBarMode.Advanced && isAdvancedFilterGroup(values['root'] as AdvancedFilterNode);
}
