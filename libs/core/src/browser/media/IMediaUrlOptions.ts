/**
 * Configuration of the media URL resolution.
 *
 * @public
 */
export interface IMediaUrlOptions {
    // #region Properties

    /**
     * The API origin root-relative media paths are resolved against, either as a value or as an
     * accessor. An accessor is evaluated on every resolution inside an injection context, so it
     * may read other tokens (`() => inject(ENV)['API_URL'] ?? ''`) or follow a changing origin.
     */
    readonly origin: string | (() => string);

    // #endregion
}
