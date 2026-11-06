---
title: 'Interface: ITrackable'
generated: true
editUrl: false
---
# Interface: ITrackable

Defined in: [behaviors/ITrackable.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ITrackable.ts#L13)

Commands and gates of a presenter whose model has undo and redo history.

## Properties

### canRedo

```ts
readonly canRedo: Signal<boolean>;
```

Defined in: [behaviors/ITrackable.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ITrackable.ts#L34)

Whether an undone model value can be restored.

***

### canUndo

```ts
readonly canUndo: Signal<boolean>;
```

Defined in: [behaviors/ITrackable.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ITrackable.ts#L29)

Whether an earlier recorded model value can be restored.

***

### redoCommand

```ts
readonly redoCommand: Command<void>;
```

Defined in: [behaviors/ITrackable.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ITrackable.ts#L24)

Command that restores the next value after an undo.

***

### undoCommand

```ts
readonly undoCommand: Command<void>;
```

Defined in: [behaviors/ITrackable.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ITrackable.ts#L19)

Command that restores the preceding recorded model value.
