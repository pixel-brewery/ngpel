---
title: '@pixel-brewery/ngpel-router'
description: 'Route path construction, URL-backed signals and the title strategy, plus the navigation item registry and the responsive application shell controller.'
package: '@pixel-brewery/ngpel-router'
category: 'Platform Services'
order: 10
---

# @pixel-brewery/ngpel-router

Route path construction and URL-backed signals, the navigation item registry with its handle scheme, and the responsive application shell controller.

## Entry points

| Entry point                              | Public symbols | Peer dependencies                                             |
| ---------------------------------------- | -------------- | ------------------------------------------------------------- |
| `@pixel-brewery/ngpel-router`            | 30             | `@angular/core`, `@angular/router`, `rxjs`, `@angular/common` |
| `@pixel-brewery/ngpel-router/navigation` | 24             | `@angular/core`, `@angular/router`, `rxjs`                    |
| `@pixel-brewery/ngpel-router/shell`      | 6              | `@angular/core`, `@angular/router`                            |

Every entry point is tree-shakable on its own: importing one never pulls the code of another.

## Quick start

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

## What stays in the application

Route tables, labels, icons, ordering values and the branded system pages stay in the application.

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with `yarn nx run router:docs`.
