// #region Imports

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import type { INavHandleHandler } from './INavHandleHandler';
import type { INavItem } from './INavItem';
import type { IParsedHandle } from './IParsedHandle';
import type { NavHandle } from './NavHandle';
import { NAV_HANDLE_HANDLER } from './NAV_HANDLE_HANDLER';
import { NAVIGATION_WINDOW } from './NAVIGATION_WINDOW';
import { parseHandle } from './parseHandle';

// #endregion

/**
 * Executes {@link NavHandle} actions. `route:` goes through the Angular router and `ext:` through
 * the {@link NAVIGATION_WINDOW} port; every other scheme — `cmd:` in particular — is delegated to
 * an {@link INavHandleHandler} registered under `NAV_HANDLE_HANDLER`, which keeps the command
 * stack out of this package's dependencies.
 *
 * Registered by `provideNavigation(...)`.
 *
 * @public
 */
@Injectable()
export class NavigationHandleDispatcher {
    // #region Fields

    private readonly _router: Router = inject(Router);
    private readonly _window: Window | null = inject(NAVIGATION_WINDOW);
    private readonly _handlers: ReadonlyMap<string, INavHandleHandler>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `NavigationHandleDispatcher` class.
     *
     * @public
     */
    public constructor() {
        const handlers = inject(NAV_HANDLE_HANDLER, { optional: true }) ?? [];

        this._handlers = new Map(handlers.map((handler): [string, INavHandleHandler] => [handler.scheme, handler]));
    }

    // #endregion

    // #region Methods

    /**
     * Executes the handle of an item. An item without a handle is a pure group and does nothing.
     *
     * @public
     * @param item The navigation item.
     * @throws Error when the handle is malformed or its scheme has no handler.
     */
    public async execute(item: INavItem): Promise<void> {
        if (item.handle === undefined) {
            return;
        }

        await this.executeHandle(item.handle);
    }

    /**
     * Executes a handle directly.
     *
     * @public
     * @param handle The handle to execute.
     * @throws Error when the handle is malformed or its scheme has no handler.
     */
    public async executeHandle(handle: NavHandle): Promise<void> {
        const parsed = parseHandle(handle);
        const handler = this._handlers.get(parsed.scheme);

        if (handler !== undefined) {
            await handler.execute(parsed);

            return;
        }

        if (parsed.scheme === 'route') {
            await this.handleRoute(parsed);

            return;
        }

        if (parsed.scheme === 'ext') {
            this.handleExternal(parsed);

            return;
        }

        throw new Error(`No handler is registered for the navigation handle scheme "${parsed.scheme}".`);
    }

    /**
     * Navigates the Angular router to the handle's path.
     */
    private async handleRoute(handle: IParsedHandle): Promise<void> {
        const segments = handle.path.split('/').filter((segment): boolean => segment.length > 0);
        const urlTree = this._router.createUrlTree(segments, { queryParams: handle.query });

        await this._router.navigateByUrl(urlTree);
    }

    /**
     * Opens the handle's URL in a new, isolated browsing context.
     */
    private handleExternal(handle: IParsedHandle): void {
        const url = handle.path.startsWith('http') ? handle.path : `https://${handle.path}`;
        const parameters = new URLSearchParams();

        for (const [name, value] of Object.entries(handle.query)) {
            for (const single of Array.isArray(value) ? (value as ReadonlyArray<unknown>) : [value]) {
                parameters.append(name, String(single));
            }
        }

        const query = parameters.toString();

        this._window?.open(query.length > 0 ? `${url}?${query}` : url, '_blank', 'noopener,noreferrer');
    }

    // #endregion
}
