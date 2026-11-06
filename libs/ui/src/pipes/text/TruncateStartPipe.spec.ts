// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { TruncateStartPipe } from './TruncateStartPipe';

// #endregion

@Component({
    imports: [TruncateStartPipe],
    template: '{{ path() | ngpTruncateStart: 10 }}',
})
class HostComponent {
    public readonly path = signal('libs/cdk/src/index.ts');
}

describe('TruncateStartPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('keeps text that fits unchanged', () => {
        // Arrange
        const pipe = new TruncateStartPipe();

        // Act
        const result = pipe.transform('report.pdf', 20);

        // Assert
        expect(result).toBe('report.pdf');
    });

    it('cuts the front and keeps the end readable', () => {
        // Arrange
        const pipe = new TruncateStartPipe();

        // Act
        const result = pipe.transform('/home/andre/documents/report.pdf', 14);

        // Assert
        expect(result).toBe('.../report.pdf');
        expect(result).toHaveLength(14);
    });

    it('falls back to the default length for a non-finite maximum', () => {
        // Arrange
        const pipe = new TruncateStartPipe();
        const value = 'x'.repeat(60);

        // Act
        const result = pipe.transform(value, Number.NaN);

        // Assert
        expect(result).toBe(`...${'x'.repeat(47)}`);
    });

    it('renders only the ellipsis when the maximum leaves no room', () => {
        // Arrange
        const pipe = new TruncateStartPipe();

        // Act
        const result = pipe.transform('report.pdf', 2);

        // Assert
        expect(result).toBe('..');
    });

    it.each([null, undefined, ''])('returns an empty string for %j', (value) => {
        // Arrange
        const pipe = new TruncateStartPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe('');
    });

    it('renders the shortened text under the ngpTruncateStart name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('...ndex.ts');
    });
});
