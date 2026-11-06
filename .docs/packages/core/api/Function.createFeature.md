---
title: 'Function: createFeature()'
generated: true
editUrl: false
---
# Function: createFeature()

```ts
function createFeature<TKind>(
   id,
   kind,
   providers,
   options?
): IFeature<TKind>;
```

Defined in: [features/createFeature.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/createFeature.ts#L20)

Factory to create a typed feature from metadata and static providers.

## Type Parameters

| Type Parameter |
| ------ |
| `TKind` *extends* `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Stable unique id (within its kind). |
| `kind` | [`FeatureKind`](TypeAlias.FeatureKind)\<`TKind`\> | Kind discriminator (branded). |
| `providers` | readonly `Provider`[] | Providers contributed by the feature. |
| `options` | `Readonly`\<[`IFeatureOptions`](Interface.IFeatureOptions)\> | Composition options (defaults: { multi: false }). |

## Returns

[`IFeature`](Interface.IFeature)\<`TKind`\>

The created feature.
