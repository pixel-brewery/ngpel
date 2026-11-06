---
title: 'Type Alias: CompositeCommand\<T\>'
generated: true
editUrl: false
---
# Type Alias: CompositeCommand\<T\>

```ts
type CompositeCommand<T> = Command<T> & {
  clear: void;
  count: Signal<number>;
  has: boolean;
  register: void;
  unregister: void;
};
```

Defined in: [commands/CompositeCommand.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L19)

A [Command](TypeAlias.Command) that owns an ordered queue of child commands and executes them sequentially in
FIFO order with the same parameter.

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `clear()` | () => `void` | Removes every child command. | [commands/CompositeCommand.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L57) |
| `count` | `Signal`\<`number`\> | The number of registered child commands. | [commands/CompositeCommand.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L25) |
| `has()` | (`command`) => `boolean` | Returns whether the child command is registered. | [commands/CompositeCommand.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L52) |
| `register()` | (`command`) => `void` | Appends a child command to the queue. **Throws** Error when the command is `null`/`undefined` or already registered. | [commands/CompositeCommand.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L37) |
| `unregister()` | (`command`) => `void` | Removes a child command from the queue. **Throws** Error when the command is `null`/`undefined` or not registered. | [commands/CompositeCommand.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/CompositeCommand.ts#L45) |

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `void` | The parameter type passed to every child. |

## Remarks

The composite is executable only when the queue is non-empty, the optional external gate is `true`
and every child can execute. Registration is reference-based: a child may be registered once.
