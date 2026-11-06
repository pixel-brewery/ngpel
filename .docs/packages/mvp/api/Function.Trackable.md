---
title: 'Function: Trackable()'
generated: true
editUrl: false
---
# Function: Trackable()

```ts
function Trackable<T>(base): PresenterBehaviorReturn<T, ITrackable>;
```

Defined in: [behaviors/Trackable.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Trackable.ts#L23)

Adds undo and redo commands for a model configured through [withUndoRedo](Function.withUndoRedo).

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | The presenter class to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`ITrackable`](Interface.ITrackable)\>

An abstract class that additionally implements [ITrackable](Interface.ITrackable).

## Remarks

The factory owns the model and commands; this mixin exposes them to the View and clears the
history when its presenter is disposed.
