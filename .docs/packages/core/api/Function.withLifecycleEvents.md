---
title: 'Function: withLifecycleEvents()'
generated: true
editUrl: false
---
# Function: withLifecycleEvents()

```ts
function withLifecycleEvents(): IFeature<OperationQueueFeatureKind>;
```

Defined in: [operation-queue/provider/withLifecycleEvents.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/provider/withLifecycleEvents.ts#L26)

Feature that enables lifecycle event emission on the operation queue.

When active, the queue emits [OperationLifecycleEvent](TypeAlias.OperationLifecycleEvent) instances through
the [OperationLifecycle](Class.OperationLifecycle) service. UI adapters subscribe to these events
to drive toast notifications, analytics, or other side-effects.

## Returns

[`IFeature`](Interface.IFeature)\<[`OperationQueueFeatureKind`](TypeAlias.OperationQueueFeatureKind)\>

## Example

```typescript
provideOperationQueue(undefined, withLifecycleEvents())
```
