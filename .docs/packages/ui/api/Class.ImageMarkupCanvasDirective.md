---
title: 'Class: ImageMarkupCanvasDirective'
generated: true
editUrl: false
---
# Class: ImageMarkupCanvasDirective

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L34)

Owns pointer interaction, history rendering, and PNG encoding for one markup canvas.

## Implements

- `OnDestroy`

## Constructors

### Constructor

```ts
new ImageMarkupCanvasDirective(): ImageMarkupCanvasDirective;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L66)

Connects source changes to the canvas loader.

#### Returns

`ImageMarkupCanvasDirective`

## Properties

### canRedo

```ts
readonly canRedo: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:270](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L270)

Indicates whether a redo operation is available.

***

### canUndo

```ts
readonly canUndo: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L262)

Indicates whether an undo operation is available.

***

### color

```ts
readonly color: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L110)

Current CSS drawing color.

***

### cropPreviewSelection

```ts
readonly cropPreviewSelection: Signal<
  | IImageMarkupCropSelection
| null>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:198](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L198)

Crop rectangle currently being dragged before it becomes a history step.

***

### cropSelection

```ts
readonly cropSelection: Signal<
  | IImageMarkupCropSelection
| null>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:206](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L206)

Current crop rectangle in source-image pixels.

***

### editorError

```ts
readonly editorError: OutputEmitterRef<Error>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L166)

Emits rendering and source-loading errors.

***

### fontSize

```ts
readonly fontSize: InputSignal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L126)

Current text and symbol size in source-image pixels.

***

### hasChanges

```ts
readonly hasChanges: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L278)

Indicates whether crop or markup edits differ from the source image.

***

### historyLimit

```ts
readonly historyLimit: InputSignal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L158)

Maximum undo snapshot count.

***

### isLoading

```ts
readonly isLoading: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L286)

Indicates whether the source image is loading.

***

### isReady

```ts
readonly isReady: Signal<boolean>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:294](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L294)

Indicates whether the canvas can accept input and export.

***

### maximumSourcePixels

```ts
readonly maximumSourcePixels: InputSignal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L150)

Maximum accepted source-image pixel count.

***

### outputFileName

```ts
readonly outputFileName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L94)

File name used by PNG export.

***

### sourceHeight

```ts
readonly sourceHeight: Signal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:254](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L254)

Loaded source-image height in pixels.

***

### sourceReady

```ts
readonly sourceReady: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:182](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L182)

Emits after a source image has been loaded and rendered at its original resolution.

***

### sourceUrl

```ts
readonly sourceUrl: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L86)

Browser URL of the source image.

***

### sourceWidth

```ts
readonly sourceWidth: Signal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:246](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L246)

Loaded source-image width in pixels.

***

### strokeWidth

```ts
readonly strokeWidth: InputSignal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L118)

Current stroke width in source-image pixels.

***

### symbol

```ts
readonly symbol: InputSignal<ImageMarkupSymbolValue>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:142](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L142)

Symbol placed by the symbol tool.

***

### text

```ts
readonly text: InputSignal<string>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L134)

Text placed by the text tool.

***

### textPlacementRejected

```ts
readonly textPlacementRejected: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:174](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L174)

Emits when the text tool is used without text.

***

### tool

```ts
readonly tool: InputSignal<ImageMarkupToolValue>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L102)

Currently selected drawing tool.

***

### viewportChanged

```ts
readonly viewportChanged: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L190)

Emits when a committed crop changes the visible source-image viewport.

***

### viewportHeight

```ts
readonly viewportHeight: Signal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:238](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L238)

Height of the committed visible viewport in source-image pixels.

***

### viewportLeft

```ts
readonly viewportLeft: Signal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:214](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L214)

Horizontal source-image offset of the committed visible viewport.

***

### viewportTop

```ts
readonly viewportTop: Signal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:222](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L222)

Vertical source-image offset of the committed visible viewport.

***

### viewportWidth

```ts
readonly viewportWidth: Signal<number>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L230)

Width of the committed visible viewport in source-image pixels.

## Methods

### clear()

```ts
clear(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:342](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L342)

Removes all crop and markup edits while preserving one undo snapshot.

#### Returns

`boolean`

Whether the canvas changed.

***

### exportFile()

```ts
exportFile(): Promise<File>;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L360)

Encodes the source image and current markup as a PNG file.

#### Returns

`Promise`\<`File`\>

Edited PNG file at the selected or original source resolution.

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:382](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L382)

Releases in-flight pointer and source-loading state.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### onKeyDown()

```ts
protected onKeyDown(event): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:533](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L533)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `KeyboardEvent` |

#### Returns

`void`

***

### onPointerCancel()

```ts
protected onPointerCancel(event): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:526](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L526)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerDown()

```ts
protected onPointerDown(event): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L388)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerMove()

```ts
protected onPointerMove(event): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:458](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L458)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerUp()

```ts
protected onPointerUp(event): void;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:484](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L484)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### redo()

```ts
redo(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:324](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L324)

Reapplies the next markup snapshot.

#### Returns

`boolean`

Whether the canvas changed.

***

### undo()

```ts
undo(): boolean;
```

Defined in: [libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/ImageMarkupCanvasDirective.ts#L306)

Restores the previous markup snapshot.

#### Returns

`boolean`

Whether the canvas changed.
