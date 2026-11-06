---
title: 'Class: ImageCropDialogComponent'
generated: true
editUrl: false
---
# Class: ImageCropDialogComponent

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L90)

Renders a localized dialog for selecting and encoding an image region.

## Constructors

### Constructor

```ts
new ImageCropDialogComponent(): ImageCropDialogComponent;
```

#### Returns

`ImageCropDialogComponent`

## Properties

### canApply

```ts
readonly canApply: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L112)

Indicates whether the current selection satisfies the configured size.

***

### cropError

```ts
readonly cropError: Signal<string | null>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L124)

Current crop error shown to the user.

***

### cropRequest

```ts
readonly cropRequest: Signal<number>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L132)

Monotonically increasing crop request.

***

### labels

```ts
readonly labels: IImageCropLabels;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L140)

Resolved user-visible dialog labels.

***

### minimumSelectionSize

```ts
readonly minimumSelectionSize: number;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L148)

Minimum accepted selection width and height.

***

### outputFileName

```ts
readonly outputFileName: string;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L156)

File name assigned to the encoded crop.

***

### previewUrl

```ts
readonly previewUrl: string;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L164)

Temporary browser URL rendering the source image.

***

### selection

```ts
readonly selection: Signal<IImageCropSelection | null>;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L172)

Current rendered-image selection.

## Methods

### apply()

```ts
protected apply(): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L192)

Requests encoding of the current selection.

#### Returns

`void`

***

### cancel()

```ts
protected cancel(): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L183)

Closes the dialog without a result.

#### Returns

`void`

***

### onCropError()

```ts
protected onCropError(): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L204)

Shows a localized error after crop encoding failed.

#### Returns

`void`

***

### onCropResult()

```ts
protected onCropResult(file): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:214](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L214)

Closes the dialog with the encoded crop.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `file` | `File` | Cropped PNG file. |

#### Returns

`void`

***

### onSelectionChange()

```ts
protected onSelectionChange(selection): void;
```

Defined in: [libs/ui/src/components/image-crop/ImageCropDialogComponent.ts:224](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/ImageCropDialogComponent.ts#L224)

Stores the normalized image selection.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `selection` | [`IImageCropSelection`](Interface.IImageCropSelection) | Current rendered-image rectangle. |

#### Returns

`void`
