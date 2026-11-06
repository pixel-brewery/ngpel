---
title: 'Class: ImagePreviewComponent'
generated: true
editUrl: false
---
# Class: ImagePreviewComponent

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L148)

Renders a keyboard-accessible, zoomable and draggable image overlay.

## Constructors

### Constructor

```ts
new ImagePreviewComponent(): ImagePreviewComponent;
```

#### Returns

`ImagePreviewComponent`

## Properties

### canGoNext

```ts
readonly canGoNext: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L167)

Indicates whether another image follows the current image.

***

### canGoPrevious

```ts
readonly canGoPrevious: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L175)

Indicates whether another image precedes the current image.

***

### canZoomIn

```ts
readonly canZoomIn: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L183)

Indicates whether the image can be enlarged.

***

### canZoomOut

```ts
readonly canZoomOut: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L191)

Indicates whether the image can be reduced.

***

### currentImage

```ts
readonly currentImage: Signal<IImagePreviewImage>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L199)

Currently rendered image.

***

### labels

```ts
readonly labels: IImagePreviewLabels;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L207)

Resolved preview labels.

***

### position

```ts
readonly position: Signal<Point>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:215](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L215)

Current free-drag position.

***

### transform

```ts
readonly transform: Signal<string>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:223](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L223)

CSS transform applied to the current image.

## Methods

### close()

```ts
protected close(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L262)

Closes the preview explicitly.

#### Returns

`void`

***

### closeFromBackdrop()

```ts
protected closeFromBackdrop(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:272](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L272)

Closes the preview when the backdrop itself was activated.

#### Returns

`void`

***

### handleKeydown()

```ts
protected handleKeydown(event): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L285)

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

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:234](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L234)

Selects the next image when available.

#### Returns

`void`

***

### onDragEnded()

```ts
protected onDragEnded(event): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:307](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L307)

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

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L330)

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

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:243](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L243)

Selects the previous image when available.

#### Returns

`void`

***

### rotateLeft()

```ts
protected rotateLeft(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:339](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L339)

Rotates the image counter-clockwise.

#### Returns

`void`

***

### rotateRight()

```ts
protected rotateRight(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:348](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L348)

Rotates the image clockwise.

#### Returns

`void`

***

### select()

```ts
select(index): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L253)

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

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L357)

Enlarges the image by the configured step.

#### Returns

`void`

***

### zoomOut()

```ts
protected zoomOut(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewComponent.ts:366](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewComponent.ts#L366)

Reduces the image by the configured step.

#### Returns

`void`
