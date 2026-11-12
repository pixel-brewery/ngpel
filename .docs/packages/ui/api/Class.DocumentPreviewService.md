---
title: 'Class: DocumentPreviewService'
generated: true
editUrl: false
---
# Class: DocumentPreviewService

Defined in: [libs/ui/src/components/document-preview/DocumentPreviewService.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/DocumentPreviewService.ts#L22)

Opens a document in its own drawer without navigating or replacing the caller.

## Constructors

### Constructor

```ts
new DocumentPreviewService(): DocumentPreviewService;
```

#### Returns

`DocumentPreviewService`

## Methods

### open()

```ts
open(request): IDocumentPreviewRef;
```

Defined in: [libs/ui/src/components/document-preview/DocumentPreviewService.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/DocumentPreviewService.ts#L47)

Captures the document loader and owns it until the nested drawer closes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`IDocumentPreviewRequest`](Interface.IDocumentPreviewRequest) | Caller-owned identity, content loader and optional success notification. |

#### Returns

[`IDocumentPreviewRef`](TypeAlias.IDocumentPreviewRef)

The existing Mosaik drawer reference for observation and dismissal.
