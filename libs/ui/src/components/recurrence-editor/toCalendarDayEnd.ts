/** Returns the inclusive end of the date in the local time zone. @internal */
export function toCalendarDayEnd(date: Date): Date {
    const end = new Date(date);
    end.setHours(23, 59, 59, 0);
    return end;
}
