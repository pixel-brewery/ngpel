// #region Imports

import { ElementRef, signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TypewriterDirective } from './TypewriterDirective';

// #endregion

interface ITestTextElement extends HTMLElement {
    text: string;
}

describe('TypewriterDirective', () => {
    let element: ITestTextElement;
    let text: WritableSignal<string | ReadonlyArray<string>>;
    let typingSpeed: WritableSignal<number>;
    let holdDuration: WritableSignal<number | undefined>;

    beforeEach(() => {
        vi.useFakeTimers();
        element = document.createElement('mosaik-text') as ITestTextElement;
        element.text = '';
        text = signal<string | ReadonlyArray<string>>('AB');
        typingSpeed = signal(100);
        holdDuration = signal<number | undefined>(undefined);

        TestBed.configureTestingModule({
            providers: [
                TypewriterDirective,
                {
                    provide: ElementRef,
                    useValue: new ElementRef(element),
                },
            ],
        });

        const directive = TestBed.inject(TypewriterDirective);
        Object.defineProperty(directive, 'text', { value: text });
        Object.defineProperty(directive, 'typingSpeed', { value: typingSpeed });
        Object.defineProperty(directive, 'holdDuration', { value: holdDuration });
        TestBed.tick();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('allows the caller to render the current text with a separate renderer', () => {
        const directive = TestBed.inject(TypewriterDirective);
        Object.defineProperty(directive, 'renderToHost', { value: signal(false) });
        const originalText = 'Host content';
        element.text = originalText;

        vi.advanceTimersByTime(10);
        TestBed.tick();

        expect(directive.displayedText()).toBe('AB');
        expect(element.text).toBe(originalText);
    });

    it('waits for the configured character interval before typing the next character', () => {
        // Arrange
        const zeroWidthSpace = '\u200B';

        // Act
        vi.advanceTimersByTime(9);
        TestBed.tick();

        // Assert
        expect(element.text).toBe(`${zeroWidthSpace}A`);
    });

    it('leaves a completed string visible when no hold duration is supplied', () => {
        // Arrange
        const zeroWidthSpace = '\u200B';

        // Act
        vi.advanceTimersByTime(60_000);
        TestBed.tick();

        // Assert
        expect(element.text).toBe(`${zeroWidthSpace}AB`);
    });

    it('leaves the first completed array value visible when no hold duration is supplied', () => {
        // Arrange
        text.set(['AB', 'CD']);
        TestBed.tick();

        // Act
        vi.advanceTimersByTime(60_000);
        TestBed.tick();

        // Assert
        expect(element.text).toBe('\u200BAB');
    });

    it('keeps the completed text visible throughout the configured hold duration', () => {
        // Arrange
        holdDuration.set(1000);
        TestBed.tick();

        // Act
        vi.advanceTimersByTime(1009);
        TestBed.tick();

        // Assert
        expect(element.text).toBe('\u200BAB');
    });

    it('starts deleting after the configured hold duration has elapsed', () => {
        // Arrange
        holdDuration.set(1000);
        TestBed.tick();

        // Act
        vi.advanceTimersByTime(1010);
        TestBed.tick();

        // Assert
        expect(element.text).toBe('\u200BA');
    });

    it('rotates through an array when a hold duration is supplied', () => {
        // Arrange
        text.set(['AB', 'CD']);
        holdDuration.set(100);
        TestBed.tick();

        // Act
        vi.advanceTimersByTime(630);
        TestBed.tick();

        // Assert
        expect(element.text).toBe('\u200BCD');
    });

    it('cancels the current animation and starts the replacement text from its first character', () => {
        // Arrange
        vi.advanceTimersByTime(0);
        TestBed.tick();
        text.set('XYZ');

        // Act
        TestBed.tick();
        vi.advanceTimersByTime(0);
        TestBed.tick();

        // Assert
        expect(element.text).toBe('\u200BX');
    });

    it('clears the host text and stops typing when no non-empty text is supplied', () => {
        // Arrange
        text.set(['']);

        // Act
        TestBed.tick();
        vi.advanceTimersByTime(0);
        TestBed.tick();

        // Assert
        expect(element.text).toBe('\u200B');
    });
});
