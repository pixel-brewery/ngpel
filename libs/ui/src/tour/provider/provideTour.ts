// #region Imports

import { Injectable, makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { provideTours, withTourCameraBehavior, type ITourFeature } from '@pixel-brewery/mosaik-elements-angular';
import type { ITourBehavior, ITourBehaviorContext } from '@pixel-brewery/mosaik-elements-foundation';
import { composeProviders, type IFeatureIncompatibilityRule } from '@pixel-brewery/ngpel-core';
import type { TourFeature } from './TourFeature';
import type { TourFeatureKind } from './TourFeatureKind';

// #endregion

/**
 * Composition rules applied to feature-owned tour definitions.
 *
 * @private
 */
const TOUR_RULES: ReadonlyArray<IFeatureIncompatibilityRule<TourFeatureKind>> = [];

/**
 * Provides the native tour runtime and composes feature-owned tour definitions.
 *
 * This root provider must be called once by the application shell. Individual
 * feature libraries contribute their tours through `with...Tour()` features.
 *
 * @param features - Native Mosaik features and tour contributions owned by feature libraries.
 * @returns Environment providers for the native tour runtime and all definitions.
 * @public
 */
export function provideTour(...features: ReadonlyArray<TourFeature | ITourFeature>): EnvironmentProviders {
    const nativeFeatures = features.filter((feature): feature is ITourFeature => !isApplicationTourFeature(feature));
    const applicationFeatures = features.filter(isApplicationTourFeature);

    return makeEnvironmentProviders([
        provideTours(
            withTourCameraBehavior({
                surface: resolveTourCameraSurface,
                scale: 1.16,
                focusY: 0.46,
                duration: 650,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                viewportPadding: 40,
            }),
            ...nativeFeatures,
            withTourAutomationContract(),
        ),
        ...composeProviders([], applicationFeatures, TOUR_RULES),
    ]);
}

/**
 * Distinguishes application tour contributions from native Mosaik features.
 *
 * @param feature - Candidate tour feature.
 * @returns Whether the feature belongs to the application composition layer.
 * @private
 */
function isApplicationTourFeature(feature: TourFeature | ITourFeature): feature is TourFeature {
    return 'kind' in feature;
}

/**
 * Exposes the active third-party tour host through the stable UI-automation contract.
 *
 * @returns Tour behavior feature that owns the active host marker.
 * @private
 */
function withTourAutomationContract(): ITourFeature {
    return {
        id: 'tourAutomationContract',
        behaviorType: TourAutomationContractBehavior,
        provide: () => [TourAutomationContractBehavior],
    };
}

/**
 * Resolves the visual surface moved by the global tour camera.
 *
 * Runtime-dialog tours move their active overlay while page tours move the
 * persistent routed-content surface. The native tour element remains outside
 * either surface so its backdrop and guide card stay fixed and crisp.
 *
 * @param context - Active Mosaik tour context.
 * @returns The surface to pan and scale, if one is available.
 * @private
 */
function resolveTourCameraSurface(context: ITourBehaviorContext): HTMLElement | null {
    return (
        context.tour.parentElement?.querySelector<HTMLElement>(':scope > mosaik-dialog, :scope > mosaik-drawer, :scope > mosaik-sheet') ??
        context.document.querySelector<HTMLElement>('[data-mosaik-tour-camera-surface]')
    );
}

/**
 * Owns the stable test-id of the dynamically mounted Mosaik tour host.
 *
 * @private
 */
@Injectable()
class TourAutomationContractBehavior implements ITourBehavior {
    // #region Fields

    private _tour: HTMLElement | null = null;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    /** Attaches the automation marker while a tour is active. */
    public attach(context: ITourBehaviorContext): void {
        this._tour = context.tour;
        this._tour.setAttribute('test-id', 'guided-tour');
    }

    /** Keeps the tour-level contract unchanged between steps. */
    public activate(): void {
        // The marker belongs to the complete tour rather than an individual step.
    }

    /** Removes the marker when the active tour closes. */
    public detach(context: ITourBehaviorContext): void {
        context.tour.removeAttribute('test-id');
        this._tour = null;
    }

    /** Cleans up the marker if the runtime disposes the behavior early. */
    public dispose(): void {
        this._tour?.removeAttribute('test-id');
        this._tour = null;
    }

    // #endregion
}
