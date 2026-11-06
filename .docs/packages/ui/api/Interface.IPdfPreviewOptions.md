---
title: 'Interface: IPdfPreviewOptions'
generated: true
editUrl: false
---
# Interface: IPdfPreviewOptions

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:7

Host configuration for the optional PDF.js preview. The host owns the matching SDK, worker,
viewer styles and any assets it chooses to serve.

## Properties

### cMapUrl?

```ts
readonly optional cMapUrl?: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:21

Base URL of the SDK's character maps.

***

### iccUrl?

```ts
readonly optional iccUrl?: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:30

Base URL of the SDK's ICC color profiles.

***

### imageResourcesPath?

```ts
readonly optional imageResourcesPath?: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:18

Base URL of the viewer's annotation image assets.

***

### load

```ts
readonly load: () => Promise<Readonly<{
  api: object;
  viewer: object;
}>>;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:9

Imports the PDF.js API before importing the official viewer module.

#### Returns

`Promise`\<`Readonly`\<\{
  `api`: `object`;
  `viewer`: `object`;
\}\>\>

***

### locale?

```ts
readonly optional locale?: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:15

Optional viewer locale. Defaults to the current document language.

***

### standardFontDataUrl?

```ts
readonly optional standardFontDataUrl?: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:24

Base URL of the SDK's standard fonts.

***

### wasmUrl?

```ts
readonly optional wasmUrl?: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:27

Base URL of the SDK's WebAssembly assets.

***

### workerSrc

```ts
readonly workerSrc: string;
```

Defined in: libs/ui/src/components/document-preview/IPdfPreviewOptions.ts:12

URL of the matching PDF.js module worker.
