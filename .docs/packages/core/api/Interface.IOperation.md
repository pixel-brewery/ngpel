---
title: 'Interface: IOperation\<TPayload, TResult\>'
generated: true
editUrl: false
---
# Interface: IOperation\<TPayload, TResult\>

Defined in: [operation-queue/interfaces/IOperation.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L14)

Contract for a queued operation that can apply, commit, and rollback.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPayload` | - | The input data required by the operation. |
| `TResult` | `void` | The result produced by a successful commit. |

## Properties

### delayInMilliseconds?

```ts
readonly optional delayInMilliseconds?: number;
```

Defined in: [operation-queue/interfaces/IOperation.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L41)

Optional override for the queue-level default delay in milliseconds.

***

### label

```ts
readonly label: string;
```

Defined in: [operation-queue/interfaces/IOperation.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L34)

Human-readable label shown in the UI countdown.

***

### mergeKey?

```ts
readonly optional mergeKey?: string;
```

Defined in: [operation-queue/interfaces/IOperation.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L49)

Optional merge key. Operations sharing the same key may be coalesced
by the active [IOperationMergePolicy](Interface.IOperationMergePolicy).

***

### payload

```ts
readonly payload: TPayload;
```

Defined in: [operation-queue/interfaces/IOperation.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L27)

Input data passed to [commit](#commit) and [apply](#apply).

***

### type

```ts
readonly type: string;
```

Defined in: [operation-queue/interfaces/IOperation.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L20)

Discriminator for operation type (e.g. `"create-user"`, `"send-email"`).

## Methods

### apply()

```ts
apply(context): void;
```

Defined in: [operation-queue/interfaces/IOperation.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L57)

Called immediately when the operation is enqueued (optimistic side-effect).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`

***

### commit()

```ts
commit(context): Promise<TResult>;
```

Defined in: [operation-queue/interfaces/IOperation.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L66)

Performs the server-side mutation. Resolves on success, rejects on failure.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`Promise`\<`TResult`\>

The result of a successful commit.

***

### onCommitted()?

```ts
optional onCommitted(result, context): void;
```

Defined in: [operation-queue/interfaces/IOperation.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L83)

Optional hook called after a successful commit.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | `TResult` | The value returned by [commit](#commit). |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`

***

### onFailed()?

```ts
optional onFailed(error, context): void;
```

Defined in: [operation-queue/interfaces/IOperation.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L100)

Optional hook called when [commit](#commit) throws.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | `unknown` | The error thrown by [commit](#commit). |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`

***

### onRejected()?

```ts
optional onRejected(context): void;
```

Defined in: [operation-queue/interfaces/IOperation.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L91)

Optional hook called after a rollback completes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`

***

### rollback()

```ts
rollback(context): void;
```

Defined in: [operation-queue/interfaces/IOperation.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperation.ts#L74)

Reverts the optimistic side-effect when the operation is rejected or rolled back.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`
