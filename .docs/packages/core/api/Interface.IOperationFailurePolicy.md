---
title: 'Interface: IOperationFailurePolicy'
generated: true
editUrl: false
---
# Interface: IOperationFailurePolicy

Defined in: [operation-queue/policies/interfaces/IOperationFailurePolicy.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationFailurePolicy.ts#L13)

Policy invoked when OperationExecutor.commit throws.

## Extends

- [`IOperationPolicy`](Interface.IOperationPolicy)\<`"failure"`\>

## Properties

### kind

```ts
readonly kind: "failure";
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L18)

Policy category discriminator.

#### Inherited from

[`IOperationPolicy`](Interface.IOperationPolicy).[`kind`](Interface.IOperationPolicy#kind)

***

### name

```ts
readonly name: string;
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L25)

Machine-readable identifier for this policy.

#### Inherited from

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`name`](Interface.IOperationMergePolicy#name)

***

### priority

```ts
readonly priority: number;
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L32)

Ordering weight. Lower values execute first when multiple policies are composed.

#### Inherited from

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`priority`](Interface.IOperationMergePolicy#priority)

## Methods

### handle()

```ts
handle(entry, error): void;
```

Defined in: [operation-queue/policies/interfaces/IOperationFailurePolicy.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationFailurePolicy.ts#L21)

Handles a failed operation entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entry` | [`IOperationEntry`](Interface.IOperationEntry) | The entry that failed. |
| `error` | `unknown` | The error thrown by [IOperation.commit](Interface.IOperation#commit). |

#### Returns

`void`
