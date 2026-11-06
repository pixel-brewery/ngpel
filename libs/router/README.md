# @pixel-brewery/ngpel-router

Route path construction and URL-backed signals, the navigation item registry with its handle scheme, and the responsive application shell controller.

## Features

- **Route paths** — `RoutePath` builds and parses paths without pulling the router, so unauthenticated route files stay light.
- **URL state** — `routeParamSignal` and `queryParamSignal` back a signal with the URL, using the codecs from `ngpel-core/storage`.
- **Titles and journal** — a route-data title strategy with an injected text resolver, plus a navigator that records where the user came from.
- **Navigation registry** — items, guards and a handle scheme (`route:`, `ext:`, `cmd:`) with a dispatcher whose window access is a port.
- **Shell** — a side-navigation controller driven by media queries and persisted through the storage port, and a presentation routes factory.

## Import Options

```typescript
// @pixel-brewery/ngpel-router — 20 exports
import {
    connectRouterUrlChanges,
    INavigatorJournalEntry,
    IQueryParamSignalOptions,
    IRouteParamNavigationContext,
    IRouteParamSignalOptions,
    IRouteTitleOptions /* … */,
} from '@pixel-brewery/ngpel-router';

// @pixel-brewery/ngpel-router/navigation — 20 exports
import {
    INavHandleHandler,
    INavigationGuard,
    INavItem,
    IParsedHandle,
    IWithNavigationGuardOptions,
    IWithNavigationItemsOptions /* … */,
} from '@pixel-brewery/ngpel-router/navigation';

// @pixel-brewery/ngpel-router/shell — 6 exports
import {
    createSideNavigationController,
    IPresentationRouteGuards,
    IPresentationRoutesOptions,
    ISideNavigationController,
    ISideNavigationControllerConfig,
    presentationRoutes,
} from '@pixel-brewery/ngpel-router/shell';
```

## Peer Dependencies

| Package                     | Range              |
| --------------------------- | ------------------ |
| `@angular/common`           | `>=22.0.0 <23.0.0` |
| `@angular/core`             | `>=22.0.0 <23.0.0` |
| `@angular/router`           | `>=22.0.0 <23.0.0` |
| `@pixel-brewery/ngpel-core` | `0.0.1`            |
| `rxjs`                      | `>=7.8.0 <8.0.0`   |

## Quick Start

```typescript
import { provideRouter } from '@angular/router';
import { RoutePath } from '@pixel-brewery/ngpel-router';
import { provideNavigation, withNavigationItems } from '@pixel-brewery/ngpel-router/navigation';
import { presentationRoutes } from '@pixel-brewery/ngpel-router/shell';

export const ORDERS = RoutePath.create('orders');

export const appConfig = {
    providers: [
        provideRouter(presentationRoutes([orderRoutes], { main: 'orders' })),
        provideNavigation(withNavigationItems([{ id: 'orders', label: 'Orders', handle: `route:${ORDERS.path}`, order: 10 }])),
    ],
};
```

## Layer

Layer 1 — depends on `@pixel-brewery/ngpel-core`. A package imports only packages of a strictly lower layer.

## What stays in the application

Route tables, labels, icons, ordering values and the branded system pages stay in the application.
