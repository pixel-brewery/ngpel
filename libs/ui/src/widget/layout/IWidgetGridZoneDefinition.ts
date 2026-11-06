/**
 * One semantic zone a widget grid renders, with its text already resolved. The layout algebra is
 * i18n-agnostic on purpose: it receives finished strings and never a translation key, so nothing
 * about a persisted layout depends on the language it was created in.
 *
 * @public
 */
export interface IWidgetGridZoneDefinition {
    // #region Properties

    /**
     * The stable zone identifier used by widget defaults and persisted layouts.
     */
    readonly id: string;

    /**
     * The icon shown in the zone header, named in the host's icon vocabulary.
     */
    readonly iconName: string;

    /**
     * The resolved zone title.
     */
    readonly label: string;

    /**
     * The resolved explanatory zone text.
     */
    readonly description: string;

    /**
     * The zone order used until the user reorders the zones.
     */
    readonly order: number;

    // #endregion
}
