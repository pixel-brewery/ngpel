// #region Imports

import type { Route, Routes } from '@angular/router';
import type { IPresentationRoutesOptions } from './IPresentationRoutesOptions';

// #endregion

/**
 * Wraps the feature routes of an application in one guarded shell route. It exists so the shell
 * mount point, its guards and its default child are declared once instead of being copied into
 * every product's route file — the shell component itself stays in the product.
 *
 * @public
 * @param children The feature routes rendered inside the shell.
 * @param options The shell loader, its mount path, default child and guards.
 * @returns The routes to spread into the application route configuration.
 *
 * @example
 * ```typescript
 * export const appRoutes: Routes = [
 *     ...presentationRoutes(featureRoutes, {
 *         shell: () => import('./AppShellView').then((m) => m.AppShellView),
 *         redirectTo: 'explore',
 *         guards: { canActivate: [authenticationGuard] }
 *     }),
 *     ...publicRoutes
 * ];
 * ```
 */
export function presentationRoutes(children: Routes, options: IPresentationRoutesOptions): Routes {
    const shellChildren: Routes =
        options.redirectTo === undefined ? [...children] : [{ path: '', pathMatch: 'full', redirectTo: options.redirectTo }, ...children];

    const shellRoute: Route = {
        path: options.path ?? 'main',
        loadComponent: options.shell,
        children: shellChildren,
    };

    if (options.guards?.canActivate !== undefined) {
        shellRoute.canActivate = options.guards.canActivate;
    }

    if (options.guards?.canMatch !== undefined) {
        shellRoute.canMatch = options.guards.canMatch;
    }

    if (options.data !== undefined) {
        shellRoute.data = options.data;
    }

    return [shellRoute];
}
