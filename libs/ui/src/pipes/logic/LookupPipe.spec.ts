// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { LookupPipe } from './LookupPipe';

// #endregion

@Component({
    imports: [LookupPipe],
    template: '{{ status() | ngpLookup: statusIcons : "help" }}',
})
class HostComponent {
    public readonly status = signal('open');
    public readonly statusIcons: Readonly<Partial<Record<string, string>>> = { closed: 'check', open: 'circle' };
}

describe('LookupPipe', () => {
    const icons: Readonly<Partial<Record<string, string>>> = { closed: 'check', open: 'circle' };

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('resolves a key the table holds', () => {
        // Arrange
        const pipe = new LookupPipe();

        // Act
        const result = pipe.transform('open', icons, 'help');

        // Assert
        expect(result).toBe('circle');
    });

    it('falls back for a key the table does not hold', () => {
        // Arrange
        const pipe = new LookupPipe();

        // Act
        const result = pipe.transform('escalated', icons, 'help');

        // Assert
        expect(result).toBe('help');
    });

    it.each([null, undefined])('falls back for the key %j', (key) => {
        // Arrange
        const pipe = new LookupPipe();

        // Act
        const result = pipe.transform(key, icons, 'help');

        // Assert
        expect(result).toBe('help');
    });

    it('falls back for an entry that is explicitly undefined', () => {
        // Arrange
        const pipe = new LookupPipe();
        const sparse: Readonly<Partial<Record<string, string>>> = { open: undefined };

        // Act
        const result = pipe.transform('open', sparse, 'help');

        // Assert
        expect(result).toBe('help');
    });

    it('resolves a numeric key', () => {
        // Arrange
        const pipe = new LookupPipe();

        // Act
        const result = pipe.transform(404, { 404: 'not found' }, 'unknown');

        // Assert
        expect(result).toBe('not found');
    });

    it('renders the resolved entry under the ngpLookup name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('circle');
    });
});
