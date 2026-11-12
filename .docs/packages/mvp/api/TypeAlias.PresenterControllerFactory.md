---
title: 'Type Alias: PresenterControllerFactory\<TPresenterOrController, TController\>'
generated: true
editUrl: false
---
# Type Alias: PresenterControllerFactory\<TPresenterOrController, TController\>

```ts
type PresenterControllerFactory<TPresenterOrController, TController> = ((host) => TController) | (new (host) => TController);
```

Defined in: [controllers/PresenterControllerFactory.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/PresenterControllerFactory.ts#L20)

A class or factory function that produces a presenter controller for a host.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpresenterorcontroller"></a> `TPresenterOrController` *extends* \| [`IViewPresenter`](Interface.IViewPresenter) \| [`IPresenterController`](Interface.IPresenterController) | - | The presenter type, or the controller for the one-argument form. |
| <a id="type-parameter-tcontroller"></a> `TController` *extends* [`IPresenterController`](Interface.IPresenterController) | `FactoryController`\<`TPresenterOrController`\> | The concrete controller type for the two-argument form. |

## Remarks

Both `PresenterControllerFactory<Controller>` and the original
`PresenterControllerFactory<Presenter, Controller>` spelling are supported.
