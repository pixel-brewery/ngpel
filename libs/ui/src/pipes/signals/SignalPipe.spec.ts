// #region Imports

import { Component, isSignal, type Signal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { SignalPipe } from './SignalPipe';

// #endregion

@Component({
    imports: [SignalPipe],
    template: '{{ read(value() | ngpSignal) }}',
})
class HostComponent {
    public readonly value = signal(7);

    public read(source: Signal<number>): number {
        return source();
    }
}

describe('SignalPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('wraps a plain value in a signal', () => {
        // Arrange
        const pipe = new SignalPipe<number>();

        // Act
        const result = pipe.transform(7);

        // Assert
        expect(isSignal(result)).toBe(true);
        expect(result()).toBe(7);
    });

    it('keeps one signal across runs and updates its value', () => {
        // Arrange
        const pipe = new SignalPipe<number>();
        const first = pipe.transform(7);

        // Act
        const second = pipe.transform(8);

        // Assert
        expect(second).toBe(first);
        expect(second()).toBe(8);
    });

    it('passes a signal through unchanged', () => {
        // Arrange
        const pipe = new SignalPipe<number>();
        const source = signal(7);

        // Act
        const result = pipe.transform(source);

        // Assert
        expect(result).toBe(source);
    });

    it('starts a new signal after a signal was passed through', () => {
        // Arrange
        const pipe = new SignalPipe<number>();
        const source = signal(7);
        const first = pipe.transform(9);
        pipe.transform(source);

        // Act
        const result = pipe.transform(9);

        // Assert
        expect(result).not.toBe(first);
        expect(result()).toBe(9);
    });

    it('wraps the value under the ngpSignal name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('7');
    });
});
