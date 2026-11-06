---
title: 'Variable: MediaUrlFeatureKinds'
generated: true
editUrl: false
---
# Variable: MediaUrlFeatureKinds

```ts
const MediaUrlFeatureKinds: {
  Origin: FeatureKind<"origin">;
};
```

Defined in: [browser/media/MediaUrlFeatureKind.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MediaUrlFeatureKind.ts#L21)

The branded kind vocabulary of the media entry point, exposed so products can contribute their
own origin features (for example a tenant-aware origin) that still conflict with `withApiOrigin()`.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-origin"></a> `Origin` | [`FeatureKind`](TypeAlias.FeatureKind)\<`"origin"`\> | [browser/media/MediaUrlFeatureKind.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MediaUrlFeatureKind.ts#L22) |
