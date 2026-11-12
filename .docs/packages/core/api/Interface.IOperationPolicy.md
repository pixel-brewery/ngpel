---
title: 'Interface: IOperationPolicy\<TKind\>'
generated: true
editUrl: false
---
# Interface: IOperationPolicy\<TKind\>

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L12)

Base contract for all operation policies.

## Extended by

- [`IOperationFailurePolicy`](Interface.IOperationFailurePolicy)
- [`IOperationMergePolicy`](Interface.IOperationMergePolicy)

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tkind"></a> `TKind` *extends* [`OperationPolicyKind`](TypeAlias.OperationPolicyKind) | [`OperationPolicyKind`](TypeAlias.OperationPolicyKind) | The policy category this policy belongs to. |

## Properties

### kind

```ts
readonly kind: TKind;
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L18)

Policy category discriminator.

***

### name

```ts
readonly name: string;
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L25)

Machine-readable identifier for this policy.

***

### priority

```ts
readonly priority: number;
```

Defined in: [operation-queue/policies/interfaces/IOperationPolicy.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/policies/interfaces/IOperationPolicy.ts#L32)

Ordering weight. Lower values execute first when multiple policies are composed.
