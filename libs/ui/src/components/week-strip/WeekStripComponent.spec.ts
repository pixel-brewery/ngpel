// #region Imports

import { Component, Directive, ɵresolveComponentResources as resolveComponentResources, ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import type { DayOfWeek } from '@pixel-brewery/mosaik-elements-foundation';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WeekStripComponent } from './WeekStripComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => {
    class ClickableStub {}
    class TextStub {}
    class TypographyStub {}

    Component({
        selector: 'mosaik-clickable',
        standalone: true,
        template: '<ng-content />',
        inputs: ['disabled'],
    })(ClickableStub);
    Component({ selector: 'mosaik-text', standalone: true, template: '', inputs: ['text'] })(TextStub);
    Directive({ selector: '[mosaikTypography]', standalone: true, inputs: ['mosaikTypography'] })(TypographyStub);

    return {
        ClickableComponent: ClickableStub,
        TextComponent: TextStub,
        TypographyDirective: TypographyStub,
    };
});

interface IWeekStripTestApi {
    readonly weekDates: () => ReadonlyArray<Date>;
    isEventDate(date: Date): boolean;
    onDateSelected(date: Date): void;
}

describe('WeekStripComponent', () => {
    let fixture: ComponentFixture<WeekStripComponent>;
    let component: WeekStripComponent;
    let api: IWeekStripTestApi;

    beforeEach(async () => {
        await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
        await TestBed.configureTestingModule({ imports: [WeekStripComponent] }).compileComponents();

        fixture = TestBed.createComponent(WeekStripComponent);
        component = fixture.componentInstance;
        api = component as unknown as IWeekStripTestApi;
        setSignalInput(component.displayDate, new Date(2026, 11, 31));
        setSignalInput(component.firstDayOfWeek, 1 as DayOfWeek);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('builds one locale-controlled week across month and year boundaries', () => {
        // act
        const dates = api.weekDates();

        // assert
        expect(dates.map((date) => [date.getFullYear(), date.getMonth(), date.getDate()])).toEqual([
            [2026, 11, 28],
            [2026, 11, 29],
            [2026, 11, 30],
            [2026, 11, 31],
            [2027, 0, 1],
            [2027, 0, 2],
            [2027, 0, 3],
        ]);
    });

    it('matches event markers by the complete local calendar date', () => {
        // arrange
        setSignalInput(component.events, [new Date(2027, 0, 1, 18, 30)]);

        // act
        const matchingDate = api.isEventDate(new Date(2027, 0, 1, 8));
        const sameDayOfMonth = api.isEventDate(new Date(2026, 11, 1, 8));

        // assert
        expect(matchingDate).toBe(true);
        expect(sameDayOfMonth).toBe(false);
    });

    it('emits a defensive date copy when a day is selected', () => {
        // arrange
        const selected = vi.fn();
        const date = new Date(2027, 0, 1, 12);
        component.dateSelected.subscribe(selected);

        // act
        api.onDateSelected(date);

        // assert
        expect(selected).toHaveBeenCalledOnce();
        expect(selected.mock.calls[0]?.[0]).not.toBe(date);
        expect((selected.mock.calls[0]?.[0] as Date).getTime()).toBe(date.getTime());
    });
});

function setSignalInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
