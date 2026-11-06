---
title: 'Class: ImageCropService'
generated: true
editUrl: false
---
# Class: ImageCropService

Defined in: [libs/ui/src/components/image-crop/ImageCropService.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropService.ts#L29)

Opens image files in the reusable crop dialog and manages temporary browser resources.

## Constructors

### Constructor

```ts
new ImageCropService(): ImageCropService;
```

#### Returns

`ImageCropService`

## Methods

### open()

```ts
open(file, config?): IImageCropRef;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropService.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropService.ts#L52)

Opens an image for rectangular cropping.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `file` | `File` | Source image file. |
| `config` | [`IImageCropConfig`](Interface.IImageCropConfig) | Optional behavior and label overrides. |

#### Returns

[`IImageCropRef`](Interface.IImageCropRef)

Reference to the opened crop dialog.
