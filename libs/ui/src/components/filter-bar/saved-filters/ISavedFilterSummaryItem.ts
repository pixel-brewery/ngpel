// #region Imports

import type { FilterConditionValue } from '../IFilterDefinition';

// #endregion

/**
 * Visual summary item for a saved filter definition.
 *
 * @public
 */
export interface ISavedFilterSummaryItem {
    /**
     * Stable rendering key.
     */
    readonly id: string;

    /**
     * Item kind.
     */
    readonly kind: 'group' | 'rule';

    /**
     * Tree depth for advanced filters.
     */
    readonly depth: number;

    /**
     * Group condition when the item represents a condition group.
     */
    readonly condition?: FilterConditionValue;

    /**
     * Human readable condition label.
     */
    readonly conditionLabel?: string;

    /**
     * Human readable field label.
     */
    readonly fieldLabel?: string;

    /**
     * Human readable operator label.
     */
    readonly operatorLabel?: string;

    /**
     * Human readable value label.
     */
    readonly valueLabel?: string;
}
