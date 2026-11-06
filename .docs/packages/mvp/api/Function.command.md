---
title: 'Function: command()'
generated: true
editUrl: false
---
# Function: command()

```ts
function command<T>(execute, canExecute?): Command<T>;
```

Defined in: [commands/Command.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/Command.ts#L106)

Creates a synchronous [Command](TypeAlias.Command). Co-located with the type because a separate `command.ts` would
collide with `Command.ts` on case-insensitive file systems.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | The parameter type of the command. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `execute` | (`parameter`) => `void` | The handler invoked by [Command.execute](TypeAlias.Command#execute). |
| `canExecute?` | `Signal`\<`boolean`\> | Optional signal gating execution; defaults to always executable. |

## Returns

[`Command`](TypeAlias.Command)\<`T`\>

A new command.
