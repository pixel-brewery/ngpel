---
title: 'Function: operation()'
generated: true
editUrl: false
---
# Function: operation()

```ts
function operation<TPayload, TResult>(input): IOperation<TPayload, TResult>;
```

Defined in: [operation-queue/factory/operationFactory.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/factory/operationFactory.ts#L42)

Creates a full [IOperation](Interface.IOperation) from a simplified [IOperationDefinition](Interface.IOperationDefinition).

Only `commit` is required. All other fields receive sensible defaults:
- `type` → `"anonymous"`
* `payload` → `undefined`
* `label` → the `type` value
* `apply` → no-op
* `rollback` → no-op

If the input is already a full [IOperation](Interface.IOperation) (has `apply`, `commit`,
and `rollback`), it is returned as-is without wrapping.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPayload` | - | The input data required by the operation. |
| `TResult` | `void` | The result produced by a successful commit. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | \| [`IOperation`](Interface.IOperation)\<`TPayload`, `TResult`\> \| [`IOperationDefinition`](Interface.IOperationDefinition)\<`TPayload`, `TResult`\> | A full operation or a simplified definition. |

## Returns

[`IOperation`](Interface.IOperation)\<`TPayload`, `TResult`\>

A fully conformant [IOperation](Interface.IOperation).
