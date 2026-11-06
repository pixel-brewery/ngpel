---
title: 'Interface: ICloseable'
generated: true
editUrl: false
---
# Interface: ICloseable

Defined in: [behaviors/ICloseable.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ICloseable.ts#L14)

Contract of the Closeable presenter behavior: the command a View binds to its dismiss affordance,
together with the gate that decides whether dismissing is currently allowed.

## Properties

### canClose

```ts
readonly canClose: Signal<boolean>;
```

Defined in: [behaviors/ICloseable.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ICloseable.ts#L25)

Whether [ICloseable.closeCommand](#closecommand) can currently execute.

***

### closeCommand

```ts
readonly closeCommand: Command<void>;
```

Defined in: [behaviors/ICloseable.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ICloseable.ts#L20)

Command that closes the presenter, for example dismissing a drawer or a dialog.

## Methods

### onExecuteClose()

```ts
onExecuteClose(): void;
```

Defined in: [behaviors/ICloseable.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ICloseable.ts#L38)

Runs when the close command executes. Override to perform the actual close.

#### Returns

`void`

#### Remarks

Public because TypeScript mixins cannot declare protected extension points. It is a subclass
extension point — do not call it from a template.

***

### setCanExecuteClose()

```ts
setCanExecuteClose(value): void;
```

Defined in: [behaviors/ICloseable.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ICloseable.ts#L45)

Enables or disables closing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `boolean` | `true` to allow closing, `false` to block it. |

#### Returns

`void`
