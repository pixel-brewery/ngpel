// #region Imports

import { Location } from '@angular/common';
import { inject, Injectable, type OnDestroy, type Type } from '@angular/core';
import { type IsActiveMatchOptions, NavigationEnd, type NavigationExtras, type Params, type Route, Router, type UrlTree } from '@angular/router';
import { type Observable, Subject, Subscription, type SubscriptionLike } from 'rxjs';
import { NavigatorJournal } from './NavigatorJournal';

// #endregion

/**
 * A task-oriented facade over `Router` and `Location`: navigate by URL, by view type or by route
 * definition, step through the in-application {@link NavigatorJournal} with a fall back to the
 * browser history, and ask what is currently active. It also keeps the previous URL, which the
 * router itself does not expose.
 *
 * Register it with `provideNavigator()`.
 *
 * @public
 */
@Injectable()
export class Navigator implements OnDestroy {
    // #region Fields

    private readonly _router: Router = inject(Router);
    private readonly _location: Location = inject(Location);
    private readonly _journal: NavigatorJournal = inject(NavigatorJournal);
    private readonly _locationChanged = new Subject<void>();
    private readonly _popStateSubscription: SubscriptionLike;
    private readonly _routerSubscription: Subscription;
    private _currentUrl: string;
    private _previousUrl = '';

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `Navigator` class.
     *
     * @public
     */
    public constructor() {
        this._currentUrl = this._router.url;

        this._popStateSubscription = this._location.subscribe((): void => this._locationChanged.next());

        this._routerSubscription = this._router.events.subscribe((event): void => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            this._previousUrl = this._currentUrl;
            this._currentUrl = event.urlAfterRedirects;
            this._journal.recordNavigation({ urlTree: this._router.parseUrl(event.urlAfterRedirects) });
        });
    }

    // #endregion

    // #region Properties

    /**
     * The in-application navigation journal.
     *
     * @public
     * @readonly
     */
    public get journal(): NavigatorJournal {
        return this._journal;
    }

    /**
     * The URL that was active before the current one; empty until the second navigation.
     *
     * @public
     * @readonly
     */
    public get previous(): string {
        return this._previousUrl;
    }

    /**
     * {@link Navigator.previous} parsed into a URL tree.
     *
     * @public
     * @readonly
     */
    public get previousTree(): UrlTree {
        return this._router.parseUrl(this._previousUrl);
    }

    /**
     * The currently active URL.
     *
     * @public
     * @readonly
     */
    public get current(): string {
        return this._router.url;
    }

    /**
     * {@link Navigator.current} parsed into a URL tree.
     *
     * @public
     * @readonly
     */
    public get currentTree(): UrlTree {
        return this._router.parseUrl(this._router.url);
    }

    /**
     * Emits on every browser location change, including the ones the router does not cause.
     *
     * @public
     * @readonly
     */
    public get locationChanged(): Observable<void> {
        return this._locationChanged.asObservable();
    }

    /**
     * The router event stream.
     *
     * @public
     * @readonly
     */
    public get events(): Router['events'] {
        return this._router.events;
    }

    // #endregion

    // #region Methods

    /**
     * Releases the location and router subscriptions. Called automatically when the injector that
     * provides the navigator is destroyed.
     *
     * @public
     */
    public dispose(): void {
        this._popStateSubscription.unsubscribe();
        this._routerSubscription.unsubscribe();
        this._locationChanged.complete();
    }

    /**
     * Releases the location and router subscriptions.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this.dispose();
    }

    /**
     * Navigates to an absolute URL.
     *
     * @public
     * @param url The URL to navigate to.
     * @param extras The navigation extras.
     * @returns Whether the navigation succeeded.
     */
    public navigateByUrl(url: string, extras?: NavigationExtras): Promise<boolean> {
        return this._router.navigateByUrl(url, extras);
    }

    /**
     * Navigates to the route that renders the given view component, resolved from the router
     * configuration.
     *
     * @public
     * @typeParam TView The view component type.
     * @param type The component the target route renders.
     * @param extras The navigation extras.
     * @returns Whether the navigation succeeded; `false` when no route renders the component.
     */
    public navigateByView<TView>(type: Type<TView>, extras?: NavigationExtras): Promise<boolean> {
        const route = this._router.config.find((candidate): boolean => candidate.component === type);

        return this.navigateByRoute(route, extras);
    }

    /**
     * Navigates to a route definition.
     *
     * @public
     * @param route The route definition; a route without a path cannot be navigated to.
     * @param extras The navigation extras.
     * @returns Whether the navigation succeeded.
     */
    public navigateByRoute(route: Route | undefined, extras?: NavigationExtras): Promise<boolean> {
        if (route?.path === undefined) {
            return Promise.resolve(false);
        }

        return this._router.navigate([route.path], extras);
    }

    /**
     * Steps back through the journal, falling back to the browser history when the journal has no
     * earlier entry.
     *
     * @public
     */
    public back(): void {
        if (this._journal.canGoBack) {
            this._journal.goBack();

            return;
        }

        this._location.back();
    }

    /**
     * Steps forward through the journal, falling back to the browser history when the journal has
     * no later entry.
     *
     * @public
     */
    public forward(): void {
        if (this._journal.canGoForward) {
            this._journal.goForward();

            return;
        }

        this._location.forward();
    }

    /**
     * Merges query parameters into the current URL without changing the route.
     *
     * @public
     * @param queryParams The parameters to merge; `null` removes all of them.
     * @returns Whether the navigation succeeded.
     */
    public update(queryParams?: Params | null): Promise<boolean> {
        return this._router.navigate([], {
            relativeTo: this._router.routerState.root,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    /**
     * Determines whether a URL is currently active. Defaults to subset matching, so a parent URL
     * counts as active while a child route is shown.
     *
     * @public
     * @param url The URL to test.
     * @param matchOptions The match options.
     * @returns Whether the URL is active.
     */
    public isActive(url: string | UrlTree, matchOptions?: IsActiveMatchOptions): boolean {
        return this._router.isActive(url, matchOptions ?? { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' });
    }

    // #endregion
}
