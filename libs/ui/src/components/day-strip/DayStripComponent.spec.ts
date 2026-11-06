// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DayStripComponent } from './DayStripComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    ClickableComponent: class ClickableComponent {},
    IconDirective: class IconDirective {},
    IconNameDirective: class IconNameDirective {},
    TextComponent: class TextComponent {},
    TypographyDirective: class TypographyDirective {},
}));

describe('DayStripComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('navigates by calendar day across a year boundary', () => {
        // arrange
        const component = TestBed.runInInjectionContext(() => new DayStripComponent());
        const selectedDateChanged = vi.fn();
        const api = component as unknown as {
            onDateSelected(date: Date): void;
            onDayChanged(direction: 'after' | 'before' | 'today'): void;
        };
        component.selectedDateChanged.subscribe(selectedDateChanged);
        api.onDateSelected(new Date(2026, 11, 31, 12));
        selectedDateChanged.mockClear();

        // act
        api.onDayChanged('after');

        // assert
        const selectedDate = selectedDateChanged.mock.calls[0]?.[0].date as Date;
        expect(selectedDate.getFullYear()).toBe(2027);
        expect(selectedDate.getMonth()).toBe(0);
        expect(selectedDate.getDate()).toBe(1);
    });

    it('emits the selected date when a new day is chosen', () => {
        // arrange
        const component = TestBed.runInInjectionContext(() => new DayStripComponent());
        const selectedDateChanged = vi.fn();
        component.selectedDateChanged.subscribe(selectedDateChanged);
        const date = new Date('2024-04-17T12:00:00.000Z');

        // act
        (component as unknown as { onDateSelected(date: Date): void }).onDateSelected(date);

        // assert
        expect(selectedDateChanged).toHaveBeenCalledWith({ sender: component, date });
    });
});
