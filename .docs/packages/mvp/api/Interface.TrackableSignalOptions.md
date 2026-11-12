---
title: 'Interface: TrackableSignalOptions\<T\>'
generated: true
editUrl: false
---
# Interface: TrackableSignalOptions\<T\>

Defined in: [signals/TrackableSignalOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/TrackableSignalOptions.ts#L7)

Configures the retained history of a trackable signal.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The signal value type. |

## Properties

### capacity?

```ts
capacity?: number;
```

Defined in: [signals/TrackableSignalOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/TrackableSignalOptions.ts#L14)

Maximum number of snapshots, including the current snapshot. Defaults to 100.
Finite values are rounded down and clamped to at least one.

***

### shouldRecord?

```ts
shouldRecord?: (newValue, oldValue) => boolean;
```

Defined in: [signals/TrackableSignalOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/TrackableSignalOptions.ts#L23)

Decides whether a changed value belongs in history. Skipped values still update the signal.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newValue` | `T` | The requested value. |
| `oldValue` | `T` | The last recorded value. |

#### Returns

`boolean`

Whether the new value should be recorded.
