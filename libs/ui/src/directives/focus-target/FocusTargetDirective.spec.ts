// #region Imports

import { Component, type Signal, signal, type WritableSignal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FocusTargetDirective } from './FocusTargetDirective';
import type { IFocusTargetMarker } from './IFocusTargetMarker';

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

/** Handle returned by {@link installFakeAnimationFrames}. */
interface IFakeAnimationFrameInstallation {
    readonly pending: number;
    step(): void;
    flush(): void;
    restore(): void;
}

/**
 * Replaces `requestAnimationFrame` and `cancelAnimationFrame` with a queue the spec drives frame by
 * frame. Callbacks are tracked by handle rather than by queue position, because Angular's own
 * scheduler requests frames as well.
 */
function installFakeAnimationFrames(scope: object = globalThis): IFakeAnimationFrameInstallation {
    const MAXIMUM_FLUSHED_FRAMES = 50;
    const callbacks = new Map<number, FrameRequestCallback>();
    const previousCancel = Object.getOwnPropertyDescriptor(scope, 'cancelAnimationFrame');
    const previousRequest = Object.getOwnPropertyDescriptor(scope, 'requestAnimationFrame');
    let lastHandle = 0;

    const request = (callback: FrameRequestCallback): number => {
        lastHandle += 1;
        callbacks.set(lastHandle, callback);

        return lastHandle;
    };

    const cancel = (handle: number): void => {
        callbacks.delete(handle);
    };

    const step = (): void => {
        const frame = [...callbacks];
        callbacks.clear();
        for (const [, callback] of frame) {
            callback(0);
        }
    };

    const restoreGlobal = (name: string, previous: PropertyDescriptor | undefined): void => {
        if (previous) {
            Object.defineProperty(scope, name, previous);
        } else {
            Reflect.deleteProperty(scope, name);
        }
    };

    Object.defineProperty(scope, 'requestAnimationFrame', { configurable: true, writable: true, value: request });
    Object.defineProperty(scope, 'cancelAnimationFrame', { configurable: true, writable: true, value: cancel });

    return {
        get pending(): number {
            return callbacks.size;
        },
        step,
        flush(): void {
            for (let frame = 0; callbacks.size > 0; frame++) {
                if (frame >= MAXIMUM_FLUSHED_FRAMES) {
                    throw new Error(`installFakeAnimationFrames: callbacks were still being scheduled after ${MAXIMUM_FLUSHED_FRAMES} frames.`);
                }

                step();
            }
        },
        restore(): void {
            restoreGlobal('cancelAnimationFrame', previousCancel);
            restoreGlobal('requestAnimationFrame', previousRequest);
        },
    };
}

@Component({
    imports: [FocusTargetDirective],
    template: `
        <section id="host" data-focus-target="host" tabindex="-1" ngpFocusTarget>
            <div data-focus-target="name"><span>Name</span><input id="name-input" /></div>
            <div data-focus-target="mixed"><input id="mixed-input" /><button id="mixed-button" type="button">Mixed</button></div>
            <section data-focus-target="tabbed" tabindex="-1"><button id="tabbed-button" type="button">Tabbed</button></section>
            <div data-focus-target="note"><span>No focusable child</span></div>
            <h2 id="summary" data-focus-target="summary" tabindex="-1">Summary</h2>
            <div data-key="alternate"><button id="alternate-button" type="button">Alternate</button></div>
            <div data-focus-target='quo"te'><button id="quoted-button" type="button">Quoted</button></div>
        </section>
    `,
})
class HostComponent {}

describe('FocusTargetDirective', () => {
    let animationFrames: IFakeAnimationFrameInstallation;
    let attribute: WritableSignal<string>;
    let fallbacks: WritableSignal<ReadonlyArray<IFocusTargetMarker>>;
    let fixture: ComponentFixture<HostComponent>;
    let focusableSelector: WritableSignal<string>;
    let key: WritableSignal<string | null>;
    let originalScrollIntoView: PropertyDescriptor | undefined;
    let request: WritableSignal<number>;
    let scrollBlock: WritableSignal<ScrollLogicalPosition | null>;
    let scrollIntoView: ReturnType<typeof vi.fn>;
    let selfFocusableSelector: WritableSignal<string | null>;

    beforeEach(() => {
        animationFrames = installFakeAnimationFrames();
        originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView');
        scrollIntoView = vi.fn();
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView });
        fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
        const directive = fixture.debugElement.query(By.directive(FocusTargetDirective)).injector.get(FocusTargetDirective);
        attribute = signal(directive.attribute());
        fallbacks = signal(directive.fallbacks());
        focusableSelector = signal(directive.focusableSelector());
        key = signal(directive.key());
        request = signal(directive.request());
        scrollBlock = signal(directive.scrollBlock());
        selfFocusableSelector = signal(directive.selfFocusableSelector());
        applySignalInputs(directive, { attribute, fallbacks, focusableSelector, key, request, scrollBlock, selfFocusableSelector });
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        animationFrames.restore();
        vi.restoreAllMocks();
        if (originalScrollIntoView) {
            Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScrollIntoView);
        } else {
            Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView');
        }
    });

    it('scrolls the marked element into view and focuses its first focusable descendant', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
        expect(document.activeElement?.id).toBe('name-input');
    });

    it('focuses the marked element itself when it is focusable', () => {
        // Arrange
        key.set('summary');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('summary');
    });

    it('focuses the host when the host carries the marker', () => {
        // Arrange
        key.set('host');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('host');
    });

    it('does not focus after a single animation frame', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();

        // Act
        animationFrames.step();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
        expect(document.activeElement?.id).not.toBe('name-input');
    });

    it('focuses on the second animation frame', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();
        animationFrames.step();

        // Act
        animationFrames.step();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(document.activeElement?.id).toBe('name-input');
    });

    it('does not focus the same key twice without a new request', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();
        animationFrames.flush();
        (document.activeElement as HTMLElement | null)?.blur();
        key.set('summary');
        key.set('name');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).not.toBe('name-input');
    });

    it('focuses the same key again when the request marker changes', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();
        animationFrames.flush();
        (document.activeElement as HTMLElement | null)?.blur();
        request.set(1);
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('name-input');
    });

    it('cancels a pending focus when the key is cleared', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();
        key.set(null);
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
        expect(document.activeElement?.id).not.toBe('name-input');
    });

    it('cancels a pending focus on destruction', () => {
        // Arrange
        key.set('name');
        fixture.detectChanges();
        fixture.destroy();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('ignores unknown keys', () => {
        // Arrange
        key.set('missing');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('scrolls without focusing when the target has no focusable element', () => {
        // Arrange
        const previous = document.activeElement;
        key.set('note');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(previous);
    });

    it('skips scrolling when the scroll block is null', () => {
        // Arrange
        scrollBlock.set(null);
        key.set('name');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
        expect(document.activeElement?.id).toBe('name-input');
    });

    it('supports a custom marker attribute', () => {
        // Arrange
        attribute.set('data-key');
        key.set('alternate');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('alternate-button');
    });

    it.each([
        ['name', 'name-input'],
        ['missing', 'alternate-button'],
    ])('selects the first rendered marker for %s', (primaryKey, expectedFocusedId) => {
        fallbacks.set([
            { attribute: 'data-key', key: 'not-rendered' },
            { attribute: 'data-key', key: 'alternate' },
            { attribute: 'data-focus-target', key: 'summary' },
        ]);
        key.set(primaryKey);
        fixture.detectChanges();

        animationFrames.flush();

        expect(document.activeElement?.id).toBe(expectedFocusedId);
    });

    it('focuses the first match of the default focusable selector', () => {
        // Arrange
        key.set('mixed');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('mixed-input');
    });

    it('focuses the descendant matching a narrowed focusable selector', () => {
        // Arrange
        focusableSelector.set('button');
        key.set('mixed');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('mixed-button');
    });

    it('uses the descendant selector when the marker fails the separate self selector', () => {
        selfFocusableSelector.set('input');
        focusableSelector.set('[tabindex], button');
        key.set('tabbed');
        fixture.detectChanges();

        animationFrames.flush();

        expect(document.activeElement?.id).toBe('tabbed-button');
    });

    it('scrolls without focusing when the focusable selector matches nothing', () => {
        // Arrange
        const previous = document.activeElement;
        focusableSelector.set('select');
        key.set('mixed');
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(previous);
    });

    it('matches quotes and line breaks in the key literally', () => {
        // Arrange
        const markedElement = document.getElementById('quoted-button')!.parentElement!;
        const literalKey = 'quo"te\nline';
        markedElement.setAttribute('data-focus-target', literalKey);
        key.set(literalKey);
        fixture.detectChanges();

        // Act
        animationFrames.flush();

        // Assert
        expect(document.activeElement?.id).toBe('quoted-button');
    });
});
