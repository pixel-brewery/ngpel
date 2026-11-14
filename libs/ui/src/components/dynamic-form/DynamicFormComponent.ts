// #region Imports

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    Injector,
    input,
    isDevMode,
    model,
    OnChanges,
    runInInjectionContext,
    signal,
    type Signal,
    type SimpleChanges,
    type WritableSignal,
} from '@angular/core';
import { emailError, form, maxLengthError, required, requiredError, validate, type FieldState, type FieldTree } from '@angular/forms/signals';
import {
    AnchorComponent,
    ButtonComponent,
    CheckBoxGroupComponent,
    CheckboxComponent,
    DateBoxComponent,
    LocaleDirective,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    IconNameDirective,
    NumberBoxComponent,
    NumberBoxDecimalDirective,
    PasswordBoxComponent,
    RadioComponent,
    RadioGroupComponent,
    SelectComponent,
    SelectItemComponent,
    TextBoxComponent,
    TextComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import { isEmailAddress, toCalendarDate } from '@pixel-brewery/ngpel-core';
import { ExpandableMultilineDirective } from '../../directives/expandable-multiline/ExpandableMultilineDirective';
import { SectionHeaderComponent } from '../section/SectionHeaderComponent';
import { DynamicFormControlType } from './DynamicFormControlType';
import { DynamicFormComponentIntl, provideDynamicFormComponentIntl } from './DynamicFormComponentIntl';
import { DynamicFormValidationRuleKey } from './DynamicFormValidationRuleKey';
import type { DynamicFormValidationRuleKeyValue } from './DynamicFormValidationRuleKeyValue';
import type { DynamicFormValue } from './DynamicFormValue';
import type { DynamicFormValues } from './DynamicFormValues';
import type { IDynamicFormDefinition } from './IDynamicFormDefinition';
import type { IDynamicFormFieldDefinition } from './IDynamicFormFieldDefinition';
import type { IDynamicFormValidationRule } from './IDynamicFormValidationRule';
import { resolveDynamicFormLayoutClasses } from './resolveDynamicFormLayoutClasses';

// #endregion

const FORBIDDEN_FIELD_KEYS: ReadonlySet<string> = new Set(['__proto__', 'constructor', 'prototype']);
const SUPPORTED_VALIDATION_RULE_KEYS: ReadonlySet<string> = new Set(Object.values(DynamicFormValidationRuleKey));
const LOCAL_HTTP_HOSTS: ReadonlySet<string> = new Set(['127.0.0.1', '[::1]', 'localhost']);

type DynamicFormLinkCopyStatus = 'copied' | 'error';

/**
 * Reads the schema path of one field.
 *
 * The form is rebuilt from the very fields being visited, so a missing path would mean the
 * definition changed underneath the rebuild rather than a caller passing a bad key.
 *
 * @typeParam TPath The schema path type of the built form.
 * @param schema The schema paths of the form, keyed by field key.
 * @param key The field key to read.
 * @returns The schema path of the field.
 */
function schemaPathOf<TPath>(schema: Readonly<Record<string, TPath>>, key: string): TPath {
    const path = schema[key];

    if (path === undefined) {
        throw new Error(`The dynamic form has no schema path for the field "${key}".`);
    }

    return path;
}

/**
 * Renders a versioned UI-owned form definition with Mosaik controls and Signal Forms.
 *
 * @public
 */
@Component({
    selector: 'ngp-dynamic-form',
    template: `
        <div part="root" class="flex flex-col gap-6">
            @if (definition().title || definition().description) {
                @if (useSectionHeaders()) {
                    <ngp-section-header part="header" [header]="definition().title ?? ''" [description]="definition().description ?? ''" />
                } @else {
                    <header part="header" class="flex flex-col gap-1">
                        @if (definition().title) {
                            <h2 part="title" class="text-lg font-semibold">{{ definition().title }}</h2>
                        }
                        @if (definition().description) {
                            <mosaik-text part="description" [text]="definition().description" [readonly]="true" [wrap]="true" />
                        }
                    </header>
                }
            }
            @for (section of definition().sections; track section.key) {
                <section part="section" class="flex flex-col gap-3" [attr.test-id]="'dynamic-form-section-' + section.key">
                    @if (section.title || section.description) {
                        @if (useSectionHeaders()) {
                            <ngp-section-header part="section-header" [header]="section.title ?? ''" [description]="section.description ?? ''" />
                        } @else {
                            <header part="section-header" class="flex flex-col gap-1">
                                @if (section.title) {
                                    <h3 part="section-title" class="text-base font-semibold">{{ section.title }}</h3>
                                }
                                @if (section.description) {
                                    <mosaik-text part="section-description" [text]="section.description" [readonly]="true" [wrap]="true" />
                                }
                            </header>
                        }
                    }

                    <div part="fields" class="grid grid-cols-12 gap-4">
                        @for (fieldDefinition of section.fields; track fieldDefinition.key) {
                            <div
                                part="field"
                                [class]="layoutClasses(fieldDefinition)"
                                [attr.test-id]="'dynamic-form-field-' + fieldDefinition.key"
                                [attr.data-control-type]="fieldDefinition.controlType"
                            >
                                @switch (fieldDefinition.controlType) {
                                    @case (controlType.Text) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-textbox
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [placeholder]="fieldDefinition.placeholder"
                                                [required]="isRequired(fieldDefinition)"
                                                [readonly]="isFieldReadonly(fieldDefinition)"
                                                [isClearable]="isFieldClearable(fieldDefinition)"
                                                [maxlength]="maximumLength(fieldDefinition)"
                                                [variant]="'primary'"
                                            />
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Password) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-passwordbox
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [placeholder]="fieldDefinition.placeholder"
                                                [required]="isRequired(fieldDefinition)"
                                                [readonly]="isFieldReadonly(fieldDefinition)"
                                                [variant]="'primary'"
                                            />
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Email) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-textbox
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                type="email"
                                                [autocomplete]="true"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [placeholder]="fieldDefinition.placeholder"
                                                [required]="isRequired(fieldDefinition)"
                                                [readonly]="isFieldReadonly(fieldDefinition)"
                                                [isClearable]="isFieldClearable(fieldDefinition)"
                                                [maxlength]="maximumLength(fieldDefinition)"
                                                [variant]="'primary'"
                                            />
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Multiline) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-textbox
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [placeholder]="fieldDefinition.placeholder"
                                                [required]="isRequired(fieldDefinition)"
                                                [readonly]="isFieldReadonly(fieldDefinition)"
                                                [isClearable]="isFieldClearable(fieldDefinition)"
                                                [multiline]="true"
                                                [multilineRows]="fieldDefinition.multilineRows ?? 4"
                                                ngpExpandableMultiline
                                                [maxlength]="maximumLength(fieldDefinition)"
                                                [variant]="'primary'"
                                            />
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Number) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            @if (fieldDefinition.integer) {
                                                <mosaik-numberbox
                                                    part="control"
                                                    [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                    [formField]="field(fieldDefinition.key)"
                                                    [label]="fieldDefinition.label"
                                                    [placeholder]="fieldDefinition.placeholder"
                                                    [required]="isRequired(fieldDefinition)"
                                                    [readonly]="isFieldReadonly(fieldDefinition)"
                                                    [isClearable]="isFieldClearable(fieldDefinition)"
                                                    [step]="1"
                                                    [decimalPlaces]="15"
                                                    [variant]="'primary'"
                                                />
                                            } @else {
                                                <mosaik-numberbox
                                                    mosaikDecimal
                                                    part="control"
                                                    [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                    [formField]="field(fieldDefinition.key)"
                                                    [label]="fieldDefinition.label"
                                                    [placeholder]="fieldDefinition.placeholder"
                                                    [required]="isRequired(fieldDefinition)"
                                                    [readonly]="isFieldReadonly(fieldDefinition)"
                                                    [isClearable]="isFieldClearable(fieldDefinition)"
                                                    [min]="fieldDefinition.minimum"
                                                    [max]="fieldDefinition.maximum"
                                                    [mosaikDecimalStep]="fieldDefinition.step"
                                                    [variant]="'primary'"
                                                />
                                            }
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Select) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-select
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [placeholder]="fieldDefinition.placeholder"
                                                [required]="isRequired(fieldDefinition)"
                                                [isReadOnly]="isFieldReadonly(fieldDefinition)"
                                                [isClearable]="isFieldClearable(fieldDefinition)"
                                                [variant]="'primary'"
                                            >
                                                @for (option of fieldDefinition.options ?? []; track option.value) {
                                                    <mosaik-select-item
                                                        part="option"
                                                        [attr.test-id]="'dynamic-form-option-' + fieldDefinition.key + '-' + option.value"
                                                        [label]="option.label"
                                                        [value]="option.value"
                                                        [disabled]="option.disabled ?? false"
                                                    />
                                                }
                                            </mosaik-select>
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Radio) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <div class="flex items-center justify-between gap-2">
                                                <span part="choice-label">{{ fieldDefinition.label }}</span>
                                                @if (isFieldClearable(fieldDefinition)) {
                                                    <mosaik-button
                                                        part="clear-answer"
                                                        [attr.test-id]="'dynamic-form-clear-' + fieldDefinition.key"
                                                        [attr.aria-label]="clearAnswerLabel"
                                                        [appearance]="'plain'"
                                                        [iconName]="'dismiss'"
                                                        [size]="'small'"
                                                        [type]="'button'"
                                                        [disabled]="field(fieldDefinition.key)().value() === null"
                                                        (click)="clearAnswer(fieldDefinition)"
                                                    />
                                                }
                                            </div>
                                            <mosaik-radio-group
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [attr.aria-label]="fieldDefinition.label"
                                                [formField]="field(fieldDefinition.key)"
                                                [required]="isRequired(fieldDefinition)"
                                                [disabled]="isFieldReadonly(fieldDefinition)"
                                                [orientation]="'horizontal'"
                                                [variant]="'primary'"
                                            >
                                                @for (option of fieldDefinition.options ?? []; track option.value) {
                                                    <mosaik-radio
                                                        part="option"
                                                        [attr.test-id]="'dynamic-form-option-' + fieldDefinition.key + '-' + option.value"
                                                        [label]="option.label"
                                                        [value]="option.value"
                                                        [disabled]="option.disabled ?? false"
                                                    />
                                                }
                                            </mosaik-radio-group>
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.MultipleChoice) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <span part="choice-label">{{ fieldDefinition.label }}</span>
                                            <mosaik-checkbox-group
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [attr.aria-label]="fieldDefinition.label"
                                                [formField]="field(fieldDefinition.key)"
                                                [required]="isRequired(fieldDefinition)"
                                                [disabled]="isFieldReadonly(fieldDefinition)"
                                                [variant]="'primary'"
                                            >
                                                @for (option of fieldDefinition.options ?? []; track option.value) {
                                                    <mosaik-checkbox
                                                        part="option"
                                                        [attr.test-id]="'dynamic-form-option-' + fieldDefinition.key + '-' + option.value"
                                                        [label]="option.label"
                                                        [value]="option.value"
                                                        [disabled]="option.disabled ?? false"
                                                    />
                                                }
                                            </mosaik-checkbox-group>
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Boolean) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-checkbox
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [required]="isRequired(fieldDefinition)"
                                                [disabled]="isFieldReadonly(fieldDefinition)"
                                                [variant]="'primary'"
                                            />
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Date) {
                                        <mosaik-form-field [fieldState]="field(fieldDefinition.key)()" [hint]="fieldDefinition.description">
                                            <mosaik-datebox
                                                part="control"
                                                [attr.test-id]="'dynamic-form-control-' + fieldDefinition.key"
                                                [formField]="field(fieldDefinition.key)"
                                                [label]="fieldDefinition.label"
                                                [placeholder]="fieldDefinition.placeholder"
                                                [required]="isRequired(fieldDefinition)"
                                                [readonly]="isFieldReadonly(fieldDefinition)"
                                                [isClearable]="isFieldClearable(fieldDefinition)"
                                                [minDate]="minimumDate(fieldDefinition)"
                                                [maxDate]="maximumDate(fieldDefinition)"
                                                [dropDownPlacement]="'bottom-end'"
                                                [variant]="'primary'"
                                            />
                                        </mosaik-form-field>
                                    }
                                    @case (controlType.Link) {
                                        <div part="link" class="flex min-w-0 flex-col gap-1">
                                            <span part="link-label" class="text-sm font-medium">{{ fieldDefinition.label }}</span>
                                            @if (linkUrl(fieldDefinition); as safeLinkUrl) {
                                                <div part="link-actions" class="flex min-w-0 flex-wrap items-center gap-2">
                                                    <mosaik-anchor
                                                        part="link-value"
                                                        class="min-w-0 break-all"
                                                        [href]="safeLinkUrl"
                                                        [label]="safeLinkUrl"
                                                        [target]="'_blank'"
                                                        [rel]="'noopener noreferrer'"
                                                        [attr.aria-label]="linkOpenLabel(fieldDefinition)"
                                                    />
                                                    <mosaik-button
                                                        part="link-copy"
                                                        [appearance]="'plain'"
                                                        [iconName]="'copy'"
                                                        [label]="linkCopyLabel(fieldDefinition)"
                                                        [size]="'small'"
                                                        [type]="'button'"
                                                        [attr.aria-label]="linkCopyLabel(fieldDefinition)"
                                                        (click)="copyLink(fieldDefinition)"
                                                    />
                                                </div>
                                            } @else {
                                                <mosaik-text part="link-invalid" [text]="linkInvalidLabel(fieldDefinition)" [readonly]="true" [wrap]="true" />
                                            }
                                            @if (linkCopyStatus(fieldDefinition); as copyStatus) {
                                                <span part="link-copy-status" class="text-sm" role="status" aria-live="polite">{{ copyStatus }}</span>
                                            }
                                        </div>
                                    }
                                    @case (controlType.Readonly) {
                                        <div part="readonly" class="flex min-w-0 flex-col gap-1">
                                            <span part="readonly-label" class="text-sm font-medium">{{ fieldDefinition.label }}</span>
                                            <mosaik-text
                                                part="readonly-value"
                                                class="min-w-0"
                                                [text]="readonlyValue(fieldDefinition)"
                                                [readonly]="true"
                                                [wrap]="true"
                                            />
                                        </div>
                                    }
                                }
                                @if (
                                    fieldDefinition.description &&
                                    (fieldDefinition.controlType === controlType.Link || fieldDefinition.controlType === controlType.Readonly)
                                ) {
                                    <mosaik-text
                                        part="field-description"
                                        class="mt-1 text-sm"
                                        [text]="fieldDefinition.description"
                                        [readonly]="true"
                                        [wrap]="true"
                                    />
                                }
                            </div>
                        }
                    </div>
                </section>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
    imports: [
        AnchorComponent,
        ButtonComponent,
        CheckBoxGroupComponent,
        CheckboxComponent,
        DateBoxComponent,
        ExpandableMultilineDirective,
        LocaleDirective,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        IconNameDirective,
        NumberBoxComponent,
        NumberBoxDecimalDirective,
        PasswordBoxComponent,
        RadioComponent,
        RadioGroupComponent,
        SectionHeaderComponent,
        SelectComponent,
        SelectItemComponent,
        TextBoxComponent,
        TextComponent,
    ],
    providers: [
        provideDynamicFormComponentIntl({
            openLinkLabel: 'loc.dynamicForm.link.open',
            copyLinkLabel: 'loc.dynamicForm.link.copy',
            linkUnavailableLabel: 'loc.dynamicForm.link.unavailable',
            linkCopiedLabel: 'loc.dynamicForm.link.copied',
            linkCopyErrorLabel: 'loc.dynamicForm.link.copyError',
            integerErrorLabel: 'loc.dynamicForm.number.integerError',
            integerRangeErrorLabel: 'loc.dynamicForm.number.integerRangeError',
            clearAnswerLabel: 'loc.dynamicForm.choice.clear',
        }),
    ],
})
export class DynamicFormComponent implements OnChanges {
    // #region Fields

    private readonly _injector: Injector = inject(Injector);
    private readonly _intl: DynamicFormComponentIntl = inject(DynamicFormComponentIntl, { optional: true }) ?? new DynamicFormComponentIntl();
    private readonly _isInitialized: WritableSignal<boolean> = signal(false);
    private readonly _linkCopyStatuses: WritableSignal<Readonly<Record<string, DynamicFormLinkCopyStatus>>> = signal({});
    private readonly _form: WritableSignal<FieldTree<DynamicFormValues>>;

    // #endregion

    // #region Ctor

    public constructor() {
        this._form = signal(form(this.value));
        effect(() => {
            if (this.validationAttempted() && this._isInitialized()) {
                this.markEditableFieldsAsTouched();
            }
        });
    }

    // #endregion

    // #region Properties

    /**
     * Definition rendered by the component.
     *
     * @public
     * @readonly
     */
    public readonly definition = input.required<IDynamicFormDefinition>();

    /** Uses the shared section-heading presentation for the form and its sections. */
    public readonly useSectionHeaders = input(false);

    /**
     * Forces every editable control into a read-only presentation.
     *
     * @public
     * @readonly
     */
    public readonly isReadonly = input<boolean>(false);

    /**
     * Indicates that the host attempted to submit the form.
     *
     * The renderer keeps validation presentation UI-owned and marks its
     * editable controls as touched when a host requests validation.
     *
     * @public
     * @readonly
     */
    public readonly validationAttempted = input<boolean>(false);

    /**
     * Two-way value map of all dynamic fields.
     *
     * @public
     * @readonly
     */
    public readonly value = model<DynamicFormValues>({});

    /**
     * Indicates whether the complete dynamic form is valid and has no pending validation.
     *
     * @public
     * @readonly
     */
    public readonly valid: Signal<boolean> = computed(() => this._isInitialized() && this._form()().valid());

    /**
     * Indicates whether consumers may submit the current dynamic form values.
     *
     * @public
     * @readonly
     */
    public readonly canSubmit: Signal<boolean> = computed(() => {
        const formState = this._form()();

        return !this.isReadonly() && this.valid() && !formState.submitting();
    });

    /**
     * Renderer kinds available to the template.
     *
     * @protected
     * @readonly
     */
    protected readonly controlType = DynamicFormControlType;

    /** Accessible text of the optional radio clear button. */
    protected get clearAnswerLabel(): string {
        return this._intl.clearAnswerLabel;
    }

    // #endregion

    // #region Methods

    /**
     * Initializes missing values and rebuilds the field tree for changed definitions.
     *
     * @param changes - Angular input changes.
     * @public
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['definition']) {
            this._isInitialized.set(false);
            this._linkCopyStatuses.set({});
            this.ensureFormFields();
            this.rebuildForm();
            this._isInitialized.set(true);
        } else if (changes['value']) {
            this.ensureFormFields();
        }
    }

    /**
     * Returns the Signal Form field addressed by a definition key.
     *
     * @param key - Stable field key.
     * @returns Dynamic Signal Form field accessor.
     * @protected
     */
    protected field(key: string): () => FieldState<DynamicFormValue> {
        const field = this._form()[key];

        if (!field) {
            throw new Error(`Dynamic form field '${key}' is not initialized.`);
        }

        return field;
    }

    /**
     * Resolves a semantic field layout for the template.
     *
     * @param field - Dynamic field definition.
     * @returns Statically discoverable layout classes.
     * @protected
     */
    protected layoutClasses(field: IDynamicFormFieldDefinition): string {
        return resolveDynamicFormLayoutClasses(field.layout);
    }

    /**
     * Indicates whether the field is required by its definition or declarative rules.
     *
     * @param field - Dynamic field definition.
     * @returns Whether the field requires a non-empty value.
     * @protected
     */
    protected isRequired(field: IDynamicFormFieldDefinition): boolean {
        return field.required === true || this.findValidationRule(field, DynamicFormValidationRuleKey.Required) !== undefined;
    }

    /**
     * Indicates whether a field is immutable either by definition or host policy.
     *
     * @param field - Dynamic field definition.
     * @returns Whether the renderer must prevent edits.
     * @protected
     */
    protected isFieldReadonly(field: IDynamicFormFieldDefinition): boolean {
        return this.isReadonly() || field.isReadonly === true;
    }

    /**
     * Indicates whether an optional field may expose its clear action.
     *
     * @param field - Dynamic field definition.
     * @returns Whether the renderer may clear the field.
     * @protected
     */
    protected isFieldClearable(field: IDynamicFormFieldDefinition): boolean {
        return field.isClearable !== false && !this.isRequired(field) && !this.isFieldReadonly(field);
    }

    /** Clears the selected answer and updates the field's interaction state. */
    protected clearAnswer(field: IDynamicFormFieldDefinition): void {
        if (!this.isFieldClearable(field)) {
            return;
        }

        const state = this.field(field.key)();

        if (state.value() !== null) {
            state.value.set(null);
            state.markAsDirty();
            state.markAsTouched();
        }
    }

    /**
     * Resolves the maximum text length declared for a field.
     *
     * @param field - Dynamic field definition.
     * @returns Maximum length or `null` when unrestricted.
     * @protected
     */
    protected maximumLength(field: IDynamicFormFieldDefinition): number | null {
        return this.findValidationRule(field, DynamicFormValidationRuleKey.MaxLength)?.value ?? null;
    }

    /**
     * Resolves an optional minimum date into the value expected by Mosaik.
     *
     * @param field - Dynamic field definition.
     * @returns Earliest accepted date or `null`.
     * @protected
     */
    protected minimumDate(field: IDynamicFormFieldDefinition): Date | null {
        return this.parseDateBoundary(field, field.minimumDate, 'minimum');
    }

    /**
     * Resolves an optional maximum date into the value expected by Mosaik.
     *
     * @param field - Dynamic field definition.
     * @returns Latest accepted date or `null`.
     * @protected
     */
    protected maximumDate(field: IDynamicFormFieldDefinition): Date | null {
        return this.parseDateBoundary(field, field.maximumDate, 'maximum');
    }

    /**
     * Resolves a readonly value to its human-readable representation.
     *
     * @param field - Dynamic field definition.
     * @returns Human-readable value.
     * @protected
     */
    protected readonlyValue(field: IDynamicFormFieldDefinition): string {
        const value = this.field(field.key)().value();

        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
            return field.emptyValueLabel ?? '—';
        }

        if (Array.isArray(value)) {
            return value.map((selected) => field.options?.find((candidate) => candidate.value === selected)?.label ?? selected).join(', ');
        }

        const option = field.options?.find((candidate) => candidate.value === value);

        if (option) {
            return option.label;
        }

        if (value instanceof Date) {
            return toCalendarDate(value) ?? String(value);
        }

        return String(value);
    }

    /**
     * Resolves a dynamic link value after applying the UI security policy.
     *
     * @param field - Dynamic link field definition.
     * @returns A safe link or `null` for missing and unsafe values.
     * @protected
     */
    protected linkUrl(field: IDynamicFormFieldDefinition): string | null {
        const value = this.field(field.key)().value();

        if (typeof value !== 'string') {
            return null;
        }

        const candidate = value.trim();
        const hasControlCharacter = [...candidate].some((character) => {
            const code = character.charCodeAt(0);

            return code <= 31 || code === 127;
        });

        if (candidate.length === 0 || candidate.includes('\\') || hasControlCharacter) {
            return null;
        }

        if (candidate.startsWith('/')) {
            return candidate.startsWith('//') ? null : candidate;
        }

        try {
            const url = new URL(candidate);

            if (url.username.length > 0 || url.password.length > 0) {
                return null;
            }

            if (url.protocol === 'https:') {
                return url.href;
            }

            if (url.protocol === 'http:' && isDevMode() && (LOCAL_HTTP_HOSTS.has(url.hostname) || url.hostname.endsWith('.localhost'))) {
                return url.href;
            }
        } catch {
            return null;
        }

        return null;
    }

    /**
     * Resolves the accessible label used for opening a link.
     *
     * @param field - Dynamic link field definition.
     * @returns Configured or safe default label.
     * @protected
     */
    protected linkOpenLabel(field: IDynamicFormFieldDefinition): string {
        const fieldLabel = field.label.trim();

        return this.readLinkLabel(field.link?.openLabel, fieldLabel ? `${this._intl.openLinkLabel} ${fieldLabel}` : this._intl.openLinkLabel);
    }

    /**
     * Resolves the accessible label used for copying a link.
     *
     * @param field - Dynamic link field definition.
     * @returns Configured or safe default label.
     * @protected
     */
    protected linkCopyLabel(field: IDynamicFormFieldDefinition): string {
        return this.readLinkLabel(field.link?.copyLabel, this._intl.copyLinkLabel);
    }

    /**
     * Resolves the text shown for an unsafe or missing link.
     *
     * @param field - Dynamic link field definition.
     * @returns Configured or safe default text.
     * @protected
     */
    protected linkInvalidLabel(field: IDynamicFormFieldDefinition): string {
        return this.readLinkLabel(field.link?.invalidUrlLabel, this._intl.linkUnavailableLabel);
    }

    /**
     * Resolves the status text announced after a copy attempt.
     *
     * @param field - Dynamic link field definition.
     * @returns Copy result text or `null` before copying.
     * @protected
     */
    protected linkCopyStatus(field: IDynamicFormFieldDefinition): string | null {
        const status = this._linkCopyStatuses()[field.key];

        if (status === 'copied') {
            return this.readLinkLabel(field.link?.copiedLabel, this._intl.linkCopiedLabel);
        }

        if (status === 'error') {
            return this.readLinkLabel(field.link?.copyErrorLabel, this._intl.linkCopyErrorLabel);
        }

        return null;
    }

    /**
     * Copies a safe link without surfacing Clipboard API failures as unhandled errors.
     *
     * @param field - Dynamic link field definition.
     * @returns A promise resolved after the copy attempt.
     * @protected
     */
    protected async copyLink(field: IDynamicFormFieldDefinition): Promise<void> {
        const url = this.linkUrl(field);

        if (!url) {
            this.setLinkCopyStatus(field.key, 'error');
            return;
        }

        try {
            if (!globalThis.navigator?.clipboard?.writeText) {
                this.setLinkCopyStatus(field.key, 'error');
                return;
            }

            await globalThis.navigator.clipboard.writeText(url);
            this.setLinkCopyStatus(field.key, 'copied');
        } catch {
            this.setLinkCopyStatus(field.key, 'error');
        }
    }

    private markEditableFieldsAsTouched(): void {
        for (const section of this.definition().sections) {
            for (const field of section.fields) {
                if (this.isFieldReadonly(field) || field.controlType === DynamicFormControlType.Link || field.controlType === DynamicFormControlType.Readonly) {
                    continue;
                }

                this.field(field.key)().markAsTouched();
            }
        }
    }

    private ensureFormFields(): void {
        const existingValues = this.value();
        const nextValues: DynamicFormValues = { ...existingValues };
        const fieldKeys = new Set<string>();
        let hasChanges = false;

        for (const section of this.definition().sections) {
            for (const field of section.fields) {
                this.assertValidField(field, fieldKeys);
                fieldKeys.add(field.key);

                if (!Object.hasOwn(nextValues, field.key)) {
                    nextValues[field.key] = field.initialValue ?? null;
                    hasChanges = true;
                }
            }
        }

        if (hasChanges) {
            this.value.set(nextValues);
        }
    }

    private rebuildForm(): void {
        const fields = this.definition().sections.flatMap((section) => section.fields);
        this._form.set(
            runInInjectionContext(this._injector, () =>
                form(this.value, (schema) => {
                    for (const field of fields) {
                        const requiredRule = this.findValidationRule(field, DynamicFormValidationRuleKey.Required);
                        const emailRule = this.findValidationRule(field, DynamicFormValidationRuleKey.Email);
                        const maxLengthRule = this.findValidationRule(field, DynamicFormValidationRuleKey.MaxLength);

                        if (field.required === true || requiredRule) {
                            const path = schemaPathOf(schema, field.key);
                            const options = requiredRule?.message ? { message: requiredRule.message } : undefined;

                            if (
                                field.controlType === DynamicFormControlType.Radio ||
                                field.controlType === DynamicFormControlType.Select ||
                                field.controlType === DynamicFormControlType.MultipleChoice
                            ) {
                                validate(path, ({ value }) => {
                                    const choice = value();

                                    return choice === null || choice === undefined || choice === '' || (Array.isArray(choice) && choice.length === 0)
                                        ? requiredError(options)
                                        : null;
                                });
                            } else {
                                required(path, options);
                            }
                        }

                        if (field.controlType === DynamicFormControlType.Email || emailRule) {
                            validate(schemaPathOf(schema, field.key), (context) => {
                                const value = context.value();

                                if (value === null || value === '') {
                                    return null;
                                }

                                return typeof value === 'string' && isEmailAddress(value)
                                    ? null
                                    : emailError(emailRule?.message ? { message: emailRule.message } : undefined);
                            });
                        }

                        if (field.controlType === DynamicFormControlType.Number && field.integer) {
                            validate(schemaPathOf(schema, field.key), ({ value }) => {
                                const number = value();

                                if (number === null || number === '') {
                                    return null;
                                }

                                if (typeof number !== 'number' || !Number.isInteger(number)) {
                                    return { kind: 'integer', message: this._intl.integerErrorLabel };
                                }

                                return (field.minimum !== undefined && number < field.minimum) || (field.maximum !== undefined && number > field.maximum)
                                    ? { kind: 'integerRange', message: this._intl.integerRangeErrorLabel }
                                    : null;
                            });
                        }

                        if (!maxLengthRule) {
                            continue;
                        }

                        const maximumLength = maxLengthRule.value;

                        if (maximumLength === undefined) {
                            continue;
                        }

                        validate(schemaPathOf(schema, field.key), (context) => {
                            const value = context.value();

                            if (value === null || value === '') {
                                return null;
                            }

                            if (typeof value === 'string' && [...value].length <= maximumLength) {
                                return null;
                            }

                            return maxLengthError(maximumLength, maxLengthRule.message ? { message: maxLengthRule.message } : undefined);
                        });
                    }
                }),
            ),
        );
    }

    private setLinkCopyStatus(fieldKey: string, status: DynamicFormLinkCopyStatus): void {
        this._linkCopyStatuses.update((statuses) => ({
            ...statuses,
            [fieldKey]: status,
        }));
    }

    private readLinkLabel(value: string | undefined, fallback: string): string {
        const label = value?.trim();

        return label ? label : fallback;
    }

    private assertValidField(field: IDynamicFormFieldDefinition, fieldKeys: ReadonlySet<string>): void {
        if (field.key.trim().length === 0) {
            throw new Error('Dynamic form field keys must not be empty.');
        }

        if (FORBIDDEN_FIELD_KEYS.has(field.key)) {
            throw new Error(`Dynamic form field key '${field.key}' is not allowed.`);
        }

        if (fieldKeys.has(field.key)) {
            throw new Error(`Dynamic form field key '${field.key}' is duplicated.`);
        }

        if (field.multilineRows !== undefined && (!Number.isInteger(field.multilineRows) || field.multilineRows < 1)) {
            throw new RangeError(`Dynamic form field '${field.key}' must use at least one multiline row.`);
        }

        if (field.minimum !== undefined && field.maximum !== undefined && field.minimum > field.maximum) {
            throw new RangeError(`Dynamic form field '${field.key}' has an invalid numeric range.`);
        }

        if (field.controlType === DynamicFormControlType.MultipleChoice && field.options?.some((option) => typeof option.value !== 'string')) {
            throw new Error(`Dynamic form field '${field.key}' requires string values for its multiple-choice options.`);
        }

        this.assertValidDateRange(field);
        this.assertValidValidationRules(field);
    }

    private assertValidDateRange(field: IDynamicFormFieldDefinition): void {
        const minimum = this.minimumDate(field);
        const maximum = this.maximumDate(field);

        if (minimum && maximum && minimum.getTime() > maximum.getTime()) {
            throw new RangeError(`Dynamic form field '${field.key}' has an invalid date range.`);
        }
    }

    private assertValidValidationRules(field: IDynamicFormFieldDefinition): void {
        const ruleKeys = new Set<string>();

        for (const rule of field.validationRules ?? []) {
            if (rule === null || typeof rule !== 'object' || typeof rule.key !== 'string' || !SUPPORTED_VALIDATION_RULE_KEYS.has(rule.key)) {
                throw new Error(`Dynamic form field '${field.key}' has an unsupported validation rule.`);
            }

            if (ruleKeys.has(rule.key)) {
                throw new Error(`Dynamic form field '${field.key}' duplicates validation rule '${rule.key}'.`);
            }
            ruleKeys.add(rule.key);

            if (rule.key === DynamicFormValidationRuleKey.MaxLength && (typeof rule.value !== 'number' || !Number.isInteger(rule.value) || rule.value < 0)) {
                throw new RangeError(`Dynamic form field '${field.key}' has an invalid maxLength rule.`);
            }
        }
    }

    private findValidationRule(field: IDynamicFormFieldDefinition, key: DynamicFormValidationRuleKeyValue): IDynamicFormValidationRule | undefined {
        return field.validationRules?.find((rule) => rule.key === key);
    }

    private parseDateBoundary(field: IDynamicFormFieldDefinition, value: Date | string | undefined, boundary: 'maximum' | 'minimum'): Date | null {
        if (value === undefined) {
            return null;
        }

        if (value instanceof Date) {
            if (Number.isNaN(value.getTime())) {
                throw new RangeError(`Dynamic form field '${field.key}' has an invalid ${boundary} date.`);
            }

            return new Date(value.getTime());
        }

        const calendarDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

        if (calendarDateMatch) {
            const year = Number(calendarDateMatch[1]);
            const month = Number(calendarDateMatch[2]);
            const day = Number(calendarDateMatch[3]);
            const date = new Date(year, month - 1, day);

            if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                return date;
            }
        } else {
            const date = new Date(value);

            if (!Number.isNaN(date.getTime())) {
                return date;
            }
        }

        throw new RangeError(`Dynamic form field '${field.key}' has an invalid ${boundary} date.`);
    }

    // #endregion
}
