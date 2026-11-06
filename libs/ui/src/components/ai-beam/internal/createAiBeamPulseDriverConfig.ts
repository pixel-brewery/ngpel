// #region Imports

import type { AiBeamPreset } from '../AiBeamPreset';
import type { AiBeamResolvedTheme } from '../AiBeamResolvedTheme';
import type { IAiBeamPulseDriverConfig } from './IAiBeamPulseDriverConfig';
import { createOscillators } from './oscillators';
import { isPulse } from './isPulse';

// #endregion

/**
 * Creates the oscillators for a pulse beam.
 *
 * @param preset - Pulse preset.
 * @param theme - Resolved background theme.
 * @param duration - Configured cycle duration in seconds.
 * @param staticColors - Whether hue movement is disabled.
 * @returns Pulse driver configuration, or `null` for a rotating preset.
 *
 * @internal
 */
export function createAiBeamPulseDriverConfig(
    preset: AiBeamPreset,
    theme: AiBeamResolvedTheme,
    duration: number,
    staticColors: boolean,
): IAiBeamPulseDriverConfig | null {
    if (!isPulse(preset)) {
        return null;
    }

    const dark = theme === 'dark';
    const scale = duration / 2.3;
    const inner = preset === 'pulse-inner';
    const spread = inner ? 0.28 : dark ? 0.28 : 0.36;
    const drift = inner ? (dark ? 33 : 40) : dark ? 14 : 19;
    const opacity = inner ? (dark ? 0.48 : 0.45) : dark ? 0.46 : 0;
    const globalHeight = inner ? (dark ? 0.34 : 0.22) : dark ? 0.16 : 0.58;
    const breatheSpeed = (inner ? (dark ? 1.9 : 2.6) : dark ? 2.3 : 3.7) * scale;
    const sizeSpeed = (inner ? (dark ? 2.6 : 4.6) : dark ? 6.4 : 4.6) * scale;
    const heightSpeed = (inner ? (dark ? 2.4 : 5.5) : dark ? 2.4 : 3.8) * scale;

    return {
        oscillators: createOscillators(spread, drift, opacity, globalHeight, breatheSpeed, sizeSpeed, heightSpeed),
        hue: staticColors ? null : { range: 360, period: inner ? 16 : 14 },
    };
}
