---
title: 'Interface: IOperationMergePolicy'
generated: true
editUrl: false
---
# Interface: IOperationMergePolicy

Defined in: [operation-queue/policies/interfaces/IOperationMergePolicy.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationMergePolicy.ts#L14)

Policy responsible for finding a merge target when a new operation is enqueued.

## Extends

- [`IOperationPolicy`](Interface.IOperationPolicy)\<`"merge"`\>

## Properties

### kind

```ts
readonly kind: "merge";
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

[`IOperationPolicy`](Interface.IOperationPolicy).[`name`](Interface.IOperationPolicy#name)

***

### priority

```ts
readonly priority: number;
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L32)

Ordering weight. Lower values execute first when multiple policies are composed.

#### Inherited from

[`IOperationPolicy`](Interface.IOperationPolicy).[`priority`](Interface.IOperationPolicy#priority)

## Methods

### findMergeTarget()

```ts
findMergeTarget(entries, operation):
  | IOperationEntry<unknown, unknown>
  | undefined;
```

Defined in: [operation-queue/policies/interfaces/IOperationMergePolicy.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationMergePolicy.ts#L24)

Returns the existing entry that should be replaced by the incoming operation,
or `undefined` if no merge should occur.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entries` | readonly [`IOperationEntry`](Interface.IOperationEntry)\<`unknown`, `unknown`\>[] | Current entries in the queue. |
| `operation` | [`IOperation`](Interface.IOperation)\<`unknown`, `unknown`\> | The operation about to be enqueued. |

#### Returns

  \| [`IOperationEntry`](Interface.IOperationEntry)\<`unknown`, `unknown`\>
  \| `undefined`

The entry to replace, or `undefined`.
