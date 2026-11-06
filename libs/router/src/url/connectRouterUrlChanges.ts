// #region Imports

import type { Location } from '@angular/common';
import { NavigationEnd, type Router } from '@angular/router';

// #endregion

/**
 * Connects URL-driven UI state to the current URL and to every completed router navigation.
 *
 * `Location.subscribe` only reports browser popstate events and therefore misses programmatic
 * router navigation. Direct `Location.go` calls are deliberately not observed because the caller
 * that issues them already applies the corresponding UI state.
 *
 * @public
 * @param location Angular location service, read once for the initial application URL.
 * @param router Angular router whose completed navigations drive every later synchronization.
 * @param listener Synchronization callback receiving the current application URL.
 * @returns A function that disconnects the router listener.
 *
 * @example
 * ```typescript
 * const disconnect = connectRouterUrlChanges(inject(Location), inject(Router), (url) => this.applyUrl(url));
 * inject(DestroyRef).onDestroy(disconnect);
 * ```
 */
export function connectRouterUrlChanges(location: Pick<Location, 'path'>, router: Pick<Router, 'events'>, listener: (url: string) => void): () => void {
    const subscription = router.events.subscribe((event): void => {
        if (event instanceof NavigationEnd) {
            listener(event.urlAfterRedirects);
        }
    });

    listener(location.path());

    return (): void => subscription.unsubscribe();
}
