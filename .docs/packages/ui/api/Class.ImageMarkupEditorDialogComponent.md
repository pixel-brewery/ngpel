---
title: 'Class: ImageMarkupEditorDialogComponent'
generated: true
editUrl: false
---
# Class: ImageMarkupEditorDialogComponent

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:710](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L710)

Renders the localized, feature-neutral image markup editor dialog.

## Constructors

### Constructor

```ts
new ImageMarkupEditorDialogComponent(): ImageMarkupEditorDialogComponent;
```

#### Returns

`ImageMarkupEditorDialogComponent`

## Properties

### activeOption

```ts
protected readonly activeOption: Signal<ImageMarkupEditorOptionValue | null>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:841](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L841)

Current contextual option level.

***

### activeTool

```ts
protected readonly activeTool: Signal<ImageMarkupToolValue>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:833](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L833)

Current editor tool.

***

### availableOptions

```ts
protected readonly availableOptions: {
  COLOR: "color";
  FONT_SIZE: "font-size";
  STROKE_WIDTH: "stroke-width";
  SYMBOL: "symbol";
  TEXT: "text";
} = ImageMarkupEditorOption;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:793](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L793)

Contextual option constants available to the template.

#### COLOR

```ts
readonly COLOR: "color" = 'color';
```

#### FONT\_SIZE

```ts
readonly FONT_SIZE: "font-size" = 'font-size';
```

#### STROKE\_WIDTH

```ts
readonly STROKE_WIDTH: "stroke-width" = 'stroke-width';
```

#### SYMBOL

```ts
readonly SYMBOL: "symbol" = 'symbol';
```

#### TEXT

```ts
readonly TEXT: "text" = 'text';
```

***

### availableSymbols

```ts
protected readonly availableSymbols: {
  CHECKMARK: "checkmark";
  CROSS: "cross";
  EXCLAMATION: "exclamation";
  QUESTION: "question";
  STAR: "star";
} = ImageMarkupSymbol;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:785](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L785)

Symbol constants available to the template.

#### CHECKMARK

```ts
readonly CHECKMARK: "checkmark" = 'checkmark';
```

#### CROSS

```ts
readonly CROSS: "cross" = 'cross';
```

#### EXCLAMATION

```ts
readonly EXCLAMATION: "exclamation" = 'exclamation';
```

#### QUESTION

```ts
readonly QUESTION: "question" = 'question';
```

#### STAR

```ts
readonly STAR: "star" = 'star';
```

***

### availableTools

```ts
protected readonly availableTools: {
  ARROW: "arrow";
  CROP: "crop";
  ELLIPSE: "ellipse";
  ERASER: "eraser";
  HIGHLIGHTER: "highlighter";
  LINE: "line";
  PAN: "pan";
  PEN: "pen";
  RECTANGLE: "rectangle";
  SYMBOL: "symbol";
  TEXT: "text";
} = ImageMarkupTool;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:777](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L777)

Tool constants available to the template.

#### ARROW

```ts
readonly ARROW: "arrow" = 'arrow';
```

#### CROP

```ts
readonly CROP: "crop" = 'crop';
```

#### ELLIPSE

```ts
readonly ELLIPSE: "ellipse" = 'ellipse';
```

#### ERASER

```ts
readonly ERASER: "eraser" = 'eraser';
```

#### HIGHLIGHTER

```ts
readonly HIGHLIGHTER: "highlighter" = 'highlighter';
```

#### LINE

```ts
readonly LINE: "line" = 'line';
```

#### PAN

```ts
readonly PAN: "pan" = 'pan';
```

#### PEN

```ts
readonly PEN: "pen" = 'pen';
```

#### RECTANGLE

```ts
readonly RECTANGLE: "rectangle" = 'rectangle';
```

#### SYMBOL

```ts
readonly SYMBOL: "symbol" = 'symbol';
```

#### TEXT

```ts
readonly TEXT: "text" = 'text';
```

***

### canvas

```ts
protected readonly canvas: Signal<
  | ImageMarkupCanvasDirective
| undefined>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:761](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L761)

Canvas directive owning the editor document and renderer.

***

### canvasInteractionMode

```ts
protected readonly canvasInteractionMode: Signal<"pan" | "pointer">;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:849](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L849)

Interaction mode delegated to the Mosaik designer canvas.

***

### colorOptions

```ts
protected readonly colorOptions: readonly IImageMarkupColorOption[] = COLOR_OPTIONS;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:801](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L801)

Fixed drawing colors available to the editor.

***

### designerCanvas

```ts
protected readonly designerCanvas: Signal<DesignerCanvasComponent | undefined>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:769](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L769)

Mosaik drawing-board canvas owning pan and zoom interaction.

***

### errorMessage

```ts
protected readonly errorMessage: Signal<string | null>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:929](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L929)

Current localized error message.

***

### fontSizeOptions

```ts
protected readonly fontSizeOptions: readonly number[] = FONT_SIZE_OPTIONS;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:809](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L809)

Fixed text and symbol sizes available to the editor.

***

### historyLimit

```ts
protected readonly historyLimit: number;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:977](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L977)

Maximum undo history depth.

***

### isExporting

```ts
protected readonly isExporting: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:937](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L937)

Indicates whether PNG export is running.

***

### isShapeTool

```ts
protected readonly isShapeTool: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:857](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L857)

Indicates whether a shape tool is selected.

***

### labels

```ts
protected readonly labels: IImageMarkupEditorLabels;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:945](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L945)

Localized editor labels.

***

### maximumSourcePixels

```ts
protected readonly maximumSourcePixels: number;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:969](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L969)

Maximum accepted source-image pixels.

***

### optionValuesAnimationKeys

```ts
protected readonly optionValuesAnimationKeys: Signal<readonly string[]>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:889](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L889)

Recreates a value palette when its owning tool or option changes.

***

### outputFileName

```ts
protected readonly outputFileName: string;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:961](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L961)

PNG output file name.

***

### previewUrl

```ts
protected readonly previewUrl: string;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:953](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L953)

Source image browser URL.

***

### shapeToolsVisible

```ts
protected readonly shapeToolsVisible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:865](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L865)

Indicates whether the first contextual shape-tool level is visible.

***

### showsOptionValues

```ts
protected readonly showsOptionValues: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:881](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L881)

Indicates whether the selected option's fixed value palette is visible.

***

### showsToolOptions

```ts
protected readonly showsToolOptions: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:873](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L873)

Indicates whether the contextual action bar is visible.

***

### strokeWidthOptions

```ts
protected readonly strokeWidthOptions: readonly number[] = STROKE_WIDTH_OPTIONS;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:817](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L817)

Fixed drawing widths available to the editor.

***

### supportsColor

```ts
protected readonly supportsColor: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:905](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L905)

Indicates whether the active tool accepts a color.

***

### supportsFontSize

```ts
protected readonly supportsFontSize: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:913](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L913)

Indicates whether the active tool accepts text or symbol sizing.

***

### supportsStrokeWidth

```ts
protected readonly supportsStrokeWidth: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:921](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L921)

Indicates whether the active tool accepts a stroke width.

***

### symbolOptions

```ts
protected readonly symbolOptions: readonly IImageMarkupSymbolOption[] = SYMBOL_OPTIONS;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:825](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L825)

Fixed symbols available to the editor.

***

### toolOptionsAnimationKeys

```ts
protected readonly toolOptionsAnimationKeys: Signal<readonly ImageMarkupToolValue[]>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:897](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L897)

Recreates contextual tool options when the active tool changes.

## Accessors

### form

#### Get Signature

```ts
get protected form(): FieldTree<IImageMarkupEditorControls>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:985](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L985)

Signal form containing neutral editor controls.

##### Returns

`FieldTree`\<`IImageMarkupEditorControls`\>

## Methods

### apply()

```ts
protected apply(): Promise<void>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1137](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1137)

#### Returns

`Promise`\<`void`\>

***

### cancel()

```ts
protected cancel(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1133)

#### Returns

`void`

***

### clear()

```ts
protected clear(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1128)

#### Returns

`void`

***

### closeTextOption()

```ts
protected closeTextOption(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1057](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1057)

#### Returns

`void`

***

### fitImageToView()

```ts
protected fitImageToView(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1101)

#### Returns

`void`

***

### getSymbolLabel()

```ts
protected getSymbolLabel(symbol): string;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1065](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1065)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `symbol` | [`ImageMarkupSymbolValue`](TypeAlias.ImageMarkupSymbolValue) |

#### Returns

`string`

***

### onEditorError()

```ts
protected onEditorError(error): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1158)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

#### Returns

`void`

***

### onSourceReady()

```ts
protected onSourceReady(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1093](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1093)

#### Returns

`void`

***

### onTextPlacementRejected()

```ts
protected onTextPlacementRejected(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1162)

#### Returns

`void`

***

### onViewportChanged()

```ts
protected onViewportChanged(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1097](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1097)

#### Returns

`void`

***

### redo()

```ts
protected redo(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1123)

#### Returns

`void`

***

### resetView()

```ts
protected resetView(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1089](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1089)

#### Returns

`void`

***

### selectColor()

```ts
protected selectColor(color): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1017](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1017)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `color` | `string` |

#### Returns

`void`

***

### selectFontSize()

```ts
protected selectFontSize(fontSize): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1037](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1037)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fontSize` | `number` |

#### Returns

`void`

***

### selectOption()

```ts
protected selectOption(option): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1008](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1008)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `option` | `ImageMarkupEditorOptionValue` |

#### Returns

`void`

***

### selectStrokeWidth()

```ts
protected selectStrokeWidth(strokeWidth): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1027](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1027)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `strokeWidth` | `number` |

#### Returns

`void`

***

### selectSymbol()

```ts
protected selectSymbol(symbol): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1047](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1047)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `symbol` | [`ImageMarkupSymbolValue`](TypeAlias.ImageMarkupSymbolValue) |

#### Returns

`void`

***

### selectTool()

```ts
protected selectTool(tool): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:993](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L993)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tool` | [`ImageMarkupToolValue`](TypeAlias.ImageMarkupToolValue) |

#### Returns

`void`

***

### toggleShapeTools()

```ts
protected toggleShapeTools(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1000](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1000)

#### Returns

`void`

***

### undo()

```ts
protected undo(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1118)

#### Returns

`void`

***

### zoomIn()

```ts
protected zoomIn(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1081](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1081)

#### Returns

`void`

***

### zoomOut()

```ts
protected zoomOut(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts:1085](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupEditorDialogComponent.ts#L1085)

#### Returns

`void`
