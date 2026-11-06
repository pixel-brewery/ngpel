// #region Imports

import { Component, type Provider, signal, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { NOT_AVAILABLE_TEXT } from './NOT_AVAILABLE_TEXT';
import { NotAvailablePipe } from './NotAvailablePipe';

// #endregion

/** Instantiates a pipe without a host component, resolving its `inject()`ed dependencies from the testing module. */
function instantiatePipe<TPipe>(pipeType: Type<TPipe>, providers: ReadonlyArray<Provider> = []): TPipe {
    if (providers.length > 0) {
        TestBed.configureTestingModule({ providers: [...providers] });
    }

    return TestBed.runInInjectionContext(() => new pipeType());
}

@Component({
    imports: [NotAvailablePipe],
    template: '{{ value() | ngpNotAvailable }}',
})
class HostComponent {
    public readonly value = signal<string | null>(null);
}

describe('NotAvailablePipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('renders the value under the ngpNotAvailable name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
        fixture.componentInstance.value.set('+49 30 123456');

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('+49 30 123456');
    });

    it('renders the placeholder for an absent value', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('n/a');
    });

    it.each([null, undefined, ''])('treats %j as absent', (value) => {
        // Arrange
        const pipe = instantiatePipe(NotAvailablePipe);

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBe('n/a');
    });

    it('renders non-string values through their string representation', () => {
        // Arrange
        const pipe = instantiatePipe(NotAvailablePipe);

        // Act
        const result = pipe.transform(0);

        // Assert
        expect(result).toBe('0');
    });

    it('renders the provided placeholder', () => {
        // Arrange
        const pipe = instantiatePipe(NotAvailablePipe, [{ provide: NOT_AVAILABLE_TEXT, useValue: '—' }]);

        // Act
        const result = pipe.transform(null);

        // Assert
        expect(result).toBe('—');
    });
});
