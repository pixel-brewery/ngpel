---
title: 'Class: OperationLifecycle'
generated: true
editUrl: false
---
# Class: OperationLifecycle

Defined in: [operation-queue/lifecycle/OperationLifecycle.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/lifecycle/OperationLifecycle.ts#L19)

Reactive stream of operation lifecycle events.

The queue and executor emit events here; UI adapters subscribe to drive
toast notifications, analytics, or any other side-effect without coupling
to the queue internals.

## Constructors

### Constructor

```ts
new OperationLifecycle(): OperationLifecycle;
```

#### Returns

`OperationLifecycle`

## Properties

### events

```ts
readonly events: Observable<OperationLifecycleEvent>;
```

Defined in: [operation-queue/lifecycle/OperationLifecycle.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/lifecycle/OperationLifecycle.ts#L33)

Observable of all lifecycle events.

## Methods

### emit()

```ts
emit(event): void;
```

Defined in: [operation-queue/lifecycle/OperationLifecycle.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/lifecycle/OperationLifecycle.ts#L45)

Emits a lifecycle event.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | [`OperationLifecycleEvent`](TypeAlias.OperationLifecycleEvent) | The event to emit. |

#### Returns

`void`
