/**
 * Configures {@link createSideNavigationController}. Every member is optional; the defaults are the
 * `presentation.*` storage keys and the media queries of a 960px shell breakpoint.
 *
 * @public
 */
export interface ISideNavigationControllerConfig {
    // #region Properties

    /**
     * Storage key of the navigation sidebar preference. Defaults to `'presentation.isNavOpen'`.
     */
    readonly navigationStorageKey?: string;

    /**
     * Storage key of the compact (icon-only) navigation preference. Defaults to
     * `'presentation.navigationIsRail'`.
     */
    readonly navigationCompactStorageKey?: string;

    /**
     * Storage key of the desktop rail preference. Defaults to `'presentation.isRailOpen'`.
     */
    readonly railStorageKey?: string;

    /**
     * Storage key of the mobile rail preference, persisted separately so a phone does not inherit
     * a desktop rail. Defaults to `'presentation.isMobileRailOpen'`.
     */
    readonly mobileRailStorageKey?: string;

    /**
     * Storage key of the desktop rail split position. Defaults to
     * `'presentation.railSplitPosition'`.
     */
    readonly railSplitPositionStorageKey?: string;

    /**
     * Media query that identifies the mobile layout. Defaults to `'(max-width: 959.98px)'`.
     */
    readonly mobileMediaQuery?: string;

    /**
     * Media query of the viewport wide enough to show the navigation by default. Defaults to
     * `'(min-width: 960px)'`.
     */
    readonly autoOpenMediaQuery?: string;

    /**
     * Route data key a route sets to `false` to suppress the navigation, for example a full-screen
     * editor. Defaults to `'hasNav'`; every other value, including an absent one, means the route
     * has navigation.
     */
    readonly hasNavigationDataKey?: string;

    /**
     * The split position used until the user moves the divider, as a percentage. Defaults to `60`.
     */
    readonly defaultRailSplitPosition?: number;

    /**
     * The smallest persisted split position, as a percentage. Defaults to `50`.
     */
    readonly minRailSplitPosition?: number;

    /**
     * The largest persisted split position, as a percentage. Defaults to `70`.
     */
    readonly maxRailSplitPosition?: number;

    // #endregion
}
