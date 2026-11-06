---
title: 'Function: createImageCropSelection()'
generated: true
editUrl: false
---
# Function: createImageCropSelection()

```ts
function createImageCropSelection(origin, current): IImageCropSelection;
```

Defined in: [libs/ui/src/components/image-crop/createImageCropSelection.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/createImageCropSelection.ts#L16)

Creates a normalized rectangle independent of drag direction.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `origin` | [`IImageCropPoint`](Interface.IImageCropPoint) | Drag origin. |
| `current` | [`IImageCropPoint`](Interface.IImageCropPoint) | Current pointer position. |

## Returns

[`IImageCropSelection`](Interface.IImageCropSelection)

Pixel-based crop selection.
