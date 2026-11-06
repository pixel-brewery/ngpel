---
title: 'Class: ImagePreviewState'
generated: true
editUrl: false
---
# Class: ImagePreviewState

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L15)

Owns the reactive state of one image preview instance.

## Constructors

### Constructor

```ts
new ImagePreviewState(data): ImagePreviewState;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L34)

Constructs preview state from resolved data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `Omit`\<`IImagePreviewData`, `"state"`\> | Resolved preview data. |

#### Returns

`ImagePreviewState`

## Properties

### canGoNext

```ts
readonly canGoNext: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L51)

Indicates whether another image follows the current image.

***

### canGoPrevious

```ts
readonly canGoPrevious: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L59)

Indicates whether another image precedes the current image.

***

### canZoomIn

```ts
readonly canZoomIn: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:67](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L67)

Indicates whether the image can be enlarged.

***

### canZoomOut

```ts
readonly canZoomOut: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L75)

Indicates whether the image can be reduced.

***

### currentImage

```ts
readonly currentImage: Signal<IImagePreviewImage>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L83)

Currently rendered image.

***

### position

```ts
readonly position: Signal<Point>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L91)

Current free-drag position.

***

### transform

```ts
readonly transform: Signal<string>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L99)

CSS transform applied to the current image.

## Methods

### next()

```ts
next(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L110)

Selects the next image when available.

#### Returns

`void`

***

### previous()

```ts
previous(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L122)

Selects the previous image when available.

#### Returns

`void`

***

### rotateLeft()

```ts
rotateLeft(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L134)

Rotates the image counter-clockwise.

#### Returns

`void`

***

### rotateRight()

```ts
rotateRight(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L143)

Rotates the image clockwise.

#### Returns

`void`

***

### select()

```ts
select(index): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L153)

Selects an image by its zero-based index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Requested image index. |

#### Returns

`void`

***

### setPosition()

```ts
setPosition(position): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L167)

Stores the final free-drag position.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `position` | `Point` | Final CDK free-drag position. |

#### Returns

`void`

***

### zoomIn()

```ts
zoomIn(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L176)

Enlarges the image by the configured step.

#### Returns

`void`

***

### zoomOut()

```ts
zoomOut(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewState.ts:188](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewState.ts#L188)

Reduces the image by the configured step.

#### Returns

`void`
