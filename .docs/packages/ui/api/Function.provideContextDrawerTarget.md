---
title: 'Function: provideContextDrawerTarget()'
generated: true
editUrl: false
---
# Function: provideContextDrawerTarget()

```ts
function provideContextDrawerTarget<TData, TResult>(factory): Provider;
```

Defined in: [libs/ui/src/context-overlay/provideContextDrawerTarget.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/provideContextDrawerTarget.ts#L16)

Registers a contextual target using the application's existing Mosaik drawer provider.
The router owns URL-driven closing, while Mosaik retains the shell's presentation defaults.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TData` | Data passed to the drawer content. |
| `TResult` | Result returned by the drawer content. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `factory` | () => [`IContextDrawerTarget`](Interface.IContextDrawerTarget)\<`TData`, `TResult`\> | Feature factory evaluated in the application injection context. |

## Returns

`Provider`

An overlay target provider for application composition.
