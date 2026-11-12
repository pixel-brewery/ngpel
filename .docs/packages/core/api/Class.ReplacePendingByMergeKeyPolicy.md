---
title: 'Class: ReplacePendingByMergeKeyPolicy'
generated: true
editUrl: false
---
# Class: ReplacePendingByMergeKeyPolicy

Defined in: [operation-queue/policies/ReplacePendingByMergeKeyPolicy.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/ReplacePendingByMergeKeyPolicy.ts#L15)

Merge policy that replaces the first pending entry sharing the same [IOperation.mergeKey](Interface.IOperation#mergekey).

## Extends

- `OperationPolicy`\<`"merge"`\>

## Implements

- [`IOperationMergePolicy`](Interface.IOperationMergePolicy)

## Constructors

### Constructor

```ts
new ReplacePendingByMergeKeyPolicy(): ReplacePendingByMergeKeyPolicy;
```

Defined in: [operation-queue/policies/ReplacePendingByMergeKeyPolicy.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/ReplacePendingByMergeKeyPolicy.ts#L23)

Creates a new instance of the ReplacePendingByMergeKeyPolicy class.

#### Returns

`ReplacePendingByMergeKeyPolicy`

#### Overrides

`OperationPolicy<'merge'>.constructor`

## Properties

### kind

```ts
readonly kind: "merge";
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L20)

#### Implementation of

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`kind`](Interface.IOperationMergePolicy#kind)

#### Inherited from

`OperationPolicy.kind`

***

### name

```ts
readonly name: string;
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L25)

#### Implementation of

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`name`](Interface.IOperationMergePolicy#name)

#### Inherited from

`OperationPolicy.name`

***

### priority

```ts
readonly priority: number;
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L30)

#### Implementation of

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`priority`](Interface.IOperationMergePolicy#priority)

#### Inherited from

`OperationPolicy.priority`

## Methods

### findMergeTarget()

```ts
findMergeTarget(entries, operation):
  | IOperationEntry<unknown, unknown>
  | undefined;
```

Defined in: [operation-queue/policies/ReplacePendingByMergeKeyPolicy.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/ReplacePendingByMergeKeyPolicy.ts#L39)

Finds the first pending entry whose merge key matches the incoming operation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entries` | readonly [`IOperationEntry`](Interface.IOperationEntry)\<`unknown`, `unknown`\>[] | Current queue entries. |
| `operation` | [`IOperation`](Interface.IOperation)\<`unknown`, `unknown`\> | Incoming operation. |

#### Returns

  \| [`IOperationEntry`](Interface.IOperationEntry)\<`unknown`, `unknown`\>
  \| `undefined`

The matching pending entry, or `undefined` if none found.

#### Implementation of

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`findMergeTarget`](Interface.IOperationMergePolicy#findmergetarget)
