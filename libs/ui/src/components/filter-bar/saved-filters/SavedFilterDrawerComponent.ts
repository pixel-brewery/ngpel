// #region Imports

import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, LOCALE_ID, signal, type Signal } from '@angular/core';
import { FormField, form, required, type FieldTree } from '@angular/forms/signals';
import {
    ButtonComponent,
    Cancel,
    DRAWER_REF,
    DRAWER_REF_DATA,
    DrawerContentDirective,
    DrawerFooterDirective,
    DrawerHeaderComponent,
    DrawerHeaderDirective,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    SignalFormValidator,
    TextBoxComponent,
    ToastService,
    TypographyDirective,
    type IDrawerRef,
} from '@pixel-brewery/mosaik-elements-angular';
import { type IToastVisibility, TOAST_VISIBILITY } from '@pixel-brewery/ngpel-core';
import { guardImplicitCloseAttempts } from '@pixel-brewery/ngpel-core/rx';
import { ScrollToErrorDirective } from '../../../directives/scroll-to-error/ScrollToErrorDirective';
import { ScrollToErrorTriggerDirective } from '../../../directives/scroll-to-error/ScrollToErrorTriggerDirective';
import { FilterBarComponentIntl, provideFilterBarComponentIntl } from '../FilterBarComponentIntl';
import type { FilterConditionValue, FilterValues, IFilterDefinition } from '../IFilterDefinition';
import { FilterCondition } from '../IFilterDefinition';
import { createSavedFilterSummary } from './createSavedFilterSummary';
import type { ISavedFilterSummaryItem } from './ISavedFilterSummaryItem';
import type { Subscription } from 'rxjs';

// #endregion

// #region Models

/**
 * Drawer input data for saving a filter.
 *
 * @public
 */
export interface ISavedFilterDrawerData {
    /**
     * Filter definitions for summary rendering.
     */
    readonly filters: ReadonlyArray<IFilterDefinition>;

    /**
     * Current filter values.
     */
    readonly values: FilterValues;
}

/**
 * Drawer result for saving a filter.
 *
 * @public
 */
export interface ISavedFilterDrawerResult {
    /**
     * Saved filter name.
     */
    readonly name: string;

    /**
     * Current filter values.
     */
    readonly values: FilterValues;
}

interface ISavedFilterDrawerFormData {
    readonly name: string;
}

// #endregion

/**
 * Drawer used to name and review a saved filter.
 *
 * @public
 */
@Component({
    selector: 'ngp-saved-filter-drawer',
    template: `
        <ng-template mosaikDrawerHeader>
            <mosaik-drawer-header [text]="intl.saveFilterTitleLabel" />
        </ng-template>

        <ng-template mosaikDrawerContent>
            <form class="flex min-h-0 flex-col gap-4 px-2 py-2" [ngpScrollToError]="form()">
                <mosaik-form-field [fieldState]="form.name()">
                    <mosaik-textbox
                        [formField]="form.name"
                        [label]="intl.saveFilterNameLabel"
                        [placeholder]="intl.saveFilterNamePlaceholder"
                        [required]="true"
                        [isClearable]="true"
                    />
                </mosaik-form-field>

                <section class="flex min-w-0 flex-col gap-2">
                    <div class="flex min-w-0 flex-col gap-0.5">
                        <h3 class="m-0" [mosaikTypography]="'body2Strong'">{{ intl.saveFilterSummaryTitleLabel }}</h3>
                        <p class="m-0 text-(--mosaik-scheme-middle)" [mosaikTypography]="'caption'">
                            {{ intl.saveFilterSummaryDescriptionLabel }}
                        </p>
                    </div>

                    <div class="flex min-w-0 flex-col gap-1.5">
                        @for (item of summaryItems(); track item.id) {
                            <div
                                class="min-w-0 rounded-md border border-(--mosaik-scheme-middlelight)/25 bg-(--mosaik-scheme-surface)/70 px-2 py-1.5"
                                [style.margin-left]="summaryIndent(item)"
                            >
                                @if (item.kind === 'group') {
                                    <div class="flex min-w-0 items-center gap-2">
                                        @if (isOrCondition(item.condition)) {
                                            <span
                                                class="rounded border border-(--mosaik-scheme-warning)/35 bg-(--mosaik-scheme-warning)/10 px-1.5 py-0.5 text-[0.68rem] font-semibold"
                                            >
                                                {{ item.conditionLabel }}
                                            </span>
                                        } @else {
                                            <span
                                                class="rounded border border-(--mosaik-scheme-primary)/35 bg-(--mosaik-scheme-primary)/10 px-1.5 py-0.5 text-[0.68rem] font-semibold"
                                            >
                                                {{ item.conditionLabel }}
                                            </span>
                                        }
                                        <span class="min-w-0 truncate text-(--mosaik-scheme-middle)" [mosaikTypography]="'caption'">
                                            {{ intl.saveFilterGroupLabel }}
                                        </span>
                                    </div>
                                } @else {
                                    <div class="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-1">
                                        <div class="min-w-0 truncate" [mosaikTypography]="'body2Strong'">{{ item.fieldLabel }}</div>
                                        <div class="flex min-w-0 flex-wrap items-center gap-1 text-(--mosaik-scheme-middle)">
                                            @if (item.operatorLabel) {
                                                <span class="rounded bg-(--mosaik-scheme-middlelight)/15 px-1.5 py-0.5" [mosaikTypography]="'caption'">
                                                    {{ item.operatorLabel }}
                                                </span>
                                            }
                                            @if (item.valueLabel) {
                                                <span class="min-w-0 break-words" [mosaikTypography]="'caption'">{{ item.valueLabel }}</span>
                                            } @else if (!item.operatorLabel) {
                                                <span class="min-w-0 break-words" [mosaikTypography]="'caption'">{{ item.valueLabel }}</span>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        } @empty {
                            <div
                                class="rounded-md border border-(--mosaik-scheme-middlelight)/25 bg-(--mosaik-scheme-surface)/70 px-2 py-2 text-(--mosaik-scheme-middle)"
                                [mosaikTypography]="'caption'"
                            >
                                {{ intl.saveFilterEmptySummaryLabel }}
                            </div>
                        }
                    </div>
                </section>
            </form>
        </ng-template>

        <ng-template mosaikDrawerFooter>
            <div class="flex items-center justify-end gap-2">
                <mosaik-button [label]="intl.cancelLabel" [appearance]="'plain'" (click)="onCancel()" />
                <mosaik-button
                    [label]="intl.saveFilterActionLabel"
                    [appearance]="'solid'"
                    [variant]="'primary'"
                    [ngpScrollToErrorTrigger]="form()"
                    (click)="onSave()"
                />
            </div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        DrawerContentDirective,
        DrawerFooterDirective,
        DrawerHeaderComponent,
        DrawerHeaderDirective,
        FormField,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        ScrollToErrorDirective,
        ScrollToErrorTriggerDirective,
        TextBoxComponent,
        TypographyDirective,
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
export class SavedFilterDrawerComponent {
    // #region Fields

    private readonly _drawerRef: IDrawerRef<ISavedFilterDrawerData, ISavedFilterDrawerResult> = inject(DRAWER_REF) as IDrawerRef<
        ISavedFilterDrawerData,
        ISavedFilterDrawerResult
    >;
    private readonly _drawerData: ISavedFilterDrawerData = inject<ISavedFilterDrawerData>(DRAWER_REF_DATA);
    private readonly _intl: FilterBarComponentIntl = inject(FilterBarComponentIntl);
    private readonly _locale = inject(LOCALE_ID);
    private readonly _toastService: ToastService = inject(ToastService);
    private readonly _toastVisibility: IToastVisibility = inject(TOAST_VISIBILITY);
    private readonly _formValidator: SignalFormValidator = inject(SignalFormValidator);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _formModel = signal<ISavedFilterDrawerFormData>({ name: '' });
    private readonly _form: FieldTree<ISavedFilterDrawerFormData>;
    private _closeAttemptedSubscription?: Subscription;

    // #endregion

    // #region Ctor

    public constructor() {
        this._form = form(this._formModel, (schema) => {
            required(schema.name, {
                message: () => this._intl.saveFilterNameRequiredMessage,
            });
        });
        this._closeAttemptedSubscription?.unsubscribe();
        this._closeAttemptedSubscription = guardImplicitCloseAttempts(
            this._drawerRef,
            () => this._form().dirty(),
            () => {
                if (!this._toastVisibility.canShow()) {
                    return;
                }

                this._toastService.show({
                    content: this._intl.saveFilterClosePreventedMessage,
                    iconName: 'warning',
                    variant: 'warning',
                    appearance: 'soft',
                });
            },
        );
        this._destroyRef.onDestroy(() => this._closeAttemptedSubscription?.unsubscribe());
    }

    // #endregion

    // #region Properties

    /**
     * Internationalized labels.
     *
     * @public
     */
    public get intl(): FilterBarComponentIntl {
        return this._intl;
    }

    /**
     * Signal form fields.
     *
     * @public
     */
    public get form(): FieldTree<ISavedFilterDrawerFormData> {
        return this._form;
    }

    /**
     * Summary items for the filter definition.
     *
     * @public
     * @readonly
     */
    public readonly summaryItems: Signal<ReadonlyArray<ISavedFilterSummaryItem>> = computed(() =>
        createSavedFilterSummary(this._drawerData.filters, this._drawerData.values, this._intl, this._locale),
    );

    // #endregion

    // #region Methods

    /**
     * Closes the drawer without saving.
     *
     * @public
     */
    public onCancel(): void {
        this._drawerRef.close(Cancel.negative());
    }

    /**
     * Confirms the saved filter name.
     *
     * @public
     */
    public onSave(): void {
        this._formValidator
            .build(this._form)
            .onErrors(() => {
                if (!this._toastVisibility.canShow()) {
                    return;
                }

                this._toastService.show({
                    content: this._intl.saveFilterNameRequiredMessage,
                    iconName: 'warning',
                    variant: 'warning',
                    appearance: 'soft',
                });
            })
            .onSuccess((formData) => {
                this._drawerRef.close(
                    Cancel.positive({
                        name: formData.name.trim(),
                        values: this._drawerData.values,
                    }),
                );
            })
            .run();
    }

    /**
     * Returns the CSS indentation for one summary item.
     *
     * @param item - Summary item.
     * @public
     */
    public summaryIndent(item: ISavedFilterSummaryItem): string {
        return `${Math.max(item.depth, 0) * 0.85}rem`;
    }

    /**
     * Returns whether a condition is an OR group.
     *
     * @param condition - Filter condition.
     * @public
     */
    public isOrCondition(condition: FilterConditionValue | undefined): boolean {
        return condition === FilterCondition.Or;
    }

    // #endregion
}
