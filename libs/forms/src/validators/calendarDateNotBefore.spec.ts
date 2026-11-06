import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { fromCalendarDate } from '@pixel-brewery/ngpel-core';
import { calendarDateNotBefore } from './calendarDateNotBefore';
import { validDate } from './validDate';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('calendarDateNotBefore', () => {
    it('accepts a date on the same calendar day even when its time is earlier', () => {
        // Arrange
        const minDate = new Date(2024, 0, 15, 23, 59);

        // Act
        const errors = collectFieldErrors<Date | null>(new Date(2024, 0, 15, 0, 1), (path) => calendarDateNotBefore(path, minDate));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a date on an earlier calendar day and reports the bound', () => {
        // Arrange
        const minDate = new Date(2024, 0, 15, 0, 0);
        const value = new Date(2024, 0, 14, 23, 59);

        // Act
        const errors = collectFieldErrors<Date | null>(value, (path) => calendarDateNotBefore(path, minDate));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'calendarDateNotBefore', actualValue: value, minDate })]);
    });

    it('compares years below 100 in calendar order', () => {
        // Arrange
        const value = fromCalendarDate('0099-12-31');
        const minDate = fromCalendarDate('0100-01-01');

        // Act
        const errors = collectFieldErrors(value, (path) => calendarDateNotBefore(path, minDate));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'calendarDateNotBefore', actualValue: value, minDate })]);
    });

    it('accepts a missing value and a missing bound', () => {
        // Arrange
        const minDate = new Date(2024, 0, 15);

        // Act
        const errors = [
            ...collectFieldErrors<Date | null>(null, (path) => calendarDateNotBefore(path, minDate)),
            ...collectFieldErrors<Date | null>(new Date(2020, 0, 1), (path) => calendarDateNotBefore(path, null)),
        ];

        // Assert
        expect(errors).toEqual([]);
    });

    it('revalidates when a sibling field changes the minimum day', () => {
        // Arrange
        const value = new Date(2024, 0, 14);
        const model = signal({ value, minimum: new Date(2024, 0, 15) });
        const field = TestBed.runInInjectionContext(() => form(model, (path) => calendarDateNotBefore(path.value, (context) => context.valueOf(path.minimum))));
        const initialErrors = field.value().errors();

        // Act
        model.update((state) => ({ ...state, minimum: value }));

        // Assert
        expect(initialErrors).toEqual([expect.objectContaining({ kind: 'calendarDateNotBefore', actualValue: value })]);
        expect(field.value().errors()).toEqual([]);
    });

    it('leaves invalid dates to the composed validDate validator', () => {
        // Arrange
        const value = new Date(Number.NaN);
        const minimum = new Date(2024, 0, 15);

        // Act
        const errors = collectFieldErrors<Date | null>(value, (path) => {
            validDate(path);
            calendarDateNotBefore(path, minimum);
        });

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'validDate' })]);
    });
});
