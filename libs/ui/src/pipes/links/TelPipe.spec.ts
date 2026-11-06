// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { TelPipe } from './TelPipe';

// #endregion

@Component({
    imports: [TelPipe],
    template: '{{ value() | ngpTel }}',
})
class HostComponent {
    public readonly value = signal('+49 30 123 456');
}

describe('TelPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it.each<[string, string]>([
        ['+49 30 123 456', 'tel:+4930123456'],
        ['(030) 123-456', 'tel:030123456'],
        ['TEL:+4930123456', 'tel:+4930123456'],
        ['  +49.30.123456  ', 'tel:+4930123456'],
        ['+49 30 123456,#7', 'tel:+4930123456,#7'],
    ])('builds the link target of %j', (value, expected) => {
        // Arrange
        const pipe = new TelPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe(expected);
    });

    it.each([null, undefined, '', '   ', 'tel:', 'not a number'])('returns null for %j', (value) => {
        // Arrange
        const pipe = new TelPipe();

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBeNull();
    });

    it('renders the link target under the ngpTel name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('tel:+4930123456');
    });
});
