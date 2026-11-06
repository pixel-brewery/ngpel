---
title: 'Function: validateFeatures()'
generated: true
editUrl: false
---
# Function: validateFeatures()

```ts
function validateFeatures<TKind>(features, rules?): void;
```

Defined in: [features/validateFeatures.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/validateFeatures.ts#L18)

Validates a set of features:
 1) Non-multi kinds may appear at most once.
 2) IDs must be unique within the same kind.
 3) Optional incompatibility rules must not be violated.

## Type Parameters

| Type Parameter |
| ------ |
| `TKind` *extends* `string` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `features` | readonly [`IFeature`](Interface.IFeature)\<`TKind`\>[] | `undefined` | Features to validate. |
| `rules` | readonly [`IFeatureIncompatibilityRule`](Interface.IFeatureIncompatibilityRule)\<`TKind`\>[] | `[]` | Optional incompatibility rules. |

## Returns

`void`
