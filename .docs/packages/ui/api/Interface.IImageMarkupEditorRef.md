---
title: 'Interface: IImageMarkupEditorRef'
generated: true
editUrl: false
---
# Interface: IImageMarkupEditorRef

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorRef.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorRef.ts#L13)

Public handle for observing and visually integrating an open image markup editor.

## Properties

### closed

```ts
readonly closed: Observable<ICancel<File>>;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorRef.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorRef.ts#L22)

Emits the positive edited image or a negative dismissal.

***

### overlayRef

```ts
readonly overlayRef: OverlayRef;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupEditorRef.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupEditorRef.ts#L30)

Underlying overlay used for application-level stacking integration.
