// #region Imports

import type { AdvancedFilterNode, FilterConditionValue, FilterOperatorValue, IAdvancedFilterGroup, IAdvancedFilterRule } from './IFilterDefinition';
import { FilterCondition } from './IFilterDefinition';

// #endregion

// #region Models

/**
 * Flattened advanced filter node with display metadata.
 *
 * @public
 */
export interface IAdvancedFilterRow {
    /**
     * Node to render.
     */
    readonly node: AdvancedFilterNode;

    /**
     * Parent group id.
     */
    readonly parentId?: string;

    /**
     * Nesting depth.
     */
    readonly depth: number;
}

// #endregion

// #region Methods

/**
 * Creates an advanced filter group.
 *
 * @public
 */
export function createAdvancedFilterGroup(
    id: string,
    condition: FilterConditionValue = FilterCondition.And,
    children: ReadonlyArray<AdvancedFilterNode> = [],
): IAdvancedFilterGroup {
    return {
        kind: 'group',
        id,
        condition,
        children,
    };
}

/**
 * Creates an advanced filter rule.
 *
 * @public
 */
export function createAdvancedFilterRule(id: string, fieldKey: string, operator: FilterOperatorValue, value?: unknown): IAdvancedFilterRule {
    return {
        kind: 'rule',
        id,
        fieldKey,
        operator,
        value,
    };
}

/**
 * Returns whether a node is a group.
 *
 * @public
 */
export function isAdvancedFilterGroup(node: AdvancedFilterNode): node is IAdvancedFilterGroup {
    return node.kind === 'group';
}

/**
 * Returns whether a node is a rule.
 *
 * @public
 */
export function isAdvancedFilterRule(node: AdvancedFilterNode): node is IAdvancedFilterRule {
    return node.kind === 'rule';
}

/**
 * Adds a node to a target group.
 *
 * @public
 */
export function addAdvancedFilterNode(root: IAdvancedFilterGroup, targetGroupId: string, node: AdvancedFilterNode): IAdvancedFilterGroup {
    if (root.id === targetGroupId) {
        return {
            ...root,
            children: [...root.children, node],
        };
    }

    return {
        ...root,
        children: root.children.map((child) => (isAdvancedFilterGroup(child) ? addAdvancedFilterNode(child, targetGroupId, node) : child)),
    };
}

/**
 * Removes a node from a tree. The root group is kept intact.
 *
 * @public
 */
export function removeAdvancedFilterNode(root: IAdvancedFilterGroup, nodeId: string): IAdvancedFilterGroup {
    return {
        ...root,
        children: root.children
            .filter((child) => child.id !== nodeId)
            .map((child) => (isAdvancedFilterGroup(child) ? removeAdvancedFilterNode(child, nodeId) : child)),
    };
}

/**
 * Updates a group condition.
 *
 * @public
 */
export function updateAdvancedFilterGroupCondition(root: IAdvancedFilterGroup, groupId: string, condition: FilterConditionValue): IAdvancedFilterGroup {
    if (root.id === groupId) {
        return {
            ...root,
            condition,
        };
    }

    return {
        ...root,
        children: root.children.map((child) => (isAdvancedFilterGroup(child) ? updateAdvancedFilterGroupCondition(child, groupId, condition) : child)),
    };
}

/**
 * Flattens a filter tree for list-like rendering.
 *
 * @public
 */
export function flattenAdvancedFilterTree(root: IAdvancedFilterGroup): ReadonlyArray<IAdvancedFilterRow> {
    const rows: IAdvancedFilterRow[] = [];

    appendRows(root, undefined, 0, rows);

    return rows;
}

function appendRows(node: AdvancedFilterNode, parentId: string | undefined, depth: number, rows: Array<IAdvancedFilterRow>): void {
    rows.push({
        node,
        parentId,
        depth,
    });

    if (!isAdvancedFilterGroup(node)) {
        return;
    }

    for (const child of node.children) {
        appendRows(child, node.id, depth + 1, rows);
    }
}

// #endregion
