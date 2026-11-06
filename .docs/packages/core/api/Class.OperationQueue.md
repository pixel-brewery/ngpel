---
title: 'Class: OperationQueue'
generated: true
editUrl: false
---
# Class: OperationQueue

Defined in: [operation-queue/queue/OperationQueue.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L33)

Central operation queue managing enqueue, scheduling, commit, and rollback lifecycle.

Exposes reactive signals for the current entry state. Operations are enqueued
with a countdown delay; when it expires they are committed automatically.
Entries can also be committed immediately, retried, rejected, or dismissed.

## Constructors

### Constructor

```ts
new OperationQueue(): OperationQueue;
```

#### Returns

`OperationQueue`

## Properties

### entries

```ts
readonly entries: Signal<readonly IOperationEntry<unknown, unknown>[]>;
```

Defined in: [operation-queue/queue/OperationQueue.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L54)

All entries currently in the queue.

***

### failedEntries

```ts
readonly failedEntries: Signal<readonly IOperationEntry<unknown, unknown>[]>;
```

Defined in: [operation-queue/queue/OperationQueue.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L68)

Entries with status `'failed'`.

***

### pendingEntries

```ts
readonly pendingEntries: Signal<readonly IOperationEntry<unknown, unknown>[]>;
```

Defined in: [operation-queue/queue/OperationQueue.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L61)

Entries with status `'pending'`.

***

### visibleEntries

```ts
readonly visibleEntries: Signal<readonly IOperationEntry<unknown, unknown>[]>;
```

Defined in: [operation-queue/queue/OperationQueue.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L75)

Entries not marked as dismissed.

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [operation-queue/queue/OperationQueue.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L190)

Clears all entries and cancels all pending schedules.

#### Returns

`void`

***

### commitNow()

```ts
commitNow(entryId): void;
```

Defined in: [operation-queue/queue/OperationQueue.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L163)

Immediately commits an operation, bypassing the countdown delay.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entryId` | `string` | ID of the entry to commit now. |

#### Returns

`void`

***

### dismiss()

```ts
dismiss(entryId): void;
```

Defined in: [operation-queue/queue/OperationQueue.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L145)

Marks an entry as dismissed (hidden from [OperationQueue.visibleEntries](#visibleentries)).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entryId` | `string` | ID of the entry to dismiss. |

#### Returns

`void`

***

### enqueue()

```ts
enqueue<TPayload, TResult>(input): string;
```

Defined in: [operation-queue/queue/OperationQueue.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L93)

Enqueues a new operation and returns its entry id.
If a merge target is found the existing entry is rejected first.

Accepts either a full [IOperation](Interface.IOperation) or a simplified
[IOperationDefinition](Interface.IOperationDefinition) — only `commit` is required in the
simplified form. Missing fields are filled with sensible defaults.

#### Type Parameters

| Type Parameter |
| ------ |
| `TPayload` |
| `TResult` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`IOperationInput`](TypeAlias.IOperationInput)\<`TPayload`, `TResult`\> | The operation or definition to enqueue. |

#### Returns

`string`

The generated entry id.

***

### reject()

```ts
reject(entryId): void;
```

Defined in: [operation-queue/queue/OperationQueue.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L134)

Rejects and rolls back an operation entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entryId` | `string` | ID of the entry to reject. |

#### Returns

`void`

***

### retry()

```ts
retry(entryId): void;
```

Defined in: [operation-queue/queue/OperationQueue.ts:174](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/queue/OperationQueue.ts#L174)

Retries a failed operation entry by re-attempting the commit.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entryId` | `string` | ID of the entry to retry. |

#### Returns

`void`
