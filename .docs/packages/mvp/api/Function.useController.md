---
title: 'Function: useController()'
generated: true
editUrl: false
---
# Function: useController()

```ts
function useController<TComponent, TElement, TController>(controllerType): TController;
```

Defined in: [controllers/useController.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/useController.ts#L32)

Creates a controller instance and binds it automatically to the current
component instance lifecycle.

This function must be called within a component class body.
No `new` keyword is required in user code.

Cleanup is guaranteed via DestroyRef without patching or forwarding
Angular lifecycle hooks.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tcomponent"></a> `TComponent` *extends* `object` | The concrete component instance type. |
| <a id="type-parameter-telement"></a> `TElement` *extends* `HTMLElement` | The concrete host element type. |
| <a id="type-parameter-tcontroller"></a> `TController` *extends* [`IReactiveController`](Interface.IReactiveController)\<`TComponent`, `TElement`\> | The concrete controller type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `controllerType` | new (`host`) => `TController` | The controller class to instantiate. |

## Returns

`TController`

The instantiated controller.

## Example

```ts
export class MyComponent {
    public readonly controller = useController(MyController);
}
```
