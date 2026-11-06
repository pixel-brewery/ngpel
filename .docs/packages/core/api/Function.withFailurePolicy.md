---
title: 'Function: withFailurePolicy()'
generated: true
editUrl: false
---
# Function: withFailurePolicy()

```ts
function withFailurePolicy(policy): IFeature<OperationQueueFeatureKind>;
```

Defined in: [operation-queue/provider/withFailurePolicy.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/provider/withFailurePolicy.ts#L19)

Registers a failure policy for the operation queue (non-multi).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `policy` | `Type`\<[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy)\> | The failure policy class to instantiate. |

## Returns

[`IFeature`](Interface.IFeature)\<[`OperationQueueFeatureKind`](TypeAlias.OperationQueueFeatureKind)\>

A composable feature for [provideOperationQueue](Function.provideOperationQueue).
