---
title: 'Function: matchResult()'
generated: true
editUrl: false
---
# Function: matchResult()

```ts
function matchResult<TData, TResult>(handlers): OperatorFunction<IApiResult<TData>, void | TResult>;
```

Defined in: [rx/operators/matchResult.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/matchResult.ts#L16)

Operator which takes a stream of [IApiResult](TypeAlias.IApiResult) and applies the matching handler for the
success or failure branch.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tdata"></a> `TData` | - |
| <a id="type-parameter-tresult"></a> `TResult` | `void` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `handlers` | [`IMatchHandlers`](Interface.IMatchHandlers)\<`TData`, `TResult`\> | The success and failure handlers. |

## Returns

`OperatorFunction`\<[`IApiResult`](TypeAlias.IApiResult)\<`TData`\>, `void` \| `TResult`\>
