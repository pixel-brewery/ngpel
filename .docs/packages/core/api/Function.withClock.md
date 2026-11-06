---
title: 'Function: withClock()'
generated: true
editUrl: false
---
# Function: withClock()

```ts
function withClock(clock): IFeature<OperationQueueFeatureKind>;
```

Defined in: [operation-queue/provider/withClock.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/provider/withClock.ts#L19)

Registers a custom clock for the operation queue (non-multi).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `clock` | `Type`\<[`IOperationClock`](Interface.IOperationClock)\> | The clock class to instantiate. |

## Returns

[`IFeature`](Interface.IFeature)\<[`OperationQueueFeatureKind`](TypeAlias.OperationQueueFeatureKind)\>

A composable feature for [provideOperationQueue](Function.provideOperationQueue).
