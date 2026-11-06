---
title: 'Type Alias: FeatureKind\<TName\>'
generated: true
editUrl: false
---
# Type Alias: FeatureKind\<TName\>

```ts
type FeatureKind<TName> = TName & {
  __brand: "FeatureKind";
};
```

Defined in: [features/FeatureKind.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/FeatureKind.ts#L6)

Represents a branded string for feature kinds to prevent accidental mixing of arbitrary strings.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `__brand` | `"FeatureKind"` | [features/FeatureKind.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/features/FeatureKind.ts#L6) |

## Type Parameters

| Type Parameter |
| ------ |
| `TName` *extends* `string` |
