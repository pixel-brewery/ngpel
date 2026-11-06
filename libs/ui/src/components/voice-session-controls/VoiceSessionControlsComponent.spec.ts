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
    requestAssistantStop(): void;

    requestEnd(): void;

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
        expect(component.canEnd()).toBe(true);
        expect(component.compact()).toBe(false);
        expect(component.assistantAudioAvailable()).toBeUndefined();
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

    it('keeps unavailable assistant actions inert even if the assistant is still speaking', () => {
        // Arrange
        const component = createComponent();
        const api = component as unknown as IVoiceSessionControlsComponentTestApi;
        const stopped = vi.spyOn(component.assistantStopRequested, 'emit');
        Object.defineProperties(component, {
            assistantAudioAvailable: { value: signal(false) },
            assistantSpeaking: { value: signal(true) },
        });

        // Act
        api.requestAssistantStop();

        // Assert
        expect(stopped).not.toHaveBeenCalled();
    });

    it('emits no end request when the surface does not offer ending', () => {
        // Arrange
        const component = createComponent();
        const api = component as unknown as IVoiceSessionControlsComponentTestApi;
        const ended = vi.spyOn(component.endRequested, 'emit');
        Object.defineProperty(component, 'canEnd', { value: signal(false) });

        // Act
        api.requestEnd();

        // Assert
        expect(ended).not.toHaveBeenCalled();
    });
});

function createComponent(): VoiceSessionControlsComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    return TestBed.runInInjectionContext(() => new VoiceSessionControlsComponent());
}
