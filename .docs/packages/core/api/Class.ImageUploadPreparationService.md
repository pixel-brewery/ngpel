---
title: 'Class: ImageUploadPreparationService'
generated: true
editUrl: false
---
# Class: ImageUploadPreparationService

Defined in: [browser/media/ImageUploadPreparationService.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/ImageUploadPreparationService.ts#L21)

Prepares a browser-selected image for upload. Files within the byte limit retain their bytes and name.

## Constructors

### Constructor

```ts
new ImageUploadPreparationService(): ImageUploadPreparationService;
```

#### Returns

`ImageUploadPreparationService`

## Methods

### prepare()

```ts
prepare(
   source,
   originalName,
   options
): Promise<File>;
```

Defined in: [browser/media/ImageUploadPreparationService.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/ImageUploadPreparationService.ts#L39)

Preserves small images and resizes and encodes oversized images as WebP.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `Blob` | Image data selected by the user. |
| `originalName` | `string` | Name to use for a blob or to derive a WebP file name from. |
| `options` | [`IImageUploadPreparationOptions`](Interface.IImageUploadPreparationOptions) | Byte limit and dimension limits for re-encoding. |

#### Returns

`Promise`\<`File`\>

The prepared file.
