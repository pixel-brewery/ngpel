---
title: 'Class: ImageMarkupEditorService'
generated: true
editUrl: false
---
# Class: ImageMarkupEditorService

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorService.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorService.ts#L63)

Opens image files in the framework-neutral raster markup editor.

## Constructors

### Constructor

```ts
new ImageMarkupEditorService(): ImageMarkupEditorService;
```

#### Returns

`ImageMarkupEditorService`

## Methods

### open()

```ts
open(file, config?): IImageMarkupEditorRef;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorService.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorService.ts#L86)

Opens a source image for non-destructive raster markup.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `file` | `File` | Source image file. |
| `config?` | [`IImageMarkupEditorConfig`](Interface.IImageMarkupEditorConfig) | Optional behavior and label overrides. |

#### Returns

[`IImageMarkupEditorRef`](Interface.IImageMarkupEditorRef)

Reference to the opened markup editor.
