---
title: 'Function: asyncCommand()'
generated: true
editUrl: false
---
# Function: asyncCommand()

```ts
function asyncCommand<T>(
   execute,
   canExecute?,
   loadingRef?
): AsyncCommand<T>;
```

Defined in: [commands/AsyncCommand.ts:137](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncCommand.ts#L137)

Creates a fire-and-forget [AsyncCommand](TypeAlias.AsyncCommand). Co-located with the type because a separate
`asyncCommand.ts` would collide with `AsyncCommand.ts` on case-insensitive file systems.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | The parameter type of the command. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `execute` | (`parameter`) => `Promise`\<`void`\> | The asynchronous handler; it starts synchronously inside [Command.execute](TypeAlias.Command#execute). |
| `canExecute?` | `Signal`\<`boolean`\> | Optional gate signal; the command is additionally blocked while executing. |
| `loadingRef?` | [`LoadingRefSource`](TypeAlias.LoadingRefSource) | Optional [LoadingRefSource](TypeAlias.LoadingRefSource) entered for the duration of the handler. |

## Returns

[`AsyncCommand`](TypeAlias.AsyncCommand)\<`T`\>

A new asynchronous command.
