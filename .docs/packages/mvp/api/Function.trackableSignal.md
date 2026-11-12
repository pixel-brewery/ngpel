---
title: 'Function: trackableSignal()'
generated: true
editUrl: false
---
# Function: trackableSignal()

```ts
function trackableSignal<T>(source, options?): ITrackableSignal<T>;
```

Defined in: [signals/trackableSignal.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/trackableSignal.ts#L25)

Tracks writes to an existing signal or a new signal created from an initial value.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The signal value type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `T` \| `WritableSignal`\<`T`\> | The writable signal to wrap or its initial value. |
| `options?` | [`TrackableSignalOptions`](Interface.TrackableSignalOptions)\<`T`\> | History capacity and optional recording filter. |

## Returns

[`ITrackableSignal`](Interface.ITrackableSignal)\<`T`\>

The signal and its reactive history controls.

## Remarks

An existing writable signal keeps its identity. Its own `set()` and `update()` methods are
replaced with non-enumerable tracking methods; Angular's signal prototype is unchanged.
Undo and redo restore snapshots without recording another write. After `clear()`, the next
write starts a new history from the then-current value.
