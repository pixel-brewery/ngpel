// #region Imports

import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AudioSignalQuality } from './AudioSignalQuality';
import { AudioSignalQualityIndicatorComponent } from './AudioSignalQualityIndicatorComponent';

// #endregion

interface IAudioSignalQualityIndicatorComponentTestApi {
    readonly activeBarCount: Signal<number>;
    readonly displayedDescription: Signal<string | null>;
    readonly displayedLabel: Signal<string>;
    readonly displayedQuality: Signal<AudioSignalQuality>;
}

describe('AudioSignalQualityIndicatorComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.useRealTimers();
    });

    it('should expose neutral signal-quality defaults', () => {
        const component = createComponent();

        expect(component.description()).toBeNull();
        expect(component.descriptionVisible()).toBe(true);
        expect(component.quality()).toBe('unknown');
        expect(component.settleTime()).toBe(0);
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

    it('keeps the current announcement when a single sample changes quality', () => {
        // Arrange
        vi.useFakeTimers();
        const quality = signal<AudioSignalQuality>('good');
        const label = signal('Good signal');
        const component = createComponent(quality);
        const api = component as unknown as IAudioSignalQualityIndicatorComponentTestApi;
        Object.defineProperties(component, { label: { value: label }, settleTime: { value: signal(400) } });
        TestBed.flushEffects();
        vi.advanceTimersByTime(100);
        quality.set('poor');
        label.set('Poor signal');

        // Act
        vi.advanceTimersByTime(100);

        // Assert
        expect(api.displayedQuality()).toBe('good');
        expect(api.displayedLabel()).toBe('Good signal');
        expect(api.activeBarCount()).toBe(4);
    });

    it('releases its sampling interval when its injector is destroyed', () => {
        // Arrange
        vi.useFakeTimers();
        const component = createComponent();
        Object.defineProperties(component, { label: { value: signal('Signal') }, settleTime: { value: signal(400) } });
        TestBed.flushEffects();
        expect(vi.getTimerCount()).toBeGreaterThan(0);

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(vi.getTimerCount()).toBe(0);
    });

    it('can hide a description without hiding the quality label', () => {
        // Arrange
        const component = createComponent('good');
        const api = component as unknown as IAudioSignalQualityIndicatorComponentTestApi;
        const visible = signal(true);
        Object.defineProperties(component, {
            description: { value: signal('-20 dB') },
            descriptionVisible: { value: visible },
            label: { value: signal('Good signal') },
        });

        // Act
        visible.set(false);

        // Assert
        expect(api.displayedDescription()).toBeNull();
        expect(api.displayedLabel()).toBe('Good signal');
    });
});

function createComponent(quality: AudioSignalQuality | Signal<AudioSignalQuality> = 'unknown'): AudioSignalQualityIndicatorComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const component = TestBed.runInInjectionContext(() => new AudioSignalQualityIndicatorComponent());
    Object.defineProperty(component, 'quality', { value: typeof quality === 'function' ? quality : signal(quality) });

    return component;
}
