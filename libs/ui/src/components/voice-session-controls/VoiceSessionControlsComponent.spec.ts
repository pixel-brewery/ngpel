// #region Imports

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { VoiceSessionControlsComponent } from './VoiceSessionControlsComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    IconNameDirective: class IconNameDirective {},
    PressButtonComponent: class PressButtonComponent {},
}));

interface IVoiceSessionControlsComponentTestApi {
    toggleAssistantMuted(): void;

    toggleMicrophoneMuted(): void;

    togglePaused(): void;
}

describe('VoiceSessionControlsComponent', () => {
    it('should expose externally controlled defaults', () => {
        const component = createComponent();

        expect(component.assistantMuted()).toBe(false);
        expect(component.assistantSpeaking()).toBe(false);
        expect(component.canPause()).toBe(true);
        expect(component.disabled()).toBe(false);
        expect(component.endBusy()).toBe(false);
        expect(component.microphoneMuted()).toBe(false);
        expect(component.paused()).toBe(false);
        expect(component.showAssistantControl()).toBe(true);
        expect(() => component.labels()).toThrow();
    });

    it('should request the inverse microphone mute state', () => {
        const component = createComponent();
        const api = component as unknown as IVoiceSessionControlsComponentTestApi;
        const emit = vi.spyOn(component.microphoneMutedChange, 'emit');

        api.toggleMicrophoneMuted();

        expect(emit).toHaveBeenCalledWith(true);
    });

    it('should request resume while paused', () => {
        const component = createComponent();
        const api = component as unknown as IVoiceSessionControlsComponentTestApi;
        const emit = vi.spyOn(component.pausedChange, 'emit');
        Object.defineProperty(component, 'paused', { value: signal(true) });

        api.togglePaused();

        expect(emit).toHaveBeenCalledWith(false);
    });

    it('should keep assistant muting independent from microphone muting', () => {
        const component = createComponent();
        const api = component as unknown as IVoiceSessionControlsComponentTestApi;
        const assistantEmit = vi.spyOn(component.assistantMutedChange, 'emit');
        const microphoneEmit = vi.spyOn(component.microphoneMutedChange, 'emit');

        api.toggleAssistantMuted();

        expect(assistantEmit).toHaveBeenCalledWith(true);
        expect(microphoneEmit).not.toHaveBeenCalled();
    });
});

function createComponent(): VoiceSessionControlsComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    return TestBed.runInInjectionContext(() => new VoiceSessionControlsComponent());
}
