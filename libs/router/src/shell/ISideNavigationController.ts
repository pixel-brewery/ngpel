// #region Imports

import type { Signal } from '@angular/core';

// #endregion

/**
 * The responsive state of an application shell: the navigation sidebar on the left and the rail
 * panel on the right, both persisted per user and both aware of the current viewport. Created by
 * {@link createSideNavigationController}.
 *
 * @public
 */
export interface ISideNavigationController {
    // #region Properties

    /**
     * Whether the navigation sidebar is open, combining the persisted preference, the viewport and
     * the current route.
     *
     * @readonly
     */
    readonly isNavigationOpen: Signal<boolean>;

    /**
     * Whether the navigation is shown as an icon-only rail. Always `false` on mobile, where a
     * compact rail has no room.
     *
     * @readonly
     */
    readonly isNavigationCompact: Signal<boolean>;

    /**
     * Whether the rail panel is open for the current viewport; desktop and mobile are persisted
     * independently.
     *
     * @readonly
     */
    readonly isRailOpen: Signal<boolean>;

    /**
     * The persisted desktop split position, as a percentage of the available width.
     *
     * @readonly
     */
    readonly railSplitPosition: Signal<number>;

    /**
     * Whether the shell currently uses its mobile layout.
     *
     * @readonly
     */
    readonly isMobile: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Toggles the navigation sidebar.
     */
    toggleNavigation(): void;

    /**
     * Opens or closes the navigation sidebar, for a host whose own component reports a
     * user-initiated change such as a swipe.
     *
     * @param isOpen The new state.
     */
    setNavigationOpen(isOpen: boolean): void;

    /**
     * Toggles the navigation between its expanded and its icon-only display.
     */
    toggleNavigationCompact(): void;

    /**
     * Toggles the rail panel of the current viewport.
     */
    toggleRail(): void;

    /**
     * Closes the rail panel of the current viewport.
     */
    closeRail(): void;

    /**
     * Applies a split position the user dragged to: the rail counts as closed at `100`, and a
     * position within the configured bounds is persisted. Ignored on mobile, where the rail is a
     * sheet rather than a split.
     *
     * @param position The split position as a percentage of the available width.
     */
    setRailSplitPosition(position: number): void;

    // #endregion
}
