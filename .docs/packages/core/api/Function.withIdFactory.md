---
title: 'Function: withIdFactory()'
generated: true
editUrl: false
---
# Function: withIdFactory()

```ts
function withIdFactory(factory): IFeature<OperationQueueFeatureKind>;
```

Defined in: [operation-queue/provider/withIdFactory.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/provider/withIdFactory.ts#L19)

Registers a custom ID factory for the operation queue (non-multi).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `factory` | `Type`\<[`IOperationIdFactory`](Interface.IOperationIdFactory)\> | The ID factory class to instantiate. |

## Returns

[`IFeature`](Interface.IFeature)\<[`OperationQueueFeatureKind`](TypeAlias.OperationQueueFeatureKind)\>

A composable feature for [provideOperationQueue](Function.provideOperationQueue).
