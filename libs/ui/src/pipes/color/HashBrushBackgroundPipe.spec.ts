// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { colorFromString } from './colorFromString';
import { HashBrushBackgroundPipe } from './HashBrushBackgroundPipe';

// #endregion

@Component({
    imports: [HashBrushBackgroundPipe],
    template: '{{ value() | ngpHashBrushBackground }}',
})
class HostComponent {
    public readonly value = signal('platform');
}

describe('HashBrushBackgroundPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('derives the colour of a value', () => {
        // Arrange
        const pipe = new HashBrushBackgroundPipe();

        // Act
        const result = pipe.transform('platform');

        // Assert
        expect(result).toBe(colorFromString('platform'));
    });

    it('ignores casing and surrounding whitespace', () => {
        // Arrange
        const pipe = new HashBrushBackgroundPipe();

        // Act
        const result = pipe.transform('  PlatForm ');

        // Assert
        expect(result).toBe(colorFromString('platform'));
    });

    it('derives the colour of the string representation of a non-string value', () => {
        // Arrange
        const pipe = new HashBrushBackgroundPipe();

        // Act
        const result = pipe.transform(42);

        // Assert
        expect(result).toBe(colorFromString('42'));
    });

    it.each([null, undefined])('derives the colour of the empty text for %j', (value) => {
        // Arrange
        const pipe = new HashBrushBackgroundPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe(colorFromString(''));
    });

    it('renders the colour under the ngpHashBrushBackground name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe(colorFromString('platform'));
    });
});
