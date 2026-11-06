import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContextMenuTriggerDirective } from './ContextMenuTriggerDirective';

interface ITriggerHandlers {
    onContextMenu(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
}

describe(ContextMenuTriggerDirective.name, () => {
    const open = vi.fn(async () => undefined);
    let trigger: HTMLElement;
    let directive: ContextMenuTriggerDirective;
    let handlers: ITriggerHandlers;

    beforeEach(() => {
        trigger = document.createElement('div');
        TestBed.configureTestingModule({ providers: [{ provide: ElementRef, useValue: new ElementRef(trigger) }] });
        directive = TestBed.runInInjectionContext(() => new ContextMenuTriggerDirective());
        handlers = directive as unknown as ITriggerHandlers;
        Object.defineProperty(directive, 'menu', { value: signal({ open }) });
    });

    afterEach(() => {
        open.mockClear();
        TestBed.resetTestingModule();
    });

    it('takes a row value from the composed event path and anchors at the pointer', () => {
        // Arrange
        const row = Object.assign(document.createElement('mosaik-table-body-row'), { value: { id: 7 } });
        const event = new MouseEvent('contextmenu', { cancelable: true, clientX: 23, clientY: 41 });
        vi.spyOn(event, 'composedPath').mockReturnValue([document.createElement('span'), row, trigger]);

        // Act
        handlers.onContextMenu(event);

        // Assert
        expect(event.defaultPrevented).toBe(true);
        expect(open).toHaveBeenCalledWith({ clientX: 23, clientY: 41, context: { id: 7 }, origin: row });
    });

    it('preserves native context-menu behavior on a table header without a row value', () => {
        // Arrange
        const event = new MouseEvent('contextmenu', { cancelable: true });
        vi.spyOn(event, 'composedPath').mockReturnValue([document.createElement('mosaik-table-header-row'), trigger]);

        // Act
        handlers.onContextMenu(event);

        // Assert
        expect(event.defaultPrevented).toBe(false);
        expect(open).not.toHaveBeenCalled();
    });

    it('opens beside an explicitly bound falsy value through Shift+F10', () => {
        // Arrange
        Object.defineProperty(directive, 'value', { value: signal(false) });
        vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(new DOMRect(14, 40, 80, 32));
        const event = new KeyboardEvent('keydown', { cancelable: true, key: 'F10', shiftKey: true });

        // Act
        handlers.onKeyDown(event);

        // Assert
        expect(event.defaultPrevented).toBe(true);
        expect(open).toHaveBeenCalledWith({ clientX: 14, clientY: 72, context: false, origin: trigger });
    });
});
