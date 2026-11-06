---
title: 'Class: ImagePreviewDirective'
generated: true
editUrl: false
---
# Class: ImagePreviewDirective

Defined in: [libs/ui/src/components/image-preview/ImagePreviewDirective.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewDirective.ts#L20)

Opens image-bearing controls and elements in the shared image preview.

## Constructors

### Constructor

```ts
new ImagePreviewDirective(): ImagePreviewDirective;
```

#### Returns

`ImagePreviewDirective`

## Properties

### config

```ts
readonly config: InputSignal<IImagePreviewConfig>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewDirective.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewDirective.ts#L38)

Optional preview behavior overrides.

***

### preview

```ts
readonly preview: InputSignal<IImagePreviewImage | undefined>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewDirective.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewDirective.ts#L46)

Optional image metadata replacing values from the Mosaik control.

***

### previewDisabled

```ts
readonly previewDisabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewDirective.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewDirective.ts#L54)

Prevents the host image from opening the shared preview.

## Methods

### open()

```ts
open(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewDirective.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewDirective.ts#L66)

Opens the image represented by the host control.

#### Returns

`void`
