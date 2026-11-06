// #region Imports

import type { TourAccessorAnchorMap } from '@pixel-brewery/mosaik-elements-angular';
import type { ITourContribution } from './ITourContribution';

// #endregion

/**
 * Creates the accessor mapping for a contribution within a composed tour.
 *
 * @param tourId - Identifier of the composed tour.
 * @param contribution - Feature-owned contribution to map.
 * @returns Target-to-anchor mapping consumed by `mosaikTourAccessor`.
 * @public
 */
export function createTourContributionAnchorMap(tourId: string, contribution: ITourContribution): TourAccessorAnchorMap {
    const targets = new Set<string>();

    for (const step of contribution.steps) {
        targets.add(step.target);

        for (const action of [...(step.enterActions ?? []), ...(step.advanceActions ?? [])]) {
            targets.add(action.anchorId);

            if (action.skipIfAnchorExists) {
                targets.add(action.skipIfAnchorExists);
            }
        }
    }

    return Object.fromEntries(Array.from(targets, (target) => [target, `${tourId}.${contribution.id}.${target}`]));
}
