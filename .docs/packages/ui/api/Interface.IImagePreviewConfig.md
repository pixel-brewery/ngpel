---
title: 'Interface: IImagePreviewConfig'
generated: true
editUrl: false
---
# Interface: IImagePreviewConfig

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L13)

Configures image preview behavior and presentation.

## Properties

### backdropClosable?

```ts
readonly optional backdropClosable?: boolean;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L20)

Closes the preview when its backdrop is activated.

***

### closeOnNavigation?

```ts
readonly optional closeOnNavigation?: boolean;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L28)

Disposes the preview when Angular navigation begins.

***

### direction?

```ts
readonly optional direction?: Direction;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L36)

Text direction of the preview.

***

### keyboard?

```ts
readonly optional keyboard?: boolean;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L44)

Enables Escape and arrow-key controls.

***

### labels?

```ts
readonly optional labels?: Partial<IImagePreviewLabels>;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L52)

Accessible labels used by the viewer.

***

### maxZoom?

```ts
readonly optional maxZoom?: number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L60)

Maximum permitted zoom factor.

***

### minimumVisibleSize?

```ts
readonly optional minimumVisibleSize?: number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L68)

Minimum image width and height that must remain visible after dragging.

***

### minZoom?

```ts
readonly optional minZoom?: number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L76)

Minimum permitted zoom factor.

***

### rotation?

```ts
readonly optional rotation?: number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L84)

Initial clockwise rotation in degrees.

***

### zoom?

```ts
readonly optional zoom?: number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L100)

Initial zoom factor.

***

### zoomStep?

```ts
readonly optional zoomStep?: number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewConfig.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewConfig.ts#L92)

Amount added or removed by a zoom action.
