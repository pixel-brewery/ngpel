// #region Imports

import { Component, type Provider, signal, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { BYTES_FALLBACK_TEXT } from './BYTES_FALLBACK_TEXT';
import { BytesPipe } from './BytesPipe';

// #endregion

/** Instantiates a pipe without a host component, resolving its `inject()`ed dependencies from the testing module. */
function instantiatePipe<TPipe>(pipeType: Type<TPipe>, providers: ReadonlyArray<Provider> = []): TPipe {
    if (providers.length > 0) {
        TestBed.configureTestingModule({ providers: [...providers] });
    }

    return TestBed.runInInjectionContext(() => new pipeType());
}

@Component({
    imports: [BytesPipe],
    template: '{{ size() | ngpBytes: locale() }}',
})
class HostComponent {
    public readonly size = signal<number | null>(1536);
    public readonly locale = signal<string | undefined>(undefined);
}

describe('BytesPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('renders the size under the ngpBytes name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('1.5 KB');
    });

    it('renders the default fallback for an unknown size', () => {
        // Arrange
        const pipe = instantiatePipe(BytesPipe);

        // Act
        const result = pipe.transform(null);

        // Assert
        expect(result).toBe('0 B');
    });

    it('reformats the same byte count when the locale changes', () => {
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
        fixture.componentInstance.locale.set('en');
        fixture.detectChanges();
        const initial = (fixture.nativeElement as HTMLElement).textContent?.trim();

        fixture.componentInstance.locale.set('de');
        fixture.detectChanges();

        expect(initial).toBe('1.5 KB');
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('1,5 KB');
    });

    it('renders the provided fallback for an unknown size', () => {
        // Arrange
        const pipe = instantiatePipe(BytesPipe, [{ provide: BYTES_FALLBACK_TEXT, useValue: 'measuring…' }]);

        // Act
        const result = pipe.transform(undefined);

        // Assert
        expect(result).toBe('measuring…');
    });

    it('keeps a known size out of the fallback', () => {
        // Arrange
        const pipe = instantiatePipe(BytesPipe, [{ provide: BYTES_FALLBACK_TEXT, useValue: 'measuring…' }]);

        // Act
        const result = pipe.transform(0);

        // Assert
        expect(result).toBe('0 B');
    });
});
