import type { IRecurrenceEditorLabels, RECURRENCE_EDITOR_TOUR_TARGETS } from './RecurrenceEditorComponent';
import type { IRecurrenceSummaryLabels } from './IRecurrenceSummaryLabels';
import type { IRecurrenceValue } from './RecurrenceRule';

/** Initial value, available options and labels for the recurrence drawer. @public */
export interface IRecurrenceEditorOptions {
    readonly value?: IRecurrenceValue;
    readonly allowNone?: boolean;
    readonly allowEnd?: boolean;
    /** Selects a local calendar day ending at 23:59:59. Defaults to editing an instant. */
    readonly endDateMode?: 'calendar-day' | 'instant';
    /** Locks the time mode. Omit to let the user choose all-day or timed recurrence. */
    readonly timeMode?: 'DATE' | 'DATETIME';
    /** Initial time in HH:mm when there is no stored time. This does not enable timed recurrence. */
    readonly defaultTime?: string;
    /** Uses two labeled choices for the time mode when it is editable. Defaults to a toggle. */
    readonly timeModeChoices?: Readonly<Record<'DATE' | 'DATETIME', { readonly label: string; readonly hint?: string | ((time: string) => string) }>>;
    /** Maps editor fields and drawer actions to anchors of the caller's tour. The timeMode target accepts a boolean. */
    readonly tour?: {
        readonly tourId: string;
        readonly anchors: Readonly<Partial<Record<keyof typeof RECURRENCE_EDITOR_TOUR_TARGETS | 'timeMode' | 'time' | 'cancel' | 'save', string>>>;
    };
    /** Reference day for weekday previews. Defaults to today. Pass null to hide the dates. */
    readonly previewFrom?: Date | null;
    readonly title?: string;
    readonly description?: string;
    readonly labels?: Partial<IRecurrenceEditorLabels>;
    /** Displays the supplied summary labels in the editor's two-line summary. */
    readonly summaryLabels?: Partial<IRecurrenceSummaryLabels>;
    /** Locale for formatting the detailed summary. */
    readonly locale?: string;
    readonly scheduleTimeLabel?: string;
    readonly timeLabel?: string;
    readonly applyLabel?: string;
    readonly cancelLabel?: string;
    readonly invalidLabel?: string;
}
