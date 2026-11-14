---
title: 'Interface: IPdfPreviewOptions'
generated: true
editUrl: false
---
# Interface: IPdfPreviewOptions

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L9)

Host configuration for the optional PDF.js preview. The host owns the matching SDK, worker,
viewer styles and any assets it chooses to serve.

## Properties

### cMapUrl?

```ts
readonly cMapUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L23)

Base URL of the SDK's character maps.

***

### iccUrl?

```ts
readonly iccUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L32)

Base URL of the SDK's ICC color profiles.

***

### imageResourcesPath?

```ts
readonly imageResourcesPath?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L20)

Base URL of the viewer's annotation image assets.

***

### load

```ts
readonly load: () => Promise<Readonly<{
  api: object;
  viewer: object;
}>>;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L11)

Imports the PDF.js API before importing the official viewer module.

#### Returns

`Promise`\<`Readonly`\<\{
  `api`: `object`;
  `viewer`: `object`;
\}\>\>

***

### locale?

```ts
readonly locale?: string | Signal<string>;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L17)

Viewer locale. A signal refreshes an open preview when the language changes. Defaults to the document language.

***

### standardFontDataUrl?

```ts
readonly standardFontDataUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L26)

Base URL of the SDK's standard fonts.

***

### wasmUrl?

```ts
readonly wasmUrl?: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L29)

Base URL of the SDK's WebAssembly assets.

***

### workerSrc

```ts
readonly workerSrc: string;
```

Defined in: [libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/document-preview/IPdfPreviewOptions.ts#L14)

URL of the matching PDF.js module worker.
