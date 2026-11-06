---
title: 'Function: provideOperationQueue()'
generated: true
editUrl: false
---
# Function: provideOperationQueue()

```ts
function provideOperationQueue(options?, ...features): EnvironmentProviders;
```

Defined in: [operation-queue/provider/provideOperationQueue.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/provider/provideOperationQueue.ts#L50)

Registers the operation queue with composable features.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `Partial`\<[`IOperationQueueOptions`](Interface.IOperationQueueOptions)\> | Optional overrides for the default queue configuration. |
| ...`features?` | readonly [`IFeature`](Interface.IFeature)\<[`OperationQueueFeatureKind`](TypeAlias.OperationQueueFeatureKind)\>[] | Composable features such as [withFailurePolicy](Function.withFailurePolicy) or [withMergePolicy](Function.withMergePolicy). |

## Returns

`EnvironmentProviders`

Environment providers for Angular DI.

## Example

```typescript
provideOperationQueue(
    { defaultDelayInMilliseconds: 5000 },
    withFailurePolicy(RollbackOnFailurePolicy),
    withMergePolicy(ReplacePendingByMergeKeyPolicy)
)
```
