---
title: 'Interface: IPresenterControllerHostRef\<TPresenter\>'
generated: true
editUrl: false
---
# Interface: IPresenterControllerHostRef\<TPresenter\>

Defined in: [controllers/IPresenterControllerHostRef.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterControllerHostRef.ts#L19)

What a presenter controller is handed about the presenter that owns it.

The controller is created while the presenter's own fields are still initializing, so no
presenter instance exists yet to hand over. What does exist is the presenter's injector, which is
everything a controller needs: it resolves collaborators and it is the scope the controller's own
lifetime is bound to.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPresenter` *extends* [`IViewPresenter`](Interface.IViewPresenter) | [`IViewPresenter`](Interface.IViewPresenter) | The legacy presenter type used by existing controllers. |

## Properties

### injector

```ts
readonly injector: Injector;
```

Defined in: [controllers/IPresenterControllerHostRef.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterControllerHostRef.ts#L28)

The injector of the owning presenter.

***

### ~~presenter~~

```ts
readonly presenter: TPresenter;
```

Defined in: [controllers/IPresenterControllerHostRef.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IPresenterControllerHostRef.ts#L41)

The legacy controller context, retained for source and runtime compatibility.

#### Remarks

This compatibility alias holds the surrounding Angular environment injector cast to the
presenter type. The scoped injector is available through [injector](#injector).

#### Deprecated

Resolve collaborators through `injector` or Angular's `inject()` instead.
