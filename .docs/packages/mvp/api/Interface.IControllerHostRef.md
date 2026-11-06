---
title: 'Interface: IControllerHostRef\<TComponent, TElement\>'
generated: true
editUrl: false
---
# Interface: IControllerHostRef\<TComponent, TElement\>

Defined in: [controllers/IControllerHostRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IControllerHostRef.ts#L12)

Provides a strongly typed reference to the hosting Angular component instance
and its host DOM element.

This reference represents the explicit and type-safe equivalent of Lit's
implicit `this` inside a controller.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TComponent` *extends* `object` | - | The concrete component instance type. |
| `TElement` *extends* `HTMLElement` | `HTMLElement` | The concrete host element type. |

## Properties

### component

```ts
readonly component: TComponent;
```

Defined in: [controllers/IControllerHostRef.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IControllerHostRef.ts#L20)

The Angular component instance that owns the controller.

***

### element

```ts
readonly element: TElement;
```

Defined in: [controllers/IControllerHostRef.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IControllerHostRef.ts#L27)

The host DOM element of the component instance.
