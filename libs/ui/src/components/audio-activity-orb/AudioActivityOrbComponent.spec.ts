// #region Imports

import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { LiveAudioWaveformState } from '../live-audio-waveform/LiveAudioWaveformState';
import { describe, expect, it, vi } from 'vitest';
import { AudioActivityOrbComponent } from './AudioActivityOrbComponent';
import type { AudioActivityState } from './AudioActivityState';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    IconComponent: class IconComponent {},
}));

interface IAudioActivityOrbComponentTestApi {
    readonly auroraOpacityStyle: Signal<string>;
    readonly auroraScaleStyle: Signal<string>;
    readonly normalizedActivityLevel: Signal<number>;
    readonly sizeStyle: Signal<string>;
    readonly waveformState: Signal<LiveAudioWaveformState>;
}

describe('AudioActivityOrbComponent', () => {
    it('should expose audio-resource-neutral defaults', () => {
        const component = createComponent();

        expect(component.activityLevel()).toBe(0);
        expect(component.compact()).toBe(false);
        expect(component.iconName()).toBe('mic');
        expect(component.mediaStream()).toBeNull();
        expect(component.size()).toBe(288);
        expect(component.state()).toBe('idle');
        expect(component.waveformVisible()).toBe(true);
        expect(() => component.ariaLabel()).toThrow();
    });

    it('should clamp activity levels and derive the aurora presentation', () => {
        const component = createComponent();
        const api = component as unknown as IAudioActivityOrbComponentTestApi;
        Object.defineProperty(component, 'activityLevel', { value: signal(2) });

        expect(api.normalizedActivityLevel()).toBe(1);
        expect(api.auroraOpacityStyle()).toBe('0.800');
        expect(api.auroraScaleStyle()).toBe('1.200');
    });

    it('should normalize numeric sizes while preserving CSS sizes', () => {
        const numericComponent = createComponent();
        const numericApi = numericComponent as unknown as IAudioActivityOrbComponentTestApi;
        Object.defineProperty(numericComponent, 'size', { value: signal(320) });

        const cssComponent = createComponent();
        const cssApi = cssComponent as unknown as IAudioActivityOrbComponentTestApi;
        Object.defineProperty(cssComponent, 'size', { value: signal('min(20rem, 80vw)') });

        expect(numericApi.sizeStyle()).toBe('320px');
        expect(cssApi.sizeStyle()).toBe('min(20rem, 80vw)');
    });

    it('should map rich activity states to waveform states', () => {
        const component = createComponent();
        const api = component as unknown as IAudioActivityOrbComponentTestApi;
        const state = signal<AudioActivityState>('thinking');
        Object.defineProperty(component, 'state', { value: state });

        expect(api.waveformState()).toBe('processing');

        state.set('paused');
        expect(api.waveformState()).toBe('paused');

        state.set('error');
        expect(api.waveformState()).toBe('error');

        state.set('completed');
        expect(api.waveformState()).toBe('idle');
    });
});

function createComponent(): AudioActivityOrbComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    return TestBed.runInInjectionContext(() => new AudioActivityOrbComponent());
}
