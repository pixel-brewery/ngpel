---
title: 'Interface: IControllerHostRef\<TComponent, TElement\>'
generated: true
editUrl: false
---
# Interface: IControllerHostRef\<TComponent, TElement\>

Defined in: [controllers/IControllerHostRef.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IControllerHostRef.ts#L8)

Provides the host DOM element and the original Angular environment context to a component controller.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tcomponent"></a> `TComponent` *extends* `object` | - | The concrete component instance type. |
| <a id="type-parameter-telement"></a> `TElement` *extends* `HTMLElement` | `HTMLElement` | The concrete host element type. |

## Properties

### ~~component~~

```ts
readonly component: TComponent;
```

Defined in: [controllers/IControllerHostRef.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IControllerHostRef.ts#L17)

Legacy environment injector cast to the component type.

#### Deprecated

Resolve scoped collaborators with Angular's `inject()` during construction.

***

### element

```ts
readonly element: TElement;
```

Defined in: [controllers/IControllerHostRef.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IControllerHostRef.ts#L24)

The host DOM element of the component instance.
