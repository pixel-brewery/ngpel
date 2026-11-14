// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, LOCALE_ID, model, output, signal } from '@angular/core';
import { ButtonComponent, IconNameDirective, TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { DayOfWeek } from '@pixel-brewery/mosaik-elements-foundation';
import { WeekStripComponent } from '../week-strip/WeekStripComponent';

// #endregion

type WeekNavigationDirection = 'next' | 'previous';

interface IWeekPanelPage {
    readonly additionalWeeks: ReadonlyArray<Date>;
    readonly compactWeeks: ReadonlyArray<Date>;
}

/**
 * Displays a configurable, navigable collection of calendar weeks.
 *
 * @public
 */
/**
 * The week information of a locale, which the ES2022 library does not declare yet: `getWeekInfo()`
 * is a stage-3 proposal and is still missing from some engines at runtime as well.
 */
interface ILocaleWeekInfo {
    readonly firstDay: number;
}

/**
 * Reads the first weekday of a locale, falling back to Monday where the engine cannot tell.
 *
 * @param locale The locale to read.
 * @returns The first weekday, `0` for Sunday.
 */
function resolveFirstDayOfWeek(locale: string): DayOfWeek {
    const withWeekInfo = new Intl.Locale(locale) as Intl.Locale & { getWeekInfo?: () => ILocaleWeekInfo };

    return ((withWeekInfo.getWeekInfo?.().firstDay ?? 1) % 7) as DayOfWeek;
}

@Component({
    selector: 'ngp-week-panel',
    template: `
        <section
            part="root"
            class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2"
            [attr.aria-label]="panelLabel()"
            (swipeleft)="onSwipeLeft()"
            (swiperight)="onSwipeRight()"
        >
            @if (showNavigation()) {
                <mosaik-button
                    part="navigation-button"
                    class="col-start-1 row-start-1 self-center"
                    [type]="'button'"
                    [appearance]="'solid'"
                    [variant]="'tertiary'"
                    [size]="'small'"
                    [iconName]="'chevronLeft'"
                    [iconSize]="'small'"
                    [disabled]="disabled()"
                    [attr.aria-label]="previousLabel()"
                    [attr.aria-controls]="weeksId"
                    (click)="navigate('previous')"
                />
            }

            <div part="calendar" class="col-start-2 row-start-1 min-w-0">
                <div part="weekday-header" class="mb-1 grid gap-1" [class.grid-cols-8]="showWeekNumbers()" [class.grid-cols-7]="!showWeekNumbers()">
                    @if (showWeekNumbers()) {
                        <mosaik-text part="weekday" class="min-w-0 text-center" [text]="weekNumberLabel()" [mosaikTypography]="'supporting'" />
                    }
                    @for (date of weekdayDates(); track date.getDay()) {
                        <mosaik-text part="weekday" class="min-w-0 text-center" [text]="formatWeekday(date)" [mosaikTypography]="'supporting'" />
                    }
                </div>

                <div [id]="weeksId" part="weeks-viewport" class="relative min-w-0 overflow-hidden">
                    @if (outgoingPage(); as page) {
                        <div
                            part="week-page"
                            class="absolute inset-0 min-w-0"
                            data-page-state="outgoing"
                            [attr.data-direction]="navigationDirection()"
                            [attr.aria-hidden]="true"
                            inert
                            (animationend)="onPagingAnimationEnd($event)"
                        >
                            <ng-container [ngTemplateOutlet]="weekPage" [ngTemplateOutletContext]="{ $implicit: page }" />
                        </div>
                    }

                    <div
                        part="week-page"
                        class="relative min-w-0"
                        [attr.data-page-state]="isPaging() ? 'incoming' : 'idle'"
                        [attr.data-direction]="navigationDirection()"
                    >
                        <ng-container [ngTemplateOutlet]="weekPage" [ngTemplateOutletContext]="{ $implicit: currentPage() }" />
                    </div>
                </div>
            </div>

            @if (showNavigation()) {
                <mosaik-button
                    part="navigation-button"
                    class="col-start-3 row-start-1 self-center"
                    [type]="'button'"
                    [appearance]="'solid'"
                    [variant]="'tertiary'"
                    [size]="'small'"
                    [iconName]="'chevronRight'"
                    [iconSize]="'small'"
                    [disabled]="disabled()"
                    [attr.aria-label]="nextLabel()"
                    [attr.aria-controls]="weeksId"
                    (click)="navigate('next')"
                />
            }
            @if (canExpand()) {
                <mosaik-button
                    part="expand-button"
                    class="col-start-2 row-start-2 justify-self-center"
                    [type]="'button'"
                    [appearance]="'solid'"
                    [variant]="'tertiary'"
                    [size]="'small'"
                    [iconName]="effectiveExpanded() ? 'chevronUp' : 'chevronDown'"
                    [iconSize]="'small'"
                    [disabled]="disabled()"
                    [attr.aria-expanded]="effectiveExpanded()"
                    [attr.aria-controls]="weeksId"
                    [attr.aria-label]="effectiveExpanded() ? collapseLabel() : expandLabel()"
                    (click)="toggleExpanded()"
                />
            }
        </section>

        <ng-template #weekPage let-page>
            <div part="weeks" class="flex min-w-0 flex-col">
                <div part="compact-weeks" class="flex min-w-0 flex-col gap-1">
                    @for (week of page.compactWeeks; track week.getTime()) {
                        <ngp-week-strip
                            [displayDate]="week"
                            [locale]="locale()"
                            [compactDays]="compactDays()"
                            [selectedDate]="selectedDate()"
                            [firstDayOfWeek]="firstDayOfWeek()"
                            [events]="events()"
                            [showWeekNumber]="showWeekNumbers()"
                            [disabled]="disabled()"
                            (dateSelected)="onDateSelected($event)"
                        />
                    }
                </div>

                @if (canExpand()) {
                    <div
                        part="additional-weeks"
                        class="grid min-w-0"
                        [attr.data-expanded]="effectiveExpanded()"
                        [attr.aria-hidden]="!effectiveExpanded()"
                        [attr.inert]="effectiveExpanded() ? null : ''"
                    >
                        <div part="additional-weeks-clip" class="min-h-0 min-w-0 overflow-hidden">
                            <div part="additional-weeks-content" class="flex min-w-0 flex-col gap-1">
                                @for (week of page.additionalWeeks; track week.getTime()) {
                                    <ngp-week-strip
                                        [displayDate]="week"
                                        [locale]="locale()"
                                        [compactDays]="compactDays()"
                                        [selectedDate]="selectedDate()"
                                        [firstDayOfWeek]="firstDayOfWeek()"
                                        [events]="events()"
                                        [showWeekNumber]="showWeekNumbers()"
                                        [disabled]="disabled()"
                                        (dateSelected)="onDateSelected($event)"
                                    />
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </ng-template>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            --week-panel-transition-duration: 250ms;
            --week-panel-transition-easing: ease;

            display: block;
            min-inline-size: 0;

            [part='navigation-button'],
            [part='expand-button'] {
                flex: none;
                inline-size: 2.2rem;
                border-radius: 9999rem;
            }

            [part='weekday'] {
                --text-font-weight: 700;
            }

            [part='week-page'] {
                inline-size: 100%;
                will-change: transform;
            }

            [part='week-page'][data-page-state='outgoing'] {
                z-index: 1;
                pointer-events: none;
            }

            [part='week-page'][data-page-state='outgoing'][data-direction='next'] {
                animation: week-panel-page-out-next var(--week-panel-transition-duration) var(--week-panel-transition-easing) forwards;
            }

            [part='week-page'][data-page-state='incoming'][data-direction='next'] {
                animation: week-panel-page-in-next var(--week-panel-transition-duration) var(--week-panel-transition-easing) both;
            }

            [part='week-page'][data-page-state='outgoing'][data-direction='previous'] {
                animation: week-panel-page-out-previous var(--week-panel-transition-duration) var(--week-panel-transition-easing) forwards;
            }

            [part='week-page'][data-page-state='incoming'][data-direction='previous'] {
                animation: week-panel-page-in-previous var(--week-panel-transition-duration) var(--week-panel-transition-easing) both;
            }

            [part='additional-weeks'] {
                grid-template-rows: 0fr;
                opacity: 0;
                transition:
                    grid-template-rows var(--week-panel-transition-duration) var(--week-panel-transition-easing),
                    opacity var(--week-panel-transition-duration) var(--week-panel-transition-easing);
            }

            [part='additional-weeks'][data-expanded='true'] {
                grid-template-rows: 1fr;
                opacity: 1;
            }

            [part='additional-weeks-content'] {
                padding-block-start: calc(var(--mosaik-layout-space) * 0.5);
            }
        }

        @keyframes week-panel-page-out-next {
            from {
                transform: translateX(0);
            }

            to {
                transform: translateX(-100%);
            }
        }

        @keyframes week-panel-page-in-next {
            from {
                transform: translateX(100%);
            }

            to {
                transform: translateX(0);
            }
        }

        @keyframes week-panel-page-out-previous {
            from {
                transform: translateX(0);
            }

            to {
                transform: translateX(100%);
            }
        }

        @keyframes week-panel-page-in-previous {
            from {
                transform: translateX(-100%);
            }

            to {
                transform: translateX(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            :host [part='additional-weeks'],
            :host [part='week-page'] {
                animation-duration: 1ms;
                transition-duration: 1ms;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-expanded]': 'effectiveExpanded()',
    },
    imports: [ButtonComponent, IconNameDirective, NgTemplateOutlet, TextComponent, TypographyDirective, WeekStripComponent],
})
export class WeekPanelComponent {
    // #region Fields

    private static _nextId = 0;

    private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _defaultLocale = inject(LOCALE_ID);
    private readonly _weekdayFormatter = computed(() => new Intl.DateTimeFormat(this.locale() ?? this._defaultLocale, { weekday: 'narrow' }));

    protected readonly weeksId = `week-panel-weeks-${WeekPanelComponent._nextId++}`;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /** Overrides the locale used for the week and day names. */
    public readonly locale = input<string>();

    /** Uses the compact day cells in each displayed week. */
    public readonly compactDays = input(false);

    /**
     * Date contained by the first visible week.
     *
     * @public
     * @readonly
     */
    public readonly displayDate = model<Date>(this.startOfDay(new Date()));

    /**
     * Currently selected calendar date.
     *
     * @public
     * @readonly
     */
    public readonly selectedDate = model<Date | null>(null);

    /**
     * Whether the panel is expanded.
     *
     * @public
     * @readonly
     */
    public readonly expanded = model(false);

    /**
     * Number of weeks shown in the compact or fixed state.
     *
     * @public
     * @readonly
     */
    public readonly compactWeekCount = input(1);

    /**
     * Number of weeks shown in the expanded state.
     *
     * @public
     * @readonly
     */
    public readonly expandedWeekCount = input(3);

    /**
     * Whether the panel can switch between compact and expanded states.
     *
     * @public
     * @readonly
     */
    public readonly expandable = input(true);

    /**
     * Whether previous- and next-week navigation is visible.
     *
     * @public
     * @readonly
     */
    public readonly showNavigation = input(true);

    /**
     * Whether ISO week numbers are visible.
     *
     * @public
     * @readonly
     */
    public readonly showWeekNumbers = input(false);

    /**
     * First day of every displayed week.
     *
     * @public
     * @readonly
     */
    public readonly firstDayOfWeek = input<DayOfWeek>(resolveFirstDayOfWeek(this._defaultLocale));

    /**
     * Calendar dates carrying an event marker.
     *
     * @public
     * @readonly
     */
    public readonly events = input<ReadonlyArray<Date>>([]);

    /**
     * Whether all calendar interaction is disabled.
     *
     * @public
     * @readonly
     */
    public readonly disabled = input(false);

    /**
     * Accessible label for the complete calendar-week panel.
     *
     * @public
     * @readonly
     */
    public readonly panelLabel = input.required<string>();

    /**
     * Accessible label for previous-week navigation.
     *
     * @public
     * @readonly
     */
    public readonly previousLabel = input.required<string>();

    /**
     * Accessible label for next-week navigation.
     *
     * @public
     * @readonly
     */
    public readonly nextLabel = input.required<string>();

    /**
     * Accessible label for expanding the panel.
     *
     * @public
     * @readonly
     */
    public readonly expandLabel = input.required<string>();

    /**
     * Accessible label for collapsing the panel.
     *
     * @public
     * @readonly
     */
    public readonly collapseLabel = input.required<string>();

    /**
     * Label shown above the optional week-number column.
     *
     * @public
     * @readonly
     */
    public readonly weekNumberLabel = input('');

    /**
     * Emits when a date is selected.
     *
     * @public
     * @readonly
     */
    public readonly dateChanged = output<Date>();

    /**
     * Whether the expansion control is available.
     *
     * @protected
     * @readonly
     */
    protected readonly canExpand = computed(() => {
        this.validateWeekCounts();
        return this.expandable() && this.expandedWeekCount() > this.compactWeekCount();
    });

    /**
     * Effective expanded state after applying configuration.
     *
     * @protected
     * @readonly
     */
    protected readonly effectiveExpanded = computed(() => this.canExpand() && this.expanded());

    /**
     * Direction of the active horizontal paging animation.
     *
     * @protected
     * @readonly
     */
    protected readonly navigationDirection = signal<WeekNavigationDirection | null>(null);

    /**
     * Date shown by the outgoing page while horizontal paging is active.
     *
     * @protected
     * @readonly
     */
    protected readonly outgoingDisplayDate = signal<Date | null>(null);

    /**
     * Weeks rendered by the current page.
     *
     * @protected
     * @readonly
     */
    protected readonly currentPage = computed(() => this.createPage(this.displayDate()));

    /**
     * Weeks retained for the outgoing half of a paging animation.
     *
     * @protected
     * @readonly
     */
    protected readonly outgoingPage = computed(() => {
        const displayDate = this.outgoingDisplayDate();

        return displayDate ? this.createPage(displayDate) : null;
    });

    /**
     * Whether horizontal week paging is currently in progress.
     *
     * @protected
     * @readonly
     */
    protected readonly isPaging = computed(() => this.outgoingPage() !== null);

    /**
     * First dates of the weeks shown in the compact state.
     *
     * @protected
     * @readonly
     */
    protected readonly compactWeeks = computed(() => this.currentPage().compactWeeks);

    /**
     * First dates of the weeks revealed by expansion.
     *
     * The rows remain rendered while collapsed so their height can animate,
     * but the template keeps them hidden from accessibility and interaction.
     *
     * @protected
     * @readonly
     */
    protected readonly additionalWeeks = computed(() => this.currentPage().additionalWeeks);

    /**
     * First dates of all currently visible weeks.
     *
     * @protected
     * @readonly
     */
    protected readonly visibleWeeks = computed(() => {
        const page = this.currentPage();

        return this.effectiveExpanded() ? [...page.compactWeeks, ...page.additionalWeeks] : page.compactWeeks;
    });

    /**
     * Dates used to render the shared weekday heading.
     *
     * @protected
     * @readonly
     */
    protected readonly weekdayDates = computed(() => this.getWeekDates(this.displayDate(), this.firstDayOfWeek()));

    // #endregion

    // #region Methods

    /**
     * Formats a localized short weekday heading.
     *
     * @param date - Date defining the weekday.
     * @returns Localized weekday heading.
     * @protected
     */
    protected formatWeekday(date: Date): string {
        return this._weekdayFormatter().format(date).toUpperCase();
    }

    /**
     * Navigates by the number of calendar weeks currently visible.
     *
     * @param direction - Navigation direction.
     * @protected
     */
    protected navigate(direction: WeekNavigationDirection): void {
        if (this.disabled() || this.isPaging()) {
            return;
        }

        const visibleDayCount = this.visibleWeeks().length * 7;
        const dayOffset = direction === 'previous' ? -visibleDayCount : visibleDayCount;
        const currentDisplayDate = this.displayDate();

        this.navigationDirection.set(direction);
        this.outgoingDisplayDate.set(currentDisplayDate);
        const nextDisplayDate = this.addCalendarDays(currentDisplayDate, dayOffset);
        this.displayDate.set(nextDisplayDate);
        this._host.nativeElement.dispatchEvent(
            new CustomEvent<Date>('displayDateChange', {
                bubbles: true,
                composed: true,
                detail: nextDisplayDate,
            }),
        );
    }

    /**
     * Releases the outgoing page after its horizontal paging animation.
     *
     * @param event - Animation event emitted by the outgoing page itself.
     * @protected
     */
    protected onPagingAnimationEnd(event: AnimationEvent): void {
        if (event.target !== event.currentTarget) {
            return;
        }

        this.outgoingDisplayDate.set(null);
        this.navigationDirection.set(null);
    }

    /**
     * Selects a date and publishes the panel's date-change contract.
     *
     * @param date - Selected date.
     * @protected
     */
    protected onDateSelected(date: Date): void {
        if (this.disabled()) {
            return;
        }

        const selectedDate = new Date(date);

        this.selectedDate.set(selectedDate);
        this.dateChanged.emit(selectedDate);
        this._host.nativeElement.dispatchEvent(
            new CustomEvent<Date>('dateChanged', {
                bubbles: true,
                composed: true,
                detail: selectedDate,
            }),
        );
    }

    /**
     * Navigates one week forward after a left swipe.
     *
     * @protected
     */
    protected onSwipeLeft(): void {
        this.navigate('next');
    }

    /**
     * Navigates one week backward after a right swipe.
     *
     * @protected
     */
    protected onSwipeRight(): void {
        this.navigate('previous');
    }

    /**
     * Switches between compact and expanded week counts.
     *
     * @protected
     */
    protected toggleExpanded(): void {
        if (this.disabled() || !this.canExpand()) {
            return;
        }

        this.expanded.update((value) => !value);
    }

    private addCalendarDays(date: Date, dayCount: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + dayCount);
        return result;
    }

    private getFirstDayOfWeek(date: Date, firstDayOfWeek: DayOfWeek): Date {
        const firstDay = this.startOfDay(date);
        const offset = (firstDay.getDay() - Number(firstDayOfWeek) + 7) % 7;

        firstDay.setDate(firstDay.getDate() - offset);

        return firstDay;
    }

    private createPage(displayDate: Date): IWeekPanelPage {
        const configuredWeeks = this.getConfiguredWeeks(displayDate);

        return {
            compactWeeks: configuredWeeks.slice(0, this.compactWeekCount()),
            additionalWeeks: this.canExpand() ? configuredWeeks.slice(this.compactWeekCount()) : [],
        };
    }

    private getConfiguredWeeks(displayDate: Date): ReadonlyArray<Date> {
        this.validateWeekCounts();

        const firstWeek = this.getFirstDayOfWeek(displayDate, this.firstDayOfWeek());
        const weekCount = this.canExpand() ? this.expandedWeekCount() : this.compactWeekCount();

        return Array.from({ length: weekCount }, (_, index) => this.addCalendarDays(firstWeek, index * 7));
    }

    private getWeekDates(date: Date, firstDayOfWeek: DayOfWeek): ReadonlyArray<Date> {
        const firstDay = this.getFirstDayOfWeek(date, firstDayOfWeek);

        return Array.from({ length: 7 }, (_, index) => this.addCalendarDays(firstDay, index));
    }

    private startOfDay(date: Date): Date {
        const result = new Date(date);
        result.setHours(0, 0, 0, 0);
        return result;
    }

    private validateWeekCounts(): void {
        const compactWeekCount = this.compactWeekCount();
        const expandedWeekCount = this.expandedWeekCount();

        if (!Number.isInteger(compactWeekCount) || compactWeekCount < 1) {
            throw new Error('WeekPanelComponent compactWeekCount must be a positive integer.');
        }

        if (!Number.isInteger(expandedWeekCount) || expandedWeekCount < compactWeekCount) {
            throw new Error('WeekPanelComponent expandedWeekCount must be an integer greater than or equal to compactWeekCount.');
        }
    }

    // #endregion
}
