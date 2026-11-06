---
title: '@pixel-brewery/ngpel-router'
generated: true
editUrl: false
---
# @pixel-brewery/ngpel-router

## Classes

| Class | Description |
| ------ | ------ |
| [NavigationHandleDispatcher](Class.NavigationHandleDispatcher) | Executes [NavHandle](TypeAlias.NavHandle) actions. `route:` goes through the Angular router and `ext:` through the [NAVIGATION\_WINDOW](Variable.NAVIGATION_WINDOW) port; every other scheme — `cmd:` in particular — is delegated to an [INavHandleHandler](Interface.INavHandleHandler) registered under `NAV_HANDLE_HANDLER`, which keeps the command stack out of this package's dependencies. |
| [NavigationManager](Class.NavigationManager) | The signal-based navigation registry: it collects every contributed [INavItem](Interface.INavItem), runs the registered [INavigationGuard](Interface.INavigationGuard)s over them, indexes the result by key, region and parent, and exposes it as signals so hosts re-render on their own. |
| [Navigator](Class.Navigator) | A task-oriented facade over `Router` and `Location`: navigate by URL, by view type or by route definition, step through the in-application [NavigatorJournal](Class.NavigatorJournal) with a fall back to the browser history, and ask what is currently active. It also keeps the previous URL, which the router itself does not expose. |
| [NavigatorJournal](Class.NavigatorJournal) | An in-application navigation journal: the URLs the application itself navigated to, with a cursor that `goBack()` and `goForward()` move through. Unlike the browser history it is scoped to the running application, so a shell can offer back and forward affordances that never leave it. Traversal moves the cursor instead of appending, so forward entries survive a step back. |
| [RouteDataTitleStrategy](Class.RouteDataTitleStrategy) | A `TitleStrategy` that composes the document title breadcrumb-style from `route.data`, deepest segment first, and appends the configured application name. Every segment passes through the [IRouteTitleTextResolver](Interface.IRouteTitleTextResolver), so products that put translation keys in the route data get translated titles without this package depending on an i18n library. When no route declares a title, Angular's own `route.title` resolution is used as the fallback. |
| [RoutePath](Class.RoutePath) | An immutable, root-relative route path template. The literal path type is carried through every fluent call, so [RoutePath.format](Class.RoutePath#format) only accepts parameter names the template actually declares. Deliberately free of any Angular import: unauthenticated route files can build their paths without pulling in the router. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [INavHandleHandler](Interface.INavHandleHandler) | Executes the handles of one [NavHandleScheme](TypeAlias.NavHandleScheme). The dispatcher handles `route:` and `ext:` itself; `cmd:` has no built-in handler because the command stack is not a dependency of this package — a product binds its own handler under `NAV_HANDLE_HANDLER`. A registered handler also replaces a built-in scheme, which is how a shell can intercept `route:` navigation. |
| [INavigationGuard](Interface.INavigationGuard) | Decides which navigation items a user may see. Returning the item — possibly a modified copy, for example with filtered children — allows it; returning `null` removes it entirely. Guards run in registration order and each guard receives the previous guard's result, so they compose. |
| [INavigatorJournalEntry](Interface.INavigatorJournalEntry) | One recorded entry of the [NavigatorJournal](Class.NavigatorJournal). |
| [INavItem](Interface.INavItem) | One entry of the application navigation, contributed as plain data so any host — a sidebar, a command palette, a mobile dock — can render the same registry. An item carries what to show (`label`, `icon`, `badge`, `variant`), where it belongs (`region`, `parent`, `children`, `order`), who may see it (`capabilities`) and what activating it does ([NavHandle](TypeAlias.NavHandle)). |
| [IParsedHandle](Interface.IParsedHandle) | The parsed representation of a [NavHandle](TypeAlias.NavHandle). |
| [IPresentationRouteGuards](Interface.IPresentationRouteGuards) | The guards protecting the presentation shell route. |
| [IPresentationRoutesOptions](Interface.IPresentationRoutesOptions) | Options of `presentationRoutes(...)`. |
| [IQueryParamSignalOptions](Interface.IQueryParamSignalOptions) | Configures a query-parameter signal. |
| [IRouteParamNavigationContext](Interface.IRouteParamNavigationContext) | Everything required to build the destination URL for a changed route parameter. |
| [IRouteParamSignalOptions](Interface.IRouteParamSignalOptions) | Configures a route-parameter signal. The destination is explicit because changing one route parameter can mean detail navigation, edit navigation, preview navigation or a return to the parent view, and only the caller knows which. |
| [IRouteTitleOptions](Interface.IRouteTitleOptions) | Configures [RouteDataTitleStrategy](Class.RouteDataTitleStrategy). Every member is optional and product-neutral by default: no application name is appended unless one is configured. |
| [IRouteTitleTextResolver](Interface.IRouteTitleTextResolver) | Port resolving a route title segment to display text. Products that keep translation keys in `route.data` bind it to their translation service; the default resolver returns the text unchanged, so the package carries no i18n dependency. |
| [ISideNavigationController](Interface.ISideNavigationController) | The responsive state of an application shell: the navigation sidebar on the left and the rail panel on the right, both persisted per user and both aware of the current viewport. Created by [createSideNavigationController](Function.createSideNavigationController). |
| [ISideNavigationControllerConfig](Interface.ISideNavigationControllerConfig) | Configures [createSideNavigationController](Function.createSideNavigationController). Every member is optional; the defaults are the `presentation.*` storage keys and the media queries of a 960px shell breakpoint. |
| [IUrlParamNavigationOptions](Interface.IUrlParamNavigationOptions) | Configures the browser history behavior of a URL-backed signal. |
| [IWithNavigationGuardOptions](Interface.IWithNavigationGuardOptions) | Options of `withNavigationGuard(...)`. |
| [IWithNavigationItemsOptions](Interface.IWithNavigationItemsOptions) | Options of `withNavigationItems(...)`. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [NavHandle](TypeAlias.NavHandle) | A navigation handle: what activating a navigation item does, encoded as `<scheme>:<value>`. Keeping the action in a string instead of a callback is what lets navigation items be plain, serializable data that any host can render. |
| [NavHandleScheme](TypeAlias.NavHandleScheme) | The schemes a [NavHandle](TypeAlias.NavHandle) can carry: `route` for in-application router navigation, `cmd` for a named command and `ext` for an external URL. |
| [NavigationFeatureKind](TypeAlias.NavigationFeatureKind) | The kinds of features `provideNavigation(...)` accepts. Both kinds are multi: any number of feature libraries may contribute items, and any number of policies may guard them. |
| [UrlParamCodec](TypeAlias.UrlParamCodec) | A codec over the serialized representation of a URL parameter, where an absent parameter reaches `parse()` as `null`. This is the same contract that backs Web Storage in `@pixel-brewery/ngpel-core/storage`, so every codec of that package becomes a URL parameter codec through `fromNullable(...)` — the router package deliberately ships no codec set of its own. |
| [UrlParamSignal](TypeAlias.UrlParamSignal) | A URL-backed signal. `set()`, `update()` and `clear()` perform a router navigation instead of mutating a local shadow value, so the next signal value always comes from the activated URL and a manual URL edit, a bookmark and the back button all stay authoritative. |

## Variables

| Variable | Description |
| ------ | ------ |
| [NAV\_HANDLE\_HANDLER](Variable.NAV_HANDLE_HANDLER) | Multi-provider token for [INavHandleHandler](Interface.INavHandleHandler) implementations. The last handler registered for a scheme wins, so a product handler overrides the built-in `route:` and `ext:` behavior. |
| [NAVIGATION\_GUARD\_TOKEN](Variable.NAVIGATION_GUARD_TOKEN) | Multi-provider token for the navigation guards. Every provider contributes one guard; `withNavigationGuard(...)` fills it. |
| [NAVIGATION\_ITEM\_TOKEN](Variable.NAVIGATION_ITEM_TOKEN) | Multi-provider token for the contributed navigation items. Every provider contributes one batch — the items of one feature library — so the injected value is a list of batches that `NavigationManager` flattens. `withNavigationItems(...)` fills it. |
| [NAVIGATION\_WINDOW](Variable.NAVIGATION_WINDOW) | The window `ext:` handles are opened on. Defaults to the window of the injected `DOCUMENT`, so the package needs no global access and stays safe where there is none. Desktop shells that route external URLs through their own process rebind it, or bind `null` to suppress external navigation entirely. |
| [NavigationFeatureKinds](Variable.NavigationFeatureKinds) | The branded kind vocabulary of the navigation entry point. |
| [ROUTE\_TITLE\_OPTIONS](Variable.ROUTE_TITLE_OPTIONS) | Injection token for the [IRouteTitleOptions](Interface.IRouteTitleOptions). Defaults to the neutral options — no application name, `' · '` as separator — and is bound by `provideRouteDataTitleStrategy(...)`. |
| [ROUTE\_TITLE\_TEXT\_RESOLVER](Variable.ROUTE_TITLE_TEXT_RESOLVER) | Injection token for the [IRouteTitleTextResolver](Interface.IRouteTitleTextResolver). Defaults to an identity resolver. |

## Functions

| Function | Description |
| ------ | ------ |
| [connectRouterUrlChanges](Function.connectRouterUrlChanges) | Connects URL-driven UI state to the current URL and to every completed router navigation. |
| [createSideNavigationController](Function.createSideNavigationController) | Creates the responsive shell state — navigation sidebar, compact rail, right rail panel and its split position — with the persistence and the viewport rules every application shell re-solves. Must be called in an injection context, so the controller can read the router, the activated route and the browser storage without the caller wiring them up. |
| [parseHandle](Function.parseHandle) | Parses a [NavHandle](TypeAlias.NavHandle) into its scheme, value and query parameters. The scheme ends at the **first** colon, so values that contain further colons — an `https://` URL, a namespaced command id — survive intact. |
| [presentationRoutes](Function.presentationRoutes) | Wraps the feature routes of an application in one guarded shell route. It exists so the shell mount point, its guards and its default child are declared once instead of being copied into every product's route file — the shell component itself stays in the product. |
| [provideNavigation](Function.provideNavigation) | Composes the navigation registry: the [NavigationManager](Class.NavigationManager) and the [NavigationHandleDispatcher](Class.NavigationHandleDispatcher), plus every contributed item and guard. Nothing else is pulled in — `route:` and `ext:` handles work out of the box, and `cmd:` handles are enabled by binding an `INavHandleHandler` under `NAV_HANDLE_HANDLER`. |
| [provideNavigator](Function.provideNavigator) | Registers [Navigator](Class.Navigator) and its [NavigatorJournal](Class.NavigatorJournal). Both are environment-scoped, so the journal spans the whole application while its subscriptions end with the injector. |
| [provideRouteDataTitleStrategy](Function.provideRouteDataTitleStrategy) | Registers [RouteDataTitleStrategy](Class.RouteDataTitleStrategy) as the application's `TitleStrategy`. Translation of the title segments stays a separate seam: bind `ROUTE_TITLE_TEXT_RESOLVER` when route data holds translation keys. |
| [queryParamSignal](Function.queryParamSignal) | Creates a bidirectional signal for one optional query parameter. Must be called in an injection context. Writing preserves every unrelated query parameter, including repeated ones. |
| [routeParamSignal](Function.routeParamSignal) | Creates a bidirectional signal for a parameter declared in the route path. Must be called in an injection context. Reading follows the activated URL; writing navigates to the URL tree the `toUrlTree` policy returns. |
| [withNavigationGuard](Function.withNavigationGuard) | Contributes a navigation guard. Guards decide which items a user may see; which capabilities that means stays a product policy. |
| [withNavigationItems](Function.withNavigationItems) | Contributes navigation items. A feature library exports one such contribution; the composition root passes it to `provideNavigation(...)` and decides its `order` there. |
