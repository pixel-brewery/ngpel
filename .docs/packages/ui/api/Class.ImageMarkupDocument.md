---
title: 'Class: ImageMarkupDocument'
generated: true
editUrl: false
---
# Class: ImageMarkupDocument

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L18)

Framework-neutral immutable history for raster image markup operations.

## Constructors

### Constructor

```ts
new ImageMarkupDocument(historyLimit?): ImageMarkupDocument;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L37)

Creates an empty image markup history.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `historyLimit?` | `number` | `100` | Maximum number of undo snapshots retained. |

#### Returns

`ImageMarkupDocument`

## Accessors

### canRedo

#### Get Signature

```ts
get canRedo(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L81)

Indicates whether a redo snapshot exists.

##### Returns

`boolean`

***

### canUndo

#### Get Signature

```ts
get canUndo(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L71)

Indicates whether an undo snapshot exists.

##### Returns

`boolean`

***

### cropSelection

#### Get Signature

```ts
get cropSelection():
  | IImageMarkupCropSelection
  | null;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L61)

Current crop rectangle, or `null` when the full source image is retained.

##### Returns

  \| [`IImageMarkupCropSelection`](Interface.IImageMarkupCropSelection)
  \| `null`

***

### hasChanges

#### Get Signature

```ts
get hasChanges(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L91)

Indicates whether the document contains crop or markup edits.

##### Returns

`boolean`

***

### operations

#### Get Signature

```ts
get operations(): readonly IImageMarkupOperation[];
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L51)

Current immutable operation sequence.

##### Returns

readonly [`IImageMarkupOperation`](Interface.IImageMarkupOperation)[]

## Methods

### clear()

```ts
clear(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L141)

Removes all crop and markup edits while retaining an undo snapshot.

#### Returns

`boolean`

Whether the document changed.

***

### commit()

```ts
commit(operation): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L105)

Commits one immutable markup operation and invalidates redo history.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operation` | [`IImageMarkupOperation`](Interface.IImageMarkupOperation) | Operation to append. |

#### Returns

`void`

***

### redo()

```ts
redo(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L178)

Reapplies the next immutable snapshot.

#### Returns

`boolean`

Whether a snapshot was reapplied.

***

### reset()

```ts
reset(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L195)

Discards all edits and history for a new source image.

#### Returns

`void`

***

### setCropSelection()

```ts
setCropSelection(selection): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L122)

Replaces the optional crop rectangle as one reversible history step.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `selection` | \| [`IImageMarkupCropSelection`](Interface.IImageMarkupCropSelection) \| `null` | Source-image rectangle, or `null` to keep the complete image. |

#### Returns

`boolean`

Whether the document changed.

***

### undo()

```ts
undo(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupDocument.ts#L160)

Restores the previous immutable snapshot.

#### Returns

`boolean`

Whether a snapshot was restored.
