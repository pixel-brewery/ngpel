---
title: 'Class: ImagePreviewRef'
generated: true
editUrl: false
---
# Class: ImagePreviewRef

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L15)

Controls one open image preview.

## Constructors

### Constructor

```ts
new ImagePreviewRef(dialogRef, state): ImagePreviewRef;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L32)

Constructs an image preview reference.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dialogRef` | `IDialogRef`\<`IImagePreviewData`\> | Owning Mosaik dialog reference. |
| `state` | [`ImagePreviewState`](Class.ImagePreviewState) | Reactive preview state. |

#### Returns

`ImagePreviewRef`

## Properties

### closed

```ts
readonly closed: Observable<void>;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L48)

Emits once after the preview is disposed.

## Methods

### close()

```ts
close(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L59)

Disposes the preview.

#### Returns

`void`

***

### next()

```ts
next(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L68)

Selects the next image.

#### Returns

`void`

***

### previous()

```ts
previous(): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L77)

Selects the previous image.

#### Returns

`void`

***

### select()

```ts
select(index): void;
```

Defined in: [libs/ui/src/components/image-preview/ImagePreviewRef.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/ImagePreviewRef.ts#L87)

Selects an image by its zero-based index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Requested image index. |

#### Returns

`void`
