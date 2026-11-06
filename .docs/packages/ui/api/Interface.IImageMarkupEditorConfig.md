---
title: 'Interface: IImageMarkupEditorConfig'
generated: true
editUrl: false
---
# Interface: IImageMarkupEditorConfig

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts#L12)

Optional behavior and presentation overrides for the generic image markup editor.

## Properties

### historyLimit?

```ts
readonly optional historyLimit?: number;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts#L45)

Maximum undo history depth.

***

### labels?

```ts
readonly optional labels?: Partial<IImageMarkupEditorLabels>;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts#L21)

User-visible text overrides.

***

### maximumSourcePixels?

```ts
readonly optional maximumSourcePixels?: number;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts#L37)

Maximum accepted source-image pixel count.

***

### outputFileName?

```ts
readonly optional outputFileName?: string;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorConfig.ts#L29)

File name assigned to the resulting PNG image.
