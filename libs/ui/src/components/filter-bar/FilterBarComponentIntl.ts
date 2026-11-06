// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';
import { FilterOperator, type FilterOperatorValue } from './IFilterDefinition';

// #endregion

/**
 * Internationalization labels for the filter bar component.
 *
 * @public
 */
export class FilterBarComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _filterTitleLabel: string;
    private _standardModeLabel: string;
    private _advancedModeLabel: string;
    private _fieldLabel: string;
    private _operatorLabel: string;
    private _valueLabel: string;
    private _andConditionLabel: string;
    private _orConditionLabel: string;
    private _addRuleLabel: string;
    private _addGroupLabel: string;
    private _removeRuleLabel: string;
    private _removeGroupLabel: string;
    private _resetFiltersLabel: string;
    private _saveFilterActionLabel: string;
    private _saveFilterTitleLabel: string;
    private _saveFilterNameLabel: string;
    private _saveFilterNamePlaceholder: string;
    private _saveFilterNameRequiredMessage: string;
    private _saveFilterSummaryTitleLabel: string;
    private _saveFilterSummaryDescriptionLabel: string;
    private _saveFilterEmptySummaryLabel: string;
    private _saveFilterGroupLabel: string;
    private _saveFilterClosePreventedMessage: string;
    private _cancelLabel: string;
    private _containsOperatorLabel: string;
    private _equalsOperatorLabel: string;
    private _notEqualsOperatorLabel: string;
    private _startsWithOperatorLabel: string;
    private _endsWithOperatorLabel: string;
    private _isEmptyOperatorLabel: string;
    private _isNotEmptyOperatorLabel: string;
    private _greaterThanOperatorLabel: string;
    private _greaterThanOrEqualsOperatorLabel: string;
    private _lessThanOperatorLabel: string;
    private _lessThanOrEqualsOperatorLabel: string;
    private _onOperatorLabel: string;
    private _beforeOperatorLabel: string;
    private _afterOperatorLabel: string;
    private _isTrueOperatorLabel: string;
    private _isFalseOperatorLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link FilterBarComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._filterTitleLabel = 'Filter';
        this._standardModeLabel = 'Standard';
        this._advancedModeLabel = 'Expert';
        this._fieldLabel = 'Field';
        this._operatorLabel = 'Operator';
        this._valueLabel = 'Value';
        this._andConditionLabel = 'AND';
        this._orConditionLabel = 'OR';
        this._addRuleLabel = 'Add rule';
        this._addGroupLabel = 'Add group';
        this._removeRuleLabel = 'Remove condition';
        this._removeGroupLabel = 'Remove group';
        this._resetFiltersLabel = 'Clear filters';
        this._saveFilterActionLabel = 'Save filter';
        this._saveFilterTitleLabel = 'Save filter';
        this._saveFilterNameLabel = 'Name';
        this._saveFilterNamePlaceholder = 'My filter';
        this._saveFilterNameRequiredMessage = 'A name is required.';
        this._saveFilterSummaryTitleLabel = 'Filter definition';
        this._saveFilterSummaryDescriptionLabel = 'Review the conditions that will be saved.';
        this._saveFilterEmptySummaryLabel = 'No active filters.';
        this._saveFilterGroupLabel = 'Condition group';
        this._saveFilterClosePreventedMessage = 'This saved filter has unsaved changes. Save or discard them before closing the dialog.';
        this._cancelLabel = 'Cancel';
        this._containsOperatorLabel = 'Contains';
        this._equalsOperatorLabel = 'Equals';
        this._notEqualsOperatorLabel = 'Does not equal';
        this._startsWithOperatorLabel = 'Starts with';
        this._endsWithOperatorLabel = 'Ends with';
        this._isEmptyOperatorLabel = 'Is empty';
        this._isNotEmptyOperatorLabel = 'Is not empty';
        this._greaterThanOperatorLabel = 'Greater than';
        this._greaterThanOrEqualsOperatorLabel = 'Greater than or equal';
        this._lessThanOperatorLabel = 'Less than';
        this._lessThanOrEqualsOperatorLabel = 'Less than or equal';
        this._onOperatorLabel = 'On';
        this._beforeOperatorLabel = 'Before';
        this._afterOperatorLabel = 'After';
        this._isTrueOperatorLabel = 'Is true';
        this._isFalseOperatorLabel = 'Is false';
    }

    // #endregion

    // #region Properties

    /**
     * Emits when any label changes.
     *
     * @public
     * @readonly
     */
    public get changes(): Subject<void> {
        return this._changes;
    }

    /**
     * Title shown in the filter card header.
     *
     * @public
     */
    public get filterTitleLabel(): string {
        return this._filterTitleLabel;
    }

    /**
     * Label for the standard filter mode.
     *
     * @public
     */
    public get standardModeLabel(): string {
        return this._standardModeLabel;
    }

    /**
     * Label for the advanced filter mode.
     *
     * @public
     */
    public get advancedModeLabel(): string {
        return this._advancedModeLabel;
    }

    /**
     * Label for the rule field select.
     *
     * @public
     */
    public get fieldLabel(): string {
        return this._fieldLabel;
    }

    /**
     * Label for the rule operator select.
     *
     * @public
     */
    public get operatorLabel(): string {
        return this._operatorLabel;
    }

    /**
     * Label for the rule value control.
     *
     * @public
     */
    public get valueLabel(): string {
        return this._valueLabel;
    }

    /**
     * Label for an AND condition group.
     *
     * @public
     */
    public get andConditionLabel(): string {
        return this._andConditionLabel;
    }

    /**
     * Label for an OR condition group.
     *
     * @public
     */
    public get orConditionLabel(): string {
        return this._orConditionLabel;
    }

    /**
     * Tooltip for adding a new rule.
     *
     * @public
     */
    public get addRuleLabel(): string {
        return this._addRuleLabel;
    }

    /**
     * Tooltip for adding a new group.
     *
     * @public
     */
    public get addGroupLabel(): string {
        return this._addGroupLabel;
    }

    /**
     * Tooltip for removing a rule.
     *
     * @public
     */
    public get removeRuleLabel(): string {
        return this._removeRuleLabel;
    }

    /**
     * Tooltip for removing a group.
     *
     * @public
     */
    public get removeGroupLabel(): string {
        return this._removeGroupLabel;
    }

    /**
     * Tooltip for resetting filters.
     *
     * @public
     */
    public get resetFiltersLabel(): string {
        return this._resetFiltersLabel;
    }

    /**
     * Label for saving active filters.
     *
     * @public
     */
    public get saveFilterActionLabel(): string {
        return this._saveFilterActionLabel;
    }

    /**
     * Drawer title for saving active filters.
     *
     * @public
     */
    public get saveFilterTitleLabel(): string {
        return this._saveFilterTitleLabel;
    }

    /**
     * Label for the saved filter name input.
     *
     * @public
     */
    public get saveFilterNameLabel(): string {
        return this._saveFilterNameLabel;
    }

    /**
     * Placeholder for the saved filter name input.
     *
     * @public
     */
    public get saveFilterNamePlaceholder(): string {
        return this._saveFilterNamePlaceholder;
    }

    /**
     * Validation message shown when the saved filter name is empty.
     *
     * @public
     * @readonly
     */
    public get saveFilterNameRequiredMessage(): string {
        return this._saveFilterNameRequiredMessage;
    }

    /**
     * Title for the filter summary section.
     *
     * @public
     */
    public get saveFilterSummaryTitleLabel(): string {
        return this._saveFilterSummaryTitleLabel;
    }

    /**
     * Description for the filter summary section.
     *
     * @public
     */
    public get saveFilterSummaryDescriptionLabel(): string {
        return this._saveFilterSummaryDescriptionLabel;
    }

    /**
     * Empty summary text.
     *
     * @public
     */
    public get saveFilterEmptySummaryLabel(): string {
        return this._saveFilterEmptySummaryLabel;
    }

    /**
     * Label for advanced filter groups.
     *
     * @public
     */
    public get saveFilterGroupLabel(): string {
        return this._saveFilterGroupLabel;
    }

    /**
     * Message shown when a dirty saved-filter drawer blocks implicit closing.
     *
     * @public
     */
    public get saveFilterClosePreventedMessage(): string {
        return this._saveFilterClosePreventedMessage;
    }

    /**
     * Generic cancel label.
     *
     * @public
     */
    public get cancelLabel(): string {
        return this._cancelLabel;
    }

    /**
     * @public
     */
    public get containsOperatorLabel(): string {
        return this._containsOperatorLabel;
    }

    /**
     * @public
     */
    public get equalsOperatorLabel(): string {
        return this._equalsOperatorLabel;
    }

    /**
     * @public
     */
    public get notEqualsOperatorLabel(): string {
        return this._notEqualsOperatorLabel;
    }

    /**
     * @public
     */
    public get startsWithOperatorLabel(): string {
        return this._startsWithOperatorLabel;
    }

    /**
     * @public
     */
    public get endsWithOperatorLabel(): string {
        return this._endsWithOperatorLabel;
    }

    /**
     * @public
     */
    public get isEmptyOperatorLabel(): string {
        return this._isEmptyOperatorLabel;
    }

    /**
     * @public
     */
    public get isNotEmptyOperatorLabel(): string {
        return this._isNotEmptyOperatorLabel;
    }

    /**
     * @public
     */
    public get greaterThanOperatorLabel(): string {
        return this._greaterThanOperatorLabel;
    }

    /**
     * @public
     */
    public get greaterThanOrEqualsOperatorLabel(): string {
        return this._greaterThanOrEqualsOperatorLabel;
    }

    /**
     * @public
     */
    public get lessThanOperatorLabel(): string {
        return this._lessThanOperatorLabel;
    }

    /**
     * @public
     */
    public get lessThanOrEqualsOperatorLabel(): string {
        return this._lessThanOrEqualsOperatorLabel;
    }

    /**
     * @public
     */
    public get onOperatorLabel(): string {
        return this._onOperatorLabel;
    }

    /**
     * @public
     */
    public get beforeOperatorLabel(): string {
        return this._beforeOperatorLabel;
    }

    /**
     * @public
     */
    public get afterOperatorLabel(): string {
        return this._afterOperatorLabel;
    }

    /**
     * @public
     */
    public get isTrueOperatorLabel(): string {
        return this._isTrueOperatorLabel;
    }

    /**
     * @public
     */
    public get isFalseOperatorLabel(): string {
        return this._isFalseOperatorLabel;
    }

    // #endregion

    // #region Methods

    /**
     * Resolves the display label for a filter operator.
     *
     * @param operator - Operator value.
     * @public
     */
    public getOperatorLabel(operator: FilterOperatorValue): string {
        switch (operator) {
            case FilterOperator.Contains:
                return this.containsOperatorLabel;
            case FilterOperator.Equals:
                return this.equalsOperatorLabel;
            case FilterOperator.NotEquals:
                return this.notEqualsOperatorLabel;
            case FilterOperator.StartsWith:
                return this.startsWithOperatorLabel;
            case FilterOperator.EndsWith:
                return this.endsWithOperatorLabel;
            case FilterOperator.IsEmpty:
                return this.isEmptyOperatorLabel;
            case FilterOperator.IsNotEmpty:
                return this.isNotEmptyOperatorLabel;
            case FilterOperator.GreaterThan:
                return this.greaterThanOperatorLabel;
            case FilterOperator.GreaterThanOrEquals:
                return this.greaterThanOrEqualsOperatorLabel;
            case FilterOperator.LessThan:
                return this.lessThanOperatorLabel;
            case FilterOperator.LessThanOrEquals:
                return this.lessThanOrEqualsOperatorLabel;
            case FilterOperator.On:
                return this.onOperatorLabel;
            case FilterOperator.Before:
                return this.beforeOperatorLabel;
            case FilterOperator.After:
                return this.afterOperatorLabel;
            case FilterOperator.IsTrue:
                return this.isTrueOperatorLabel;
            case FilterOperator.IsFalse:
                return this.isFalseOperatorLabel;
            default:
                return operator;
        }
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the filter bar component.
 *
 * @param translations - Translation keys used for the filter bar labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideFilterBarComponentIntl(translations: IntlTranslationMap<FilterBarComponentIntl>): Provider {
    return {
        provide: FilterBarComponentIntl,
        useFactory: (): FilterBarComponentIntl => translateIntl(new FilterBarComponentIntl(), translations),
    };
}
