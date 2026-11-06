// #region Imports

import { assertInInjectionContext } from '@angular/core';
import type { ISideNavigationController } from './ISideNavigationController';
import type { ISideNavigationControllerConfig } from './ISideNavigationControllerConfig';
import { SideNavigationController } from './SideNavigationController';

// #endregion

/**
 * Creates the responsive shell state — navigation sidebar, compact rail, right rail panel and its
 * split position — with the persistence and the viewport rules every application shell re-solves.
 * Must be called in an injection context, so the controller can read the router, the activated
 * route and the browser storage without the caller wiring them up.
 *
 * The viewport is described by media query strings rather than by a design system's breakpoint
 * aliases, which keeps the controller usable with any UI library.
 *
 * @public
 * @param config The storage keys, media queries and split bounds; omitted members keep their
 * defaults.
 * @returns The shell state controller.
 *
 * @example
 * ```typescript
 * export class AppShellPresenter {
 *     private readonly _sideNavigation = createSideNavigationController({ mobileMediaQuery: '(max-width: 767.98px)' });
 *
 *     public get isNavigationOpen(): Signal<boolean> {
 *         return this._sideNavigation.isNavigationOpen;
 *     }
 *
 *     protected onMenuClick(): void {
 *         this._sideNavigation.toggleNavigation();
 *     }
 * }
 * ```
 */
export function createSideNavigationController(config?: ISideNavigationControllerConfig): ISideNavigationController {
    assertInInjectionContext(createSideNavigationController);

    return new SideNavigationController(config);
}
