---
title: 'Class: ImagePreviewComponent'
generated: true
editUrl: false
---
# Class: ImagePreviewComponent

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:180](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L180)

Renders a keyboard-accessible overlay for zoomable images and playable videos.

## Constructors

### Constructor

```ts
new ImagePreviewComponent(): ImagePreviewComponent;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:194](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L194)

#### Returns

`ImagePreviewComponent`

## Properties

### canGoNext

```ts
readonly canGoNext: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L231)

Indicates whether another image follows the current image.

***

### canGoPrevious

```ts
readonly canGoPrevious: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:239](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L239)

Indicates whether another image precedes the current image.

***

### canZoomIn

```ts
readonly canZoomIn: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L247)

Indicates whether the image can be enlarged.

***

### canZoomOut

```ts
readonly canZoomOut: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L255)

Indicates whether the image can be reduced.

***

### currentImage

```ts
readonly currentImage: Signal<IImagePreviewImage>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:263](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L263)

Currently rendered image.

***

### labels

```ts
readonly labels: IImagePreviewLabels;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:271](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L271)

Resolved preview labels.

***

### position

```ts
readonly position: Signal<Point>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:279](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L279)

Current free-drag position.

***

### transform

```ts
readonly transform: Signal<string>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:287](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L287)

CSS transform applied to the current image.

## Methods

### close()

```ts
protected close(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:326](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L326)

Closes the preview explicitly.

#### Returns

`void`

***

### closeFromBackdrop()

```ts
protected closeFromBackdrop(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:336](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L336)

Closes the preview when the backdrop itself was activated.

#### Returns

`void`

***

### handleKeydown()

```ts
protected handleKeydown(event): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:349](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L349)

Handles image navigation keys inside the active preview.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `KeyboardEvent` | Keyboard event raised inside the preview. |

#### Returns

`void`

***

### next()

```ts
next(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:298](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L298)

Selects the next image when available.

#### Returns

`void`

***

### onDragEnded()

```ts
protected onDragEnded(event): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:371](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L371)

Stores the final free-drag position.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `CdkDragEnd` | Completed CDK drag event. |

#### Returns

`void`

***

### onDragStarted()

```ts
protected onDragStarted(event): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:399](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L399)

Remembers the last valid position before a drag begins.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `CdkDragStart` | Started CDK drag event. |

#### Returns

`void`

***

### previous()

```ts
previous(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:307](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L307)

Selects the previous image when available.

#### Returns

`void`

***

### rotateLeft()

```ts
protected rotateLeft(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:408](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L408)

Rotates the image counter-clockwise.

#### Returns

`void`

***

### rotateRight()

```ts
protected rotateRight(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:417](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L417)

Rotates the image clockwise.

#### Returns

`void`

***

### select()

```ts
select(index): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L317)

Selects an image by its zero-based index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Requested image index. |

#### Returns

`void`

***

### zoomIn()

```ts
protected zoomIn(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:426](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L426)

Enlarges the image by the configured step.

#### Returns

`void`

***

### zoomOut()

```ts
protected zoomOut(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:435](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L435)

Reduces the image by the configured step.

#### Returns

`void`
