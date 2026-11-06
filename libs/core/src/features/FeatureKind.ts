/**
 * Represents a branded string for feature kinds to prevent accidental mixing of arbitrary strings.
 *
 * @public
 */
export type FeatureKind<TName extends string> = TName & { readonly __brand: 'FeatureKind' };

/**
 * Brands a plain string literal as a {@link FeatureKind}. Co-located with the type because a
 * separate `featureKind.ts` would collide with `FeatureKind.ts` on case-insensitive file systems.
 *
 * @public
 * @param name The kind name.
 */
export function featureKind<TKind extends string>(name: TKind): FeatureKind<TKind> {
    return name as FeatureKind<TKind>;
}
