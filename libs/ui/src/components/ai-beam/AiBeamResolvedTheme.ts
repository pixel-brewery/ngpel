// #region Imports

import type { AiBeamTheme } from './AiBeamTheme';

// #endregion

/**
 * The theme the rendering engine works with, once `auto` has been resolved against the browser's
 * preferred color scheme.
 *
 * @public
 */
export type AiBeamResolvedTheme = Exclude<AiBeamTheme, 'auto'>;
