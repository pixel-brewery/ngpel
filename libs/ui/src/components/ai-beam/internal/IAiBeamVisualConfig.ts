// #region Imports

import type { IThemeConfig } from './types';

// #endregion

/**
 * Complete visual values consumed by the invariant AI beam stylesheet.
 *
 * @internal
 */
export interface IAiBeamVisualConfig extends IThemeConfig {
    readonly bloomBackground: string;
    readonly borderRadius: number;
    readonly borderWidth: number;
    readonly defaultDuration: number;
    readonly innerBackground: string;
    readonly pulseBloomBlur: number;
    readonly pulseCoreBlur: number;
    readonly strokeBackground: string;
}
