---
title: 'Function: asyncAwaitCommand()'
generated: true
editUrl: false
---
# Function: asyncAwaitCommand()

```ts
function asyncAwaitCommand<T, R>(
   execute,
   canExecute?,
   loadingRef?
): AsyncAwaitCommand<T, R>;
```

Defined in: [commands/AsyncAwaitCommand.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncAwaitCommand.ts#L178)

Creates a result-capturing [AsyncAwaitCommand](TypeAlias.AsyncAwaitCommand). Co-located with the type because a separate
`asyncAwaitCommand.ts` would collide with `AsyncAwaitCommand.ts` on case-insensitive file systems.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `void` | The parameter type of the command. |
| `R` | `unknown` | The result type of the handler. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `execute` | (`parameter`) => `Promise`\<`R`\> | The asynchronous handler returning the result; it starts synchronously inside [Command.execute](TypeAlias.Command#execute). |
| `canExecute?` | `Signal`\<`boolean`\> | Optional gate signal; the command is additionally blocked while executing. |
| `loadingRef?` | [`LoadingRefSource`](TypeAlias.LoadingRefSource) | Optional [LoadingRefSource](TypeAlias.LoadingRefSource) entered for the duration of the handler. |

## Returns

[`AsyncAwaitCommand`](TypeAlias.AsyncAwaitCommand)\<`T`, `R`\>

A new result-capturing asynchronous command.
