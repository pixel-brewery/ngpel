// #region Imports

import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID, output, signal } from '@angular/core';
import { ButtonComponent, ClickableComponent, IconNameDirective, TextComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

type ScrollDirection = 'before' | 'after' | 'today';

/**
 * Displays a horizontally scrollable day selector.
 *
 * @public
 */
@Component({
    selector: 'ngp-day-strip',
    template: `
        <div part="root" class="flex items-center gap-2" (swipeleft)="onSwipeLeft()" (swiperight)="onSwipeRight()">
            @if (showNavigation()) {
                <mosaik-button part="nav-button" [appearance]="'plain'" [iconName]="'chevronLeft'" (click)="onDayChanged('before')" />
            }
            @if (showNavigation()) {
                <mosaik-button part="nav-button" [appearance]="'plain'" [iconName]="'chevronRight'" (click)="onDayChanged('after')" />
            }
            @if (showToday()) {
                <mosaik-button part="today-button" [appearance]="'plain'" [iconName]="'calendar'" (click)="onDayChanged('today')" />
            }
            <mosaik-clickable
                part="item"
                class="flex min-w-12 flex-col items-center justify-center rounded-(--mosaik-layout-radius) px-3 py-2 text-center"
                [class.selected]="isSameDay(currentDisplayDate, selectedDateValue)"
                [class.today]="isSameDay(currentDisplayDate, today)"
                (click)="onDateSelected(currentDisplayDate)"
            >
                <mosaik-text part="label" [text]="formatDisplayDate(currentDisplayDate)" [wrap]="true" />
            </mosaik-clickable>
        </div>
    `,
    styleUrls: ['./DayStripComponent.scss'],
    exportAs: 'dayStrip',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, ClickableComponent, IconNameDirective, TextComponent],
})
export class DayStripComponent {
    // #region Fields

    private readonly _displayDate = signal<Date>(new Date());
    private readonly _locale: string = inject(LOCALE_ID);

    // #endregion

    // #region Properties

    /**
     * The date that is currently displayed in the strip.
     *
     * @public
     * @readonly
     */
    public readonly displayDate = input<Date | 'today' | null | undefined>(undefined);

    /**
     * The currently selected date.
     *
     * @public
     * @readonly
     */
    public readonly selectedDate = input<Date | null>(null);

    /**
     * Enables the previous and next navigation buttons.
     *
     * @public
     * @readonly
     */
    public readonly showNavigation = input<boolean>(false);

    /**
     * Enables the button that jumps back to today.
     *
     * @public
     * @readonly
     */
    public readonly showToday = input<boolean>(false);

    /**
     * Emits when a day is selected.
     *
     * @public
     * @readonly
     */
    public readonly selectedDateChanged = output<{ sender: DayStripComponent; date: Date }>();

    /**
     * Returns the current date shown by the component.
     *
     * @protected
     * @readonly
     */
    protected get currentDisplayDate(): Date {
        const value = this.displayDate();

        if (value === null || value === undefined || value === 'today') {
            return this._displayDate();
        }

        return value;
    }

    /**
     * Returns the current selected date.
     *
     * @protected
     * @readonly
     */
    protected get selectedDateValue(): Date | null {
        return this.selectedDate();
    }

    /**
     * Returns today's date.
     *
     * @protected
     * @readonly
     */
    protected get today(): Date {
        return new Date();
    }

    // #endregion

    // #region Methods

    /**
     * Compares two dates by day only.
     *
     * @protected
     */
    protected isSameDay(firstDate: Date | null | undefined, secondDate: Date | null | undefined): boolean {
        if (!firstDate || !secondDate) {
            return false;
        }

        return (
            firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() === secondDate.getDate()
        );
    }

    /**
     * Formats the display date using the configured application locale.
     *
     * @protected
     */
    protected formatDisplayDate(date: Date): string {
        return new Intl.DateTimeFormat(this._locale, { dateStyle: 'full' }).format(date);
    }

    /**
     * Selects the provided date and emits the change event.
     *
     * @protected
     */
    protected onDateSelected(date: Date): void {
        this._displayDate.set(date);
        this.selectedDateChanged.emit({ sender: this, date });
    }

    /**
     * Changes the visible day in the strip.
     *
     * @protected
     */
    protected onDayChanged(direction: ScrollDirection): void {
        const currentDate = this.currentDisplayDate;
        const nextDate = new Date(currentDate);

        if (direction === 'before') {
            nextDate.setDate(currentDate.getDate() - 1);
        }

        if (direction === 'after') {
            nextDate.setDate(currentDate.getDate() + 1);
        }

        if (direction === 'today') {
            nextDate.setTime(Date.now());
        }

        this.onDateSelected(nextDate);
    }

    /**
     * Navigates one day backward.
     *
     * @protected
     */
    protected onSwipeRight(): void {
        this.onDayChanged('before');
    }

    /**
     * Navigates one day forward.
     *
     * @protected
     */
    protected onSwipeLeft(): void {
        this.onDayChanged('after');
    }

    // #endregion
}
