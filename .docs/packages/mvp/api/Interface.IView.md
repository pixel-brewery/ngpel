---
title: 'Interface: IView\<TPresenter\>'
generated: true
editUrl: false
---
# Interface: IView\<TPresenter\>

Defined in: [views/IView.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/IView.ts#L14)

Contract of the View half of the Model-View-Presenter triad: it exposes exactly one presenter to
its template and owns that presenter's lifecycle.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TPresenter` *extends* [`IViewPresenter`](Interface.IViewPresenter) | The concrete presenter the View provides. |

## Properties

### presenter

```ts
readonly presenter: TPresenter;
```

Defined in: [views/IView.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/IView.ts#L20)

The presenter backing this view.
