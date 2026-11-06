---
title: 'Type Alias: IOperationInput\<TPayload, TResult\>'
generated: true
editUrl: false
---
# Type Alias: IOperationInput\<TPayload, TResult\>

```ts
type IOperationInput<TPayload, TResult> =
  | IOperation<TPayload, TResult>
| IOperationDefinition<TPayload, TResult>;
```

Defined in: [operation-queue/interfaces/IOperationInput.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationInput.ts#L16)

Flexible input for [OperationQueue.enqueue](Class.OperationQueue#enqueue). Accepts either a full
[IOperation](Interface.IOperation) or a simplified [IOperationDefinition](Interface.IOperationDefinition).

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPayload` | - | The input data required by the operation. |
| `TResult` | `void` | The result produced by a successful commit. |
