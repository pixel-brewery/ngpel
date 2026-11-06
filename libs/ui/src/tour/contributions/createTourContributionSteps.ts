// #region Imports

import type { ITourStep, TourStepAction } from '@pixel-brewery/mosaik-elements-foundation';
import type { ITourContribution } from './ITourContribution';
import type { TourContributionText } from './TourContributionText';

// #endregion

/**
 * Materializes feature-owned contributions as native Mosaik tour steps.
 *
 * @param tourId - Identifier of the composed tour.
 * @param contributions - Ordered contributions to materialize.
 * @param defaults - Default native step configuration applied before contribution overrides.
 * @returns Namespaced, localized Mosaik tour steps.
 * @public
 */
export function createTourContributionSteps(
    tourId: string,
    contributions: ReadonlyArray<ITourContribution>,
    defaults: Omit<Partial<ITourStep>, 'id' | 'anchorId' | 'title' | 'content'> = {},
): ReadonlyArray<ITourStep> {
    return contributions.flatMap((contribution) =>
        contribution.steps.map((step) => {
            const { id, target, title, content, ...configuration } = step;
            const anchorNamespace = `${tourId}.${contribution.id}.`;

            return {
                ...defaults,
                ...configuration,
                ...(configuration.enterActions ? { enterActions: namespaceActions(configuration.enterActions, anchorNamespace) } : {}),
                ...(configuration.advanceActions ? { advanceActions: namespaceActions(configuration.advanceActions, anchorNamespace) } : {}),
                id: `${contribution.id}.${id}`,
                anchorId: `${anchorNamespace}${target}`,
                title: resolveTourContributionText(title),
                content: resolveTourContributionText(content),
            };
        }),
    );
}

function resolveTourContributionText(text: TourContributionText): string {
    return typeof text === 'function' ? text() : text;
}

function namespaceActions(actions: ReadonlyArray<TourStepAction>, anchorNamespace: string): ReadonlyArray<TourStepAction> {
    return actions.map((action) => ({
        ...action,
        anchorId: `${anchorNamespace}${action.anchorId}`,
        ...(action.skipIfAnchorExists ? { skipIfAnchorExists: `${anchorNamespace}${action.skipIfAnchorExists}` } : {}),
    }));
}
