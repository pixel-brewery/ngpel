---
title: 'Interface: IOperationContext'
generated: true
editUrl: false
---
# Interface: IOperationContext

Defined in: [operation-queue/interfaces/IOperationContext.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationContext.ts#L6)

Runtime context passed to every [IOperation](Interface.IOperation) lifecycle hook.

## Properties

### entryId

```ts
readonly entryId: string;
```

Defined in: [operation-queue/interfaces/IOperationContext.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationContext.ts#L12)

Unique id of the operation entry within the queue.

***

### idempotencyKey

```ts
readonly idempotencyKey: string;
```

Defined in: [operation-queue/interfaces/IOperationContext.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationContext.ts#L15)

Stable key to send with the same mutation on every retry.

***

### operationType

```ts
readonly operationType: string;
```

Defined in: [operation-queue/interfaces/IOperationContext.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationContext.ts#L22)

The [IOperation.type](Interface.IOperation#type) discriminator.

***

### requestedAt

```ts
readonly requestedAt: number;
```

Defined in: [operation-queue/interfaces/IOperationContext.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationContext.ts#L29)

Timestamp (ms) when the operation was enqueued.
