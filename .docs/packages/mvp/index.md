---
title: '@pixel-brewery/ngpel-mvp'
description: 'The Model-View-Presenter pattern as a package: the ViewPresenter base class, composable presenter behaviors, the View host and the command and ref primitives they are built from.'
package: '@pixel-brewery/ngpel-mvp'
category: 'Presentation'
order: 0
---

# @pixel-brewery/ngpel-mvp

The Model-View-Presenter pattern as a package: a presenter base class, behaviors that compose onto it, the view host that resolves the presenter, and the command and ref primitives they are built from.

## Entry points

| Entry point                | Public symbols | Peer dependencies                          |
| -------------------------- | -------------- | ------------------------------------------ |
| `@pixel-brewery/ngpel-mvp` | 65             | `@angular/core`, `@angular/common`, `rxjs` |

Every entry point is tree-shakable on its own: importing one never pulls the code of another.

## Quick start

```typescript
import { Component, Injectable, signal } from '@angular/core';
import { command, type Command, View, VIEW_PRESENTER, ViewPresenter } from '@pixel-brewery/ngpel-mvp';

@Injectable()
export class OrderListViewPresenter extends ViewPresenter {
    private readonly _orders = signal<ReadonlyArray<IOrder>>([]);

    public readonly reload: Command<void> = command(() => this.load());

    public get orders(): Signal<ReadonlyArray<IOrder>> {
        return this._orders.asReadonly();
    }
}

@Component({
    selector: 'app-order-list',
    providers: [{ provide: VIEW_PRESENTER, useClass: OrderListViewPresenter }],
    template: `<button type="button" (click)="presenter.reload.execute()">Reload</button>`,
})
export class OrderListView extends View<OrderListViewPresenter> {}
```

## What stays in the application

The presenters themselves, their API calls and every view template stay in the application; this package only supplies the pattern.

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with `yarn nx run mvp:docs`.
