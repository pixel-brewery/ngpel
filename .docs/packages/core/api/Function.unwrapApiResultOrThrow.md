---
title: 'Function: unwrapApiResultOrThrow()'
generated: true
editUrl: false
---
# Function: unwrapApiResultOrThrow()

```ts
function unwrapApiResultOrThrow<TData>(): OperatorFunction<IApiResult<TData>, TData>;
```

Defined in: [rx/operators/unwrapApiResultOrThrow.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/unwrapApiResultOrThrow.ts#L11)

Emits the data of a successful API result and turns a failure into an [ApiResultError](Class.ApiResultError).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tdata"></a> `TData` | The successful response data type. |

## Returns

`OperatorFunction`\<[`IApiResult`](TypeAlias.IApiResult)\<`TData`\>, `TData`\>

An RxJS operator that preserves the HTTP status and problem detail on failure.
