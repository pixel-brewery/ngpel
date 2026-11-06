// #region Imports

import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnChanges, OnInit, output, signal, type Signal } from '@angular/core';
import type { FieldState, FieldTree } from '@angular/forms/signals';
import { form } from '@angular/forms/signals';
import {
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CheckboxComponent,
    DateBoxComponent,
    LocaleDirective,
    DrawerService,
    DropDownButtonComponent,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    IconNameDirective,
    MenuComponent,
    MenuItemComponent,
    NumberBoxComponent,
    PressButtonComponent,
    SegmentComponent,
    SegmentItemComponent,
    SelectComponent,
    SelectItemComponent,
    TextBoxComponent,
    TypographyDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import { JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import { onceOn } from '@pixel-brewery/ngpel-core/rx';
import { FilterBarComponentIntl, provideFilterBarComponentIntl } from './FilterBarComponentIntl';
import {
    addAdvancedFilterNode,
    createAdvancedFilterGroup,
    createAdvancedFilterRule,
    flattenAdvancedFilterTree,
    isAdvancedFilterGroup,
    isAdvancedFilterRule,
    removeAdvancedFilterNode,
    updateAdvancedFilterGroupCondition,
    type IAdvancedFilterRow,
} from './filterConditions';
import type {
    AdvancedFilterNode,
    FilterBarModeValue,
    FilterConditionValue,
    FilterOperatorValue,
    FilterTypeValue,
    FilterValues,
    IAdvancedFilterGroup,
    IAdvancedFilterRule,
    IAdvancedFilterValues,
    IFilterDefinition,
} from './IFilterDefinition';
import { FilterBarMode, FilterCondition, FilterOperator, FilterType } from './IFilterDefinition';
import { SavedFilterDrawerComponent } from '../../components/filter-bar/saved-filters/SavedFilterDrawerComponent';
import type { ISavedFilterCreateRequest } from '../../components/filter-bar/saved-filters/ISavedFilterCreateRequest';
import type { ISavedFilterDrawerResult } from '../../components/filter-bar/saved-filters/SavedFilterDrawerComponent';

// #endregion

// #region Models

interface IFilterOperatorOption {
    readonly label: string;

    readonly value: FilterOperatorValue;
}

type AdvancedRuleControlKind = 'field' | 'operator' | 'value';

interface IFilterBarPreferenceState {
    readonly version: 1;

    readonly values: FilterValues;
}

// #endregion

// #region Constants

const FILTER_BAR_PREFERENCE_VERSION = 1;

const FILTER_BAR_PREFERENCE_CODEC = new JsonUserPreferenceCodec<IFilterBarPreferenceState>(isFilterBarPreferenceState);

const TEXT_OPERATOR_VALUES: ReadonlyArray<FilterOperatorValue> = [
    FilterOperator.Contains,
    FilterOperator.Equals,
    FilterOperator.NotEquals,
    FilterOperator.StartsWith,
    FilterOperator.EndsWith,
    FilterOperator.IsEmpty,
    FilterOperator.IsNotEmpty,
];

const NUMBER_OPERATOR_VALUES: ReadonlyArray<FilterOperatorValue> = [
    FilterOperator.Equals,
    FilterOperator.NotEquals,
    FilterOperator.GreaterThan,
    FilterOperator.GreaterThanOrEquals,
    FilterOperator.LessThan,
    FilterOperator.LessThanOrEquals,
    FilterOperator.IsEmpty,
    FilterOperator.IsNotEmpty,
];

const SELECT_OPERATOR_VALUES: ReadonlyArray<FilterOperatorValue> = [
    FilterOperator.Equals,
    FilterOperator.NotEquals,
    FilterOperator.IsEmpty,
    FilterOperator.IsNotEmpty,
];

const DATE_OPERATOR_VALUES: ReadonlyArray<FilterOperatorValue> = [
    FilterOperator.On,
    FilterOperator.Before,
    FilterOperator.After,
    FilterOperator.IsEmpty,
    FilterOperator.IsNotEmpty,
];

const BOOLEAN_OPERATOR_VALUES: ReadonlyArray<FilterOperatorValue> = [FilterOperator.IsTrue, FilterOperator.IsFalse];

const NO_VALUE_OPERATORS: ReadonlySet<FilterOperatorValue> = new Set<FilterOperatorValue>([
    FilterOperator.IsTrue,
    FilterOperator.IsFalse,
    FilterOperator.IsEmpty,
    FilterOperator.IsNotEmpty,
]);

// #endregion

/**
 * A configurable, reusable filter bar for list views.
 * Renders filter controls from {@link IFilterDefinition} items and emits active filter values whenever the Signal Form changes.
 *
 * @example
 * ```html
 * <ngp-filter-bar
 *     [filters]="presenter.filterDefinitions()"
 *     (filterChange)="presenter.filterController.applyFilterCommand.execute($event)" />
 * ```
 *
 * @public
 */
@Component({
    selector: 'ngp-filter-bar',
    template: `
        <mosaik-card class="flex h-full max-h-full min-h-0 flex-col overflow-hidden">
            <mosaik-card-header class="shrink-0">
                <mosaik-card-title [mosaikTypography]="'caption'" [text]="intl.filterTitleLabel" />
            </mosaik-card-header>
            <mosaik-card-content class="min-h-0 flex-1 overflow-y-auto">
                <div class="flex flex-col gap-2">
                    <mosaik-segment class="w-full" [appearance]="'soft'">
                        <mosaik-segment-item
                            [label]="intl.standardModeLabel"
                            [isChecked]="mode() === filterBarMode.Standard"
                            (checked)="onModeChanged(filterBarMode.Standard)"
                        />
                        <mosaik-segment-item
                            [label]="intl.advancedModeLabel"
                            [isChecked]="mode() === filterBarMode.Advanced"
                            (checked)="onModeChanged(filterBarMode.Advanced)"
                        />
                    </mosaik-segment>

                    @if (mode() === filterBarMode.Standard) {
                        <div class="flex flex-col gap-2">
                            @for (filter of filters(); track standardFilterTrackKey(filter)) {
                                @if (filter.visible !== false) {
                                    @switch (filter.type) {
                                        @case (filterType.Text) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-textbox
                                                    [formField]="field(filter.key)"
                                                    [label]="filter.placeholder ?? filter.label"
                                                    [isClearable]="true"
                                                    [variant]="'primary'"
                                                />
                                            </mosaik-form-field>
                                        }
                                        @case (filterType.Number) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-numberbox
                                                    [formField]="field(filter.key)"
                                                    [label]="filter.placeholder ?? filter.label"
                                                    [variant]="'primary'"
                                                    [isClearable]="true"
                                                />
                                            </mosaik-form-field>
                                        }
                                        @case (filterType.Select) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-select
                                                    [formField]="field(filter.key)"
                                                    [label]="filter.placeholder ?? filter.label"
                                                    [variant]="'primary'"
                                                    [isClearable]="true"
                                                >
                                                    @for (option of filter.options; track option.value) {
                                                        <mosaik-select-item [label]="option.label" [value]="option.value" />
                                                    }
                                                </mosaik-select>
                                            </mosaik-form-field>
                                        }
                                        @case (filterType.MultiSelect) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-select
                                                    [formField]="field(filter.key)"
                                                    [label]="filter.placeholder ?? filter.label"
                                                    [variant]="'primary'"
                                                    [isClearable]="true"
                                                >
                                                    @for (option of filter.options; track option.value) {
                                                        <mosaik-select-item [label]="option.label" [value]="option.value" />
                                                    }
                                                </mosaik-select>
                                            </mosaik-form-field>
                                        }
                                        @case (filterType.Date) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-datebox
                                                    [formField]="field(filter.key)"
                                                    [label]="filter.placeholder ?? filter.label"
                                                    [variant]="'primary'"
                                                    [dropDownPlacement]="'bottom-end'"
                                                    [isClearable]="true"
                                                />
                                            </mosaik-form-field>
                                        }
                                        @case (filterType.DateRange) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-datebox
                                                    [formField]="field(filter.key)"
                                                    [label]="filter.placeholder ?? filter.label"
                                                    [variant]="'primary'"
                                                    [dropDownPlacement]="'bottom-end'"
                                                    [isClearable]="true"
                                                />
                                            </mosaik-form-field>
                                        }
                                        @case (filterType.Boolean) {
                                            <mosaik-form-field [fieldState]="field(filter.key)()">
                                                <mosaik-checkbox [formField]="field(filter.key)" [label]="filter.label" [variant]="'primary'" />
                                            </mosaik-form-field>
                                        }
                                    }
                                }
                            }
                        </div>
                    } @else {
                        <div class="flex min-w-0 flex-col gap-1 overflow-hidden">
                            @for (row of advancedRows(); track row.node.id) {
                                @if (advancedGroup(row.node); as group) {
                                    <div
                                        part="advanced-filter-row"
                                        class="relative min-w-0"
                                        [class.advanced-filter-row-root]="row.depth === 0"
                                        [style.margin-left.rem]="row.depth * 0.45"
                                    >
                                        <div class="relative z-1 flex min-w-0 items-center gap-1 py-0.5">
                                            <mosaik-segment class="w-[9.5rem] shrink-0" [appearance]="'soft'">
                                                <mosaik-segment-item
                                                    [label]="intl.andConditionLabel"
                                                    [isChecked]="group.condition === filterCondition.And"
                                                    (checked)="onSetAdvancedGroupCondition(group.id, filterCondition.And)"
                                                />
                                                <mosaik-segment-item
                                                    [label]="intl.orConditionLabel"
                                                    [isChecked]="group.condition === filterCondition.Or"
                                                    (checked)="onSetAdvancedGroupCondition(group.id, filterCondition.Or)"
                                                />
                                            </mosaik-segment>
                                            <div class="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
                                                <mosaik-dropdown-button [iconName]="'add'" [caretVisible]="false" [dropDownPlacement]="'bottom-end'">
                                                    <mosaik-menu>
                                                        <mosaik-menu-item [label]="intl.addRuleLabel" (click)="onAddAdvancedRule(group.id)" />
                                                        <mosaik-menu-item [label]="intl.addGroupLabel" (click)="onAddAdvancedGroup(group.id)" />
                                                    </mosaik-menu>
                                                </mosaik-dropdown-button>
                                            </div>
                                            @if (canRemoveAdvancedRow(row)) {
                                                <mosaik-press-button
                                                    [appearance]="'plain'"
                                                    [variant]="'primary'"
                                                    [iconName]="'delete'"
                                                    [attr.title]="intl.removeGroupLabel"
                                                    (pressed)="onRemoveAdvancedNode(group.id)"
                                                />
                                            }
                                        </div>
                                    </div>
                                } @else if (advancedRule(row.node); as rule) {
                                    <div part="advanced-filter-row" class="relative min-w-0 pl-3" [style.margin-left.rem]="row.depth * 0.45">
                                        <div
                                            class="relative z-1 grid min-w-0 grid-cols-[minmax(0,1fr)_2.5rem] gap-1 rounded-md border border-(--mosaik-scheme-middlelight)/20 bg-(--mosaik-scheme-surface)/85 p-1.5"
                                        >
                                            <mosaik-form-field
                                                class="col-start-1 min-w-0"
                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'field'))()"
                                            >
                                                <mosaik-select
                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'field'))"
                                                    [label]="intl.fieldLabel"
                                                    [variant]="'primary'"
                                                    (changed)="onAdvancedRuleFieldChanged(rule)"
                                                >
                                                    @for (filter of filters(); track filter.key) {
                                                        @if (filter.visible !== false) {
                                                            <mosaik-select-item [label]="filter.label" [value]="filter.key" />
                                                        }
                                                    }
                                                </mosaik-select>
                                            </mosaik-form-field>

                                            <mosaik-form-field
                                                class="col-start-1 min-w-0"
                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'operator'))()"
                                            >
                                                <mosaik-select
                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'operator'))"
                                                    [label]="intl.operatorLabel"
                                                    [variant]="'primary'"
                                                >
                                                    @for (operator of advancedRuleOperatorOptions(rule); track operator.value) {
                                                        <mosaik-select-item [label]="operator.label" [value]="operator.value" />
                                                    }
                                                </mosaik-select>
                                            </mosaik-form-field>

                                            @if (advancedRuleRequiresValue(rule)) {
                                                @if (advancedRuleFilter(rule); as selectedFilter) {
                                                    @switch (selectedFilter.type) {
                                                        @case (filterType.Number) {
                                                            <mosaik-form-field
                                                                class="col-start-1 min-w-0"
                                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'value'))()"
                                                            >
                                                                <mosaik-numberbox
                                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'value'))"
                                                                    [label]="intl.valueLabel"
                                                                    [variant]="'primary'"
                                                                />
                                                            </mosaik-form-field>
                                                        }
                                                        @case (filterType.Select) {
                                                            <mosaik-form-field
                                                                class="col-start-1 min-w-0"
                                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'value'))()"
                                                            >
                                                                <mosaik-select
                                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'value'))"
                                                                    [label]="intl.valueLabel"
                                                                    [variant]="'primary'"
                                                                >
                                                                    @for (option of selectedFilter.options; track option.value) {
                                                                        <mosaik-select-item [label]="option.label" [value]="option.value" />
                                                                    }
                                                                </mosaik-select>
                                                            </mosaik-form-field>
                                                        }
                                                        @case (filterType.MultiSelect) {
                                                            <mosaik-form-field
                                                                class="col-start-1 min-w-0"
                                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'value'))()"
                                                            >
                                                                <mosaik-select
                                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'value'))"
                                                                    [label]="intl.valueLabel"
                                                                    [variant]="'primary'"
                                                                >
                                                                    @for (option of selectedFilter.options; track option.value) {
                                                                        <mosaik-select-item [label]="option.label" [value]="option.value" />
                                                                    }
                                                                </mosaik-select>
                                                            </mosaik-form-field>
                                                        }
                                                        @case (filterType.Date) {
                                                            <mosaik-form-field
                                                                class="col-start-1 min-w-0"
                                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'value'))()"
                                                            >
                                                                <mosaik-datebox
                                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'value'))"
                                                                    [label]="intl.valueLabel"
                                                                    [variant]="'primary'"
                                                                    [dropDownPlacement]="'bottom-end'"
                                                                />
                                                            </mosaik-form-field>
                                                        }
                                                        @case (filterType.DateRange) {
                                                            <mosaik-form-field
                                                                class="col-start-1 min-w-0"
                                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'value'))()"
                                                            >
                                                                <mosaik-datebox
                                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'value'))"
                                                                    [label]="intl.valueLabel"
                                                                    [variant]="'primary'"
                                                                    [dropDownPlacement]="'bottom-end'"
                                                                />
                                                            </mosaik-form-field>
                                                        }
                                                        @default {
                                                            <mosaik-form-field
                                                                class="col-start-1 min-w-0"
                                                                [fieldState]="advancedField(advancedRuleControlKey(rule, 'value'))()"
                                                            >
                                                                <mosaik-textbox
                                                                    [formField]="advancedField(advancedRuleControlKey(rule, 'value'))"
                                                                    [label]="intl.valueLabel"
                                                                    [isClearable]="true"
                                                                    [variant]="'primary'"
                                                                />
                                                            </mosaik-form-field>
                                                        }
                                                    }
                                                }
                                            }

                                            <mosaik-press-button
                                                class="col-start-2 row-span-3 row-start-1 self-center justify-self-end"
                                                [appearance]="'plain'"
                                                [variant]="'primary'"
                                                [iconName]="'delete'"
                                                [attr.title]="intl.removeRuleLabel"
                                                (pressed)="onRemoveAdvancedNode(rule.id)"
                                            />
                                        </div>
                                    </div>
                                }
                            }
                        </div>
                    }
                </div>
            </mosaik-card-content>
            @if (isFilterActive()) {
                <mosaik-card-footer>
                    <div class="flex items-center justify-end gap-2">
                        <mosaik-button
                            [appearance]="'plain'"
                            [variant]="'primary'"
                            [iconName]="'arrowReset'"
                            [label]="intl.resetFiltersLabel"
                            (click)="onReset()"
                        />
                        <mosaik-button [appearance]="'solid'" [variant]="'primary'" [label]="intl.saveFilterActionLabel" (click)="onSaveFilter()" />
                    </div>
                </mosaik-card-footer>
            }
        </mosaik-card>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            height: 100%;
            min-height: 0;
            overflow: hidden;
        }

        @media (min-width: 60rem) {
            :host {
                flex: 0 0 22.5rem;
                width: 22.5rem;
                min-width: 22.5rem;
                max-width: 22.5rem;
            }
        }

        [part='advanced-filter-row']:not(.advanced-filter-row-root)::before {
            position: absolute;
            top: -0.55rem;
            bottom: -0.55rem;
            left: 0.25rem;
            border-left: 2px dotted color-mix(in srgb, var(--mosaik-scheme-middlelight) 48%, transparent);
            content: '';
        }

        [part='advanced-filter-row']:not(.advanced-filter-row-root)::after {
            position: absolute;
            top: 1.1rem;
            left: 0.25rem;
            width: 0.65rem;
            border-top: 2px dotted color-mix(in srgb, var(--mosaik-scheme-middlelight) 48%, transparent);
            content: '';
        }
    `,
    exportAs: 'filterBar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        PressButtonComponent,
        CardComponent,
        CardContentComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CheckboxComponent,
        DateBoxComponent,
        LocaleDirective,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        IconNameDirective,
        NumberBoxComponent,
        SegmentComponent,
        SegmentItemComponent,
        SelectComponent,
        SelectItemComponent,
        TextBoxComponent,
        TypographyDirective,
        CardFooterComponent,
        MenuComponent,
        MenuItemComponent,
        DropDownButtonComponent,
    ],
    providers: [
        provideFilterBarComponentIntl({
            filterTitleLabel: 'loc.filterBar.title',
            standardModeLabel: 'loc.filterBar.mode.standard',
            advancedModeLabel: 'loc.filterBar.mode.advanced',
            fieldLabel: 'loc.filterBar.rule.field',
            operatorLabel: 'loc.filterBar.rule.operator',
            valueLabel: 'loc.filterBar.rule.value',
            andConditionLabel: 'loc.filterBar.condition.and',
            orConditionLabel: 'loc.filterBar.condition.or',
            addRuleLabel: 'loc.filterBar.action.addRule',
            addGroupLabel: 'loc.filterBar.action.addGroup',
            removeRuleLabel: 'loc.filterBar.action.removeRule',
            removeGroupLabel: 'loc.filterBar.action.removeGroup',
            resetFiltersLabel: 'loc.filterBar.action.reset',
            saveFilterActionLabel: 'loc.filterBar.action.save',
            saveFilterTitleLabel: 'loc.filterBar.save.title',
            saveFilterNameLabel: 'loc.filterBar.save.name',
            saveFilterNamePlaceholder: 'loc.filterBar.save.namePlaceholder',
            saveFilterNameRequiredMessage: 'loc.filterBar.save.nameRequired',
            saveFilterSummaryTitleLabel: 'loc.filterBar.save.summaryTitle',
            saveFilterSummaryDescriptionLabel: 'loc.filterBar.save.summaryDescription',
            saveFilterEmptySummaryLabel: 'loc.filterBar.save.emptySummary',
            saveFilterGroupLabel: 'loc.filterBar.save.group',
            saveFilterClosePreventedMessage: 'loc.filterBar.save.closePrevented',
            cancelLabel: 'loc.global.cancel',
            containsOperatorLabel: 'loc.filterBar.operator.contains',
            equalsOperatorLabel: 'loc.filterBar.operator.equals',
            notEqualsOperatorLabel: 'loc.filterBar.operator.notEquals',
            startsWithOperatorLabel: 'loc.filterBar.operator.startsWith',
            endsWithOperatorLabel: 'loc.filterBar.operator.endsWith',
            isEmptyOperatorLabel: 'loc.filterBar.operator.isEmpty',
            isNotEmptyOperatorLabel: 'loc.filterBar.operator.isNotEmpty',
            greaterThanOperatorLabel: 'loc.filterBar.operator.greaterThan',
            greaterThanOrEqualsOperatorLabel: 'loc.filterBar.operator.greaterThanOrEquals',
            lessThanOperatorLabel: 'loc.filterBar.operator.lessThan',
            lessThanOrEqualsOperatorLabel: 'loc.filterBar.operator.lessThanOrEquals',
            onOperatorLabel: 'loc.filterBar.operator.on',
            beforeOperatorLabel: 'loc.filterBar.operator.before',
            afterOperatorLabel: 'loc.filterBar.operator.after',
            isTrueOperatorLabel: 'loc.filterBar.operator.isTrue',
            isFalseOperatorLabel: 'loc.filterBar.operator.isFalse',
        }),
    ],
})
export class FilterBarComponent implements OnChanges, OnInit {
    // #region Fields

    private readonly _intl: FilterBarComponentIntl = inject(FilterBarComponentIntl, { optional: true }) ?? new FilterBarComponentIntl();
    private readonly _storage: IUserPreferenceStorage = inject(USER_PREFERENCE_STORAGE);
    private readonly _drawerService: DrawerService = inject(DrawerService);
    private readonly _formModel = signal<Record<string, unknown>>({});
    private readonly _advancedFormModel = signal<Record<string, unknown>>({});
    private readonly _filterResetVersion = signal(0);
    private readonly _mode = signal<FilterBarModeValue>(FilterBarMode.Standard);
    private _advancedNodeIndex = 0;
    private readonly _advancedRoot = signal<IAdvancedFilterGroup>(createAdvancedFilterGroup(this.createAdvancedNodeId(), FilterCondition.And));
    private readonly _advancedRows: Signal<ReadonlyArray<IAdvancedFilterRow>> = computed(() => flattenAdvancedFilterTree(this._advancedRoot()));
    private readonly _form: FieldTree<Record<string, unknown>>;
    private readonly _advancedForm: FieldTree<Record<string, unknown>>;
    private _isChangeTrackingInitialized = false;
    private _restoredPreferenceKey?: string;
    private _appliedValueSignature?: string;

    // #endregion

    // #region Ctor

    public constructor() {
        this._form = form(this._formModel);
        this._advancedForm = form(this._advancedFormModel);

        effect(() => {
            const values = this.normalizedValues();

            if (!this._isChangeTrackingInitialized) {
                this._isChangeTrackingInitialized = true;
                return;
            }

            this.persistValues(values);
            this.filterChange.emit(values);
        });
    }

    // #endregion

    // #region Properties

    /**
     * The filter definitions to render.
     *
     * @public
     * @readonly
     */
    public readonly filters = input.required<ReadonlyArray<IFilterDefinition>>();

    /**
     * Stable preference key used to persist active filter values.
     *
     * @public
     * @readonly
     */
    public readonly persistenceKey = input<string | undefined>();

    /**
     * Externally controlled filter values, for example when applying a saved filter.
     *
     * @public
     * @readonly
     */
    public readonly value = input<FilterValues | undefined>();

    /**
     * Emitted whenever any active filter value changes.
     *
     * @public
     * @readonly
     */
    public readonly filterChange = output<FilterValues>();

    /**
     * Emitted after the save-filter drawer was confirmed.
     *
     * @public
     * @readonly
     */
    public readonly savedFilterCreate = output<ISavedFilterCreateRequest>();

    /**
     * Whether the filter bar has any active values.
     *
     * @public
     * @readonly
     */
    public readonly isFilterActive: Signal<boolean> = computed(() => Object.keys(this.normalizedValues()).length > 0);

    /**
     * Whether the filter bar has any active values.
     *
     * @public
     * @readonly
     */
    public readonly hasActiveFilters: Signal<boolean> = this.isFilterActive;

    /**
     * Internationalized labels used by the filter bar.
     *
     * @public
     * @readonly
     */
    public get intl(): FilterBarComponentIntl {
        return this._intl;
    }

    /**
     * The currently selected filter mode.
     *
     * @protected
     * @readonly
     */
    protected readonly mode: Signal<FilterBarModeValue> = this._mode.asReadonly();

    /**
     * Rows used by the advanced condition builder.
     *
     * @protected
     * @readonly
     */
    protected readonly advancedRows: Signal<ReadonlyArray<IAdvancedFilterRow>> = this._advancedRows;

    // #endregion

    // #region Methods

    /**
     * Synchronizes dynamic form fields after input changes.
     *
     * @public
     */
    public ngOnChanges(): void {
        this.ensureFilterFields(this.filters());
        this.ensureAdvancedRoot();
        this.ensureAdvancedFilterFields();

        if (!this.applyInputValues()) {
            this.restorePersistedValues();
        }
    }

    /**
     * Synchronizes dynamic form fields before the first view render.
     *
     * @public
     */
    public ngOnInit(): void {
        this.ensureFilterFields(this.filters());
        this.ensureAdvancedRoot();
        this.ensureAdvancedFilterFields();

        if (!this.applyInputValues()) {
            this.restorePersistedValues();
        }
    }

    /**
     * Returns the field accessor for a dynamic filter key.
     *
     * @param key - Filter definition key.
     * @protected
     */
    protected field(key: string): () => FieldState<unknown> {
        let field = this._form[key];

        if (!field) {
            this.ensureFilterFields(this.filters());
            field = this._form[key];
        }

        if (!field) {
            throw new Error(`Filter field '${key}' could not be initialized.`);
        }

        return field;
    }

    /**
     * Returns the advanced form field accessor for a dynamic control key.
     *
     * @param key - Advanced control key.
     * @protected
     */
    protected advancedField(key: string): () => FieldState<unknown> {
        let field = this._advancedForm[key];

        if (!field) {
            this.ensureAdvancedFilterFields();
            field = this._advancedForm[key];
        }

        if (!field) {
            throw new Error(`Advanced filter field '${key}' could not be initialized.`);
        }

        return field;
    }

    /**
     * Resets all filter values.
     *
     * @protected
     */
    protected onReset(): void {
        this._formModel.set(this.createEmptyFormModel(this.filters()));
        this._advancedRoot.set(this.createEmptyAdvancedRoot());
        this._advancedFormModel.set(this.createAdvancedFormModel(this._advancedRoot(), {}));

        this._filterResetVersion.update((version) => version + 1);
        this.removePersistedValues();
    }

    /**
     * Opens the drawer used to save the current filter values.
     *
     * @protected
     */
    protected onSaveFilter(): void {
        const values = this.normalizedValues();

        if (Object.keys(values).length === 0) {
            return;
        }

        const ref = this._drawerService.show(SavedFilterDrawerComponent, {
            size: { width: '32rem', height: 'auto' },
            maxSize: { width: '96vw', height: '96dvh' },
            data: {
                filters: this.filters(),
                values,
            },
        });

        onceOn(ref.closed, (closeResult) => {
            if (closeResult.reason !== 'positive' || !closeResult.result) {
                return;
            }

            const result = closeResult.result as ISavedFilterDrawerResult;

            this.savedFilterCreate.emit({
                name: result.name,
                values: result.values,
            });
        });
    }

    /**
     * Switches between standard and advanced mode.
     *
     * @param mode - Target mode.
     * @protected
     */
    protected onModeChanged(mode: FilterBarModeValue): void {
        if (this._mode() === mode) {
            return;
        }

        this._mode.set(mode);
        this.ensureAdvancedFilterFields();
    }

    /**
     * Adds a rule to an advanced group.
     *
     * @param groupId - Target group id.
     * @protected
     */
    protected onAddAdvancedRule(groupId: string): void {
        const rule = this.createAdvancedRule();

        if (!rule) {
            return;
        }

        this._advancedRoot.update((root) => addAdvancedFilterNode(root, groupId, rule));
        this.ensureAdvancedFilterFields();
    }

    /**
     * Adds a nested group to an advanced group.
     *
     * @param groupId - Target group id.
     * @protected
     */
    protected onAddAdvancedGroup(groupId: string): void {
        const rule = this.createAdvancedRule();
        const group = createAdvancedFilterGroup(this.createAdvancedNodeId(), FilterCondition.And, rule ? [rule] : []);

        this._advancedRoot.update((root) => addAdvancedFilterNode(root, groupId, group));
        this.ensureAdvancedFilterFields();
    }

    /**
     * Removes a rule or group.
     *
     * @param nodeId - Node id to remove.
     * @protected
     */
    protected onRemoveAdvancedNode(nodeId: string): void {
        if (this._advancedRoot().id === nodeId) {
            return;
        }

        this._advancedRoot.update((root) => removeAdvancedFilterNode(root, nodeId));
        this.ensureAdvancedFilterFields();
    }

    /**
     * Updates a group condition.
     *
     * @param groupId - Group id.
     * @param condition - Target condition.
     * @protected
     */
    protected onSetAdvancedGroupCondition(groupId: string, condition: FilterConditionValue): void {
        this._advancedRoot.update((root) => updateAdvancedFilterGroupCondition(root, groupId, condition));
    }

    /**
     * Normalizes rule operator/value after the field select changes.
     *
     * @param rule - Changed rule.
     * @protected
     */
    protected onAdvancedRuleFieldChanged(rule: IAdvancedFilterRule): void {
        queueMicrotask(() => this.normalizeAdvancedRuleForm(rule));
    }

    /**
     * Returns a standard filter track key.
     *
     * @param filter - Filter definition.
     * @protected
     */
    protected standardFilterTrackKey(filter: IFilterDefinition): string {
        return `${filter.key}:${this._filterResetVersion()}`;
    }

    /**
     * Returns whether a flattened advanced row can be removed.
     *
     * @param row - Advanced filter row.
     * @protected
     */
    protected canRemoveAdvancedRow(row: IAdvancedFilterRow): boolean {
        return row.parentId !== undefined;
    }

    /**
     * Returns a typed group node when applicable.
     *
     * @param node - Advanced filter node.
     * @protected
     */
    protected advancedGroup(node: AdvancedFilterNode): IAdvancedFilterGroup | undefined {
        return isAdvancedFilterGroup(node) ? node : undefined;
    }

    /**
     * Returns a typed rule node when applicable.
     *
     * @param node - Advanced filter node.
     * @protected
     */
    protected advancedRule(node: AdvancedFilterNode): IAdvancedFilterRule | undefined {
        return isAdvancedFilterRule(node) ? node : undefined;
    }

    /**
     * Returns an advanced rule control key.
     *
     * @param rule - Advanced rule.
     * @param kind - Control kind.
     * @protected
     */
    protected advancedRuleControlKey(rule: IAdvancedFilterRule, kind: AdvancedRuleControlKind): string {
        return `${rule.id}:${kind}`;
    }

    /**
     * Returns available operator options for a rule.
     *
     * @param rule - Advanced rule.
     * @protected
     */
    protected advancedRuleOperatorOptions(rule: IAdvancedFilterRule): ReadonlyArray<IFilterOperatorOption> {
        const filter = this.resolveAdvancedRuleFilter(rule);

        return filter ? this.getOperatorOptions(filter.type) : [];
    }

    /**
     * Returns the selected filter definition for a rule.
     *
     * @param rule - Advanced rule.
     * @protected
     */
    protected advancedRuleFilter(rule: IAdvancedFilterRule): IFilterDefinition | undefined {
        return this.resolveAdvancedRuleFilter(rule);
    }

    /**
     * Returns whether a rule needs a value control.
     *
     * @param rule - Advanced rule.
     * @protected
     */
    protected advancedRuleRequiresValue(rule: IAdvancedFilterRule): boolean {
        return this.operatorRequiresValue(this.resolveAdvancedRuleOperator(rule));
    }

    /**
     * Returns the current filter type enum for template usage.
     *
     * @protected
     * @readonly
     */
    protected get filterType(): typeof FilterType {
        return FilterType;
    }

    /**
     * Returns the current filter bar mode enum for template usage.
     *
     * @protected
     * @readonly
     */
    protected get filterBarMode(): typeof FilterBarMode {
        return FilterBarMode;
    }

    /**
     * Returns the current filter condition enum for template usage.
     *
     * @protected
     * @readonly
     */
    protected get filterCondition(): typeof FilterCondition {
        return FilterCondition;
    }

    private hasFilterValue(value: unknown): boolean {
        return value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0);
    }

    private restorePersistedValues(): void {
        const key = this.persistenceKey();

        if (!key || this._restoredPreferenceKey === key) {
            return;
        }

        this._restoredPreferenceKey = key;
        const state = this._storage.read(key, FILTER_BAR_PREFERENCE_CODEC);

        if (!state) {
            return;
        }

        this.applyFilterValues(state.values);
    }

    private applyInputValues(): boolean {
        const values = this.value();

        if (!values) {
            return false;
        }

        const signature = JSON.stringify(values);

        if (this._appliedValueSignature === signature) {
            return true;
        }

        this._appliedValueSignature = signature;
        this.applyFilterValues(values);

        return true;
    }

    private persistValues(values: FilterValues): void {
        const key = this.persistenceKey();

        if (!key) {
            return;
        }

        if (Object.keys(values).length === 0) {
            this._storage.remove(key);
            return;
        }

        this._storage.write(
            key,
            {
                version: FILTER_BAR_PREFERENCE_VERSION,
                values,
            },
            FILTER_BAR_PREFERENCE_CODEC,
        );
    }

    private removePersistedValues(): void {
        const key = this.persistenceKey();

        if (key) {
            this._storage.remove(key);
        }
    }

    private applyFilterValues(values: FilterValues): void {
        if (this.isAdvancedFilterValues(values)) {
            this._mode.set(FilterBarMode.Advanced);
            this._advancedRoot.set(values.root);
            this._advancedFormModel.set(this.createAdvancedFormModel(values.root, {}));
            this.ensureAdvancedFilterFields();
            return;
        }

        this._mode.set(FilterBarMode.Standard);
        this._formModel.set(this.createFormModel(this.filters(), values));
        this._filterResetVersion.update((version) => version + 1);
    }

    private ensureFilterFields(filters: ReadonlyArray<IFilterDefinition>): void {
        const nextModel = this.createFormModel(filters, this._formModel());

        if (this.hasSameKeys(nextModel, this._formModel())) {
            return;
        }

        this._formModel.set(nextModel);
    }

    private createFormModel(filters: ReadonlyArray<IFilterDefinition>, values: Readonly<Record<string, unknown>>): Record<string, unknown> {
        return Object.fromEntries(filters.map((filter) => [filter.key, values[filter.key] ?? null]));
    }

    private createEmptyFormModel(filters: ReadonlyArray<IFilterDefinition>): Record<string, unknown> {
        return Object.fromEntries(filters.map((filter) => [filter.key, null]));
    }

    private hasSameKeys(left: Readonly<Record<string, unknown>>, right: Readonly<Record<string, unknown>>): boolean {
        const leftKeys = Object.keys(left);
        const rightKeys = Object.keys(right);

        return leftKeys.length === rightKeys.length && leftKeys.every((key) => Object.hasOwn(right, key));
    }

    private normalizedValues(): FilterValues {
        if (this._mode() === FilterBarMode.Advanced) {
            return this.normalizedAdvancedValues();
        }

        return Object.fromEntries(Object.entries(this._formModel()).filter(([, value]) => this.hasFilterValue(value)));
    }

    private normalizedAdvancedValues(): FilterValues {
        const root = this.createActiveAdvancedGroup(this._advancedRoot());

        if (root.children.length === 0) {
            return {};
        }

        return {
            mode: FilterBarMode.Advanced,
            root,
        } satisfies IAdvancedFilterValues;
    }

    private isAdvancedFilterValues(values: FilterValues): values is IAdvancedFilterValues {
        return values['mode'] === FilterBarMode.Advanced && isPersistedAdvancedFilterGroup(values['root']);
    }

    private createActiveAdvancedGroup(group: IAdvancedFilterGroup): IAdvancedFilterGroup {
        const children: AdvancedFilterNode[] = [];

        for (const child of group.children) {
            const activeNode = this.createActiveAdvancedNode(child);

            if (activeNode) {
                children.push(activeNode);
            }
        }

        return {
            ...group,
            children,
        };
    }

    private createActiveAdvancedNode(node: AdvancedFilterNode): AdvancedFilterNode | undefined {
        if (isAdvancedFilterGroup(node)) {
            const group = this.createActiveAdvancedGroup(node);

            return group.children.length > 0 ? group : undefined;
        }

        const filter = this.resolveAdvancedRuleFilter(node);
        const operator = this.resolveAdvancedRuleOperator(node);
        const value = this._advancedFormModel()[this.advancedRuleControlKey(node, 'value')];

        if (!filter || (this.operatorRequiresValue(operator) && !this.hasFilterValue(value))) {
            return undefined;
        }

        return createAdvancedFilterRule(node.id, filter.key, operator, this.operatorRequiresValue(operator) ? value : undefined);
    }

    private ensureAdvancedFilterFields(): void {
        const nextModel = this.createAdvancedFormModel(this._advancedRoot(), this._advancedFormModel());

        if (this.hasSameEntries(nextModel, this._advancedFormModel())) {
            return;
        }

        this._advancedFormModel.set(nextModel);
    }

    private ensureAdvancedRoot(): void {
        if (this._advancedRoot().children.length > 0 || this.visibleFilters().length === 0) {
            return;
        }

        this._advancedRoot.set(this.createEmptyAdvancedRoot());
    }

    private createAdvancedFormModel(root: IAdvancedFilterGroup, values: Readonly<Record<string, unknown>>): Record<string, unknown> {
        const nextModel: Record<string, unknown> = {};

        for (const rule of this.collectAdvancedRules(root)) {
            const fieldControlKey = this.advancedRuleControlKey(rule, 'field');
            const operatorControlKey = this.advancedRuleControlKey(rule, 'operator');
            const valueControlKey = this.advancedRuleControlKey(rule, 'value');
            const selectedFilter = this.resolveFilterDefinition(values[fieldControlKey], rule.fieldKey);
            const operatorOptions = selectedFilter ? this.getOperatorOptions(selectedFilter.type) : [];
            const selectedOperator = this.resolveOperator(values[operatorControlKey], rule.operator, operatorOptions);

            nextModel[fieldControlKey] = selectedFilter?.key ?? null;
            nextModel[operatorControlKey] = selectedOperator;
            nextModel[valueControlKey] = values[valueControlKey] ?? rule.value ?? null;
        }

        return nextModel;
    }

    private collectAdvancedRules(root: IAdvancedFilterGroup): ReadonlyArray<IAdvancedFilterRule> {
        const rules: IAdvancedFilterRule[] = [];

        this.appendAdvancedRules(root, rules);

        return rules;
    }

    private appendAdvancedRules(node: AdvancedFilterNode, rules: Array<IAdvancedFilterRule>): void {
        if (isAdvancedFilterRule(node)) {
            rules.push(node);
            return;
        }

        for (const child of node.children) {
            this.appendAdvancedRules(child, rules);
        }
    }

    private hasSameEntries(left: Readonly<Record<string, unknown>>, right: Readonly<Record<string, unknown>>): boolean {
        const leftKeys = Object.keys(left);
        const rightKeys = Object.keys(right);

        return leftKeys.length === rightKeys.length && leftKeys.every((key) => Object.hasOwn(right, key) && Object.is(left[key], right[key]));
    }

    private normalizeAdvancedRuleForm(rule: IAdvancedFilterRule): void {
        const fieldControlKey = this.advancedRuleControlKey(rule, 'field');
        const operatorControlKey = this.advancedRuleControlKey(rule, 'operator');
        const valueControlKey = this.advancedRuleControlKey(rule, 'value');
        const filter = this.resolveFilterDefinition(this._advancedFormModel()[fieldControlKey], rule.fieldKey);
        const operatorOptions = filter ? this.getOperatorOptions(filter.type) : [];
        const operator = this.resolveOperator(this._advancedFormModel()[operatorControlKey], undefined, operatorOptions);

        this._advancedFormModel.update((model) => ({
            ...model,
            [operatorControlKey]: operator,
            [valueControlKey]: null,
        }));
    }

    private resolveAdvancedRuleFilter(rule: IAdvancedFilterRule): IFilterDefinition | undefined {
        return this.resolveFilterDefinition(this._advancedFormModel()[this.advancedRuleControlKey(rule, 'field')], rule.fieldKey);
    }

    private resolveFilterDefinition(value: unknown, fallbackKey?: string): IFilterDefinition | undefined {
        const filters = this.visibleFilters();
        const key = typeof value === 'string' ? value : fallbackKey;

        return filters.find((filter) => filter.key === key) ?? filters[0];
    }

    private visibleFilters(): ReadonlyArray<IFilterDefinition> {
        return this.filters().filter((filter) => filter.visible !== false);
    }

    private resolveAdvancedRuleOperator(rule: IAdvancedFilterRule): FilterOperatorValue {
        const filter = this.resolveAdvancedRuleFilter(rule);
        const operatorOptions = filter ? this.getOperatorOptions(filter.type) : [];

        return this.resolveOperator(this._advancedFormModel()[this.advancedRuleControlKey(rule, 'operator')], rule.operator, operatorOptions);
    }

    private resolveOperator(value: unknown, fallback: FilterOperatorValue | undefined, options: ReadonlyArray<IFilterOperatorOption>): FilterOperatorValue {
        if (typeof value === 'string' && options.some((option) => option.value === value)) {
            return value as FilterOperatorValue;
        }

        if (fallback && options.some((option) => option.value === fallback)) {
            return fallback;
        }

        return options[0]?.value ?? FilterOperator.Equals;
    }

    private getOperatorOptions(type: FilterTypeValue): ReadonlyArray<IFilterOperatorOption> {
        switch (type) {
            case FilterType.Number:
                return this.createOperatorOptions(NUMBER_OPERATOR_VALUES);
            case FilterType.Select:
            case FilterType.MultiSelect:
                return this.createOperatorOptions(SELECT_OPERATOR_VALUES);
            case FilterType.Date:
            case FilterType.DateRange:
                return this.createOperatorOptions(DATE_OPERATOR_VALUES);
            case FilterType.Boolean:
                return this.createOperatorOptions(BOOLEAN_OPERATOR_VALUES);
            case FilterType.Text:
            default:
                return this.createOperatorOptions(TEXT_OPERATOR_VALUES);
        }
    }

    private createOperatorOptions(values: ReadonlyArray<FilterOperatorValue>): ReadonlyArray<IFilterOperatorOption> {
        return values.map((value) => ({
            label: this._intl.getOperatorLabel(value),
            value,
        }));
    }

    private operatorRequiresValue(operator: FilterOperatorValue): boolean {
        return !NO_VALUE_OPERATORS.has(operator);
    }

    private createEmptyAdvancedRoot(): IAdvancedFilterGroup {
        const rule = this.createAdvancedRule();

        return createAdvancedFilterGroup(this.createAdvancedNodeId(), FilterCondition.And, rule ? [rule] : []);
    }

    private createAdvancedRule(): IAdvancedFilterRule | undefined {
        const filter = this.visibleFilters()[0];

        if (!filter) {
            return undefined;
        }

        const [firstOperator] = this.getOperatorOptions(filter.type);

        if (firstOperator === undefined) {
            throw new Error(`The filter type "${filter.type}" offers no operator.`);
        }

        return createAdvancedFilterRule(this.createAdvancedNodeId(), filter.key, firstOperator.value);
    }

    private createAdvancedNodeId(): string {
        this._advancedNodeIndex += 1;

        return `advanced-filter-${this._advancedNodeIndex}`;
    }

    // #endregion
}

function isFilterBarPreferenceState(value: unknown): value is IFilterBarPreferenceState {
    return isRecord(value) && value['version'] === FILTER_BAR_PREFERENCE_VERSION && isRecord(value['values']);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isPersistedAdvancedFilterGroup(value: unknown): value is IAdvancedFilterGroup {
    if (!isRecord(value) || value['kind'] !== 'group' || !Array.isArray(value['children'])) {
        return false;
    }

    return value['condition'] === FilterCondition.And || value['condition'] === FilterCondition.Or;
}
