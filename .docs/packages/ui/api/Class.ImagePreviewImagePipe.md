---
title: 'Class: ImagePreviewImagePipe'
generated: true
editUrl: false
---
# Class: ImagePreviewImagePipe

Defined in: [libs/ui/src/components/image-preview/ImagePreviewImagePipe.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewImagePipe.ts#L16)

Converts image source strings into image preview descriptors.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new ImagePreviewImagePipe(): ImagePreviewImagePipe;
```

#### Returns

`ImagePreviewImagePipe`

## Methods

### transform()

#### Call Signature

```ts
transform(value): IImagePreviewImage;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewImagePipe.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewImagePipe.ts#L26)

Converts one source or a source collection.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | Image source or sources to convert. |

##### Returns

[`IImagePreviewImage`](Interface.IImagePreviewImage)

Matching image preview descriptor or descriptors.

##### Implementation of

`PipeTransform.transform`

#### Call Signature

```ts
transform(value): readonly IImagePreviewImage[];
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewImagePipe.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewImagePipe.ts#L27)

Converts one source or a source collection.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | readonly `string`[] | Image source or sources to convert. |

##### Returns

readonly [`IImagePreviewImage`](Interface.IImagePreviewImage)[]

Matching image preview descriptor or descriptors.

##### Implementation of

`PipeTransform.transform`
