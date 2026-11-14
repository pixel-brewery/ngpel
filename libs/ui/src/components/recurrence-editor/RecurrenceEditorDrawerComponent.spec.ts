import { TestBed } from '@angular/core/testing';
import { DRAWER_REF, DRAWER_REF_DATA } from '@pixel-brewery/mosaik-elements-angular';
import { describe, expect, it, vi } from 'vitest';
import type { IRecurrenceEditorOptions } from './IRecurrenceEditorOptions';
import { RecurrenceEditorDrawerComponent } from './RecurrenceEditorDrawerComponent';
import { RECURRENCE_DEFAULT_VALUE } from './RecurrenceRule';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { InjectionToken } = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    return {
        ButtonComponent: class ButtonComponent {},
        Cancel: { positive: (result: unknown) => ({ reason: 'positive', result }) },
        ChoiceComponent: class ChoiceComponent {},
        createTourAccessorTarget: (element: unknown, value: unknown) => ({ element, value }),
        DRAWER_REF: new InjectionToken('DRAWER_REF'),
        DRAWER_REF_DATA: new InjectionToken('DRAWER_REF_DATA'),
        DrawerContentDirective: class DrawerContentDirective {},
        DrawerFooterDirective: class DrawerFooterDirective {},
        DrawerHeaderComponent: class DrawerHeaderComponent {},
        DrawerHeaderDirective: class DrawerHeaderDirective {},
        FormFieldComponent: class FormFieldComponent {},
        FormFieldDirective: class FormFieldDirective {},
        FormFieldStateDirective: class FormFieldStateDirective {},
        TimeBoxComponent: class TimeBoxComponent {},
        ToggleSwitchComponent: class ToggleSwitchComponent {},
        TOUR_ACCESSOR: new InjectionToken('TOUR_ACCESSOR'),
        TourAccessorDirective: class TourAccessorDirective {},
        TourAnchorDirective: class TourAnchorDirective {},
    };
});
vi.mock('@pixel-brewery/mosaik-elements-foundation', () => ({
    ITimeSpan: { create: (hours: number, minutes: number) => ({ hours, minutes }) },
}));
vi.mock('./RecurrenceEditorComponent', () => ({ RecurrenceEditorComponent: class RecurrenceEditorComponent {} }));

class TestDrawer extends RecurrenceEditorDrawerComponent {
    public setEndAt(date: Date): void {
        this.fields.recurrenceEndAt().value.set(date);
    }

    public enableScheduledTime(): void {
        this.fields.scheduleTime().value.set(true);
    }

    public fillTimeModeFromTour(): void {
        this.tourTargets.get('timeMode')?.value?.()?.set(true);
    }

    public removeEnd(): void {
        this.fields.recurrenceEndMode().value.set('NEVER');
    }

    public save(): void {
        this.apply();
    }

    public readSummary(): { readonly head: string; readonly detail: string } | undefined {
        return this.summary();
    }
}

function openDrawer(options: IRecurrenceEditorOptions): { drawer: TestDrawer; close: ReturnType<typeof vi.fn> } {
    const close = vi.fn();
    TestBed.configureTestingModule({
        providers: [
            { provide: DRAWER_REF, useValue: { close } },
            { provide: DRAWER_REF_DATA, useValue: options },
        ],
    });

    return { drawer: TestBed.runInInjectionContext(() => new TestDrawer()), close };
}

describe('RecurrenceEditorDrawerComponent', () => {
    it.each([
        ['calendar-day', new Date(2027, 2, 28, 23, 59, 59)],
        [undefined, new Date(2027, 2, 28, 8, 45)],
    ] as const)('applies the selected end using the configured date mode (%s)', (endDateMode, expected) => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const, recurrenceEndMode: 'UNTIL' as const };
        const { drawer, close } = openDrawer({ value, endDateMode });
        drawer.setEndAt(new Date(2027, 2, 28, 8, 45));

        // Act
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: { ...value, recurrenceEndAt: expected.toISOString() } });
    });

    it('discards the old calendar-day end when changing the series to run indefinitely', () => {
        // Arrange
        const value = {
            ...RECURRENCE_DEFAULT_VALUE,
            recurrenceFrequency: 'DAILY' as const,
            recurrenceEndMode: 'UNTIL' as const,
            recurrenceEndAt: '2027-03-28',
        };
        const { drawer, close } = openDrawer({ value, endDateMode: 'calendar-day' });
        drawer.removeEnd();

        // Act
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: { ...value, recurrenceEndMode: 'NEVER', recurrenceEndAt: '' } });
    });

    it('keeps an all-day recurrence all-day when a default time is configured', () => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const };
        const { drawer, close } = openDrawer({ value, defaultTime: '08:00' });

        // Act
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: value });
    });

    it('updates the localized summary using the same time as the saved draft', () => {
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const };
        const { drawer } = openDrawer({
            value,
            defaultTime: '08:00',
            summaryLabels: {
                allDay: 'All day',
                every: () => 'Every day',
                atTime: (time) => `at ${time}`,
                formatTime: (time) => time,
                never: 'Runs indefinitely.',
            },
        });

        drawer.enableScheduledTime();

        expect(drawer.readSummary()).toEqual({ head: 'Every day at 08:00', detail: 'Runs indefinitely.' });
    });

    it('uses the default time when switching a recurrence to timed', () => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const };
        const { drawer, close } = openDrawer({ value, defaultTime: '08:00' });
        drawer.enableScheduledTime();

        // Act
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: { ...value, recurrenceTime: '08:00' } });
    });

    it('lets the tour fill the time mode through the same form used on save', () => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const };
        const { drawer, close } = openDrawer({ value, defaultTime: '08:00' });

        // Act
        drawer.fillTimeModeFromTour();
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: { ...value, recurrenceTime: '08:00' } });
    });

    it('keeps a stored time ahead of the configured default', () => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const, recurrenceTime: '07:15' };
        const { drawer, close } = openDrawer({ value, defaultTime: '08:00' });

        // Act
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: value });
    });

    it('initializes a locked timed recurrence that has no stored time', () => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const };
        const { drawer, close } = openDrawer({ value, defaultTime: '08:00', timeMode: 'DATETIME' });

        // Act
        drawer.save();

        // Assert
        expect(close).toHaveBeenCalledWith({ reason: 'positive', result: { ...value, recurrenceTime: '08:00' } });
    });
});
