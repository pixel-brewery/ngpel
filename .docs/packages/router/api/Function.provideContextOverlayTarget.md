---
title: 'Function: provideContextOverlayTarget()'
generated: true
editUrl: false
---
# Function: provideContextOverlayTarget()

```ts
function provideContextOverlayTarget<TResult>(factory): Provider;
```

Defined in: [context-overlay/provideContextOverlayTarget.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/provideContextOverlayTarget.ts#L13)

Registers a feature target without coupling the application's shell to its lazy surface.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tresult"></a> `TResult` | The result returned by the target's surface. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `factory` | () => [`IContextOverlayTarget`](Interface.IContextOverlayTarget)\<`TResult`\> | Factory that can inject feature services at application composition. |

## Returns

`Provider`

A multi-provider to register at application composition.
