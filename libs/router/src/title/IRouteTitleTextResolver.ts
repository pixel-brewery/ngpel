/**
 * Port resolving a route title segment to display text. Products that keep translation keys in
 * `route.data` bind it to their translation service; the default resolver returns the text
 * unchanged, so the package carries no i18n dependency.
 *
 * @public
 */
export interface IRouteTitleTextResolver {
    // #region Methods

    /**
     * Resolves one title segment.
     *
     * @param text The raw segment taken from the route data.
     * @returns The display text.
     */
    resolve(text: string): string;

    // #endregion
}
