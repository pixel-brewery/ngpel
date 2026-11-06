---
title: 'Interface: IOperationDefinition\<TPayload, TResult\>'
generated: true
editUrl: false
---
# Interface: IOperationDefinition\<TPayload, TResult\>

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L16)

Simplified operation definition. Only [IOperationDefinition.commit](#commit) is required;
all other fields are optional and filled with sensible defaults by the
[operation](Function.operation) factory.

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

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L43)

Optional override for the queue-level default delay in milliseconds.

***

### label?

```ts
readonly optional label?: string;
```

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L36)

Human-readable label shown in the UI countdown. Defaults to [type](#type).

***

### mergeKey?

```ts
readonly optional mergeKey?: string;
```

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L51)

Optional merge key. Operations sharing the same key may be coalesced
by the active merge policy.

***

### payload?

```ts
readonly optional payload?: TPayload;
```

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L29)

Input data passed to [commit](#commit) and [apply](#apply). Defaults to `undefined`.

***

### type?

```ts
readonly optional type?: string;
```

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L22)

Discriminator for operation type. Defaults to `"anonymous"`.

## Methods

### apply()?

```ts
optional apply(context): void;
```

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L60)

Called immediately when the operation is enqueued (optimistic side-effect).
Defaults to a no-op.

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

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L69)

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

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L87)

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

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L104)

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

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L95)

Optional hook called after a rollback completes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`

***

### rollback()?

```ts
optional rollback(context): void;
```

Defined in: [operation-queue/interfaces/IOperationDefinition.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/interfaces/IOperationDefinition.ts#L78)

Reverts the optimistic side-effect when the operation is rejected or rolled back.
Defaults to a no-op.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IOperationContext`](Interface.IOperationContext) | Runtime context for this entry. |

#### Returns

`void`
