---
title: 'Type Alias: AsyncCommand\<T\>'
generated: true
editUrl: false
---
# Type Alias: AsyncCommand\<T\>

```ts
type AsyncCommand<T> = Command<T> & {
  isExecuting: Signal<boolean>;
};
```

Defined in: [commands/AsyncCommand.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncCommand.ts#L21)

A fire-and-forget asynchronous [Command](TypeAlias.Command): the handler starts synchronously, the command stays
non-executable while the returned promise is pending and rejections are consumed silently.

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `isExecuting` | `Signal`\<`boolean`\> | Indicates whether the asynchronous handler is currently running. | [commands/AsyncCommand.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/AsyncCommand.ts#L27) |

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | The parameter type passed to [Command.execute](TypeAlias.Command#execute). |

## Remarks

Use [AsyncAwaitCommand](TypeAlias.AsyncAwaitCommand) when the view needs the result or the error of the last execution.
