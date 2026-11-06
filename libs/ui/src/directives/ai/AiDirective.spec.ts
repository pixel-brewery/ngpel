// #region Imports

import { ElementRef, Renderer2, RendererFactory2, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { beforeEach, describe, expect, it } from 'vitest';
import type { AiAttention } from './AiAttention';
import { AiDirective } from './AiDirective';

// #endregion

const PULSE_CLASS = 'motion-safe:animate-pulse';

describe('AiDirective', () => {
    let element: HTMLElement;
    let enabled: WritableSignal<boolean>;
    let presentationEnabled: WritableSignal<boolean>;
    let variant: WritableSignal<Variant>;
    let borderColor: WritableSignal<string>;
    let attention: WritableSignal<AiAttention>;

    beforeEach(() => {
        element = document.createElement('mosaik-textbox');
        element.setAttribute('variant', 'primary');
        enabled = signal(true);
        presentationEnabled = signal(true);
        variant = signal<Variant>('highlight');
        borderColor = signal('var(--mosaik-color-highlight-500)');
        attention = signal<AiAttention>('none');

        TestBed.configureTestingModule({
            providers: [
                AiDirective,
                { provide: ElementRef, useValue: new ElementRef(element) },
                {
                    provide: Renderer2,
                    useFactory: (rendererFactory: RendererFactory2) => rendererFactory.createRenderer(null, null),
                    deps: [RendererFactory2],
                },
            ],
        });

        // The just-in-time compiler never sees an `input()` initialiser, so the spec owns the signals.
        const directive = TestBed.inject(AiDirective);
        Object.defineProperty(directive, 'enabled', { value: enabled });
        Object.defineProperty(directive, 'presentationEnabled', { value: presentationEnabled });
        Object.defineProperty(directive, 'variant', { value: variant });
        Object.defineProperty(directive, 'borderColor', { value: borderColor });
        Object.defineProperty(directive, 'attention', { value: attention });
        TestBed.tick();
    });

    it('marks the host with the highlight variant by default', () => {
        // Arrange
        // Act
        const applied = element.getAttribute('variant');

        // Assert
        expect(applied).toBe('highlight');
    });

    it('follows a variant change', () => {
        // Arrange
        variant.set('warning');

        // Act
        TestBed.tick();

        // Assert
        expect(element.getAttribute('variant')).toBe('warning');
    });

    it('keeps the supported Mosaik input borders highlighted without focus', () => {
        // Arrange
        // Act
        const applied = [element.style.getPropertyValue('--textbox-border-color'), element.style.getPropertyValue('--select-border-color')];

        // Assert
        expect(applied).toEqual(['var(--mosaik-color-highlight-500)', 'var(--mosaik-color-highlight-500)']);
    });

    it('follows a border color change', () => {
        // Arrange
        borderColor.set('var(--mosaik-color-info-500)');

        // Act
        TestBed.tick();

        // Assert
        expect([element.style.getPropertyValue('--textbox-border-color'), element.style.getPropertyValue('--select-border-color')]).toEqual([
            'var(--mosaik-color-info-500)',
            'var(--mosaik-color-info-500)',
        ]);
    });

    it('hands the variant back when the marker is switched off', () => {
        // Arrange
        enabled.set(false);

        // Act
        TestBed.tick();

        // Assert
        expect(element.getAttribute('variant')).toBe('primary');
    });

    it('removes the border tokens it owns when the presentation is switched off', () => {
        // Arrange
        presentationEnabled.set(false);

        // Act
        TestBed.tick();

        // Assert
        expect([element.style.getPropertyValue('--textbox-border-color'), element.style.getPropertyValue('--select-border-color')]).toEqual(['', '']);
    });

    it('applies the presentation again when it is enabled later', () => {
        // Arrange
        presentationEnabled.set(false);
        TestBed.tick();
        presentationEnabled.set(true);

        // Act
        TestBed.tick();

        // Assert
        expect(element.getAttribute('variant')).toBe('highlight');
    });

    it('restores the variant of the latest activation cycle, not of the first', () => {
        // Arrange
        presentationEnabled.set(false);
        TestBed.tick();
        element.setAttribute('variant', 'warning');
        presentationEnabled.set(true);
        TestBed.tick();
        presentationEnabled.set(false);

        // Act
        TestBed.tick();

        // Assert
        expect(element.getAttribute('variant')).toBe('warning');
    });

    it('restores host-owned border tokens including their important flag', () => {
        // Arrange
        presentationEnabled.set(false);
        TestBed.tick();
        element.style.setProperty('--textbox-border-color', 'rebeccapurple', 'important');
        element.style.setProperty('--select-border-color', 'darkorange');
        presentationEnabled.set(true);
        TestBed.tick();
        presentationEnabled.set(false);

        // Act
        TestBed.tick();

        // Assert
        expect([
            element.style.getPropertyValue('--textbox-border-color'),
            element.style.getPropertyPriority('--textbox-border-color'),
            element.style.getPropertyValue('--select-border-color'),
        ]).toEqual(['rebeccapurple', 'important', 'darkorange']);
    });

    it('pulses only when the attention treatment asks for it', () => {
        // Arrange
        attention.set('pulse');

        // Act
        TestBed.tick();

        // Assert
        expect(element.classList.contains(PULSE_CLASS)).toBe(true);
    });

    it('stops pulsing when the attention treatment is reset', () => {
        // Arrange
        attention.set('pulse');
        TestBed.tick();
        attention.set('none');

        // Act
        TestBed.tick();

        // Assert
        expect(element.classList.contains(PULSE_CLASS)).toBe(false);
    });

    it('leaves a pulse class the host itself set in place', () => {
        // Arrange
        element.classList.add(PULSE_CLASS);
        attention.set('pulse');
        TestBed.tick();
        attention.set('none');

        // Act
        TestBed.tick();

        // Assert
        expect(element.classList.contains(PULSE_CLASS)).toBe(true);
    });
});
