---
title: 'Class: NoOperationMergePolicy'
generated: true
editUrl: false
---
# Class: NoOperationMergePolicy

Defined in: [operation-queue/policies/NoOperationMergePolicy.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/NoOperationMergePolicy.ts#L16)

Merge policy that never merges operations.
Every enqueued operation creates a new entry.

## Extends

- `OperationPolicy`\<`"merge"`\>

## Implements

- [`IOperationMergePolicy`](Interface.IOperationMergePolicy)

## Constructors

### Constructor

```ts
new NoOperationMergePolicy(): NoOperationMergePolicy;
```

Defined in: [operation-queue/policies/NoOperationMergePolicy.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/NoOperationMergePolicy.ts#L24)

Creates a new instance of the NoOperationMergePolicy class.

#### Returns

`NoOperationMergePolicy`

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
findMergeTarget(_entries, _operation):
  | IOperationEntry<unknown, unknown>
  | undefined;
```

Defined in: [operation-queue/policies/NoOperationMergePolicy.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/NoOperationMergePolicy.ts#L40)

Always returns `undefined` — no merge target is ever selected.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_entries` | readonly [`IOperationEntry`](Interface.IOperationEntry)\<`unknown`, `unknown`\>[] | Current queue entries (unused). |
| `_operation` | [`IOperation`](Interface.IOperation)\<`unknown`, `unknown`\> | Incoming operation (unused). |

#### Returns

  \| [`IOperationEntry`](Interface.IOperationEntry)\<`unknown`, `unknown`\>
  \| `undefined`

Always `undefined`.

#### Implementation of

[`IOperationMergePolicy`](Interface.IOperationMergePolicy).[`findMergeTarget`](Interface.IOperationMergePolicy#findmergetarget)
