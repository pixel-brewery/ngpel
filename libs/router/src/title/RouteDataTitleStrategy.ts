// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import { type ActivatedRouteSnapshot, type RouterStateSnapshot, TitleStrategy } from '@angular/router';
import type { IRouteTitleOptions } from './IRouteTitleOptions';
import type { IRouteTitleTextResolver } from './IRouteTitleTextResolver';
import { ROUTE_TITLE_OPTIONS } from './ROUTE_TITLE_OPTIONS';
import { ROUTE_TITLE_TEXT_RESOLVER } from './ROUTE_TITLE_TEXT_RESOLVER';

// #endregion

/**
 * A `TitleStrategy` that composes the document title breadcrumb-style from `route.data`, deepest
 * segment first, and appends the configured application name. Every segment passes through the
 * {@link IRouteTitleTextResolver}, so products that put translation keys in the route data get
 * translated titles without this package depending on an i18n library. When no route declares a
 * title, Angular's own `route.title` resolution is used as the fallback.
 *
 * Register it with `provideRouteDataTitleStrategy(...)`.
 *
 * @public
 *
 * @example
 * ```typescript
 * {
 *     path: 'recipes',
 *     loadComponent: () => import('./RecipesView').then((m) => m.RecipesView),
 *     data: { title: 'app.recipes.title', description: 'Every recipe of the season.' }
 * }
 * ```
 */
@Injectable()
export class RouteDataTitleStrategy extends TitleStrategy {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);
    private readonly _options: IRouteTitleOptions = inject(ROUTE_TITLE_OPTIONS);
    private readonly _textResolver: IRouteTitleTextResolver = inject(ROUTE_TITLE_TEXT_RESOLVER);

    // #endregion

    // #region Methods

    /**
     * Updates the document title and, when the route declares one, the meta description.
     *
     * @public
     * @param routerState The router state after a completed navigation.
     */
    public override updateTitle(routerState: RouterStateSnapshot): void {
        const titleSegments = this.collectTitleSegments(routerState);
        const description = this.collectDescription(routerState);
        const title = this.composeTitle(titleSegments) ?? this.buildTitle(routerState);

        if (title !== undefined && title.length > 0) {
            this._document.title = title;
        }

        if (description !== undefined) {
            this.updateDescription(description);
        }
    }

    /**
     * Collects the resolved title segments from the root route down to the activated leaf. A
     * segment repeating the one above it is skipped, because Angular lets a componentless parent
     * pass its `data` down and a child that declares no title of its own would otherwise repeat
     * the parent's.
     */
    private collectTitleSegments(routerState: RouterStateSnapshot): ReadonlyArray<string> {
        const titleDataKey = this._options.titleDataKey ?? 'title';
        const segments: string[] = [];
        let previous: string | undefined;

        for (let route: ActivatedRouteSnapshot | null = routerState.root; route !== null; route = route.firstChild) {
            const candidate: unknown = route.data[titleDataKey];

            if (typeof candidate !== 'string') {
                continue;
            }

            const text = candidate.trim();

            if (text.length === 0 || text === previous) {
                continue;
            }

            previous = text;
            segments.push(this._textResolver.resolve(text));
        }

        return segments;
    }

    /**
     * Returns the description of the deepest route that declares one.
     */
    private collectDescription(routerState: RouterStateSnapshot): string | undefined {
        const descriptionDataKey = this._options.descriptionDataKey ?? 'description';
        let description: string | undefined;

        for (let route: ActivatedRouteSnapshot | null = routerState.root; route !== null; route = route.firstChild) {
            const candidate: unknown = route.data[descriptionDataKey];

            if (typeof candidate === 'string' && candidate.trim().length > 0) {
                description = candidate.trim();
            }
        }

        return description;
    }

    /**
     * Joins the segments deepest-first and appends the application name.
     */
    private composeTitle(segments: ReadonlyArray<string>): string | undefined {
        const appName = this._options.appName;

        if (segments.length === 0 && appName === undefined) {
            return undefined;
        }

        const parts = [...segments].reverse();
        if (appName !== undefined) {
            parts.push(appName);
        }

        return parts.join(this._options.separator ?? ' · ');
    }

    /**
     * Writes the `<meta name="description">` tag, creating it on first use.
     */
    private updateDescription(description: string): void {
        const existing = this._document.head.querySelector('meta[name="description"]');

        if (existing !== null) {
            existing.setAttribute('content', description);

            return;
        }

        const created = this._document.createElement('meta');
        created.setAttribute('name', 'description');
        created.setAttribute('content', description);
        this._document.head.appendChild(created);
    }

    // #endregion
}
