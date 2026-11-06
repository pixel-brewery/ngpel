---
title: 'Function: unwrapApiResultOrThrow()'
generated: true
editUrl: false
---
# Function: unwrapApiResultOrThrow()

```ts
function unwrapApiResultOrThrow<TData>(): OperatorFunction<IApiResult<TData>, TData>;
```

Defined in: rx/operators/unwrapApiResultOrThrow.ts:11

Emits the data of a successful API result and turns a failure into an [ApiResultError](Class.ApiResultError).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TData` | The successful response data type. |

## Returns

`OperatorFunction`\<[`IApiResult`](TypeAlias.IApiResult)\<`TData`\>, `TData`\>

An RxJS operator that preserves the HTTP status and problem detail on failure.
