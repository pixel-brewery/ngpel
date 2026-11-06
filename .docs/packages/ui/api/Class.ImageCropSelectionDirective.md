---
title: 'Class: ImageCropSelectionDirective'
generated: true
editUrl: false
---
# Class: ImageCropSelectionDirective

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L18)

Coordinates pointer selection and renders a selected image region to a PNG file.

## Constructors

### Constructor

```ts
new ImageCropSelectionDirective(): ImageCropSelectionDirective;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L37)

Connects crop requests to the current selection.

#### Returns

`ImageCropSelectionDirective`

## Properties

### cropError

```ts
readonly cropError: OutputEmitterRef<Error>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L94)

Emits failures raised while decoding or encoding the crop.

***

### cropRequest

```ts
readonly cropRequest: InputSignal<number>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L62)

Monotonically increasing value that requests the current selection as a file.

***

### cropResult

```ts
readonly cropResult: OutputEmitterRef<File>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L102)

Emits the cropped PNG file.

***

### minimumSelectionSize

```ts
readonly minimumSelectionSize: InputSignal<number>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L70)

Minimum accepted selection width and height in rendered pixels.

***

### outputFileName

```ts
readonly outputFileName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L78)

Name assigned to the emitted PNG file.

***

### selectionChange

```ts
readonly selectionChange: OutputEmitterRef<IImageCropSelection>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L110)

Emits the normalized selection whenever pointer movement changes it.

***

### sourceImage

```ts
readonly sourceImage: InputSignal<HTMLImageElement>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L86)

Image element used as the crop source.

## Methods

### onPointerDown()

```ts
protected onPointerDown(event): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L123)

Begins a selection from the active pointer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `PointerEvent` | Pointer event raised on the crop surface. |

#### Returns

`void`

***

### onPointerMove()

```ts
protected onPointerMove(event): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L144)

Updates the active selection.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `PointerEvent` | Pointer event raised on the crop surface. |

#### Returns

`void`

***

### onPointerUp()

```ts
protected onPointerUp(event): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropSelectionDirective.ts#L162)

Completes or cancels the active selection.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `PointerEvent` | Pointer event raised on the crop surface. |

#### Returns

`void`
