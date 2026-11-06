---
title: 'Function: providePdfPreview()'
generated: true
editUrl: false
---
# Function: providePdfPreview()

```ts
function providePdfPreview(options): Provider;
```

Defined in: libs/ui/src/components/document-preview/providePdfPreview.ts:12

Enables lazy PDF.js rendering for document previews opened by the host application.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IPdfPreviewOptions`](Interface.IPdfPreviewOptions) | SDK loader and URLs for the host's matching worker and assets. |

## Returns

`Provider`

Angular provider for document preview.
