---
title: 'Class: RollbackOnFailurePolicy'
generated: true
editUrl: false
---
# Class: RollbackOnFailurePolicy

Defined in: [operation-queue/policies/RollbackOnFailurePolicy.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/RollbackOnFailurePolicy.ts#L16)

Failure policy that rolls back the failed operation via OperationExecutor.rollback.

## Extends

- `OperationPolicy`\<`"failure"`\>

## Implements

- [`IOperationFailurePolicy`](Interface.IOperationFailurePolicy)

## Constructors

### Constructor

```ts
new RollbackOnFailurePolicy(): RollbackOnFailurePolicy;
```

Defined in: [operation-queue/policies/RollbackOnFailurePolicy.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/RollbackOnFailurePolicy.ts#L30)

Creates a new instance of the RollbackOnFailurePolicy class.

#### Returns

`RollbackOnFailurePolicy`

#### Overrides

`OperationPolicy<'failure'>.constructor`

## Properties

### kind

```ts
readonly kind: "failure";
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L20)

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`kind`](Interface.IOperationFailurePolicy#kind)

#### Inherited from

`OperationPolicy.kind`

***

### name

```ts
readonly name: string;
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L25)

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`name`](Interface.IOperationFailurePolicy#name)

#### Inherited from

`OperationPolicy.name`

***

### priority

```ts
readonly priority: number;
```

Defined in: [operation-queue/policies/abstracts/OperationPolicyBase.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/abstracts/OperationPolicyBase.ts#L30)

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`priority`](Interface.IOperationFailurePolicy#priority)

#### Inherited from

`OperationPolicy.priority`

## Methods

### handle()

```ts
handle(entry, _error): void;
```

Defined in: [operation-queue/policies/RollbackOnFailurePolicy.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/RollbackOnFailurePolicy.ts#L45)

Triggers a rollback for the failed entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entry` | [`IOperationEntry`](Interface.IOperationEntry) | The entry to roll back. |
| `_error` | `unknown` | The captured error (unused). |

#### Returns

`void`

#### Implementation of

[`IOperationFailurePolicy`](Interface.IOperationFailurePolicy).[`handle`](Interface.IOperationFailurePolicy#handle)
