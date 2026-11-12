---
title: 'Interface: IDocumentPreviewRequest'
generated: true
editUrl: false
---
# Interface: IDocumentPreviewRequest

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L14)

Captures one document and the caller-owned operation that loads its bytes.
Authentication, document identity and permission checks remain with the caller.

## Properties

### description?

```ts
readonly description?: string;
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L22)

Optional explanatory context supplied by the owning feature.

***

### fileName

```ts
readonly fileName: string;
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L16)

File name displayed when no separate title or description is supplied.

***

### load

```ts
readonly load: () => Observable<Blob>;
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L28)

Loads the same captured document for the initial attempt and every retry.

#### Returns

`Observable`\<`Blob`\>

***

### mimeType

```ts
readonly mimeType:
  | "application/pdf"
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "image/webp";
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L25)

Exact supported media type expected from the loader.

***

### onLoaded?

```ts
readonly onLoaded?: (blob) => void;
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L31)

Notifies the caller when validated bytes become available for download.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blob` | `Blob` |

#### Returns

`void`

***

### onRendered?

```ts
readonly onRendered?: (blob) => void;
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L34)

Notifies the caller once after an image loads or the managed PDF viewer paints its first page.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blob` | `Blob` |

#### Returns

`void`

***

### title?

```ts
readonly title?: string;
```

Defined in: [libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IDocumentPreviewRequest.ts#L19)

Optional document heading supplied by the owning feature.
