import { inject, LOCALE_ID, Pipe, type PipeTransform } from '@angular/core';
import { describeRecurrence } from './describeRecurrence';
import type { IRecurrenceSummaryLabels } from './IRecurrenceSummaryLabels';
import type { IRecurrenceValue } from './RecurrenceRule';

/** Renders a localized description of the recurrence in a read-only view. @public */
@Pipe({ name: 'ngpRecurrenceSummary' })
export class RecurrenceSummaryPipe implements PipeTransform {
    // #region Fields

    private readonly _locale = inject(LOCALE_ID);

    // #endregion

    // #region Methods

    /**
     * Formats one part of the recurrence description.
     * @param value Recurrence to describe.
     * @param part Which part of the description to render.
     * @param labels Optional application translations.
     * @param locale Locale override for calendar display.
     * @returns The description text.
     */
    public transform(
        value: IRecurrenceValue | null | undefined,
        part: 'head' | 'detail' | 'full' = 'full',
        labels?: Partial<IRecurrenceSummaryLabels>,
        locale = this._locale,
    ): string {
        const summary = describeRecurrence(value, labels, locale);
        if (part !== 'full') {
            return summary[part];
        }
        return value && value.recurrenceFrequency !== 'NONE' ? [summary.head, summary.detail].filter(Boolean).join(' · ') : summary.head;
    }

    // #endregion
}
