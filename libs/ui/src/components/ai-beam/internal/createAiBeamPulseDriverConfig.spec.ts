// #region Imports

import { describe, expect, it } from 'vitest';
import { createAiBeamPulseDriverConfig } from './createAiBeamPulseDriverConfig';

// #endregion

describe('createAiBeamPulseDriverConfig', () => {
    it('leaves a rotating preset to the stylesheet', () => {
        // Arrange
        const preset = 'md';

        // Act
        const config = createAiBeamPulseDriverConfig(preset, 'dark', 1.96, false);

        // Assert
        expect(config).toBeNull();
    });

    it('drives a pulse preset with the full oscillator topology and a rotating hue', () => {
        // Arrange
        const preset = 'pulse-outside';

        // Act
        const config = createAiBeamPulseDriverConfig(preset, 'dark', 2.3, false);

        // Assert
        expect([config?.oscillators.length, config?.hue]).toEqual([17, { range: 360, period: 14 }]);
    });

    it('stops the hue rotation when the colors are pinned', () => {
        // Arrange
        const preset = 'pulse-inner';

        // Act
        const config = createAiBeamPulseDriverConfig(preset, 'light', 2.3, true);

        // Assert
        expect(config?.hue).toBeNull();
    });
});
