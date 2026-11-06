/** Parses a local wall-clock time used in a recurrence rule. @internal */
export function recurrenceTime(value: string | undefined): { readonly hours: number; readonly minutes: number } | null {
    const match = /^(\d{2}):(\d{2})$/u.exec(value ?? '');
    const hours = Number(match?.[1]);
    const minutes = Number(match?.[2]);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 ? { hours, minutes } : null;
}
