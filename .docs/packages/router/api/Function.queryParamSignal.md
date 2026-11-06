---
title: 'Function: queryParamSignal()'
generated: true
editUrl: false
---
# Function: queryParamSignal()

```ts
function queryParamSignal<T>(
   parameterName,
   codec,
   options?
): UrlParamSignal<T>;
```

Defined in: [signals/queryParamSignal.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/queryParamSignal.ts#L30)

Creates a bidirectional signal for one optional query parameter. Must be called in an injection
context. Writing preserves every unrelated query parameter, including repeated ones.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The typed application value. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parameterName` | `string` | The query parameter name. |
| `codec` | [`UrlParamCodec`](TypeAlias.UrlParamCodec)\<`T`\> | The codec converting between the raw parameter and the typed value. |
| `options` | [`IQueryParamSignalOptions`](Interface.IQueryParamSignalOptions) | The history behavior and fragment handling. |

## Returns

[`UrlParamSignal`](TypeAlias.UrlParamSignal)\<`T`\>

The URL-backed signal.

## Example

```typescript
// /newsletters?status=draft
private readonly _status = queryParamSignal('status', fromNullable(enumCodec(['draft', 'published'])));
```
