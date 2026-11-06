/**
 * Application-owned browser credentials and localization for Google Maps.
 *
 * @public
 */
export interface IMapConfiguration {
    /**
     * Rendering SDK API key supplied by the application environment.
     *
     * @public
     * @readonly
     */
    readonly apiKey: string | undefined;

    /**
     * Maps language code; otherwise Google's browser-language default applies.
     *
     * @public
     * @readonly
     */
    readonly language?: string;

    /**
     * Region bias for Google Maps, independent of the current viewport.
     *
     * @public
     * @readonly
     */
    readonly region?: string;
}
