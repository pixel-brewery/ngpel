# @pixel-brewery/ngpel-mvp

The Model-View-Presenter pattern as a package: a presenter base class, behaviors that compose onto it, the view host that resolves the presenter, and the command and ref primitives they are built from.

## Features

- **Presenters** — `ViewPresenter` owns the lifecycle: an `initialize()`/`dispose()` pair, a loading counter, an abort signal per run and subscription bookkeeping.
- **Behaviors** — `Closeable`, `Hydratable`, `Lockable`, `Pageable`, `Refreshable`, `Mentionable` and `Trackable` add composable capabilities; `withUndoRedo` connects a tracked model to undo/redo commands.
- **Views** — `View` resolves its presenter through `VIEW_PRESENTER`, so a component never constructs one itself.
- **Commands** — `command`, `asyncCommand`, `asyncAwaitCommand` and `compositeCommand`: an executable with a `canExecute` signal that reports its own loading state.
- **Controllers** — `usePresenterController` binds a behavior-only unit to the presenter that created it, `useController` does the same for a component.
- **Mentions** — `ViewMentionRegistry` registers selectable view context, supports contributor sources and removes registrations with their presenter.
- **Signals** — `SignalSubject`, signal `pipe`/`map` and `trackableSignal` provide observation, derived state and bounded undo/redo history.
- **Refs** — `LoadingRef`, `AbortRef`, `DisposableRef`, `InitializableRef` and `LockRef`, the structural vocabulary presenters, behaviors and commands share.

## Import Options

```typescript
// @pixel-brewery/ngpel-mvp — 58 exports
import { AbortRef, AsyncAwaitCommand, asyncAwaitCommand, AsyncCommand, asyncCommand, Closeable /* … */ } from '@pixel-brewery/ngpel-mvp';
```

## Peer Dependencies

| Package           | Range              |
| ----------------- | ------------------ |
| `@angular/common` | `>=22.0.0 <23.0.0` |
| `@angular/core`   | `>=22.0.0 <23.0.0` |
| `rxjs`            | `>=7.8.0 <8.0.0`   |

## Quick Start

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

## Layer

Layer 0 — depends on nothing from ngpel. A package imports only packages of a strictly lower layer.

## What stays in the application

The presenters themselves, their API calls and every view template stay in the application; this package only supplies the pattern.
