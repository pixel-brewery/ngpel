---
title: 'Type Alias: OperationLifecycleEvent'
generated: true
editUrl: false
---
# Type Alias: OperationLifecycleEvent

```ts
type OperationLifecycleEvent =
  | OperationEnqueuedEvent
  | OperationCommittedEvent
  | OperationFailedEvent
  | OperationRejectedEvent
  | OperationDismissedEvent
  | OperationRetriedEvent;
```

Defined in: [operation-queue/lifecycle/OperationLifecycleEvent.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/lifecycle/OperationLifecycleEvent.ts#L15)

Discriminated union of all lifecycle events emitted by the operation queue.

UI adapters subscribe to these events to react to operation state changes
without coupling to the queue internals.
