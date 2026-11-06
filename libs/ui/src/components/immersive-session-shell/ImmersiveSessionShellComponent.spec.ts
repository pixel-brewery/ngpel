// #region Imports

import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ImmersiveSessionShellComponent } from './ImmersiveSessionShellComponent';

// #endregion

interface IImmersiveSessionShellComponentTestApi {
    readonly railWidthStyle: Signal<string>;
}

describe('ImmersiveSessionShellComponent', () => {
    it('should expose business-agnostic layout defaults', () => {
        const component = createComponent();

        expect(component.railOpen()).toBe(true);
        expect(component.railAriaLabel()).toBeNull();
        expect(component.railWidth()).toBe(384);
        expect(component.modal()).toBe(false);
        expect(() => component.ariaLabel()).toThrow();
    });

    it('should normalize numeric rail widths as CSS pixels', () => {
        const component = createComponent();
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        Object.defineProperty(component, 'railWidth', { value: signal(420) });

        expect(api.railWidthStyle()).toBe('420px');
    });

    it('should preserve consumer-provided CSS rail widths', () => {
        const component = createComponent();
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        Object.defineProperty(component, 'railWidth', { value: signal('min(30rem, 40vw)') });

        expect(api.railWidthStyle()).toBe('min(30rem, 40vw)');
    });
});

function createComponent(): ImmersiveSessionShellComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    return TestBed.runInInjectionContext(() => new ImmersiveSessionShellComponent());
}
