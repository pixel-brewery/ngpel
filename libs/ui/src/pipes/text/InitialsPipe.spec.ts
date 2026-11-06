// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { InitialsPipe } from './InitialsPipe';

// #endregion

@Component({
    imports: [InitialsPipe],
    template: '{{ displayName() | ngpInitials }}',
})
class HostComponent {
    public readonly displayName = signal('ada lovelace');
}

describe('InitialsPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('builds two upper-case initials from a display name', () => {
        // Arrange
        const pipe = new InitialsPipe();

        // Act
        const result = pipe.transform('ada lovelace');

        // Assert
        expect(result).toBe('AL');
    });

    it('keeps at most two initials for a longer name', () => {
        // Arrange
        const pipe = new InitialsPipe();

        // Act
        const result = pipe.transform('Ada  King   Lovelace');

        // Assert
        expect(result).toBe('AK');
    });

    it('uses the single initial of a mononym', () => {
        // Arrange
        const pipe = new InitialsPipe();

        // Act
        const result = pipe.transform('  Prince  ');

        // Assert
        expect(result).toBe('P');
    });

    it.each([null, undefined, '', '   '])('returns an empty string for %j', (value) => {
        // Arrange
        const pipe = new InitialsPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe('');
    });

    it('renders the initials under the ngpInitials name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('AL');
    });
});
