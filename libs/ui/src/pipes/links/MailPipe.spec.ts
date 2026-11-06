// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { MailPipe } from './MailPipe';

// #endregion

@Component({
    imports: [MailPipe],
    template: '{{ value() | ngpMail }}',
})
class HostComponent {
    public readonly value = signal('ada@example.test');
}

describe('MailPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it.each<[string, string]>([
        ['ada@example.test', 'mailto:ada@example.test'],
        ['  ada@example.test  ', 'mailto:ada@example.test'],
        ['MAILTO:ada@example.test', 'mailto:ada@example.test'],
        ['ada+news@example.test', 'mailto:ada+news@example.test'],
    ])('builds the link target of %j', (value, expected) => {
        // Arrange
        const pipe = new MailPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe(expected);
    });

    it.each([null, undefined, '', 'mailto:', 'ada', 'ada@localhost', 'ada @example.test'])('returns null for %j', (value) => {
        // Arrange
        const pipe = new MailPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBeNull();
    });

    it('renders the link target under the ngpMail name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('mailto:ada@example.test');
    });
});
