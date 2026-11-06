---
title: '@pixel-brewery/ngpel-mvp'
generated: true
editUrl: false
---
# @pixel-brewery/ngpel-mvp

## Classes

| Class | Description |
| ------ | ------ |
| [CommandDirective](Class.CommandDirective) | Binds commands to the events of the host element. |
| [SignalSubject](Class.SignalSubject) | Holds its latest value as an Angular signal and synchronously notifies subscribers. |
| [View](Class.View) | Base class for the View half of the Model-View-Presenter triad. Components extend it and provide their concrete presenter through [VIEW\_PRESENTER](Variable.VIEW_PRESENTER), usually with `provideViewPresenter()`. |
| [ViewMentionRegistry](Class.ViewMentionRegistry) | Tracks active presenter contributions and selects mentions for the current Angular route. |
| [ViewPresenter](Class.ViewPresenter) | Signal-based presentation state owned by a [View](Class.View). |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ICloseable](Interface.ICloseable) | Contract of the Closeable presenter behavior: the command a View binds to its dismiss affordance, together with the gate that decides whether dismissing is currently allowed. |
| [IControllerHostRef](Interface.IControllerHostRef) | Provides the host DOM element and the original Angular environment context to a component controller. |
| [IHydratable](Interface.IHydratable) | Contract of the Hydratable presenter behavior: the one-time load that has to finish before the View can show anything, kept apart from the ongoing loading state. |
| [ILockable](Interface.ILockable) | Contract of the Lockable presenter behavior: a nestable interaction lock the View can bind to while a mutation must not be interrupted. |
| [IMentionable](Interface.IMentionable) | Contract for a presenter that offers its loaded resources as context-aware mentions. |
| [IPageable](Interface.IPageable) | Contract of the Pageable presenter behavior: the paging window a data query needs and the command a paginator binds to. |
| [IPresenterController](Interface.IPresenterController) | A reusable, behavior-only unit hosted by a [ViewPresenter](Class.ViewPresenter). |
| [IPresenterControllerHostRef](Interface.IPresenterControllerHostRef) | What a presenter controller is handed about the presenter that owns it. |
| [IReactiveController](Interface.IReactiveController) | Represents a reusable, behavior-only unit hosted by an Angular component. |
| [IRefreshable](Interface.IRefreshable) | Contract for a presenter whose current projection can be reloaded on demand. |
| [ITrackable](Interface.ITrackable) | Commands and gates of a presenter whose model has undo and redo history. |
| [ITrackableSignal](Interface.ITrackableSignal) | A writable signal with a bounded history and undo/redo operations. |
| [IView](Interface.IView) | Contract of the View half of the Model-View-Presenter triad: it exposes exactly one presenter to its template and owns that presenter's lifecycle. |
| [IViewMentionOption](Interface.IViewMentionOption) | One identity-bearing resource currently offered by an active view. |
| [IViewMentionSource](Interface.IViewMentionSource) | Supplies an active view's loaded resources without fetching new suggestion data. |
| [IViewPresenter](Interface.IViewPresenter) | Lifecycle and loading contract every presenter of the Model-View-Presenter triad fulfils. A [View](Class.View) drives `initialize()` and `dispose()`; the signals let the template react without knowing which concrete presenter is bound. |
| [TrackableSignalOptions](Interface.TrackableSignalOptions) | Configures the retained history of a trackable signal. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [AbortRef](TypeAlias.AbortRef) | Represents a reference to an AbortController's signal and abort method. |
| [AsyncAwaitCommand](TypeAlias.AsyncAwaitCommand) | An asynchronous [Command](TypeAlias.Command) that captures the outcome of its last execution into the `result` and `error` signals. |
| [AsyncCommand](TypeAlias.AsyncCommand) | A fire-and-forget asynchronous [Command](TypeAlias.Command): the handler starts synchronously, the command stays non-executable while the returned promise is pending and rejections are consumed silently. |
| [Command](TypeAlias.Command) | A WPF-style command: a reactive `canExecute` gate paired with a synchronous `execute`. |
| [CompositeCommand](TypeAlias.CompositeCommand) | A [Command](TypeAlias.Command) that owns an ordered queue of child commands and executes them sequentially in FIFO order with the same parameter. |
| [DisposableRef](TypeAlias.DisposableRef) | Represents a type that can be disposed. |
| [HydrationOperation](TypeAlias.HydrationOperation) | What a presenter may return from `onHydrate()`: a stream, a promise, or `undefined` when the initial presentation needs no asynchronous data. |
| [InitializableRef](TypeAlias.InitializableRef) | Represents a type that can be initialized. |
| [LoadingRef](TypeAlias.LoadingRef) | Defines a reference for managing loading states. |
| [LoadingRefSource](TypeAlias.LoadingRefSource) | Where an asynchronous command reports its loading state: a [LoadingRef](TypeAlias.LoadingRef) itself or an owner that exposes one (typically a view presenter), so `asyncCommand(handler, gate, this)` reads naturally. |
| [LockRef](TypeAlias.LockRef) | Controls a nestable interaction lock. |
| [PresenterBehaviorBase](TypeAlias.PresenterBehaviorBase) | Constraint every presenter behavior places on the class it is applied to: an abstract constructor producing a [ViewPresenter](Class.ViewPresenter). |
| [PresenterBehaviorReturn](TypeAlias.PresenterBehaviorReturn) | Result of applying a presenter behavior: the base class constructor intersected with the behavior's own contract, so composed presenters keep every member of every applied behavior. |
| [PresenterControllerFactory](TypeAlias.PresenterControllerFactory) | A class or factory function that produces a presenter controller for a host. |
| [SignalOperator](TypeAlias.SignalOperator) | Transforms one signal subject into another. |

## Variables

| Variable | Description |
| ------ | ------ |
| [DEFAULT\_PAGE\_SIZE](Variable.DEFAULT_PAGE_SIZE) | Number of items a [Pageable](Function.Pageable) presenter requests per page unless the composition overrides it. |
| [VIEW\_PRESENTER](Variable.VIEW_PRESENTER) | Token a [View](Class.View) resolves its presenter through. Views provide the concrete presenter in component-level DI, typically via [provideViewPresenter](Function.provideViewPresenter). |

## Functions

| Function | Description |
| ------ | ------ |
| [asyncAwaitCommand](Function.asyncAwaitCommand) | Creates a result-capturing [AsyncAwaitCommand](TypeAlias.AsyncAwaitCommand). Co-located with the type because a separate `asyncAwaitCommand.ts` would collide with `AsyncAwaitCommand.ts` on case-insensitive file systems. |
| [asyncCommand](Function.asyncCommand) | Creates a fire-and-forget [AsyncCommand](TypeAlias.AsyncCommand). Co-located with the type because a separate `asyncCommand.ts` would collide with `AsyncCommand.ts` on case-insensitive file systems. |
| [Closeable](Function.Closeable) | Adds a close command with its own enable gate to a presenter. |
| [command](Function.command) | Creates a synchronous [Command](TypeAlias.Command). Co-located with the type because a separate `command.ts` would collide with `Command.ts` on case-insensitive file systems. |
| [compositeCommand](Function.compositeCommand) | Creates a [CompositeCommand](TypeAlias.CompositeCommand). Co-located with the type because a separate `compositeCommand.ts` would collide with `CompositeCommand.ts` on case-insensitive file systems. |
| [Hydratable](Function.Hydratable) | Adds a one-time initial hydration to a presenter, separate from the loading state of everything that happens afterwards. |
| [Lockable](Function.Lockable) | Adds a nestable interaction lock around critical presenter operations. |
| [map](Function.map) | Projects the current and subsequent values of a signal subject. |
| [Mentionable](Function.Mentionable) | Registers a presenter's mention source for the duration of its initialized lifecycle. |
| [onAsyncAwaitResult](Function.onAsyncAwaitResult) | Invokes `handler` whenever `command` produces a new non-`null` result. |
| [Pageable](Function.Pageable) | Adds a paging window and a page-change command to a presenter. |
| [pipe](Function.pipe) | Applies a sequence of signal operators to a subject. |
| [provideViewPresenter](Function.provideViewPresenter) | Binds a concrete presenter to [VIEW\_PRESENTER](Variable.VIEW_PRESENTER) for one View. |
| [Refreshable](Function.Refreshable) | Adds an explicit refresh command that is disabled while the presenter is loading. |
| [Trackable](Function.Trackable) | Adds undo and redo commands for a model configured through [withUndoRedo](Function.withUndoRedo). |
| [trackableSignal](Function.trackableSignal) | Tracks writes to an existing signal or a new signal created from an initial value. |
| [useController](Function.useController) | Creates a controller instance and binds it automatically to the current component instance lifecycle. |
| [usePresenterController](Function.usePresenterController) | Creates a presenter controller and binds it to the lifetime of the presenter that creates it. |
| [withUndoRedo](Function.withUndoRedo) | Creates a tracked model and connects its history to the presenter's commands and gates. |
