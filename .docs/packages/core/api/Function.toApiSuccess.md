---
title: 'Function: toApiSuccess()'
generated: true
editUrl: false
---
# Function: toApiSuccess()

```ts
function toApiSuccess<TData>(data, status): IApiSuccess<TData>;
```

Defined in: [results/toApiSuccess.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/toApiSuccess.ts#L15)

Creates a successful API result envelope.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tdata"></a> `TData` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `TData` | The typed response data. |
| `status` | `number` | The HTTP status code of the response. |

## Returns

[`IApiSuccess`](Interface.IApiSuccess)\<`TData`\>

The success envelope.
