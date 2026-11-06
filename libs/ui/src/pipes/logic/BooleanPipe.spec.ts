// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { BooleanPipe } from './BooleanPipe';

// #endregion

@Component({
    imports: [BooleanPipe],
    template: "{{ isDone() | ngpBoolean: 'check' : 'clock' }}",
})
class HostComponent {
    public readonly isDone = signal(true);
}

describe('BooleanPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('returns the value of the met branch', () => {
        // Arrange
        const pipe = new BooleanPipe();

        // Act
        const result = pipe.transform(true, 'check', 'clock');

        // Assert
        expect(result).toBe('check');
    });

    it('returns the value of the unmet branch', () => {
        // Arrange
        const pipe = new BooleanPipe();

        // Act
        const result = pipe.transform(false, 'check', 'clock');

        // Assert
        expect(result).toBe('clock');
    });

    it('keeps the reference of an object branch', () => {
        // Arrange
        const pipe = new BooleanPipe();
        const whenFalse = { severity: 'warning' };

        // Act
        const result = pipe.transform(false, { severity: 'info' }, whenFalse);

        // Assert
        expect(result).toBe(whenFalse);
    });

    it('renders the chosen branch under the ngpBoolean name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('check');
    });
});
