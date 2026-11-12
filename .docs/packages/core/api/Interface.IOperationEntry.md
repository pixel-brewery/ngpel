---
title: 'Interface: IOperationEntry\<TPayload, TResult\>'
generated: true
editUrl: false
---
# Interface: IOperationEntry\<TPayload, TResult\>

Defined in: [operation-queue/models/IOperationEntry.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L15)

Internal representation of a queued operation with its lifecycle state.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpayload"></a> `TPayload` | `unknown` | The input data required by the operation. |
| <a id="type-parameter-tresult"></a> `TResult` | `unknown` | The result produced by a successful commit. |

## Properties

### commitAt

```ts
readonly commitAt: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L49)

Timestamp (ms) when the entry should be auto-committed.

***

### committedAt?

```ts
readonly committedAt?: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L77)

Timestamp (ms) when the entry was successfully committed, if applicable.

***

### createdAt

```ts
readonly createdAt: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L42)

Timestamp (ms) when the entry was created.

***

### delayInMilliseconds

```ts
readonly delayInMilliseconds: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L56)

Configured delay in milliseconds.

***

### dismissed

```ts
readonly dismissed: boolean;
```

Defined in: [operation-queue/models/IOperationEntry.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L70)

When true the entry is hidden from IOperationStateStore.visibleEntries.

***

### error?

```ts
readonly error?: unknown;
```

Defined in: [operation-queue/models/IOperationEntry.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L98)

Error captured from a failed [IOperation.commit](Interface.IOperation#commit), if applicable.

***

### failedAt?

```ts
readonly failedAt?: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L91)

Timestamp (ms) when the entry entered the failed state, if applicable.

***

### id

```ts
readonly id: string;
```

Defined in: [operation-queue/models/IOperationEntry.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L21)

Unique identifier for this entry.

***

### operation

```ts
readonly operation: IOperation<TPayload, TResult>;
```

Defined in: [operation-queue/models/IOperationEntry.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L28)

The operation to execute.

***

### rejectedAt?

```ts
readonly rejectedAt?: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L84)

Timestamp (ms) when the entry was rejected, if applicable.

***

### remainingMilliseconds

```ts
readonly remainingMilliseconds: number;
```

Defined in: [operation-queue/models/IOperationEntry.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L63)

Countdown value updated by the scheduler on each tick.

***

### status

```ts
readonly status: OperationStatus;
```

Defined in: [operation-queue/models/IOperationEntry.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/models/IOperationEntry.ts#L35)

Current lifecycle status.
