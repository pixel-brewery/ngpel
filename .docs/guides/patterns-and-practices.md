---
title: Migrating presentation and reactive helpers
description: Import mapping and compatibility contracts for adopting the ngpel MVP and RxJS packages.
---

# Migrating presentation and reactive helpers

Applications adopting ngpel can use `@pixel-brewery/ngpel-mvp` for presentation and
`@pixel-brewery/ngpel-core/rx` for reactive helpers. Use the mapping below to split imports and
check the compatibility contracts before removing the previous implementation.

## Import mapping

| Existing exports                                                                                                        | ngpel entry point              |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `ViewPresenter`, `IViewPresenter`, `View`, `IView`, `VIEW_PRESENTER`                                                    | `@pixel-brewery/ngpel-mvp`     |
| Commands, their factories and `onAsyncAwaitResult`                                                                      | `@pixel-brewery/ngpel-mvp`     |
| Controllers, host interfaces, `PresenterControllerFactory`, `useController`, `usePresenterController`                   | `@pixel-brewery/ngpel-mvp`     |
| `AbortRef`, `LoadingRef`, `LockRef`, `DisposableRef`, `InitializableRef`                                                | `@pixel-brewery/ngpel-mvp`     |
| All seven presenter behaviors, their interfaces, behavior constructor types, `DEFAULT_PAGE_SIZE`, `withUndoRedo`        | `@pixel-brewery/ngpel-mvp`     |
| `ViewMentionRegistry`, `IViewMentionSource`, `IViewMentionOption`                                                       | `@pixel-brewery/ngpel-mvp`     |
| `SignalSubject`, `SignalOperator`, signal `pipe`/`map`, `trackableSignal`, `TrackableSignalOptions`, `ITrackableSignal` | `@pixel-brewery/ngpel-mvp`     |
| `onceOn`, `guardImplicitCloseAttempts`, `IAttentionRequestRef`, `IPreventableCloseAttempt`                              | `@pixel-brewery/ngpel-core/rx` |

Split imports that combine presentation APIs and Rx helpers:

```typescript
import { command, Mentionable, Pageable, Refreshable, ViewPresenter } from '@pixel-brewery/ngpel-mvp';
import { guardImplicitCloseAttempts, onceOn } from '@pixel-brewery/ngpel-core/rx';
```

`mvp` remains independent of other ngpel packages. Its Angular peers are `@angular/core`,
`@angular/common` and `rxjs`; `@angular/common` supplies the `Location` used by the mention registry.

## Compatibility contracts

- `ViewPresenter` retains the protected `loading(boolean)` method. Its counter is shared with
  `loadingRef` and `withLoading`, so manually tracked work can overlap automatic tracking.
- `IPresenterController<TPresenter>`, `IPresenterControllerHostRef<TPresenter>` and
  `PresenterControllerFactory<TPresenter, TController>` retain their original generic forms.
  The newer `PresenterControllerFactory<TController>` form also works.
- `host.injector` exposes the controller's injection context. The deprecated `host.presenter`
  property retains its historical runtime value: the same injector, originally cast to the
  presenter type. It is not a presenter instance. Controllers resolve collaborators through
  `inject()` or `host.injector`.
- `onceOn` makes one subscription and forwards all source values until completion, error or
  cancellation. Its result retains `.observable` and also supports `.unsubscribe()`.
  Existing ngpel callers that need exactly one value pass `source.pipe(take(1))`.
- `trackableSignal` retains existing writable-signal identity and records writes through that
  signal's own `set` and `update` methods. History and undo/redo gates remain reactive, and a
  cleared history can be used again.

## Application replacement

1. Install compatible ngpel packages and split the existing imports using the mapping above.
2. Keep feature presenters, mention contributors, view templates and application providers in the
   application. A routed Angular application already supplies the mention registry's `Location`.
3. Run the application's typecheck, tests and Angular build against the installed packages.
4. Remove the source project and its TypeScript path mapping once no imports reference it.

The ngpel Angular consumer fixture builds from packed distributions and exercises the migrated
behaviors. Product replacement and package publication are separate owner-controlled steps.
