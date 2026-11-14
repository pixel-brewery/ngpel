---
title: 'Function: providePdfPreview()'
generated: true
editUrl: false
---
# Function: providePdfPreview()

```ts
function providePdfPreview(options): Provider;
```

Defined in: [libs/ui/src/components/document-preview/providePdfPreview.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/providePdfPreview.ts#L12)

Enables lazy PDF.js rendering for document previews opened by the host application.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \| [`IPdfPreviewOptions`](Interface.IPdfPreviewOptions) \| (() => [`IPdfPreviewOptions`](Interface.IPdfPreviewOptions)) | SDK loader and asset URLs, or a factory that resolves them in the application injector. |

## Returns

`Provider`

Angular provider for document preview.
