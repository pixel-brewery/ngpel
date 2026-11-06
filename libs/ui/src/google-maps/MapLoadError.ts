/**
 * Sanitized failure at the browser Maps SDK boundary.
 *
 * @public
 */
export class MapLoadError extends Error {
    // #region Fields
    // #endregion

    // #region Ctor

    /**
     * Creates a failure without exposing a provider URL or API key.
     *
     * @param reason - Configuration, platform, or SDK loading failure.
     * @public
     */
    public constructor(public readonly reason: 'configuration' | 'platform' | 'load') {
        super(`Google Maps ${reason} failure.`);
        this.name = 'MapLoadError';
    }

    // #endregion

    // #region Properties
    // #endregion

    // #region Methods
    // #endregion
}
