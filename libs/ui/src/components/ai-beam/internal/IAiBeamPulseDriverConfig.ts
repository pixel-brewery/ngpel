// #region Imports

import type { IAiBeamPulseOscillator } from './IAiBeamPulseOscillator';

// #endregion

/**
 * Runtime configuration consumed by the shared pulse driver.
 *
 * @internal
 */
export interface IAiBeamPulseDriverConfig {
    readonly hue: { readonly period: number; readonly range: number } | null;
    readonly oscillators: ReadonlyArray<IAiBeamPulseOscillator>;
}
