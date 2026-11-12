---
title: 'Type Alias: AsyncAwaitCommand\<T, R\>'
generated: true
editUrl: false
---
# Type Alias: AsyncAwaitCommand\<T, R\>

```ts
type AsyncAwaitCommand<T, R> = Command<T> & {
  error: Signal<Error | null>;
  isExecuting: Signal<boolean>;
  result: Signal<R | null>;
};
```

Defined in: [commands/AsyncAwaitCommand.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncAwaitCommand.ts#L23)

An asynchronous [Command](TypeAlias.Command) that captures the outcome of its last execution into the `result`
and `error` signals.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `void` | The parameter type passed to [Command.execute](TypeAlias.Command#execute). |
| <a id="type-parameter-r"></a> `R` | `unknown` | The result type returned by the handler. |

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `error` | `Signal`\<`Error` \| `null`\> | The error of the last failed execution; resets to `null` when the next execution succeeds. Non-`Error` rejections are wrapped in an `Error` whose message is their string form. | [commands/AsyncAwaitCommand.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncAwaitCommand.ts#L40) |
| `isExecuting` | `Signal`\<`boolean`\> | Indicates whether the asynchronous handler is currently running. | [commands/AsyncAwaitCommand.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncAwaitCommand.ts#L29) |
| `result` | `Signal`\<`R` \| `null`\> | The result of the last successful execution; resets to `null` when the next execution fails. | [commands/AsyncAwaitCommand.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncAwaitCommand.ts#L34) |

## Remarks

Extends the fire-and-forget [AsyncCommand](TypeAlias.AsyncCommand) contract: the handler starts synchronously, the
command is blocked while pending, and a rejection lands in `error` instead of being swallowed.
