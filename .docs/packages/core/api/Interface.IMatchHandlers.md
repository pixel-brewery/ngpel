---
title: 'Interface: IMatchHandlers\<TData, TResult\>'
generated: true
editUrl: false
---
# Interface: IMatchHandlers\<TData, TResult\>

Defined in: [rx/operators/IMatchHandlers.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IMatchHandlers.ts#L12)

Handlers applied by [matchResult](Function.matchResult) to the success and failure branches of an API result.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tdata"></a> `TData` | - |
| <a id="type-parameter-tresult"></a> `TResult` | `void` |

## Properties

### onError?

```ts
readonly onError?: (result) => TResult;
```

Defined in: [rx/operators/IMatchHandlers.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IMatchHandlers.ts#L23)

Invoked for failed results.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`IApiFailure`](Interface.IApiFailure) |

#### Returns

`TResult`

***

### onSuccess?

```ts
readonly onSuccess?: (result) => TResult;
```

Defined in: [rx/operators/IMatchHandlers.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IMatchHandlers.ts#L18)

Invoked for successful results.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`IApiSuccess`](Interface.IApiSuccess)\<`TData`\> |

#### Returns

`TResult`
