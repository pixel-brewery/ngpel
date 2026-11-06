---
title: 'Class: ImagePreviewService'
generated: true
editUrl: false
---
# Class: ImagePreviewService

Defined in: [libs/ui/src/components/image-preview/ImagePreviewService.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewService.ts#L32)

Opens images in a full-screen CDK overlay.

## Constructors

### Constructor

```ts
new ImagePreviewService(): ImagePreviewService;
```

#### Returns

`ImagePreviewService`

## Methods

### open()

```ts
open(
   images,
   config?,
   index?
): ImagePreviewRef;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewService.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewService.ts#L50)

Opens an image collection and returns its control reference.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `images` | readonly [`IImagePreviewImage`](Interface.IImagePreviewImage)[] | `undefined` | Images available in the viewer. |
| `config` | [`IImagePreviewConfig`](Interface.IImagePreviewConfig) | `{}` | Optional behavior and presentation overrides. |
| `index` | `number` | `0` | Initially selected image index. |

#### Returns

[`ImagePreviewRef`](Class.ImagePreviewRef)

Reference controlling the open preview.
