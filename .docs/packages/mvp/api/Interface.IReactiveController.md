---
title: 'Interface: IReactiveController\<TComponent, TElement\>'
generated: true
editUrl: false
---
# Interface: IReactiveController\<TComponent, TElement\>

Defined in: [controllers/IReactiveController.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IReactiveController.ts#L21)

Represents a reusable, behavior-only unit hosted by an Angular component.

A reactive controller is not a service and not a binding abstraction.
Its sole responsibility is to encapsulate feature-specific behavior
and lifecycle-related logic.

Controllers are created via [useController](Function.useController) and are automatically
connected to the hosting component's lifetime.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tcomponent"></a> `TComponent` *extends* `object` | `object` | The concrete component instance type. |
| <a id="type-parameter-telement"></a> `TElement` *extends* `HTMLElement` | `HTMLElement` | The concrete host element type. |

## Properties

### host

```ts
readonly host: IControllerHostRef<TComponent, TElement>;
```

Defined in: [controllers/IReactiveController.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IReactiveController.ts#L29)

Provides access to the owning component instance and host element.

## Methods

### hostConnected()?

```ts
hostConnected?(): void;
```

Defined in: [controllers/IReactiveController.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IReactiveController.ts#L40)

Called once when the controller is connected to the host component.

#### Returns

`void`

***

### hostDisconnected()?

```ts
hostDisconnected?(): void;
```

Defined in: [controllers/IReactiveController.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/IReactiveController.ts#L47)

Called once when the host component is destroyed.

#### Returns

`void`
