---
title: 'Interface: ITrackableSignal\<T\>'
generated: true
editUrl: false
---
# Interface: ITrackableSignal\<T\>

Defined in: [signals/ITrackableSignal.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L14)

A writable signal with a bounded history and undo/redo operations.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The signal value type. |

## Properties

### canRedo

```ts
readonly canRedo: Signal<boolean>;
```

Defined in: [signals/ITrackableSignal.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L35)

Whether an undone snapshot can be restored.

***

### canUndo

```ts
readonly canUndo: Signal<boolean>;
```

Defined in: [signals/ITrackableSignal.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L30)

Whether a previous snapshot can be restored.

***

### history

```ts
readonly history: Signal<ITrackableSignalRecord<T>[]>;
```

Defined in: [signals/ITrackableSignal.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L25)

Recorded snapshots from oldest to newest, including the current history position.

***

### value

```ts
readonly value: WritableSignal<T>;
```

Defined in: [signals/ITrackableSignal.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L20)

The underlying writable signal; its `set()` and `update()` methods record changes.

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [signals/ITrackableSignal.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L59)

Discards all snapshots without changing the signal value.

#### Returns

`void`

***

### redo()

```ts
redo(): void;
```

Defined in: [signals/ITrackableSignal.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L49)

Restores the next undone value when one exists.

#### Returns

`void`

***

### reset()

```ts
reset(): void;
```

Defined in: [signals/ITrackableSignal.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L54)

Retains only the latest recorded value and discards the redo history.

#### Returns

`void`

***

### undo()

```ts
undo(): void;
```

Defined in: [signals/ITrackableSignal.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/ITrackableSignal.ts#L44)

Restores the preceding recorded value when one exists.

#### Returns

`void`
