---
title: 'Class: ImagePreviewGroupDirective'
generated: true
editUrl: false
---
# Class: ImagePreviewGroupDirective

Defined in: [libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts#L20)

Opens descendant Mosaik image controls as one navigable preview collection.

## Constructors

### Constructor

```ts
new ImagePreviewGroupDirective(): ImagePreviewGroupDirective;
```

#### Returns

`ImagePreviewGroupDirective`

## Properties

### config

```ts
readonly config: InputSignal<IImagePreviewConfig>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts#L36)

Optional preview behavior overrides.

***

### ngpImagePreviewGroup

```ts
readonly ngpImagePreviewGroup: InputSignal<
  | readonly IImagePreviewImage[]
| undefined>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts#L44)

Optional image collection replacing descendant Mosaik image metadata.

## Methods

### openClickedImage()

```ts
protected openClickedImage(event): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewGroupDirective.ts#L57)

Opens the clicked descendant image and its siblings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `MouseEvent` | Bubbling group click event. |

#### Returns

`void`
