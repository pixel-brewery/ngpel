// #region Imports

import { afterEach, describe, expect, it, vi } from 'vitest';
import { AiBeamPulseDriverService } from './AiBeamPulseDriverService';
import { createAiBeamPulseDriverConfig } from './createAiBeamPulseDriverConfig';

// #endregion

/** The pulse configuration every test in this suite registers with. */
function pulseConfig(): NonNullable<ReturnType<typeof createAiBeamPulseDriverConfig>> {
    const config = createAiBeamPulseDriverConfig('pulse-inner', 'dark', 2.3, false);

    if (config === null) {
        throw new Error('A pulse preset must produce a driver configuration.');
    }

    return config;
}

describe('AiBeamPulseDriverService', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('writes the oscillator values of every registered beam in one frame', () => {
        // Arrange
        let frame: FrameRequestCallback | null = null;
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => ((frame = callback), 17));
        const service = new AiBeamPulseDriverService(document);
        const first = document.createElement('div');
        const second = document.createElement('div');
        service.register(first, pulseConfig());
        service.register(second, pulseConfig());

        // Act
        (frame as FrameRequestCallback | null)?.(100);

        // Assert
        expect([
            first.style.getPropertyValue('--ngp-ai-beam-w1') !== '',
            second.style.getPropertyValue('--ngp-ai-beam-opacity-br') !== '',
            first.style.getPropertyValue('--ngp-ai-beam-hue').endsWith('deg'),
        ]).toEqual([true, true, true]);
    });

    it('starts a single animation loop no matter how many beams register', () => {
        // Arrange
        const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 17);
        const service = new AiBeamPulseDriverService(document);

        // Act
        service.register(document.createElement('div'), pulseConfig());
        service.register(document.createElement('div'), pulseConfig());

        // Assert
        expect(requestAnimationFrame).toHaveBeenCalledOnce();
    });

    it('stops the animation loop once the last beam has unregistered', () => {
        // Arrange
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 17);
        const cancelAnimationFrame = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
        const service = new AiBeamPulseDriverService(document);
        const unregisterFirst = service.register(document.createElement('div'), pulseConfig());
        const unregisterSecond = service.register(document.createElement('div'), pulseConfig());
        unregisterFirst();

        // Act
        unregisterSecond();

        // Assert
        expect(cancelAnimationFrame).toHaveBeenCalledExactlyOnceWith(17);
    });
});
