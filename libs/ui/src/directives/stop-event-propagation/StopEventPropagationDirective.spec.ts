// #region Imports

import { Component, type Signal, signal, type WritableSignal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StopEventPropagationDirective } from './StopEventPropagationDirective';
import type { StopEventPropagationEventName } from './StopEventPropagationEventName';

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
    imports: [StopEventPropagationDirective],
    template: `
        <div
            id="row"
            role="button"
            tabindex="0"
            (click)="outer($event)"
            (dblclick)="outer($event)"
            (keydown)="outer($event)"
            (keyup)="outer($event)"
            (pointerdown)="outer($event)"
        >
            <button id="configured" type="button" ngpStopEventPropagation>configured</button>
            <button id="bare" type="button" ngpStopEventPropagation>bare</button>
        </div>
    `,
})
class HostComponent {
    public readonly outer = vi.fn();
}

describe('StopEventPropagationDirective', () => {
    let bare: HTMLButtonElement;
    let configured: HTMLButtonElement;
    let events: WritableSignal<boolean | ReadonlyArray<StopEventPropagationEventName>>;
    let fixture: ComponentFixture<HostComponent>;
    let keys: WritableSignal<ReadonlyArray<string> | null>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
        const root = fixture.nativeElement as HTMLElement;
        bare = root.querySelector('#bare') as HTMLButtonElement;
        configured = root.querySelector('#configured') as HTMLButtonElement;
        const directive = fixture.debugElement.query(By.css('#configured')).injector.get(StopEventPropagationDirective);
        events = signal(directive.events());
        keys = signal(directive.keys());
        applySignalInputs(directive, { events, keys });
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('stops a click by default', () => {
        // Arrange

        // Act
        configured.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('stops a keydown by default', () => {
        // Arrange

        // Act
        configured.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'a' }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('stops a double click by default', () => {
        // Arrange

        // Act
        configured.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('stops the event for a host that never configures the directive', () => {
        // Arrange

        // Act
        bare.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('lets events through when disabled', () => {
        // Arrange
        events.set(false);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Assert
        expect(fixture.componentInstance.outer).toHaveBeenCalledOnce();
    });

    it('stops a listed event', () => {
        // Arrange
        events.set(['click']);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('lets an unlisted event through', () => {
        // Arrange
        events.set(['click']);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

        // Assert
        expect(fixture.componentInstance.outer).toHaveBeenCalledOnce();
    });

    it('stops a filtered key', () => {
        // Arrange
        events.set(['click', 'keydown']);
        keys.set(['enter', 'space']);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('stops the space bar for a filter that lists it by name', () => {
        // Arrange
        events.set(['click', 'keydown']);
        keys.set(['enter', 'space']);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('lets an unfiltered key through', () => {
        // Arrange
        events.set(['click', 'keydown']);
        keys.set(['enter', 'space']);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'a' }));

        // Assert
        expect(fixture.componentInstance.outer).toHaveBeenCalledOnce();
    });

    it('does not apply the key filter to pointer events', () => {
        // Arrange
        keys.set(['enter']);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Assert
        expect(fixture.componentInstance.outer).not.toHaveBeenCalled();
    });

    it('lets every keyboard event through for an empty key filter', () => {
        // Arrange
        keys.set([]);
        fixture.detectChanges();

        // Act
        configured.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));

        // Assert
        expect(fixture.componentInstance.outer).toHaveBeenCalledOnce();
    });
});
