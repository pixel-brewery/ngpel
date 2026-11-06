// #region Imports

import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { AudioSignalQuality } from './AudioSignalQuality';
import { AudioSignalQualityIndicatorComponent } from './AudioSignalQualityIndicatorComponent';

// #endregion

interface IAudioSignalQualityIndicatorComponentTestApi {
    readonly activeBarCount: Signal<number>;
}

describe('AudioSignalQualityIndicatorComponent', () => {
    it('should expose neutral signal-quality defaults', () => {
        const component = createComponent();

        expect(component.description()).toBeNull();
        expect(component.quality()).toBe('unknown');
        expect(component.showMeter()).toBe(true);
        expect(() => component.label()).toThrow();
    });

    it.each([
        ['unknown', 0],
        ['no-signal', 0],
        ['poor', 1],
        ['fair', 3],
        ['good', 4],
        ['clipping', 4],
    ] as const)('should map %s quality to %i active bars', (quality, expectedBarCount) => {
        const component = createComponent(quality);
        const api = component as unknown as IAudioSignalQualityIndicatorComponentTestApi;

        expect(api.activeBarCount()).toBe(expectedBarCount);
    });
});

function createComponent(quality: AudioSignalQuality = 'unknown'): AudioSignalQualityIndicatorComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const component = TestBed.runInInjectionContext(() => new AudioSignalQualityIndicatorComponent());
    Object.defineProperty(component, 'quality', { value: signal(quality) });

    return component;
}
