---
title: 'Type Alias: Command\<T\>'
generated: true
editUrl: false
---
# Type Alias: Command\<T\>

```ts
type Command<T> = {
  canExecute: Signal<boolean>;
  execute: void;
};
```

Defined in: [commands/Command.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/Command.ts#L18)

A WPF-style command: a reactive `canExecute` gate paired with a synchronous `execute`.

## Remarks

`execute` invokes the handler synchronously in the caller's turn, so parameters that are only valid
during the triggering event (a `FileList`, a `DataTransfer`) are captured before the browser recycles
them. Creating a command needs no Angular injection context.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `void` | The parameter type passed to [Command.execute](#execute). |

## Properties

### canExecute

```ts
readonly canExecute: Signal<boolean>;
```

Defined in: [commands/Command.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/Command.ts#L24)

Indicates whether the command can currently be executed.

## Methods

### execute()

```ts
execute(parameter): void;
```

Defined in: [commands/Command.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/Command.ts#L35)

Executes the command when [Command.canExecute](#canexecute) is `true`; otherwise does nothing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parameter` | `T` | The parameter handed to the handler. |

#### Returns

`void`
