// #region Imports

import type { AiBeamPalette } from '../AiBeamPalette';
import type { AiBeamPreset } from '../AiBeamPreset';
import type { AiBeamResolvedTheme } from '../AiBeamResolvedTheme';
import type { IAiBeamVisualConfig } from './IAiBeamVisualConfig';
import {
    bloomConic,
    colorGradients,
    lineBloomGradients,
    lineGradients,
    lineHighlight,
    lineInnerGradients,
    pulseInnerGradients,
    pulseRingGradients,
    pulseStaticGradients,
    pulseTableGradients,
    smallGradients,
    whiteConic,
} from './gradients';
import { PULSE_INNER_BLOOM, PULSE_OUTER_BLOOM, PULSE_OUTER_CORE, THEME_CONFIG } from './palettes';
import { isPulse } from './isPulse';

// #endregion

/**
 * Creates all complex background values for one beam configuration.
 *
 * @param preset - Selected visual preset.
 * @param palette - Selected color palette.
 * @param theme - Resolved background theme.
 * @returns Complete visual configuration.
 *
 * @internal
 */
export function createAiBeamVisualConfig(preset: AiBeamPreset, palette: AiBeamPalette, theme: AiBeamResolvedTheme): IAiBeamVisualConfig {
    const themeConfig = THEME_CONFIG[preset][theme];
    const common = {
        ...themeConfig,
        borderRadius: preset === 'sm' ? 32 : 16,
        borderWidth: 1,
        defaultDuration: preset === 'line' ? 3.1 : isPulse(preset) ? 2.3 : 1.96,
        pulseBloomBlur: preset === 'pulse-outside' ? (theme === 'dark' ? 22.5 : 15) : 8,
        pulseCoreBlur: preset === 'pulse-outside' ? (theme === 'dark' ? 3 : 6) : 0,
    };

    if (preset === 'sm') {
        return {
            ...common,
            strokeBackground: `${whiteConic(theme)}, ${smallGradients(palette, false)}`,
            innerBackground: smallGradients(palette, true),
            bloomBackground: bloomConic(theme),
        };
    }

    if (preset === 'md') {
        return {
            ...common,
            strokeBackground: `${whiteConic(theme)}, ${colorGradients(palette, false)}`,
            innerBackground: colorGradients(palette, true),
            bloomBackground: bloomConic(theme),
        };
    }

    if (preset === 'line') {
        return {
            ...common,
            strokeBackground: `${lineHighlight(theme)}, ${lineGradients(palette, theme)}`,
            innerBackground: lineInnerGradients(palette),
            bloomBackground: lineBloomGradients(palette, theme),
        };
    }

    if (preset === 'pulse-inner') {
        return {
            ...common,
            strokeBackground: pulseRingGradients(palette),
            innerBackground: pulseInnerGradients(palette, theme),
            bloomBackground: pulseStaticGradients(PULSE_INNER_BLOOM, palette, theme === 'dark' ? 0.76 : 0.775),
        };
    }

    return {
        ...common,
        strokeBackground: pulseTableGradients(PULSE_OUTER_CORE, palette),
        innerBackground: pulseTableGradients(PULSE_OUTER_CORE, palette),
        bloomBackground: pulseStaticGradients(PULSE_OUTER_BLOOM, palette, theme === 'dark' ? 0.77 : 1),
    };
}
