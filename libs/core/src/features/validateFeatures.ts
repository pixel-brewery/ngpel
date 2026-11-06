// #region Imports

import type { IFeature } from './IFeature';
import type { IFeatureIncompatibilityRule } from './IFeatureIncompatibilityRule';

// #endregion

/**
 * Validates a set of features:
 *  1) Non-multi kinds may appear at most once.
 *  2) IDs must be unique within the same kind.
 *  3) Optional incompatibility rules must not be violated.
 *
 * @public
 * @param features Features to validate.
 * @param rules Optional incompatibility rules.
 */
export function validateFeatures<TKind extends string>(
    features: ReadonlyArray<IFeature<TKind>>,
    rules: ReadonlyArray<IFeatureIncompatibilityRule<TKind>> = [],
): void {
    const byKind = new Map<string, IFeature<TKind>[]>();
    for (const feature of features) {
        const key = feature.kind as unknown as string;
        const bucket = byKind.get(key) ?? [];
        bucket.push(feature);
        byKind.set(key, bucket);
    }

    for (const [kind, list] of byKind.entries()) {
        const anyNonMulti = list.some((feature) => feature.options.multi !== true);
        if (anyNonMulti && list.length > 1) {
            const ids = list.map((feature) => feature.id).join(', ');
            throw new Error(
                `Feature conflict: multiple features of non-multi kind '${kind}' detected [${ids}]. ` +
                    'Either mark such features as { multi: true } or register only one.',
            );
        }
    }

    for (const [kind, list] of byKind.entries()) {
        const seen = new Set<string>();
        for (const feature of list) {
            if (seen.has(feature.id)) {
                throw new Error(`Feature conflict: duplicate id '${feature.id}' within kind '${kind}'. Each feature id must be unique per kind.`);
            }
            seen.add(feature.id);
        }
    }

    for (const rule of rules) {
        if (rule.isViolated(features)) {
            throw new Error(`Feature incompatibility [${rule.id}]: ${rule.message}`);
        }
    }
}
