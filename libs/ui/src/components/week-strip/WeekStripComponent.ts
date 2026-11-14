// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, output } from '@angular/core';
import { toCalendarDate } from '@pixel-brewery/ngpel-core';
import { ClickableComponent, TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { DayOfWeek } from '@pixel-brewery/mosaik-elements-foundation';

// #endregion

/**
 * Displays one controlled calendar-week row inside a week panel.
 *
 * @public
 */
@Component({
    selector: 'ngp-week-strip',
    template: `
        @let compact = compactDays();
        <div part="root" class="grid gap-1" [class.grid-cols-8]="showWeekNumber()" [class.grid-cols-7]="!showWeekNumber()">
            @if (showWeekNumber()) {
                <div part="week-number" class="flex min-w-0 items-center justify-center">
                    <mosaik-text [text]="weekNumber().toString()" [mosaikTypography]="'supporting'" />
                </div>
            }
            @for (date of weekDates(); track date.getTime()) {
                <mosaik-clickable
                    part="day-cell"
                    class="min-w-0 cursor-pointer rounded-(--mosaik-layout-radius) text-center"
                    [class]="
                        compact
                            ? 'grid min-h-[3rem] grid-rows-[0.625rem_1.25rem_0.375rem] place-items-center content-center gap-y-0.5'
                            : 'flex min-h-14 flex-col items-center justify-center px-1 py-1'
                    "
                    [class.selected]="isSelectedDate(date)"
                    [class.today]="isToday(date)"
                    [disabled]="disabled()"
                    [attr.test-id]="'week-strip-day-' + dateKey(date)"
                    [attr.aria-label]="formatDateLabel(date)"
                    [attr.aria-pressed]="isSelectedDate(date)"
                    [attr.aria-current]="isToday(date) ? 'date' : null"
                    (click)="onDateSelected(date)"
                >
                    <span part="month-space" class="flex items-center justify-center" [class]="compact ? 'h-2.5 min-w-0' : 'h-4'">
                        @if (formatMonthLabel(date); as monthLabel) {
                            <mosaik-text part="month" [text]="monthLabel" [mosaikTypography]="'supporting'" />
                        }
                    </span>
                    <mosaik-text part="day" [text]="date.getDate().toString()" />
                    <span
                        part="marker"
                        class="h-1.5 w-1.5 rounded-full"
                        [class]="compact ? 'self-center' : 'mt-1 bg-(--mosaik-color-primary-500)'"
                        [class.is-hidden]="!isEventDate(date)"
                    ></span>
                </mosaik-clickable>
            }
        </div>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;

            &:not(.ngp-compact-days) [part='day-cell']:hover {
                background-color: var(--mosaik-scheme-surface-subtle);
            }

            &:not(.ngp-compact-days) [part='day-cell'].selected {
                background-color: var(--mosaik-color-primary-500);
                color: var(--mosaik-color-on-primary);
            }

            &:not(.ngp-compact-days) [part='day-cell'].today:not(.selected) {
                color: var(--mosaik-color-primary-500);
            }

            [part='marker'].is-hidden {
                visibility: hidden;
            }
        }

        :host(.ngp-compact-days) {
            [part='day-cell'] {
                --clickable-background-color: transparent;
                --clickable-padding-block: 0.125rem;
                --clickable-padding-bottom: var(--clickable-padding-block);
                --clickable-padding-left: 0.125rem;
                --clickable-padding-right: 0.125rem;
                --clickable-padding-top: var(--clickable-padding-block);

                transition: color var(--mosaik-duration-short) ease;
            }

            [part='day-cell']:not(.selected):hover {
                --clickable-background-color: color-mix(in srgb, var(--mosaik-scheme-selection) 55%, transparent);
            }

            [part='day-cell'].selected {
                --clickable-background-color: var(--mosaik-scheme-selection);
                --text-foreground-color: var(--mosaik-scheme-foreground);
            }

            [part='day-cell'].selected:hover {
                --clickable-background-color: color-mix(in srgb, var(--mosaik-scheme-selection) 82%, var(--mosaik-scheme-middlelight));
            }

            [part='day-cell'].today:not(.selected) {
                --text-font-weight: 700;
                --text-foreground-color: var(--mosaik-color-primary-600);
            }

            [part='marker'] {
                background-color: var(--mosaik-color-secondary-500);
            }

            [part='day'] {
                --text-font-line-height: 1.25rem;
                --text-font-size: 0.875rem;
            }

            [part='month'] {
                --text-font-line-height: 0.625rem;
                --text-font-size: 0.625rem;
                max-width: 100%;
            }
        }
    `,
    host: { '[class.ngp-compact-days]': 'compactDays()' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClickableComponent, TextComponent, TypographyDirective],
})
export class WeekStripComponent {
    // #region Fields

    private readonly _defaultLocale = inject(LOCALE_ID);
    private readonly _dateFormatter = computed(
        () =>
            new Intl.DateTimeFormat(this.locale() ?? this._defaultLocale, {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
                year: 'numeric',
            }),
    );
    private readonly _monthFormatter = computed(() => new Intl.DateTimeFormat(this.locale() ?? this._defaultLocale, { month: 'short' }));

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /** Overrides the locale used for day and month names. */
    public readonly locale = input<string>();

    /** Uses a compact day cell with fixed rows for month, date and event marker. */
    public readonly compactDays = input(false);

    protected readonly dateKey = toCalendarDate;

    /**
     * Date contained by the represented week.
     *
     * @public
     * @readonly
     */
    public readonly displayDate = input.required<Date>();

    /**
     * Currently selected calendar date.
     *
     * @public
     * @readonly
     */
    public readonly selectedDate = input<Date | null>(null);

    /**
     * First day of the represented week.
     *
     * @public
     * @readonly
     */
    public readonly firstDayOfWeek = input.required<DayOfWeek>();

    /**
     * Calendar dates carrying an event marker.
     *
     * @public
     * @readonly
     */
    public readonly events = input<ReadonlyArray<Date>>([]);

    /**
     * Indicates whether the week-number column is visible.
     *
     * @public
     * @readonly
     */
    public readonly showWeekNumber = input(false);

    /**
     * Whether day selection is disabled.
     *
     * @public
     * @readonly
     */
    public readonly disabled = input(false);

    /**
     * Emits the selected calendar date.
     *
     * @public
     * @readonly
     */
    public readonly dateSelected = output<Date>();

    /**
     * Dates contained by the represented week.
     *
     * @protected
     * @readonly
     */
    protected readonly weekDates = computed(() => this.getWeekDates(this.displayDate(), this.firstDayOfWeek()));

    /**
     * ISO week number for the represented week.
     *
     * @protected
     * @readonly
     */
    protected readonly weekNumber = computed(() => this.getWeekNumber(this.displayDate()));

    // #endregion

    // #region Methods

    /**
     * Formats a complete accessible date label.
     *
     * @param date - Date to format.
     * @returns Localized accessible label.
     * @protected
     */
    protected formatDateLabel(date: Date): string {
        return this._dateFormatter().format(date);
    }

    /**
     * Formats the month label shown at a month boundary.
     *
     * @param date - Date to format.
     * @returns Localized short month or an empty label.
     * @protected
     */
    protected formatMonthLabel(date: Date): string {
        if (date.getDate() !== 1) {
            return '';
        }

        return this._monthFormatter().format(date);
    }

    /**
     * Indicates whether the provided date carries an event marker.
     *
     * @param date - Date to inspect.
     * @returns Whether the exact calendar day is marked.
     * @protected
     */
    protected isEventDate(date: Date): boolean {
        return this.events().some((eventDate) => this.isSameDay(eventDate, date));
    }

    /**
     * Indicates whether the provided date is selected.
     *
     * @param date - Date to inspect.
     * @returns Whether the date is selected.
     * @protected
     */
    protected isSelectedDate(date: Date): boolean {
        return this.isSameDay(date, this.selectedDate());
    }

    /**
     * Indicates whether the provided date is today.
     *
     * @param date - Date to inspect.
     * @returns Whether the date is today.
     * @protected
     */
    protected isToday(date: Date): boolean {
        return this.isSameDay(date, new Date());
    }

    /**
     * Emits a defensive copy of the selected date.
     *
     * @param date - Selected date.
     * @protected
     */
    protected onDateSelected(date: Date): void {
        this.dateSelected.emit(new Date(date));
    }

    private getFirstDayOfWeek(date: Date, firstDayOfWeek: DayOfWeek): Date {
        const firstDay = new Date(date);
        const offset = (firstDay.getDay() - Number(firstDayOfWeek) + 7) % 7;

        firstDay.setDate(firstDay.getDate() - offset);
        firstDay.setHours(0, 0, 0, 0);

        return firstDay;
    }

    private getWeekDates(date: Date, firstDayOfWeek: DayOfWeek): ReadonlyArray<Date> {
        const firstDay = this.getFirstDayOfWeek(date, firstDayOfWeek);

        return Array.from({ length: 7 }, (_, index) => {
            const currentDate = new Date(firstDay);
            currentDate.setDate(firstDay.getDate() + index);
            return currentDate;
        });
    }

    private getWeekNumber(date: Date): number {
        const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const day = currentDate.getUTCDay() || 7;

        currentDate.setUTCDate(currentDate.getUTCDate() + 4 - day);

        const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 4));

        return Math.ceil(((currentDate.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
    }

    private isSameDay(firstDate: Date | null | undefined, secondDate: Date | null | undefined): boolean {
        if (!firstDate || !secondDate) {
            return false;
        }

        return (
            firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() === secondDate.getDate()
        );
    }

    // #endregion
}
