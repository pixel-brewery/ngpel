// #region Imports

import { Component, ElementRef, type Signal, signal, type WritableSignal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoverRevealForDirective } from './HoverRevealForDirective';
import type { HoverRevealTarget } from './HoverRevealTarget';

// #endregion

/**
 * Replaces the signal inputs of a directive or component instance with signals the spec owns.
 *
 * The just-in-time compiler never sees an `input()` initialiser, so a template binding reports
 * `NG0303` and the value never reaches the directive. Substituting the field with a signal the spec
 * owns feeds exactly the reads the directive performs. Call it directly after
 * `TestBed.createComponent(...)` and before the first change detection. Because the class field is
 * replaced, an input `alias` or `transform` is no longer exercised — cover a transform by testing
 * its own module.
 */
function applySignalInputs<TTarget extends object>(
    target: TTarget,
    inputs: { readonly [TKey in keyof TTarget]?: TTarget[TKey] extends Signal<infer TValue> ? Signal<TValue> : never },
): void {
    for (const name of Object.keys(inputs) as Array<keyof TTarget & string>) {
        Object.defineProperty(target, name, { configurable: true, value: inputs[name] });
    }
}

@Component({
    imports: [HoverRevealForDirective],
    template: `
        <div id="row">
            <button id="action" type="button" ngpHoverRevealFor>Delete</button>
        </div>
        <div id="other"><button id="inner" type="button">Inner</button></div>
        <button id="outside" type="button">Outside</button>
    `,
})
class HostComponent {}

describe('HoverRevealForDirective', () => {
    let action: HTMLButtonElement;
    let fixture: ComponentFixture<HostComponent>;
    let other: HTMLDivElement;
    let outside: HTMLButtonElement;
    let row: HTMLDivElement;
    let target: WritableSignal<HoverRevealTarget>;
    let hoverCapability: EventTarget;
    let hoverless: boolean;

    beforeEach(() => {
        hoverless = false;
        hoverCapability = new EventTarget();
        Object.defineProperty(hoverCapability, 'matches', { get: () => hoverless });
        vi.stubGlobal('matchMedia', (query: string) => (query === '(hover: none)' ? hoverCapability : undefined));
        fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
        const root = fixture.nativeElement as HTMLElement;
        action = root.querySelector('#action') as HTMLButtonElement;
        other = root.querySelector('#other') as HTMLDivElement;
        outside = root.querySelector('#outside') as HTMLButtonElement;
        row = root.querySelector('#row') as HTMLDivElement;
        target = signal<HoverRevealTarget>(row);
        const directive = fixture.debugElement.query(By.directive(HoverRevealForDirective)).injector.get(HoverRevealForDirective);
        applySignalInputs(directive, { for: target });
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.unstubAllGlobals();
    });

    it('keeps the contextual action in layout while hiding it at rest', () => {
        // Arrange

        // Act
        const opacity = action.style.opacity;

        // Assert
        expect(opacity).toBe('0');
        expect(action.style.pointerEvents).toBe('none');
    });

    it('keeps the action visible after pointer leave when the primary pointer cannot hover', () => {
        // Arrange
        hoverless = true;
        hoverCapability.dispatchEvent(new Event('change'));

        // Act
        row.dispatchEvent(new MouseEvent('mouseleave'));

        // Assert
        expect(action.style.opacity).toBe('1');
        expect(action.style.pointerEvents).toBe('auto');
    });

    it('re-applies hover-dependent visibility when the primary pointer gains hover', () => {
        // Arrange
        hoverless = true;
        hoverCapability.dispatchEvent(new Event('change'));
        expect(action.style.pointerEvents).toBe('auto');
        hoverless = false;

        // Act
        hoverCapability.dispatchEvent(new Event('change'));

        // Assert
        expect(action.style.opacity).toBe('0');
        expect(action.style.pointerEvents).toBe('none');
    });

    it('reveals the action when the pointer enters the target', () => {
        // Arrange

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('1');
        expect(action.style.pointerEvents).toBe('auto');
    });

    it('hides the action again when the pointer leaves the target', () => {
        // Arrange
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Act
        row.dispatchEvent(new MouseEvent('mouseleave'));

        // Assert
        expect(action.style.opacity).toBe('0');
        expect(action.style.pointerEvents).toBe('none');
    });

    it('reveals the action for keyboard focus within the target', () => {
        // Arrange

        // Act
        action.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        // Assert
        expect(action.style.opacity).toBe('1');
        expect(action.style.pointerEvents).toBe('auto');
    });

    it('stays revealed while focus moves within the target', () => {
        // Arrange
        action.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        // Act
        action.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: row }));

        // Assert
        expect(action.style.opacity).toBe('1');
    });

    it('hides the action after focus leaves the target', () => {
        // Arrange
        action.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        // Act
        action.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: outside }));

        // Assert
        expect(action.style.opacity).toBe('0');
        expect(action.style.pointerEvents).toBe('none');
    });

    it('accepts an ElementRef as target', () => {
        // Arrange
        target.set(new ElementRef(row));
        fixture.detectChanges();

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('1');
    });

    it('accepts a component exposing an elementRef as target', () => {
        // Arrange
        target.set({ elementRef: new ElementRef(row) });
        fixture.detectChanges();

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('1');
    });

    it('releases the previous target when the target changes', () => {
        // Arrange
        target.set(other);
        fixture.detectChanges();

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('0');
    });

    it('stays hidden and ignores events when the target is null', () => {
        // Arrange
        row.dispatchEvent(new MouseEvent('mouseenter'));
        target.set(null);
        fixture.detectChanges();

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('0');
        expect(action.style.pointerEvents).toBe('none');
    });

    it('ignores objects that do not expose an ElementRef', () => {
        // Arrange
        target.set({ elementRef: row } as unknown as HoverRevealTarget);
        fixture.detectChanges();

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('0');
    });

    it('removes the listeners on destruction', () => {
        // Arrange
        fixture.destroy();

        // Act
        row.dispatchEvent(new MouseEvent('mouseenter'));

        // Assert
        expect(action.style.opacity).toBe('0');
    });
});
