---
title: 'Function: withUndoRedo()'
generated: true
editUrl: false
---
# Function: withUndoRedo()

```ts
function withUndoRedo<TModel>(
   host,
   initialValue,
   options?
): ITrackableSignal<TModel>;
```

Defined in: [behaviors/withUndoRedo.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/withUndoRedo.ts#L25)

Creates a tracked model and connects its history to the presenter's commands and gates.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tmodel"></a> `TModel` | The model value retained in history. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `host` | [`ITrackable`](Interface.ITrackable) | The presenter to configure. |
| `initialValue` | `TModel` | The initial model value. |
| `options?` | [`TrackableSignalOptions`](Interface.TrackableSignalOptions)\<`TModel`\> | Optional history capacity and recording filters. |

## Returns

[`ITrackableSignal`](Interface.ITrackableSignal)\<`TModel`\>

The tracked model owned by the presenter.

## Remarks

Call once from the concrete presenter's constructor, before reading its Trackable members.
