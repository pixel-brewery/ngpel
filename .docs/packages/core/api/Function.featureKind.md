---
title: 'Function: featureKind()'
generated: true
editUrl: false
---
# Function: featureKind()

```ts
function featureKind<TKind>(name): FeatureKind<TKind>;
```

Defined in: [features/FeatureKind.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/FeatureKind.ts#L15)

Brands a plain string literal as a [FeatureKind](TypeAlias.FeatureKind). Co-located with the type because a
separate `featureKind.ts` would collide with `FeatureKind.ts` on case-insensitive file systems.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tkind"></a> `TKind` *extends* `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `TKind` | The kind name. |

## Returns

[`FeatureKind`](TypeAlias.FeatureKind)\<`TKind`\>
