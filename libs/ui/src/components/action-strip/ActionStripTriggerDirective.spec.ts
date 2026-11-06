import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ActionStripTriggerDirective } from './ActionStripTriggerDirective';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    MenuComponent: class MenuStub {},
    PopupComponent: class PopupStub {},
}));

const ITEM = { id: 7 };

function createRowPointerEvent(trigger: HTMLElement, row: HTMLElement, type: 'pointerover' | 'pointermove', clientY: number): PointerEvent {
    const event = new MouseEvent(type, { bubbles: true, clientX: 20, clientY }) as PointerEvent;
    vi.spyOn(event, 'composedPath').mockReturnValue([row, trigger, document.body, document]);
    return event;
}

function createTableRow(value: typeof ITEM): HTMLElement {
    const row = Object.assign(document.createElement('mosaik-table-body-row'), { value });
    vi.spyOn(row, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 20, 100, 80));
    return row;
}

describe(ActionStripTriggerDirective.name, () => {
    const strip = {
        cancelScheduledHide: vi.fn(),
        hide: vi.fn(),
        show: vi.fn(),
        scheduleHide: vi.fn(),
    };
    let host: HTMLElement;
    let trigger: HTMLElement;
    let directive: ActionStripTriggerDirective;

    beforeEach(() => {
        host = document.createElement('div');
        trigger = document.createElement('div');
        host.append(trigger);
        document.body.append(host);
        vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 20, 100, 40));
        TestBed.configureTestingModule({ providers: [{ provide: ElementRef, useValue: new ElementRef(trigger) }] });
        directive = TestBed.runInInjectionContext(() => new ActionStripTriggerDirective());
        Object.defineProperty(directive, 'strip', { value: signal(strip) });
    });

    afterEach(() => {
        host.remove();
        vi.clearAllMocks();
        TestBed.resetTestingModule();
    });

    it('shows the declaratively bound item on pointer hover', () => {
        // Arrange
        Object.defineProperty(directive, 'value', { value: signal(ITEM) });
        const event = new MouseEvent('pointerover', { clientX: 20, clientY: 30 }) as PointerEvent;

        // Act
        directive.onPointerOver(event);

        // Assert
        expect(strip.show).toHaveBeenCalledWith({ boundaries: [], context: ITEM, origin: trigger });
    });

    it('resolves a data-table row through the composed event path', () => {
        // Arrange
        const row = createTableRow(ITEM);
        const event = createRowPointerEvent(trigger, row, 'pointerover', 30);

        // Act
        directive.onPointerOver(event);

        // Assert
        expect(strip.show).toHaveBeenCalledWith({ boundaries: [], context: ITEM, origin: row });
    });

    it('reattaches when pointer movement exposes another shadow DOM row', () => {
        // Arrange
        const first = createTableRow(ITEM);
        const nextItem = { id: 8 };
        const second = createTableRow(nextItem);
        directive.onPointerOver(createRowPointerEvent(trigger, first, 'pointerover', 30));

        // Act
        directive.onPointerMove(createRowPointerEvent(trigger, second, 'pointermove', 70));

        // Assert
        expect(strip.show).toHaveBeenNthCalledWith(2, { boundaries: [], context: nextItem, origin: second });
    });

    it('cancels a pending hide while the pointer moves inside the active row', () => {
        // Arrange
        const row = createTableRow(ITEM);
        directive.onPointerOver(createRowPointerEvent(trigger, row, 'pointerover', 30));

        // Act
        directive.onPointerMove(createRowPointerEvent(trigger, row, 'pointermove', 31));

        // Assert
        expect(strip.show).toHaveBeenCalledTimes(1);
        expect(strip.cancelScheduledHide).toHaveBeenCalledOnce();
    });

    it('ignores pointer transitions from a child of the active item', () => {
        // Arrange
        Object.defineProperty(directive, 'value', { value: signal(ITEM) });
        const child = document.createElement('span');
        trigger.append(child);
        const event = new MouseEvent('pointerover', { clientX: 20, clientY: 30, relatedTarget: child }) as PointerEvent;

        // Act
        directive.onPointerOver(event);

        // Assert
        expect(strip.show).not.toHaveBeenCalled();
    });

    it('ignores the clipped portion of an otherwise visible item', () => {
        // Arrange
        host.style.overflow = 'hidden';
        vi.spyOn(host, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 80, 200));
        Object.defineProperty(directive, 'value', { value: signal(ITEM) });
        const event = new MouseEvent('pointerover', { clientX: 100, clientY: 30 }) as PointerEvent;

        // Act
        directive.onPointerOver(event);

        // Assert
        expect(strip.show).not.toHaveBeenCalled();
    });

    it('keeps the strip visible when the pointer moves into an item action', () => {
        // Arrange
        Object.defineProperty(directive, 'value', { value: signal(ITEM) });
        const action = document.createElement('button');
        trigger.append(action);
        const event = new MouseEvent('pointerout', { relatedTarget: action }) as PointerEvent;

        // Act
        directive.onPointerOut(event);

        // Assert
        expect(strip.scheduleHide).not.toHaveBeenCalled();
    });

    it('schedules hiding when the pointer leaves the item', () => {
        // Arrange
        Object.defineProperty(directive, 'value', { value: signal(ITEM) });
        const event = new MouseEvent('pointerout', { relatedTarget: document.body }) as PointerEvent;

        // Act
        directive.onPointerOut(event);

        // Assert
        expect(strip.scheduleHide).toHaveBeenCalledWith(trigger);
    });

    it('schedules hiding when keyboard focus leaves the item', () => {
        // Arrange
        Object.defineProperty(directive, 'value', { value: signal(ITEM) });
        const event = new FocusEvent('focusout', { relatedTarget: document.body });

        // Act
        directive.onFocusOut(event);

        // Assert
        expect(strip.scheduleHide).toHaveBeenCalledWith(trigger);
    });
});
