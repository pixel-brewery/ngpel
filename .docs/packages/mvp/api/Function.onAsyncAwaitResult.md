---
title: 'Function: onAsyncAwaitResult()'
generated: true
editUrl: false
---
# Function: onAsyncAwaitResult()

```ts
function onAsyncAwaitResult<R>(
   command,
   handler,
   options?
): EffectRef;
```

Defined in: [commands/onAsyncAwaitResult.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/onAsyncAwaitResult.ts#L24)

Invokes `handler` whenever `command` produces a new non-`null` result.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` | The result type of the command. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `command` | [`AsyncAwaitCommand`](TypeAlias.AsyncAwaitCommand)\<`unknown`, `R`\> | The command whose results are observed. |
| `handler` | (`result`) => `void` | Invoked with every new result. |
| `options?` | `Pick`\<`CreateEffectOptions`, `"injector"`\> | Optional effect options; pass `injector` to call this outside an injection context. |

## Returns

`EffectRef`

The effect reference controlling the observation.

## Remarks

Creates an Angular `effect`, so it must be called inside an injection context (a constructor or a
provider factory) unless `options.injector` is supplied. The handler runs untracked; the returned
EffectRef stops the observation. Results that are strictly equal to the previous one are not
re-reported, because the underlying signal does not notify for equal values.
