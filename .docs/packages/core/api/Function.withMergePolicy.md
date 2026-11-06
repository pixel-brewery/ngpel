---
title: 'Function: withMergePolicy()'
generated: true
editUrl: false
---
# Function: withMergePolicy()

```ts
function withMergePolicy(policy): IFeature<OperationQueueFeatureKind>;
```

Defined in: [operation-queue/provider/withMergePolicy.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/provider/withMergePolicy.ts#L19)

Registers a merge policy for the operation queue (non-multi).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `policy` | `Type`\<[`IOperationMergePolicy`](Interface.IOperationMergePolicy)\> | The merge policy class to instantiate. |

## Returns

[`IFeature`](Interface.IFeature)\<[`OperationQueueFeatureKind`](TypeAlias.OperationQueueFeatureKind)\>

A composable feature for [provideOperationQueue](Function.provideOperationQueue).
