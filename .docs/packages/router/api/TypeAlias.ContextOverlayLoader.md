---
title: 'Type Alias: ContextOverlayLoader\<TResult\>'
generated: true
editUrl: false
---
# Type Alias: ContextOverlayLoader\<TResult\>

```ts
type ContextOverlayLoader<TResult> = (signal) => Promise<() => IContextOverlayRef<TResult>>;
```

Defined in: [context-overlay/ContextOverlayLoader.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayLoader.ts#L12)

Loads a surface and its data without mounting it. The returned function is called only if the
target is still current and authorized.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TResult` | `unknown` | The surface's close result. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `signal` | `AbortSignal` | Aborted when the request is superseded or the coordinator is disposed. |

## Returns

`Promise`\<() => [`IContextOverlayRef`](Interface.IContextOverlayRef)\<`TResult`\>\>

A function that mounts the loaded surface.
