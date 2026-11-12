---
title: 'Interface: IPdfPreviewOptions'
generated: true
editUrl: false
---
# Interface: IPdfPreviewOptions

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L7)

Host configuration for the optional PDF.js preview. The host owns the matching SDK, worker,
viewer styles and any assets it chooses to serve.

## Properties

### cMapUrl?

```ts
readonly cMapUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L21)

Base URL of the SDK's character maps.

***

### iccUrl?

```ts
readonly iccUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L30)

Base URL of the SDK's ICC color profiles.

***

### imageResourcesPath?

```ts
readonly imageResourcesPath?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L18)

Base URL of the viewer's annotation image assets.

***

### load

```ts
readonly load: () => Promise<Readonly<{
  api: object;
  viewer: object;
}>>;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L9)

Imports the PDF.js API before importing the official viewer module.

#### Returns

`Promise`\<`Readonly`\<\{
  `api`: `object`;
  `viewer`: `object`;
\}\>\>

***

### locale?

```ts
readonly locale?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L15)

Optional viewer locale. Defaults to the current document language.

***

### standardFontDataUrl?

```ts
readonly standardFontDataUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L24)

Base URL of the SDK's standard fonts.

***

### wasmUrl?

```ts
readonly wasmUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L27)

Base URL of the SDK's WebAssembly assets.

***

### workerSrc

```ts
readonly workerSrc: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L12)

URL of the matching PDF.js module worker.
