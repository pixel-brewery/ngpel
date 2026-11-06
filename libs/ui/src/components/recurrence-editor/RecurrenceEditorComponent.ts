// #region Imports

import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, signal, viewChild } from '@angular/core';
import type { FieldState } from '@angular/forms/signals';
import {
    ChipComponent,
    ChipGroupComponent,
    createTourAccessorTarget,
    DateTimeBoxComponent,
    LocaleDirective,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    NumberBoxComponent,
    SelectComponent,
    SelectItemComponent,
    TextBoxComponent,
    type ITourAccessor,
    TOUR_ACCESSOR,
} from '@pixel-brewery/mosaik-elements-angular';
import {
    normalizeRecurrenceByDays,
    RECURRENCE_END_MODE_OPTIONS,
    RECURRENCE_INTERVAL_OPTIONS,
    RECURRENCE_MONTHLY_MODE_OPTIONS,
    RECURRENCE_WEEKDAY_OPTIONS,
    RECURRENCE_WEEKDAY_ORDINAL_OPTIONS,
    toPositiveInteger,
    type RecurrenceEndMode,
    type RecurrenceFrequency,
    type RecurrenceMonthlyMode,
    type RecurrenceWeekday,
} from './RecurrenceRule';

// #endregion

export interface IRecurrenceEditorLabels {
    readonly count: string;
    readonly endCount: string;
    readonly endModes: string;
    readonly endNever: string;
    readonly endUntil: string;
    readonly frequencyDaily: string;
    readonly frequencyMonthly: string;
    readonly frequencyNone: string;
    readonly frequencyWeekly: string;
    readonly frequencyYearly: string;
    readonly interval: string;
    readonly monthDay: string;
    readonly monthlyModeDayOfMonth: string;
    readonly monthlyModeWeekdayOfMonth: string;
    readonly monthlyModes: string;
    readonly ordinal: string;
    readonly ordinalFirst: string;
    readonly ordinalFourth: string;
    readonly ordinalLast: string;
    readonly ordinalSecond: string;
    readonly ordinalThird: string;
    readonly recurrenceEndAt: string;
    readonly recurrenceRule: string;
    readonly summary: string;
    readonly summaryNone: string;
    readonly summaryPrefix: string;
    readonly unitDayOne: string;
    readonly unitDayOther: string;
    readonly unitMonthOne: string;
    readonly unitMonthOther: string;
    readonly unitWeekOne: string;
    readonly unitWeekOther: string;
    readonly unitYearOne: string;
    readonly unitYearOther: string;
    readonly weekday: string;
    readonly weekdays: string;
    readonly weekdayFriday: string;
    readonly weekdayMonday: string;
    readonly weekdaySaturday: string;
    readonly weekdaySunday: string;
    readonly weekdayThursday: string;
    readonly weekdayTuesday: string;
    readonly weekdayWednesday: string;
}

/** Stable signal-accessor targets exposed by every recurrence editor. */
export const RECURRENCE_EDITOR_TOUR_TARGETS = {
    count: 'count',
    endAt: 'endAt',
    endMode: 'endMode',
    frequency: 'frequency',
    interval: 'interval',
    monthDay: 'monthDay',
    monthlyMode: 'monthlyMode',
    monthlyWeekday: 'monthlyWeekday',
    ordinal: 'ordinal',
    summary: 'summary',
    weekdays: 'weekdays',
} as const;

const DEFAULT_RECURRENCE_EDITOR_LABELS: IRecurrenceEditorLabels = {
    count: 'Number of recurrences',
    endCount: 'After count',
    endModes: 'End',
    endNever: 'Never',
    endUntil: 'Until date',
    frequencyDaily: 'Daily',
    frequencyMonthly: 'Monthly',
    frequencyNone: 'No recurrence',
    frequencyWeekly: 'Weekly',
    frequencyYearly: 'Yearly',
    interval: 'Repeat',
    monthDay: 'Day of month',
    monthlyModeDayOfMonth: 'Day of month',
    monthlyModeWeekdayOfMonth: 'Weekday of month',
    monthlyModes: 'Monthly rule',
    ordinal: 'Position',
    ordinalFirst: 'First',
    ordinalFourth: 'Fourth',
    ordinalLast: 'Last',
    ordinalSecond: 'Second',
    ordinalThird: 'Third',
    recurrenceEndAt: 'Recurs until',
    recurrenceRule: 'Rhythm',
    summary: 'Summary',
    summaryNone: 'No recurrence',
    summaryPrefix: 'Repeats every',
    unitDayOne: 'day',
    unitDayOther: 'days',
    unitMonthOne: 'month',
    unitMonthOther: 'months',
    unitWeekOne: 'week',
    unitWeekOther: 'weeks',
    unitYearOne: 'year',
    unitYearOther: 'years',
    weekday: 'Weekday',
    weekdays: 'On these days',
    weekdayFriday: 'Fri',
    weekdayMonday: 'Mon',
    weekdaySaturday: 'Sat',
    weekdaySunday: 'Sun',
    weekdayThursday: 'Thu',
    weekdayTuesday: 'Tue',
    weekdayWednesday: 'Wed',
};

/**
 * Reusable RFC 5545 recurrence editor for Signal Forms.
 *
 * @public
 */
@Component({
    selector: 'ngp-recurrence-editor',
    template: `
        <div class="grid gap-4 md:grid-cols-2">
            <mosaik-form-field [fieldState]="frequencyField()()">
                <mosaik-select #frequencyTarget [formField]="frequencyField()" [variant]="'primary'" [label]="resolvedLabels().recurrenceRule">
                    @for (option of frequencyOptions; track option) {
                        <mosaik-select-item [value]="option" [label]="frequencyLabel(option)" />
                    }
                </mosaik-select>
            </mosaik-form-field>
            <mosaik-textbox #summaryTarget [value]="recurrenceSummary()" [variant]="'primary'" [label]="resolvedLabels().summary" [readonly]="true" />
            @if (isRecurrenceEnabled()) {
                <div #intervalTarget class="flex flex-col gap-2 md:col-span-2 surface-input">
                    <span class="surface-input-text"> {{ resolvedLabels().interval }} </span>
                    <mosaik-chip-group [selectionMode]="'single'" [wrap]="true" [value]="recurrenceIntervalValue()">
                        @for (option of intervalOptions; track option.value) {
                            <mosaik-chip
                                [label]="recurrenceIntervalLabel(option.value)"
                                [appearance]="'soft'"
                                [variant]="'primary'"
                                [isCheckable]="true"
                                [value]="option.value.toString()"
                                [isChecked]="isRecurrenceIntervalSelected(option.value)"
                                (click)="setRecurrenceInterval(option.value)"
                            />
                        }
                    </mosaik-chip-group>
                </div>
                @if (isWeeklyRecurrence()) {
                    <div #weekdaysTarget class="flex flex-col gap-2 md:col-span-2 surface-input">
                        <span class="surface-input-text"> {{ resolvedLabels().weekdays }} </span>
                        <mosaik-chip-group [selectionMode]="'multiple'" [wrap]="true">
                            @for (weekday of weekdayOptions; track weekday.value) {
                                <mosaik-chip
                                    [label]="weekdayLabel(weekday.value)"
                                    [appearance]="'soft'"
                                    [variant]="'primary'"
                                    [isCheckable]="true"
                                    [value]="weekday.value"
                                    [isChecked]="isRecurrenceWeekdaySelected(weekday.value)"
                                    (click)="toggleRecurrenceWeekday(weekday.value)"
                                />
                            }
                        </mosaik-chip-group>
                    </div>
                }
                @if (isMonthlyRecurrence()) {
                    <div #monthlyModeTarget class="flex flex-col gap-2 md:col-span-2 surface-input">
                        <span class="surface-input-text"> {{ resolvedLabels().monthlyModes }} </span>
                        <mosaik-chip-group [selectionMode]="'single'" [wrap]="true">
                            @for (mode of monthlyModeOptions; track mode.value) {
                                <mosaik-chip
                                    [label]="monthlyModeLabel(mode.value)"
                                    [appearance]="'soft'"
                                    [variant]="'primary'"
                                    [isCheckable]="true"
                                    [value]="mode.value"
                                    [isChecked]="isRecurrenceMonthlyModeSelected(mode.value)"
                                    (click)="setRecurrenceMonthlyMode(mode.value)"
                                />
                            }
                        </mosaik-chip-group>
                    </div>
                    @if (isMonthlyDayOfMonthMode()) {
                        <mosaik-form-field [fieldState]="monthDayField()()">
                            <mosaik-numberbox
                                #monthDayTarget
                                [formField]="monthDayField()"
                                [variant]="'primary'"
                                [min]="1"
                                [max]="31"
                                [step]="1"
                                [decimalPlaces]="0"
                                [label]="resolvedLabels().monthDay"
                            />
                        </mosaik-form-field>
                    } @else if (isMonthlyWeekdayOfMonthMode()) {
                        <div #ordinalTarget class="flex flex-col gap-2 surface-input">
                            <span class="surface-input-text"> {{ resolvedLabels().ordinal }} </span>
                            <mosaik-chip-group [selectionMode]="'single'" [wrap]="true">
                                @for (ordinal of weekdayOrdinalOptions; track ordinal.value) {
                                    <mosaik-chip
                                        [label]="ordinalLabel(ordinal.value)"
                                        [appearance]="'soft'"
                                        [variant]="'primary'"
                                        [isCheckable]="true"
                                        [value]="ordinal.value"
                                        [isChecked]="isRecurrenceWeekdayOrdinalSelected(ordinal.value)"
                                        (click)="setRecurrenceWeekdayOrdinal(ordinal.value)"
                                    />
                                }
                            </mosaik-chip-group>
                        </div>
                        <div #monthlyWeekdayTarget class="flex flex-col gap-2 surface-input">
                            <span class="surface-input-text"> {{ resolvedLabels().weekday }} </span>
                            <mosaik-chip-group [selectionMode]="'single'" [wrap]="true">
                                @for (weekday of weekdayOptions; track weekday.value) {
                                    <mosaik-chip
                                        [label]="weekdayLabel(weekday.value)"
                                        [appearance]="'soft'"
                                        [variant]="'primary'"
                                        [isCheckable]="true"
                                        [value]="weekday.value"
                                        [isChecked]="isRecurrenceSingleWeekdaySelected(weekday.value)"
                                        (click)="setRecurrenceSingleWeekday(weekday.value)"
                                    />
                                }
                            </mosaik-chip-group>
                        </div>
                    }
                }
                <div #endModeTarget class="flex flex-col gap-2 md:col-span-2 surface-input">
                    <span class="surface-input-text"> {{ resolvedLabels().endModes }} </span>
                    <mosaik-chip-group [selectionMode]="'single'" [wrap]="true">
                        @for (mode of endModeOptions; track mode.value) {
                            <mosaik-chip
                                [label]="endModeLabel(mode.value)"
                                [appearance]="'soft'"
                                [variant]="'primary'"
                                [isCheckable]="true"
                                [value]="mode.value"
                                [isChecked]="isRecurrenceEndModeSelected(mode.value)"
                                (click)="setRecurrenceEndMode(mode.value)"
                            />
                        }
                    </mosaik-chip-group>
                </div>
                @if (isRecurrenceEndUntil()) {
                    <mosaik-form-field [fieldState]="endAtField()()">
                        <mosaik-datetimebox
                            #endAtTarget
                            [formField]="endAtField()"
                            [variant]="'primary'"
                            [label]="resolvedLabels().recurrenceEndAt"
                            [dropDownPlacement]="'bottom-end'"
                        />
                    </mosaik-form-field>
                }
                @if (isRecurrenceEndCount()) {
                    <mosaik-form-field [fieldState]="countField()()">
                        <mosaik-numberbox
                            #countTarget
                            [formField]="countField()"
                            [variant]="'primary'"
                            [min]="1"
                            [step]="1"
                            [decimalPlaces]="0"
                            [label]="resolvedLabels().count"
                        />
                    </mosaik-form-field>
                }
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ChipComponent,
        ChipGroupComponent,
        DateTimeBoxComponent,
        LocaleDirective,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        NumberBoxComponent,
        SelectComponent,
        SelectItemComponent,
        TextBoxComponent,
    ],
    providers: [
        {
            provide: TOUR_ACCESSOR,
            useExisting: forwardRef(() => RecurrenceEditorComponent),
        },
    ],
})
export class RecurrenceEditorComponent implements ITourAccessor {
    // #region Fields

    private readonly _countTarget = viewChild<NumberBoxComponent>('countTarget');
    private readonly _endAtTarget = viewChild<DateTimeBoxComponent>('endAtTarget');
    private readonly _endModeTarget = viewChild<ElementRef<HTMLElement>>('endModeTarget');
    private readonly _frequencyTarget = viewChild<SelectComponent>('frequencyTarget');
    private readonly _intervalTarget = viewChild<ElementRef<HTMLElement>>('intervalTarget');
    private readonly _monthDayTarget = viewChild<NumberBoxComponent>('monthDayTarget');
    private readonly _monthlyModeTarget = viewChild<ElementRef<HTMLElement>>('monthlyModeTarget');
    private readonly _monthlyWeekdayTarget = viewChild<ElementRef<HTMLElement>>('monthlyWeekdayTarget');
    private readonly _ordinalTarget = viewChild<ElementRef<HTMLElement>>('ordinalTarget');
    private readonly _summaryTarget = viewChild<TextBoxComponent>('summaryTarget');
    private readonly _weekdaysTarget = viewChild<ElementRef<HTMLElement>>('weekdaysTarget');

    // #endregion

    // #region Properties

    public readonly frequencyField = input.required<() => FieldState<RecurrenceFrequency>>();

    public readonly intervalField = input.required<() => FieldState<string>>();

    public readonly byDaysField = input.required<() => FieldState<string>>();

    public readonly endModeField = input.required<() => FieldState<RecurrenceEndMode>>();

    public readonly countField = input.required<() => FieldState<string>>();

    public readonly endAtField = input.required<() => FieldState<string>>();

    public readonly monthlyModeField = input.required<() => FieldState<RecurrenceMonthlyMode>>();

    public readonly monthDayField = input.required<() => FieldState<string>>();

    public readonly weekdayOrdinalField = input.required<() => FieldState<string>>();

    public readonly weekdayField = input.required<() => FieldState<RecurrenceWeekday>>();

    public readonly labels = input<Partial<IRecurrenceEditorLabels>>({});

    /** Reactive component capabilities available to an external tour mapping. */
    public readonly targets = signal(
        new Map([
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.count,
                createTourAccessorTarget(
                    computed(() => this._countTarget()?.elementRef.nativeElement ?? null),
                    computed(() => this.countField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.endAt,
                createTourAccessorTarget(
                    computed(() => this._endAtTarget()?.elementRef.nativeElement ?? null),
                    computed(() => this.endAtField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.endMode,
                createTourAccessorTarget(
                    computed(() => this._endModeTarget()?.nativeElement ?? null),
                    computed(() => this.endModeField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.frequency,
                createTourAccessorTarget(
                    computed(() => this._frequencyTarget()?.elementRef.nativeElement ?? null),
                    computed(() => this.frequencyField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.interval,
                createTourAccessorTarget(
                    computed(() => this._intervalTarget()?.nativeElement ?? null),
                    computed(() => this.intervalField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.monthDay,
                createTourAccessorTarget(
                    computed(() => this._monthDayTarget()?.elementRef.nativeElement ?? null),
                    computed(() => this.monthDayField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.monthlyMode,
                createTourAccessorTarget(
                    computed(() => this._monthlyModeTarget()?.nativeElement ?? null),
                    computed(() => this.monthlyModeField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.monthlyWeekday,
                createTourAccessorTarget(
                    computed(() => this._monthlyWeekdayTarget()?.nativeElement ?? null),
                    computed(() => this.weekdayField()().value),
                ),
            ],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.ordinal,
                createTourAccessorTarget(
                    computed(() => this._ordinalTarget()?.nativeElement ?? null),
                    computed(() => this.weekdayOrdinalField()().value),
                ),
            ],
            [RECURRENCE_EDITOR_TOUR_TARGETS.summary, createTourAccessorTarget(computed(() => this._summaryTarget()?.elementRef.nativeElement ?? null))],
            [
                RECURRENCE_EDITOR_TOUR_TARGETS.weekdays,
                createTourAccessorTarget(
                    computed(() => this._weekdaysTarget()?.nativeElement ?? null),
                    computed(() => this.byDaysField()().value),
                ),
            ],
        ]),
    );

    protected readonly resolvedLabels = computed<IRecurrenceEditorLabels>(() => ({
        ...DEFAULT_RECURRENCE_EDITOR_LABELS,
        ...this.labels(),
    }));

    protected readonly frequencyOptions: ReadonlyArray<RecurrenceFrequency> = ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

    protected readonly intervalOptions = RECURRENCE_INTERVAL_OPTIONS;

    protected readonly weekdayOptions = RECURRENCE_WEEKDAY_OPTIONS;

    protected readonly monthlyModeOptions = RECURRENCE_MONTHLY_MODE_OPTIONS;

    protected readonly weekdayOrdinalOptions = RECURRENCE_WEEKDAY_ORDINAL_OPTIONS;

    protected readonly endModeOptions = RECURRENCE_END_MODE_OPTIONS;

    // #endregion

    // #region Methods

    protected frequencyLabel(value: RecurrenceFrequency): string {
        switch (value) {
            case 'DAILY':
                return this.resolvedLabels().frequencyDaily;
            case 'WEEKLY':
                return this.resolvedLabels().frequencyWeekly;
            case 'MONTHLY':
                return this.resolvedLabels().frequencyMonthly;
            case 'YEARLY':
                return this.resolvedLabels().frequencyYearly;
            case 'NONE':
            default:
                return this.resolvedLabels().frequencyNone;
        }
    }

    protected recurrenceSummary(): string {
        if (!this.isRecurrenceEnabled()) {
            return this.resolvedLabels().summaryNone;
        }

        return `${this.resolvedLabels().summaryPrefix} ${this.recurrenceIntervalLabel(toPositiveInteger(this.intervalField()().value()))}`;
    }

    protected recurrenceIntervalLabel(value: number): string {
        if (!this.isRecurrenceEnabled()) {
            return this.resolvedLabels().summaryNone;
        }

        const unit = this.recurrenceUnit(value);

        return `${value} ${unit}`;
    }

    protected recurrenceIntervalValue(): string {
        return String(toPositiveInteger(this.intervalField()().value()));
    }

    protected isRecurrenceIntervalSelected(value: number): boolean {
        return toPositiveInteger(this.intervalField()().value()) === value;
    }

    protected setRecurrenceInterval(value: number): void {
        this.intervalField()().value.set(String(value));
    }

    protected isRecurrenceEnabled(): boolean {
        return this.frequencyField()().value() !== 'NONE';
    }

    protected isWeeklyRecurrence(): boolean {
        return this.frequencyField()().value() === 'WEEKLY';
    }

    protected isMonthlyRecurrence(): boolean {
        return this.frequencyField()().value() === 'MONTHLY';
    }

    protected isRecurrenceWeekdaySelected(value: RecurrenceWeekday): boolean {
        return normalizeRecurrenceByDays(this.byDaysField()().value()).includes(value);
    }

    protected toggleRecurrenceWeekday(value: RecurrenceWeekday): void {
        const selectedValues = normalizeRecurrenceByDays(this.byDaysField()().value());

        if (selectedValues.includes(value)) {
            const remainingValues = selectedValues.filter((selectedValue) => selectedValue !== value);
            this.byDaysField()().value.set((remainingValues.length > 0 ? remainingValues : [value]).join(','));

            return;
        }

        this.byDaysField()().value.set([...selectedValues, value].join(','));
    }

    protected isRecurrenceMonthlyModeSelected(value: RecurrenceMonthlyMode): boolean {
        return this.monthlyModeField()().value() === value;
    }

    protected setRecurrenceMonthlyMode(value: RecurrenceMonthlyMode): void {
        this.monthlyModeField()().value.set(value);
    }

    protected isMonthlyDayOfMonthMode(): boolean {
        return this.monthlyModeField()().value() === 'DAY_OF_MONTH';
    }

    protected isMonthlyWeekdayOfMonthMode(): boolean {
        return this.monthlyModeField()().value() === 'WEEKDAY_OF_MONTH';
    }

    protected monthlyModeLabel(value: RecurrenceMonthlyMode): string {
        return value === 'DAY_OF_MONTH' ? this.resolvedLabels().monthlyModeDayOfMonth : this.resolvedLabels().monthlyModeWeekdayOfMonth;
    }

    protected isRecurrenceWeekdayOrdinalSelected(value: string): boolean {
        return this.weekdayOrdinalField()().value() === value;
    }

    protected setRecurrenceWeekdayOrdinal(value: string): void {
        this.weekdayOrdinalField()().value.set(value);
    }

    protected ordinalLabel(value: string): string {
        switch (value) {
            case '2':
                return this.resolvedLabels().ordinalSecond;
            case '3':
                return this.resolvedLabels().ordinalThird;
            case '4':
                return this.resolvedLabels().ordinalFourth;
            case '-1':
                return this.resolvedLabels().ordinalLast;
            case '1':
            default:
                return this.resolvedLabels().ordinalFirst;
        }
    }

    protected isRecurrenceSingleWeekdaySelected(value: RecurrenceWeekday): boolean {
        return this.weekdayField()().value() === value;
    }

    protected setRecurrenceSingleWeekday(value: RecurrenceWeekday): void {
        this.weekdayField()().value.set(value);
    }

    protected weekdayLabel(value: RecurrenceWeekday): string {
        switch (value) {
            case 'TU':
                return this.resolvedLabels().weekdayTuesday;
            case 'WE':
                return this.resolvedLabels().weekdayWednesday;
            case 'TH':
                return this.resolvedLabels().weekdayThursday;
            case 'FR':
                return this.resolvedLabels().weekdayFriday;
            case 'SA':
                return this.resolvedLabels().weekdaySaturday;
            case 'SU':
                return this.resolvedLabels().weekdaySunday;
            case 'MO':
            default:
                return this.resolvedLabels().weekdayMonday;
        }
    }

    protected isRecurrenceEndModeSelected(value: RecurrenceEndMode): boolean {
        return this.endModeField()().value() === value;
    }

    protected setRecurrenceEndMode(value: RecurrenceEndMode): void {
        this.endModeField()().value.set(value);
    }

    protected isRecurrenceEndUntil(): boolean {
        return this.endModeField()().value() === 'UNTIL';
    }

    protected isRecurrenceEndCount(): boolean {
        return this.endModeField()().value() === 'COUNT';
    }

    protected endModeLabel(value: RecurrenceEndMode): string {
        switch (value) {
            case 'UNTIL':
                return this.resolvedLabels().endUntil;
            case 'COUNT':
                return this.resolvedLabels().endCount;
            case 'NEVER':
            default:
                return this.resolvedLabels().endNever;
        }
    }

    private recurrenceUnit(value: number): string {
        const isOne = value === 1;

        switch (this.frequencyField()().value()) {
            case 'DAILY':
                return isOne ? this.resolvedLabels().unitDayOne : this.resolvedLabels().unitDayOther;
            case 'WEEKLY':
                return isOne ? this.resolvedLabels().unitWeekOne : this.resolvedLabels().unitWeekOther;
            case 'MONTHLY':
                return isOne ? this.resolvedLabels().unitMonthOne : this.resolvedLabels().unitMonthOther;
            case 'YEARLY':
                return isOne ? this.resolvedLabels().unitYearOne : this.resolvedLabels().unitYearOther;
            case 'NONE':
            default:
                return '';
        }
    }

    // #endregion
}
