---
title: 'Class: KeepOptimisticOnFailurePolicy'
generated: true
editUrl: false
---
# Class: KeepOptimisticOnFailurePolicy

Defined in: [operation-queue/policies/KeepOptimisticOnFailurePolicy.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/KeepOptimisticOnFailurePolicy.ts#L15)

Failure policy that intentionally does nothing.
The operation remains in its optimistic state after a failure.

## Extends

- `OperationPolicy`\<`"failure"`\>

## Implements

- [`IOperationFailurePolicy`](Interface.IOperationFailurePolicy)

## Constructors

### Constructor

```ts
new KeepOptimisticOnFailurePolicy(): KeepOptimisticOnFailurePolicy;
```

Defined in: [operation-queue/policies/KeepOptimisticOnFailurePolicy.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/KeepOptimisticOnFailurePolicy.ts#L23)

Creates a new instance of the KeepOptimisticOnFailurePolicy class.

#### Returns

`KeepOptimisticOnFailurePolicy`

#### Overrides

```ts
OperationPolicy<'failure'>.constructor
```

## Properties

### kind

```ts
readonly kind: "failure";
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L20)

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`kind`](Interface.IOperationFailurePolicy#kind)

#### Inherited from

```ts
OperationPolicy.kind
```

***

### name

```ts
readonly name: string;
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L25)

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`name`](Interface.IOperationFailurePolicy#name)

#### Inherited from

[`NoOperationMergePolicy`](Class.NoOperationMergePolicy).[`name`](Class.NoOperationMergePolicy#name)

***

### priority

```ts
readonly priority: number;
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L30)

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`priority`](Interface.IOperationFailurePolicy#priority)

#### Inherited from

[`NoOperationMergePolicy`](Class.NoOperationMergePolicy).[`priority`](Class.NoOperationMergePolicy#priority)

## Methods

### handle()

```ts
handle(_entry, _error): void;
```

Defined in: [operation-queue/policies/KeepOptimisticOnFailurePolicy.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/KeepOptimisticOnFailurePolicy.ts#L38)

No-op handler — keeps the optimistic state intact.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_entry` | [`IOperationEntry`](Interface.IOperationEntry) | The failed entry (unused). |
| `_error` | `unknown` | The captured error (unused). |

#### Returns

`void`

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`handle`](Interface.IOperationFailurePolicy#handle)
