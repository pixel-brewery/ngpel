---
title: 'Function: compositeCommand()'
generated: true
editUrl: false
---
# Function: compositeCommand()

```ts
function compositeCommand<T>(canExecute?): CompositeCommand<T>;
```

Defined in: [commands/CompositeCommand.ts:211](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L211)

Creates a [CompositeCommand](TypeAlias.CompositeCommand). Co-located with the type because a separate `compositeCommand.ts`
would collide with `CompositeCommand.ts` on case-insensitive file systems.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `void` | The parameter type passed to every child. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `canExecute?` | `Signal`\<`boolean`\> | Optional external gate; the composite additionally requires a non-empty queue whose children can all execute. |

## Returns

[`CompositeCommand`](TypeAlias.CompositeCommand)\<`T`\>

A new composite command.
