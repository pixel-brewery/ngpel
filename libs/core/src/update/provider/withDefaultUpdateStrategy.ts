// #region Imports

import type { IFeature } from '@pixel-brewery/ngpel-core';
import { DefaultUpdateHandlerStrategy } from '../strategies/DefaultUpdateHandlerStrategy';
import type { UpdateFeatureKind } from './UpdateFeatureKind';
import { withUpdateStrategy } from './withUpdateStrategy';

// #endregion

/**
 * Registers the console-only {@link DefaultUpdateHandlerStrategy}. Applied automatically when
 * `provideUpdate()` receives no strategy feature at all.
 *
 * @public
 */
export function withDefaultUpdateStrategy(): IFeature<UpdateFeatureKind> {
    return withUpdateStrategy('default', DefaultUpdateHandlerStrategy);
}
