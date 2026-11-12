---
title: 'Interface: IViewPresenter'
generated: true
editUrl: false
---
# Interface: IViewPresenter

Defined in: [presenters/IViewPresenter.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/IViewPresenter.ts#L16)

Lifecycle and loading contract every presenter of the Model-View-Presenter triad fulfils. A
[View](Class.View) drives `initialize()` and `dispose()`; the signals let the template react without
knowing which concrete presenter is bound.

## Extends

- [`InitializableRef`](TypeAlias.InitializableRef)
- [`DisposableRef`](TypeAlias.DisposableRef)

## Properties

### disposed

```ts
readonly disposed: Signal<boolean>;
```

Defined in: [presenters/IViewPresenter.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/IViewPresenter.ts#L27)

Becomes `true` after `dispose()` was called.

***

### initialized

```ts
readonly initialized: Signal<boolean>;
```

Defined in: [presenters/IViewPresenter.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/IViewPresenter.ts#L32)

Becomes `true` after `initialize()` was called.

***

### isLoading

```ts
readonly isLoading: Signal<boolean>;
```

Defined in: [presenters/IViewPresenter.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/IViewPresenter.ts#L22)

Emits `true` while at least one tracked operation is active.

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [refs/DisposableRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/DisposableRef.ts#L12)

Disposes the instance and releases resources.

#### Returns

`void`

#### Inherited from

[`DisposableRef`](TypeAlias.DisposableRef).[`dispose`](TypeAlias.DisposableRef#dispose)

***

### initialize()

```ts
initialize(): void;
```

Defined in: [refs/InitializableRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/InitializableRef.ts#L12)

Initializes the instance.

#### Returns

`void`

#### Inherited from

[`InitializableRef`](TypeAlias.InitializableRef).[`initialize`](TypeAlias.InitializableRef#initialize)
