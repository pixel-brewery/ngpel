// #region Imports

import { signal, type Signal, type WritableSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { AiBeamComponent } from './AiBeamComponent';

// #endregion

/**
 * Replaces the signal inputs of a component instance with signals the spec owns.
 *
 * The specs compile just in time, and the just-in-time compiler never sees an `input()` initialiser:
 * to it the field is an ordinary class property, so `ComponentRef.setInput` never reaches the
 * component. Substituting the field feeds exactly the reads the component performs, which keeps the
 * published component on signal inputs while the spec exercises real host bindings, lifecycle hooks
 * and effects. It has to happen before the first change detection, so the host bindings track the
 * substituted signals from their first run. An input `alias` or `transform` is not exercised.
 */
function applySignalInputs<TTarget extends object>(
    target: TTarget,
    inputs: { readonly [TKey in keyof TTarget]?: TTarget[TKey] extends Signal<infer TValue> ? Signal<TValue> : never },
): void {
    for (const name of Object.keys(inputs) as Array<keyof TTarget & string>) {
        Object.defineProperty(target, name, { configurable: true, value: inputs[name] });
    }
}

/** Dispatches the `animationend` the component listens for; jsdom runs no animations of its own. */
function dispatchAnimationEnd(element: HTMLElement, animationName: string): void {
    const event = new Event('animationend', { bubbles: true });
    Object.defineProperty(event, 'animationName', { value: animationName });
    element.dispatchEvent(event);
}

/** Creates a rendered beam, substituting the given inputs before the first change detection. */
async function createBeam(
    inputs: Parameters<typeof applySignalInputs<AiBeamComponent>>[1] = {},
): Promise<{ fixture: ComponentFixture<AiBeamComponent>; element: HTMLElement }> {
    TestBed.configureTestingModule({ imports: [AiBeamComponent] });
    const fixture = TestBed.createComponent(AiBeamComponent);
    applySignalInputs(fixture.componentInstance, inputs);
    fixture.detectChanges();
    await fixture.whenStable();

    return { fixture, element: fixture.nativeElement as HTMLElement };
}

describe('AiBeamComponent', () => {
    it('renders the medium colorful dark beam when nothing is configured', async () => {
        // Arrange
        const { element } = await createBeam();

        // Act
        const rendered = [
            element.getAttribute('data-preset'),
            element.getAttribute('data-palette'),
            element.getAttribute('data-theme'),
            element.style.getPropertyValue('--ngp-ai-beam-duration'),
        ];

        // Assert
        expect(rendered).toEqual(['md', 'colorful', 'dark', '1.96s']);
    });

    it('projects the visual inputs onto the custom properties the stylesheet reads', async () => {
        // Arrange
        const { element } = await createBeam({
            preset: signal('line' as const),
            palette: signal('sunset' as const),
            theme: signal('light' as const),
            duration: signal(4),
            borderRadius: signal(24),
        });

        // Act
        const rendered = [
            element.getAttribute('data-preset'),
            element.getAttribute('data-palette'),
            element.getAttribute('data-theme'),
            element.style.getPropertyValue('--ngp-ai-beam-duration'),
            element.style.getPropertyValue('--ngp-ai-beam-border-radius'),
            element.style.getPropertyValue('--ngp-ai-beam-line-breathe-duration'),
        ];

        // Assert
        expect(rendered).toEqual(['line', 'sunset', 'light', '4s', '24px', '5.2s']);
    });

    it('reports the beam as activated once the fade-in animation has finished', async () => {
        // Arrange
        const { fixture, element } = await createBeam();
        const activated = vi.fn();
        fixture.componentInstance.activated.subscribe(activated);

        // Act
        dispatchAnimationEnd(element, 'ngp-ai-beam-fade-in');

        // Assert
        expect(activated).toHaveBeenCalledOnce();
    });

    it('keeps the layers mounted while the beam is fading out', async () => {
        // Arrange
        const active: WritableSignal<boolean> = signal(true);
        const { fixture, element } = await createBeam({ active });
        dispatchAnimationEnd(element, 'ngp-ai-beam-fade-in');

        // Act
        active.set(false);
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect([element.hasAttribute('data-fading'), element.hasAttribute('data-active')]).toEqual([true, true]);
    });

    it('reports the beam as deactivated once the fade-out animation has finished', async () => {
        // Arrange
        const active: WritableSignal<boolean> = signal(true);
        const { fixture, element } = await createBeam({ active });
        const deactivated = vi.fn();
        fixture.componentInstance.deactivated.subscribe(deactivated);
        dispatchAnimationEnd(element, 'ngp-ai-beam-fade-in');
        active.set(false);
        fixture.detectChanges();
        await fixture.whenStable();

        // Act
        dispatchAnimationEnd(element, 'ngp-ai-beam-fade-out');

        // Assert
        fixture.detectChanges();
        expect([deactivated.mock.calls.length, element.hasAttribute('data-active')]).toEqual([1, false]);
    });
});
