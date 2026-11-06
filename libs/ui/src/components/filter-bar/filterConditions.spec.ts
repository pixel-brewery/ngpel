// #region Imports

import { describe, expect, it } from 'vitest';
import { FilterCondition, FilterOperator } from './IFilterDefinition';
import {
    addAdvancedFilterNode,
    createAdvancedFilterGroup,
    createAdvancedFilterRule,
    flattenAdvancedFilterTree,
    isAdvancedFilterGroup,
    isAdvancedFilterRule,
    removeAdvancedFilterNode,
    updateAdvancedFilterGroupCondition,
} from './filterConditions';

// #endregion

describe('filterConditions', () => {
    it('should create advanced filter groups and rules', () => {
        const rule = createAdvancedFilterRule('rule-1', 'status', FilterOperator.Equals, 'OPEN');
        const group = createAdvancedFilterGroup('group-1', FilterCondition.Or, [rule]);

        expect(rule).toEqual({
            kind: 'rule',
            id: 'rule-1',
            fieldKey: 'status',
            operator: FilterOperator.Equals,
            value: 'OPEN',
        });
        expect(group).toEqual({
            kind: 'group',
            id: 'group-1',
            condition: FilterCondition.Or,
            children: [rule],
        });
    });

    it('should narrow advanced filter nodes', () => {
        const rule = createAdvancedFilterRule('rule-1', 'status', FilterOperator.Equals);
        const group = createAdvancedFilterGroup('group-1');

        expect(isAdvancedFilterRule(rule)).toBe(true);
        expect(isAdvancedFilterRule(group)).toBe(false);
        expect(isAdvancedFilterGroup(group)).toBe(true);
        expect(isAdvancedFilterGroup(rule)).toBe(false);
    });

    it('should add nodes to nested groups immutably', () => {
        const nested = createAdvancedFilterGroup('nested');
        const root = createAdvancedFilterGroup('root', FilterCondition.And, [nested]);
        const rule = createAdvancedFilterRule('rule-1', 'status', FilterOperator.Equals);
        const updated = addAdvancedFilterNode(root, 'nested', rule);

        expect(root.children[0]).toBe(nested);
        expect((updated.children[0] as typeof nested).children).toEqual([rule]);
    });

    it('should remove nodes while keeping the root group', () => {
        const rule = createAdvancedFilterRule('rule-1', 'status', FilterOperator.Equals);
        const nested = createAdvancedFilterGroup('nested', FilterCondition.And, [rule]);
        const root = createAdvancedFilterGroup('root', FilterCondition.And, [nested]);

        expect(removeAdvancedFilterNode(root, 'rule-1').children).toEqual([
            {
                ...nested,
                children: [],
            },
        ]);
        expect(removeAdvancedFilterNode(root, 'root')).toEqual(root);
    });

    it('should update nested group conditions immutably', () => {
        const nested = createAdvancedFilterGroup('nested');
        const root = createAdvancedFilterGroup('root', FilterCondition.And, [nested]);
        const updated = updateAdvancedFilterGroupCondition(root, 'nested', FilterCondition.Or);

        expect(root.children[0]).toBe(nested);
        expect((updated.children[0] as typeof nested).condition).toBe(FilterCondition.Or);
    });

    it('should flatten nested trees with parent ids and depths', () => {
        const rule = createAdvancedFilterRule('rule-1', 'status', FilterOperator.Equals);
        const nested = createAdvancedFilterGroup('nested', FilterCondition.Or, [rule]);
        const root = createAdvancedFilterGroup('root', FilterCondition.And, [nested]);

        expect(flattenAdvancedFilterTree(root)).toEqual([
            { node: root, parentId: undefined, depth: 0 },
            { node: nested, parentId: 'root', depth: 1 },
            { node: rule, parentId: 'nested', depth: 2 },
        ]);
    });
});
