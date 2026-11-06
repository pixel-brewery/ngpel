---
title: 'Function: composeWithBase()'
generated: true
editUrl: false
---
# Function: composeWithBase()

```ts
function composeWithBase<TKind>(
   base,
   features,
   rules?
): Provider[];
```

Defined in: [features/composeWithBase.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/composeWithBase.ts#L18)

Convenience to compose a **single** base provider with features.

## Type Parameters

| Type Parameter |
| ------ |
| `TKind` *extends* `string` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `base` | `Provider` | `undefined` | Single base provider instance. |
| `features` | readonly [`IFeature`](Interface.IFeature)\<`TKind`\>[] | `undefined` | Features contributing providers. |
| `rules` | readonly [`IFeatureIncompatibilityRule`](Interface.IFeatureIncompatibilityRule)\<`TKind`\>[] | `[]` | Optional incompatibility rules. |

## Returns

`Provider`[]
