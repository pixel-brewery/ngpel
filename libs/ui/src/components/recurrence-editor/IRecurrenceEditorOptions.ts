import type { IRecurrenceEditorLabels } from './RecurrenceEditorComponent';
import type { IRecurrenceValue } from './RecurrenceRule';

/** Initial value, available options and labels for the recurrence drawer. @public */
export interface IRecurrenceEditorOptions {
    readonly value?: IRecurrenceValue;
    readonly allowNone?: boolean;
    readonly allowEnd?: boolean;
    /** Locks the time mode. Omit to let the user choose all-day or timed recurrence. */
    readonly timeMode?: 'DATE' | 'DATETIME';
    /** Reference day for weekday previews. Defaults to today. Pass null to hide the dates. */
    readonly previewFrom?: Date | null;
    readonly title?: string;
    readonly description?: string;
    readonly labels?: Partial<IRecurrenceEditorLabels>;
    readonly scheduleTimeLabel?: string;
    readonly timeLabel?: string;
    readonly applyLabel?: string;
    readonly cancelLabel?: string;
    readonly invalidLabel?: string;
}
