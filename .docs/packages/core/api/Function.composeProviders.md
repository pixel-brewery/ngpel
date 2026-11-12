---
title: 'Function: composeProviders()'
generated: true
editUrl: false
---
# Function: composeProviders()

```ts
function composeProviders<TKind>(
   base,
   features,
   rules?
): Provider[];
```

Defined in: [features/composeProviders.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/composeProviders.ts#L19)

Composes base providers with validated feature providers.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tkind"></a> `TKind` *extends* `string` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `base` | readonly `Provider`[] | `undefined` | Base providers of a runtime (e.g., a service). |
| `features` | readonly [`IFeature`](Interface.IFeature)\<`TKind`\>[] | `undefined` | Features contributing providers. |
| `rules?` | readonly [`IFeatureIncompatibilityRule`](Interface.IFeatureIncompatibilityRule)\<`TKind`\>[] | `[]` | Optional incompatibility rules. |

## Returns

`Provider`[]

Combined provider array for Angular DI.
