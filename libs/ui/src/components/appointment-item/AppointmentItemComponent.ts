// #region Imports

import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID } from '@angular/core';
import { ClickableComponent, IconComponent, TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { Variant } from '@pixel-brewery/mosaik-elements-foundation';

// #endregion

/**
 * The `AppointmentItemComponent` component.
 *
 * @public
 */
@Component({
    selector: 'ngp-appointment-item',
    template: `
        <mosaik-clickable part="root" class="flex items-stretch gap-2 px-1 py-3 text-left">
            @if (showDate()) {
                <div part="date" class="flex w-16 shrink-0 flex-col items-center justify-center text-center">
                    <mosaik-text class="[--text-font-size:1.35rem] [--text-font-weight:700]" [text]="formatDay()" />
                    <mosaik-text class="[--text-font-size:0.7rem]" [text]="formatMonthAndWeekday()" [wrap]="true" />
                    <mosaik-text class="[--text-font-size:0.7rem]" [text]="formatYear()" />
                </div>
            } @else {
                <div part="date-spacer" class="w-16 shrink-0"></div>
            }
            <div [class]="'flex min-w-0 flex-col gap-0.5 border-l-3 pl-3 ' + borderColorClass()" part="content">
                <mosaik-text part="title" class="truncate text-sm font-medium" [text]="title()" [wrap]="true" />
                <div class="flex items-center">
                    <mosaik-text part="priority" [text]="priority()" [mosaikTypography]="'supporting'" />
                    @if ((icon() ?? '').trim().length > 0) {
                        <mosaik-icon [icon]="icon() ?? undefined" [variant]="variant()" [size]="'tiny'" />
                    }
                </div>
            </div>
        </mosaik-clickable>
    `,
    styleUrls: ['./AppointmentItemComponent.scss'],
    exportAs: 'appointmentItem',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TextComponent, ClickableComponent, IconComponent, TypographyDirective],
})
export class AppointmentItemComponent {
    // #region Fields

    private readonly _locale: string = inject(LOCALE_ID);

    // #endregion

    //#region Properties

    /**
     * The variant of the appointment item, affecting its appearance and border color.
     *
     * @public
     * @readonly
     */
    public variant = input<Variant>('primary');

    /**
     * The title of the appointment item.
     *
     * @public
     * @readonly
     */
    public title = input.required<string>();

    /**
     * The priority label of the appointment item.
     *
     * @public
     * @readonly
     */
    public priority = input.required<string>();

    /**
     * The icon name for the appointment item, used for visual indication.
     *
     * @public
     * @readonly
     */
    public icon = input<string | null | undefined>();

    /**
     * The date of the appointment item.
     *
     * @public
     * @readonly
     */
    public date = input.required<Date | string | null | undefined>();

    /**
     * Controls whether the date part is visible.
     * When false, a spacer is rendered instead.
     *
     * @public
     * @readonly
     */
    public showDate = input<boolean>(true);

    // #endregion

    // #region Methods

    /**
     * Returns the day number of the appointment's due date.
     *
     * @protected
     * @returns Day number string.
     */
    protected formatDay(): string {
        let dueDate = this.date();

        if (!dueDate) {
            return 'n/a';
        }

        if (typeof dueDate === 'string') {
            dueDate = this.parseDate(dueDate);
        }

        if (!dueDate) {
            return 'n/a';
        }

        return dueDate.getDate().toString();
    }

    /**
     * Returns the short weekday of the appointment's due date.
     *
     * @protected
     * @returns Abbreviated weekday string.
     */
    protected formatMonthAndWeekday(): string {
        let date = this.date();

        if (!date) {
            return 'n/a';
        }

        if (typeof date === 'string') {
            date = this.parseDate(date);
        }

        if (!date) {
            return 'n/a';
        }

        const month = new Intl.DateTimeFormat(this._locale, { month: 'short' }).format(date).toUpperCase();
        const weekday = new Intl.DateTimeFormat(this._locale, { weekday: 'short' }).format(date).toUpperCase();

        return `${month} · ${weekday}`;
    }

    /** Returns the full year so dates remain unambiguous across year boundaries. */
    protected formatYear(): string {
        let date = this.date();

        if (typeof date === 'string') {
            date = this.parseDate(date);
        }

        return date ? String(date.getFullYear()) : 'n/a';
    }

    /** Returns the Mosaik token utility for the appointment state. */
    protected borderColorClass(): string {
        switch (this.variant()) {
            case 'danger':
                return 'border-(--mosaik-color-danger-500)';
            case 'warning':
                return 'border-(--mosaik-color-warning-500)';
            default:
                return 'border-(--mosaik-color-neutral-500)';
        }
    }

    /**
     * @private
     */
    private parseDate(value: null | string | undefined): Date | undefined {
        if (!value) {
            return undefined;
        }

        const date = new Date(value);

        return Number.isNaN(date.getTime()) ? undefined : date;
    }

    // #endregion
}
