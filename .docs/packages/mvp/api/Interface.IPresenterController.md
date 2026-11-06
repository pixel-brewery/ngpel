---
title: 'Interface: IPresenterController\<TPresenter\>'
generated: true
editUrl: false
---
# Interface: IPresenterController\<TPresenter\>

Defined in: [controllers/IPresenterController.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L21)

A reusable, behavior-only unit hosted by a [ViewPresenter](Class.ViewPresenter).

A presenter controller is not a service and not a binding abstraction: it encapsulates one
feature's behavior and its lifecycle inside the presenter's scope. Unlike an
[IReactiveController](Interface.IReactiveController), which is hosted by a component and reaches the DOM, a presenter
controller works purely in the presenter's domain.

Create one through `usePresenterController`, which binds it to the presenter's lifetime.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPresenter` *extends* [`IViewPresenter`](Interface.IViewPresenter) | [`IViewPresenter`](Interface.IViewPresenter) | The legacy presenter type used by the controller host. |

## Properties

### host

```ts
readonly host: IPresenterControllerHostRef<TPresenter>;
```

Defined in: [controllers/IPresenterController.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L30)

The presenter that owns the controller.

## Methods

### presenterConnected()?

```ts
optional presenterConnected(): void;
```

Defined in: [controllers/IPresenterController.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L42)

Called once, immediately after the controller was created in the presenter's injection
context.

#### Returns

`void`

***

### presenterDisconnected()?

```ts
optional presenterDisconnected(): void;
```

Defined in: [controllers/IPresenterController.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterController.ts#L49)

Called once, while the owning presenter is disposed.

#### Returns

`void`
