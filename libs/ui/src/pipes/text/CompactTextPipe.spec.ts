// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { CompactTextPipe } from './CompactTextPipe';

// #endregion

@Component({
    imports: [CompactTextPipe],
    template: '{{ body() | ngpCompactText }}',
})
class HostComponent {
    public readonly body = signal('## **Release** notes\n\nMore text');
}

describe('CompactTextPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('takes the first non-empty line and strips its markdown markers', () => {
        // Arrange
        const pipe = new CompactTextPipe();

        // Act
        const result = pipe.transform('\n\n## **Release** notes\n\nMore text');

        // Assert
        expect(result).toBe('Release notes');
    });

    it('keeps the label of a link and drops its target', () => {
        // Arrange
        const pipe = new CompactTextPipe();

        // Act
        const result = pipe.transform('- see [the report](https://example.test/report)');

        // Assert
        expect(result).toBe('see the report');
    });

    it('cuts an overlong line and marks it with an ellipsis', () => {
        // Arrange
        const pipe = new CompactTextPipe();

        // Act
        const result = pipe.transform('word '.repeat(30), '', 10);

        // Assert
        expect(result).toBe('word word…');
    });

    it('falls back to the given text when the markdown holds no line', () => {
        // Arrange
        const pipe = new CompactTextPipe();

        // Act
        const result = pipe.transform('   \n  ', 'No description');

        // Assert
        expect(result).toBe('No description');
    });

    it.each([null, undefined])('returns an empty string for %j without a fallback', (value) => {
        // Arrange
        const pipe = new CompactTextPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe('');
    });

    it('renders the condensed line under the ngpCompactText name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('Release notes');
    });
});
