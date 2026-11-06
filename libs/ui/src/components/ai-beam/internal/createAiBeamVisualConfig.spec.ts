// #region Imports

import { describe, expect, it } from 'vitest';
import type { AiBeamPalette } from '../AiBeamPalette';
import type { AiBeamPreset } from '../AiBeamPreset';
import type { AiBeamResolvedTheme } from '../AiBeamResolvedTheme';
import { createAiBeamVisualConfig } from './createAiBeamVisualConfig';

// #endregion

const PALETTES: ReadonlyArray<AiBeamPalette> = ['colorful', 'mono', 'ocean', 'sunset'];
const PRESETS: ReadonlyArray<AiBeamPreset> = ['sm', 'md', 'line', 'pulse-inner', 'pulse-outside'];
const THEMES: ReadonlyArray<AiBeamResolvedTheme> = ['dark', 'light'];

describe('createAiBeamVisualConfig', () => {
    it('builds a complete gradient set for every preset, palette and theme', () => {
        // Arrange
        const combinations = PRESETS.flatMap((preset) => PALETTES.flatMap((palette) => THEMES.map((theme) => [preset, palette, theme] as const)));

        // Act
        const configs = combinations.map(([preset, palette, theme]) => createAiBeamVisualConfig(preset, palette, theme));

        // Assert
        const layers = configs.flatMap((config) => [config.strokeBackground, config.innerBackground, config.bloomBackground]);
        expect(layers.every((layer) => layer.includes('gradient(') && !layer.includes('undefined'))).toBe(true);
    });

    it('keeps one cycle duration per preset', () => {
        // Arrange
        const presets: ReadonlyArray<AiBeamPreset> = ['md', 'line', 'pulse-inner'];

        // Act
        const durations = presets.map((preset) => createAiBeamVisualConfig(preset, 'colorful', 'dark').defaultDuration);

        // Assert
        expect(durations).toEqual([1.96, 3.1, 2.3]);
    });
});
