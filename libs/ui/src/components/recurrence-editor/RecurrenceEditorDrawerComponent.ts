import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { form, validate } from '@angular/forms/signals';
import {
    ButtonComponent,
    Cancel,
    ChoiceComponent,
    createTourAccessorTarget,
    DRAWER_REF,
    DRAWER_REF_DATA,
    DrawerContentDirective,
    DrawerFooterDirective,
    DrawerHeaderComponent,
    DrawerHeaderDirective,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    type IDrawerRef,
    TimeBoxComponent,
    ToggleSwitchComponent,
    TourAccessorDirective,
    TourAnchorDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import { ITimeSpan } from '@pixel-brewery/mosaik-elements-foundation';
import { fromCalendarDate } from '@pixel-brewery/ngpel-core';
import { describeRecurrence } from './describeRecurrence';
import type { IRecurrenceEditorOptions } from './IRecurrenceEditorOptions';
import { RecurrenceEditorComponent } from './RecurrenceEditorComponent';
import { RecurrenceEditorDrawerTourDirective } from './RecurrenceEditorDrawerTourDirective';
import { type IRecurrenceValue, RECURRENCE_DEFAULT_VALUE } from './RecurrenceRule';
import { recurrenceTime } from './recurrenceTime';
import { toCalendarDayEnd } from './toCalendarDayEnd';

interface IRecurrenceDraft extends Omit<IRecurrenceValue, 'recurrenceCount' | 'recurrenceEndAt' | 'recurrenceMonthDay' | 'recurrenceTime'> {
    recurrenceCount: number | null;
    recurrenceEndAt: Date | null;
    recurrenceMonthDay: number | null;
    scheduleTime: boolean;
    time: ITimeSpan | null;
}

/** Internal drawer that adapts Mosaik control values to the public recurrence model. @internal */
@Component({
    selector: 'ngp-recurrence-editor-drawer',
    imports: [
        ButtonComponent,
        ChoiceComponent,
        DrawerContentDirective,
        DrawerFooterDirective,
        DrawerHeaderComponent,
        DrawerHeaderDirective,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        RecurrenceEditorComponent,
        RecurrenceEditorDrawerTourDirective,
        TimeBoxComponent,
        ToggleSwitchComponent,
        TourAccessorDirective,
        TourAnchorDirective,
    ],
    template: `
        <ng-template mosaikDrawerHeader>
            <mosaik-drawer-header [text]="options.title ?? 'Recurrence'" />
        </ng-template>
        <ng-template mosaikDrawerContent>
            <div
                part="editor"
                [ngpRecurrenceEditorDrawerTour]="tourTargets"
                [mosaikTourAccessor]="options.tour?.anchors ?? {}"
                [mosaikTourId]="options.tour?.tourId"
            >
                @if (options.description) {
                    <p>{{ options.description }}</p>
                }
                <ngp-recurrence-editor
                    [mosaikTourAccessor]="options.tour?.anchors ?? {}"
                    [mosaikTourId]="options.tour?.tourId"
                    [allowNone]="options.allowNone ?? true"
                    [allowEnd]="options.allowEnd ?? true"
                    [endDateMode]="options.endDateMode ?? 'instant'"
                    [previewFrom]="previewFrom"
                    [labels]="options.labels ?? {}"
                    [summary]="summary()"
                    [frequencyField]="fields.recurrenceFrequency"
                    [intervalField]="fields.recurrenceInterval"
                    [byDaysField]="fields.recurrenceByDays"
                    [endModeField]="fields.recurrenceEndMode"
                    [countField]="fields.recurrenceCount"
                    [endAtField]="fields.recurrenceEndAt"
                    [monthlyModeField]="fields.recurrenceMonthlyMode"
                    [monthDayField]="fields.recurrenceMonthDay"
                    [weekdayOrdinalField]="fields.recurrenceWeekdayOrdinal"
                    [weekdayField]="fields.recurrenceWeekday"
                />
                @if (fields.recurrenceFrequency().value() !== 'NONE') {
                    @if (options.timeMode === undefined) {
                        @if (options.timeModeChoices) {
                            <mosaik-form-field [fieldState]="fields.scheduleTime()">
                                <div #timeModeTarget part="time-mode-choices">
                                    @for (choice of timeModeChoices(); track choice.mode) {
                                        <mosaik-choice
                                            [name]="'recurrence-time-mode'"
                                            [value]="choice.mode"
                                            [label]="choice.label"
                                            [additional]="choice.hint"
                                            [isChecked]="fields.scheduleTime().value() === (choice.mode === 'DATETIME')"
                                            [appearance]="'outline'"
                                            [variant]="'primary'"
                                            (click)="fields.scheduleTime().value.set(choice.mode === 'DATETIME')"
                                        />
                                    }
                                </div>
                            </mosaik-form-field>
                        } @else {
                            <mosaik-toggle-switch #timeModeTarget [formField]="fields.scheduleTime" [label]="options.scheduleTimeLabel ?? 'Set a time'" />
                        }
                    }
                    @if (fields.scheduleTime().value()) {
                        <mosaik-form-field [fieldState]="fields.time()">
                            <mosaik-timebox #timeTarget [formField]="fields.time" [label]="options.timeLabel ?? 'Time'" />
                        </mosaik-form-field>
                    }
                }
                @if (submitted() && fields().invalid()) {
                    <p role="alert">{{ options.invalidLabel ?? 'Check the recurrence details.' }}</p>
                }
            </div>
        </ng-template>
        <ng-template mosaikDrawerFooter>
            <div part="actions">
                <mosaik-button
                    [mosaikTourAnchor]="options.tour?.anchors.cancel"
                    [mosaikTourId]="options.tour?.tourId"
                    [appearance]="'plain'"
                    [label]="options.cancelLabel ?? 'Cancel'"
                    (click)="cancel()"
                />
                <mosaik-button
                    [mosaikTourAnchor]="options.tour?.anchors.save"
                    [mosaikTourId]="options.tour?.tourId"
                    [variant]="'primary'"
                    [label]="options.applyLabel ?? 'Apply'"
                    (click)="apply()"
                />
            </div>
        </ng-template>
    `,
    styles: `
        [part='editor'],
        [part='actions'] {
            display: flex;
            gap: var(--mosaik-layout-space);
            padding: var(--mosaik-layout-space);
        }
        [part='editor'] {
            flex-direction: column;
        }
        [part='actions'] {
            justify-content: flex-end;
        }
        [part='time-mode-choices'] {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--mosaik-layout-space);
        }
        p {
            margin: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurrenceEditorDrawerComponent {
    // #region Fields

    private readonly _ref = inject(DRAWER_REF) as IDrawerRef<IRecurrenceEditorOptions, IRecurrenceValue>;
    private readonly _timeModeTarget = viewChild<unknown, ElementRef<HTMLElement>>('timeModeTarget', { read: ElementRef });
    private readonly _timeTarget = viewChild<TimeBoxComponent>('timeTarget');
    protected readonly options = inject<IRecurrenceEditorOptions>(DRAWER_REF_DATA);
    protected readonly previewFrom = this.options.previewFrom === undefined ? new Date() : this.options.previewFrom;
    private readonly _draft = signal<IRecurrenceDraft>(createDraft(this.options));
    protected readonly submitted = signal(false);
    protected readonly fields = form(this._draft, (schema) => {
        validate(schema.recurrenceInterval, ({ value, valueOf }) =>
            valueOf(schema.recurrenceFrequency) !== 'NONE' && !positiveInteger(Number(value())) ? { kind: 'interval' } : null,
        );
        validate(schema.recurrenceCount, ({ value, valueOf }) =>
            valueOf(schema.recurrenceFrequency) !== 'NONE' && valueOf(schema.recurrenceEndMode) === 'COUNT' && !positiveInteger(value())
                ? { kind: 'count' }
                : null,
        );
        validate(schema.recurrenceEndAt, ({ value, valueOf }) =>
            valueOf(schema.recurrenceFrequency) !== 'NONE' && valueOf(schema.recurrenceEndMode) === 'UNTIL' && !validDate(value()) ? { kind: 'endDate' } : null,
        );
        validate(schema.recurrenceMonthDay, ({ value, valueOf }) => {
            const day = value();
            return valueOf(schema.recurrenceFrequency) === 'MONTHLY' &&
                valueOf(schema.recurrenceMonthlyMode) === 'DAY_OF_MONTH' &&
                (!positiveInteger(day) || day > 31)
                ? { kind: 'monthDay' }
                : null;
        });
        validate(schema.time, ({ value, valueOf }) =>
            valueOf(schema.recurrenceFrequency) !== 'NONE' && valueOf(schema.scheduleTime) && !value() ? { kind: 'time' } : null,
        );
    });
    protected readonly timeModeChoices = computed(() => {
        const choices = this.options.timeModeChoices;
        if (!choices) {
            return [];
        }

        const time = this.fields.time().value();
        return (['DATE', 'DATETIME'] as const).map((mode) => {
            const { label, hint } = choices[mode];
            return { mode, label, hint: typeof hint === 'function' ? hint(time ? formatTime(time) : '') : hint };
        });
    });
    protected readonly summary = computed(() =>
        this.options.summaryLabels ? describeRecurrence(this.toRecurrenceValue(), this.options.summaryLabels, this.options.locale) : undefined,
    );
    protected readonly tourTargets = new Map([
        [
            'timeMode',
            createTourAccessorTarget(
                computed(() => this._timeModeTarget()?.nativeElement ?? null),
                computed(() => this.fields.scheduleTime().value),
            ),
        ],
        [
            'time',
            createTourAccessorTarget(
                computed(() => this._timeTarget()?.elementRef.nativeElement ?? null),
                computed(() => this.fields.time().value),
            ),
        ],
    ]);

    // #endregion

    // #region Methods

    protected cancel(): void {
        this._ref.close(Cancel.negative());
    }

    protected apply(): void {
        this.submitted.set(true);
        if (this.fields().invalid()) {
            this.fields().markAsTouched();
            return;
        }

        this._ref.close(Cancel.positive(this.toRecurrenceValue()));
    }

    private toRecurrenceValue(): IRecurrenceValue {
        const { recurrenceCount, recurrenceMonthDay, recurrenceEndAt, scheduleTime, time, ...value } = this._draft();
        let endAt = recurrenceEndAt;
        if (this.options.endDateMode === 'calendar-day') {
            endAt = value.recurrenceFrequency !== 'NONE' && value.recurrenceEndMode === 'UNTIL' && validDate(endAt) ? toCalendarDayEnd(endAt) : null;
        }
        return {
            ...value,
            recurrenceCount: String(recurrenceCount ?? RECURRENCE_DEFAULT_VALUE.recurrenceCount),
            recurrenceMonthDay: String(recurrenceMonthDay ?? RECURRENCE_DEFAULT_VALUE.recurrenceMonthDay),
            recurrenceEndAt: validDate(endAt) ? endAt.toISOString() : '',
            ...(scheduleTime && time ? { recurrenceTime: formatTime(time) } : {}),
        };
    }

    // #endregion
}

function createDraft(options: IRecurrenceEditorOptions): IRecurrenceDraft {
    const { recurrenceCount, recurrenceEndAt, recurrenceMonthDay, recurrenceTime: time, ...value } = options.value ?? RECURRENCE_DEFAULT_VALUE;
    const parsedTime = recurrenceTime(time);
    const initialTime = parsedTime ?? recurrenceTime(options.defaultTime);
    const end = /^\d{4}-\d{2}-\d{2}$/u.test(recurrenceEndAt) ? fromCalendarDate(recurrenceEndAt) : new Date(recurrenceEndAt);
    return {
        ...value,
        recurrenceFrequency: options.allowNone === false && value.recurrenceFrequency === 'NONE' ? 'DAILY' : value.recurrenceFrequency,
        recurrenceEndMode: options.allowEnd === false ? 'NEVER' : value.recurrenceEndMode,
        recurrenceCount: recurrenceCount ? Number(recurrenceCount) : null,
        recurrenceMonthDay: recurrenceMonthDay ? Number(recurrenceMonthDay) : null,
        recurrenceEndAt: options.allowEnd !== false && validDate(end) ? end : null,
        scheduleTime: options.timeMode === undefined ? parsedTime !== null : options.timeMode === 'DATETIME',
        time: initialTime ? ITimeSpan.create(initialTime.hours, initialTime.minutes) : null,
    };
}

function positiveInteger(value: number | null): value is number {
    return value !== null && Number.isSafeInteger(value) && value > 0;
}

function validDate(value: Date | null): value is Date {
    return value instanceof Date && Number.isFinite(value.getTime());
}

function formatTime(time: ITimeSpan): string {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
}
