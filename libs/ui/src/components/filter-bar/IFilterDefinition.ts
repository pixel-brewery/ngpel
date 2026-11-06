// #region Imports

// #endregion

/**
 * Supported filter field types.
 *
 * @public
 */
export const FilterType = {
    Text: 'text',
    Number: 'number',
    Select: 'select',
    MultiSelect: 'multi-select',
    Date: 'date',
    DateRange: 'date-range',
    Boolean: 'boolean',
} as const;

/**
 * Union type of all supported filter types.
 *
 * @public
 */
export type FilterTypeValue = (typeof FilterType)[keyof typeof FilterType];

/**
 * Supported filter bar modes.
 *
 * @public
 */
export const FilterBarMode = {
    Standard: 'standard',
    Advanced: 'advanced',
} as const;

/**
 * Union type of all supported filter bar modes.
 *
 * @public
 */
export type FilterBarModeValue = (typeof FilterBarMode)[keyof typeof FilterBarMode];

/**
 * Logical conditions for advanced filter groups.
 *
 * @public
 */
export const FilterCondition = {
    And: 'and',
    Or: 'or',
} as const;

/**
 * Union type of all supported advanced filter conditions.
 *
 * @public
 */
export type FilterConditionValue = (typeof FilterCondition)[keyof typeof FilterCondition];

/**
 * Operators for advanced filter rules.
 *
 * @public
 */
export const FilterOperator = {
    Equals: 'equals',
    NotEquals: 'not-equals',
    Contains: 'contains',
    StartsWith: 'starts-with',
    EndsWith: 'ends-with',
    GreaterThan: 'greater-than',
    GreaterThanOrEquals: 'greater-than-or-equals',
    LessThan: 'less-than',
    LessThanOrEquals: 'less-than-or-equals',
    Before: 'before',
    After: 'after',
    On: 'on',
    IsTrue: 'is-true',
    IsFalse: 'is-false',
    IsEmpty: 'is-empty',
    IsNotEmpty: 'is-not-empty',
} as const;

/**
 * Union type of all supported advanced filter operators.
 *
 * @public
 */
export type FilterOperatorValue = (typeof FilterOperator)[keyof typeof FilterOperator];

/**
 * Option for select-type filters.
 *
 * @public
 */
export interface IFilterOption {
    /**
     * Display label for the option.
     */
    readonly label: string;

    /**
     * The value submitted when this option is selected.
     */
    readonly value: string;
}

/**
 * Describes a single filter field in the filter bar.
 *
 * @public
 */
export interface IFilterDefinition {
    /**
     * Unique key identifying the filter (used in the emitted filter values).
     */
    readonly key: string;

    /**
     * Display label for the filter field.
     */
    readonly label: string;

    /**
     * The type of filter control to render.
     */
    readonly type: FilterTypeValue;

    /**
     * Placeholder text shown when no value is set.
     */
    readonly placeholder?: string;

    /**
     * Available options for select-type and multi-select-type filters.
     */
    readonly options?: ReadonlyArray<IFilterOption>;

    /** Restricts a numeric filter to whole numbers. */
    readonly integer?: boolean;

    /**
     * Whether this filter is visible by default. Defaults to `true`.
     */
    readonly visible?: boolean;
}

/**
 * A single advanced filter rule.
 *
 * @public
 */
export interface IAdvancedFilterRule {
    /**
     * Discriminator for rule nodes.
     */
    readonly kind: 'rule';

    /**
     * Stable node id.
     */
    readonly id: string;

    /**
     * Filter field key.
     */
    readonly fieldKey: string;

    /**
     * Rule operator.
     */
    readonly operator: FilterOperatorValue;

    /**
     * Optional rule value.
     */
    readonly value?: unknown;
}

/**
 * An advanced filter group with nested rules or groups.
 *
 * @public
 */
export interface IAdvancedFilterGroup {
    /**
     * Discriminator for group nodes.
     */
    readonly kind: 'group';

    /**
     * Stable node id.
     */
    readonly id: string;

    /**
     * Logical condition between child nodes.
     */
    readonly condition: FilterConditionValue;

    /**
     * Nested child nodes.
     */
    readonly children: ReadonlyArray<AdvancedFilterNode>;
}

/**
 * Advanced filter tree node.
 *
 * @public
 */
export type AdvancedFilterNode = IAdvancedFilterGroup | IAdvancedFilterRule;

/**
 * Emitted values for advanced filter mode.
 *
 * @public
 */
export interface IAdvancedFilterValues extends Readonly<Record<string, unknown>> {
    /**
     * Discriminator for advanced filter values.
     */
    readonly mode: typeof FilterBarMode.Advanced;

    /**
     * Root condition group.
     */
    readonly root: IAdvancedFilterGroup;
}

/**
 * Emitted filter values as a key-value record.
 *
 * @public
 */
export type FilterValues = Readonly<Record<string, unknown>> | IAdvancedFilterValues;

/**
 * Configuration for the FilterBarComponent.
 *
 * @public
 */
export interface IFilterBarConfig {
    /**
     * The filter definitions to render.
     */
    readonly filters: ReadonlyArray<IFilterDefinition>;
}

/**
 * Binds a column key to its filter metadata. Used by {@link buildFilterDefinitions}
 * to resolve labels from column definitions and produce {@link IFilterDefinition} entries.
 *
 * @typeParam T - The entity type whose keys constrain the allowed column keys.
 *
 * @public
 */
export interface IFilterColumnBinding<T> {
    /**
     * The column key this binding refers to. Must be a property key of `T`.
     */
    readonly columnKey: keyof T & string;

    /**
     * The filter control type to render for this column.
     */
    readonly type: FilterTypeValue;

    /**
     * Placeholder text for the filter control. Falls back to the column title.
     */
    readonly placeholder?: string;

    /**
     * Available options when {@link type} is `'select'` or `'multi-select'`.
     */
    readonly options?: ReadonlyArray<IFilterOption>;
}
