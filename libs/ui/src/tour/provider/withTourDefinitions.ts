// #region Imports

import { TOUR_DEFINITIONS } from '@pixel-brewery/mosaik-elements-angular';
import { createFeature } from '@pixel-brewery/ngpel-core';
import type { IWithTourDefinitionsOptions } from './IWithTourDefinitionsOptions';
import type { TourFeature } from './TourFeature';
import { TourFeatureKinds } from './TourFeatureKinds';

// #endregion

/**
 * Creates a composable feature contribution for native Mosaik tour definitions.
 *
 * Definition factories remain lazy and are resolved by the native tour service
 * in Angular's injection context.
 *
 * @param options - Feature identifier and tour definitions to contribute.
 * @returns A tour feature for use with {@link provideTour}.
 * @public
 */
export function withTourDefinitions(options: IWithTourDefinitionsOptions): TourFeature {
    return createFeature(
        options.id,
        TourFeatureKinds.Definition,
        options.definitions.map((definition) => ({
            provide: TOUR_DEFINITIONS,
            useValue: definition,
            multi: true,
        })),
        { multi: true },
    );
}
