// #region Imports

import type { AiBeamPreset } from '../AiBeamPreset';

// #endregion

/**
 * Determines whether a preset is driven by the shared pulse loop.
 *
 * @param preset - Preset to inspect.
 * @returns `true` for a pulse preset.
 *
 * @internal
 */
export function isPulse(preset: AiBeamPreset): boolean {
    return preset === 'pulse-inner' || preset === 'pulse-outside';
}
