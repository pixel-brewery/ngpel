// #region Imports

import { Component, Directive, ɵresolveComponentResources as resolveComponentResources, ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WeekPanelComponent } from './WeekPanelComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => {
    class ButtonStub {}
    class ClickableStub {}
    class IconNameStub {}
    class TextStub {}
    class TypographyStub {}

    Component({
        selector: 'mosaik-button',
        standalone: true,
        template: '',
        inputs: ['appearance', 'disabled', 'iconName', 'iconSize', 'size', 'type', 'variant'],
    })(ButtonStub);
    Component({
        selector: 'mosaik-clickable',
        standalone: true,
        template: '<ng-content />',
        inputs: ['disabled'],
    })(ClickableStub);
    Component({ selector: 'mosaik-text', standalone: true, template: '', inputs: ['text'] })(TextStub);
    Directive({ selector: '[iconName]', standalone: true, inputs: ['iconName'] })(IconNameStub);
    Directive({ selector: '[mosaikTypography]', standalone: true, inputs: ['mosaikTypography'] })(TypographyStub);

    return {
        ButtonComponent: ButtonStub,
        ClickableComponent: ClickableStub,
        GlobalDomRef: class GlobalDomRef {},
        IconNameDirective: IconNameStub,
        IconRegistry: class IconRegistry {},
        MessageBoxService: class MessageBoxService {},
        provideGlobalDom: () => [],
        TextComponent: TextStub,
        ToastService: class ToastService {},
        TranslateService: class TranslateService {},
        TypographyDirective: TypographyStub,
    };
});

interface IWeekPanelTestApi {
    readonly additionalWeeks: () => ReadonlyArray<Date>;
    readonly canExpand: () => boolean;
    readonly effectiveExpanded: () => boolean;
    readonly isPaging: () => boolean;
    readonly navigationDirection: () => 'next' | 'previous' | null;
    readonly outgoingDisplayDate: () => Date | null;
    readonly visibleWeeks: () => ReadonlyArray<Date>;
    navigate(direction: 'next' | 'previous'): void;
    onDateSelected(date: Date): void;
    onPagingAnimationEnd(event: AnimationEvent): void;
    toggleExpanded(): void;
}

describe('WeekPanelComponent', () => {
    let fixture: ComponentFixture<WeekPanelComponent>;
    let component: WeekPanelComponent;
    let api: IWeekPanelTestApi;

    beforeEach(async () => {
        await resolveComponentResources(async (resourceUrl) => {
            const componentDirectory = resourceUrl.includes('WeekStripComponent') ? '../week-strip' : '.';

            return readFile(resolve(import.meta.dirname, componentDirectory, resourceUrl), 'utf8');
        });
        await TestBed.configureTestingModule({
            imports: [WeekPanelComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WeekPanelComponent);
        component = fixture.componentInstance;
        api = component as unknown as IWeekPanelTestApi;
        setSignalInput(component.panelLabel, 'Tasks by week');
        setSignalInput(component.previousLabel, 'Previous week');
        setSignalInput(component.nextLabel, 'Next week');
        setSignalInput(component.expandLabel, 'Show more weeks');
        setSignalInput(component.collapseLabel, 'Show fewer weeks');
        component.displayDate.set(new Date(2026, 11, 30));
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('starts with one week and expands to the configured three-week window', () => {
        // assert
        expect(api.visibleWeeks()).toHaveLength(1);
        expect(api.effectiveExpanded()).toBe(false);

        // act
        api.toggleExpanded();

        // assert
        expect(api.visibleWeeks()).toHaveLength(3);
        expect(api.effectiveExpanded()).toBe(true);
    });

    it('keeps additional weeks available throughout the expand and collapse transition', () => {
        // arrange
        const collapsedRows = api.additionalWeeks();

        // assert
        expect(collapsedRows).toHaveLength(2);
        expect(api.effectiveExpanded()).toBe(false);

        // act
        api.toggleExpanded();

        // assert
        expect(api.additionalWeeks()).toBe(collapsedRows);
        expect(api.effectiveExpanded()).toBe(true);

        // act
        api.toggleExpanded();

        // assert
        expect(api.additionalWeeks()).toBe(collapsedRows);
        expect(api.effectiveExpanded()).toBe(false);
    });

    it('supports a fixed non-expandable week configuration', () => {
        // arrange
        setSignalInput(component.compactWeekCount, 2);
        setSignalInput(component.expandedWeekCount, 4);
        setSignalInput(component.expandable, false);
        component.expanded.set(true);

        // act
        api.toggleExpanded();

        // assert
        expect(api.canExpand()).toBe(false);
        expect(api.effectiveExpanded()).toBe(false);
        expect(api.visibleWeeks()).toHaveLength(2);
    });

    it('navigates the complete panel by one calendar week across a year boundary', () => {
        // act
        api.navigate('next');

        // assert
        expect(component.displayDate().getFullYear()).toBe(2027);
        expect(component.displayDate().getMonth()).toBe(0);
        expect(component.displayDate().getDate()).toBe(6);
    });

    it('navigates by the complete dynamically configured visible week window', () => {
        // arrange
        setSignalInput(component.compactWeekCount, 2);
        setSignalInput(component.expandedWeekCount, 4);

        // act
        api.navigate('next');

        // assert
        expect(component.displayDate().getFullYear()).toBe(2027);
        expect(component.displayDate().getMonth()).toBe(0);
        expect(component.displayDate().getDate()).toBe(13);

        // arrange
        const page = {} as EventTarget;
        api.onPagingAnimationEnd({ target: page, currentTarget: page } as AnimationEvent);
        component.displayDate.set(new Date(2026, 11, 30));
        component.expanded.set(true);

        // act
        api.navigate('previous');

        // assert
        expect(component.displayDate().getFullYear()).toBe(2026);
        expect(component.displayDate().getMonth()).toBe(11);
        expect(component.displayDate().getDate()).toBe(2);
    });

    it('keeps the outgoing week page available until horizontal paging finishes', () => {
        // arrange
        const initialDisplayDate = component.displayDate();

        // act
        api.navigate('next');

        // assert
        expect(api.isPaging()).toBe(true);
        expect(api.navigationDirection()).toBe('next');
        expect(api.outgoingDisplayDate()).toBe(initialDisplayDate);

        // act
        api.navigate('next');

        // assert
        expect(component.displayDate().getDate()).toBe(6);

        // act
        const page = {} as EventTarget;
        api.onPagingAnimationEnd({ target: page, currentTarget: page } as AnimationEvent);

        // assert
        expect(api.isPaging()).toBe(false);
        expect(api.navigationDirection()).toBeNull();
        expect(api.outgoingDisplayDate()).toBeNull();
    });

    it('publishes Angular and native command events for the selected date', () => {
        // arrange
        const output = vi.fn();
        const nativeEvent = vi.fn();
        const selectedDate = new Date(2027, 0, 2, 12);
        component.dateChanged.subscribe(output);
        fixture.nativeElement.addEventListener('dateChanged', nativeEvent);

        // act
        api.onDateSelected(selectedDate);

        // assert
        expect(component.selectedDate()).not.toBe(selectedDate);
        expect(component.selectedDate()?.getTime()).toBe(selectedDate.getTime());
        expect(output).toHaveBeenCalledWith(component.selectedDate());
        expect((nativeEvent.mock.calls[0]?.[0] as CustomEvent<Date>).detail).toBe(component.selectedDate());
    });

    it('publishes the new display date as a native command event after paging', () => {
        // arrange
        const nativeEvent = vi.fn();
        fixture.nativeElement.addEventListener('displayDateChange', nativeEvent);

        // act
        api.navigate('next');

        // assert
        expect(nativeEvent).toHaveBeenCalledOnce();
        expect((nativeEvent.mock.calls[0]?.[0] as CustomEvent<Date>).detail).toBe(component.displayDate());
    });

    it('rejects invalid compact and expanded week counts', () => {
        // act
        setSignalInput(component.compactWeekCount, 0);

        // assert
        expect(() => api.visibleWeeks()).toThrowError(/compactWeekCount/u);

        // arrange
        setSignalInput(component.compactWeekCount, 2);
        setSignalInput(component.expandedWeekCount, 1);

        // assert
        expect(() => api.visibleWeeks()).toThrowError(/expandedWeekCount/u);
    });
});

function setSignalInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
