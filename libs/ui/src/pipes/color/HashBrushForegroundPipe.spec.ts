// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { HashBrushForegroundPipe } from './HashBrushForegroundPipe';

// #endregion

@Component({
    imports: [HashBrushForegroundPipe],
    template: '{{ background() | ngpHashBrushForeground }}',
})
class HostComponent {
    public readonly background = signal('#d6d930');
}

describe('HashBrushForegroundPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('picks dark text for a light background', () => {
        // Arrange
        const pipe = new HashBrushForegroundPipe();

        // Act
        const result = pipe.transform('#d6d930');

        // Assert
        expect(result).toBe('#000000');
    });

    it('picks light text for a dark background', () => {
        // Arrange
        const pipe = new HashBrushForegroundPipe();

        // Act
        const result = pipe.transform('#9a33d7');

        // Assert
        expect(result).toBe('#ffffff');
    });

    it.each([null, undefined, 'rebeccapurple'])('picks dark text for the unusable background %j', (background) => {
        // Arrange
        const pipe = new HashBrushForegroundPipe();

        // Act
        const result = pipe.transform(background);

        // Assert
        expect(result).toBe('#000000');
    });

    it('renders the text colour under the ngpHashBrushForeground name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('#000000');
    });
});
