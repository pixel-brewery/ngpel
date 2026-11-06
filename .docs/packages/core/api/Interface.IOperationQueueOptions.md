---
title: 'Interface: IOperationQueueOptions'
generated: true
editUrl: false
---
# Interface: IOperationQueueOptions

Defined in: [operation-queue/interfaces/IOperationQueueOptions.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationQueueOptions.ts#L10)

Configuration options for the operation queue.

## Properties

### countdownIntervalInMilliseconds

```ts
readonly countdownIntervalInMilliseconds: number;
```

Defined in: [operation-queue/interfaces/IOperationQueueOptions.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationQueueOptions.ts#L25)

Interval in milliseconds for the countdown tick that updates
[IOperationEntry.remainingMilliseconds](Interface.IOperationEntry#remainingmilliseconds).

***

### defaultDelayInMilliseconds

```ts
readonly defaultDelayInMilliseconds: number;
```

Defined in: [operation-queue/interfaces/IOperationQueueOptions.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationQueueOptions.ts#L17)

Default delay in milliseconds before an operation is auto-committed.
Can be overridden per operation via [IOperation.delayInMilliseconds](Interface.IOperation#delayinmilliseconds).
