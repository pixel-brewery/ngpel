---
title: 'Interface: IImageCropConfig'
generated: true
editUrl: false
---
# Interface: IImageCropConfig

Defined in: [libs/ui/src/components/image-crop/IImageCropConfig.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropConfig.ts#L12)

Optional behavior and presentation overrides for an image crop dialog.

## Properties

### labels?

```ts
readonly labels?: Partial<IImageCropLabels>;
```

Defined in: [libs/ui/src/components/image-crop/IImageCropConfig.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropConfig.ts#L21)

User-visible text overrides.

***

### minimumSelectionSize?

```ts
readonly minimumSelectionSize?: number;
```

Defined in: [libs/ui/src/components/image-crop/IImageCropConfig.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropConfig.ts#L29)

Minimum accepted width and height in rendered pixels.

***

### outputFileName?

```ts
readonly outputFileName?: string;
```

Defined in: [libs/ui/src/components/image-crop/IImageCropConfig.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropConfig.ts#L37)

File name assigned to the resulting PNG image.
