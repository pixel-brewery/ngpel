---
title: 'Interface: IFeatureIncompatibilityRule\<TKind\>'
generated: true
editUrl: false
---
# Interface: IFeatureIncompatibilityRule\<TKind\>

Defined in: [features/IFeatureIncompatibilityRule.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeatureIncompatibilityRule.ts#L14)

Describes an incompatibility rule between features.
If `isViolated()` returns true, composition must fail fast with `message`.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TKind` *extends* `string` | Kind union used across your system. |

## Properties

### id

```ts
readonly id: string;
```

Defined in: [features/IFeatureIncompatibilityRule.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeatureIncompatibilityRule.ts#L20)

Stable identifier of the rule, used in the thrown error message.

***

### message

```ts
readonly message: string;
```

Defined in: [features/IFeatureIncompatibilityRule.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeatureIncompatibilityRule.ts#L25)

Human-readable explanation of the incompatibility.

## Methods

### isViolated()

```ts
isViolated(features): boolean;
```

Defined in: [features/IFeatureIncompatibilityRule.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/IFeatureIncompatibilityRule.ts#L34)

Evaluates the rule against the complete feature set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `features` | readonly [`IFeature`](Interface.IFeature)\<`TKind`\>[] |

#### Returns

`boolean`
