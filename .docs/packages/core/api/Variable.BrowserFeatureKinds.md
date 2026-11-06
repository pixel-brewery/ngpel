---
title: 'Variable: BrowserFeatureKinds'
generated: true
editUrl: false
---
# Variable: BrowserFeatureKinds

```ts
const BrowserFeatureKinds: {
  Clipboard: FeatureKind<BrowserFeatureKind>;
  ExternalLinks: FeatureKind<BrowserFeatureKind>;
  FileDownload: FeatureKind<BrowserFeatureKind>;
};
```

Defined in: [browser/features/BrowserFeatureKind.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/BrowserFeatureKind.ts#L22)

The branded kind vocabulary of the browser package. Products that ship their own adapter (for
example an IPC-backed clipboard in a desktop shell) create features with these kinds so the
kernel still rejects duplicate registrations.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-clipboard"></a> `Clipboard` | [`FeatureKind`](TypeAlias.FeatureKind)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\> | [browser/features/BrowserFeatureKind.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/BrowserFeatureKind.ts#L23) |
| <a id="property-externallinks"></a> `ExternalLinks` | [`FeatureKind`](TypeAlias.FeatureKind)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\> | [browser/features/BrowserFeatureKind.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/BrowserFeatureKind.ts#L24) |
| <a id="property-filedownload"></a> `FileDownload` | [`FeatureKind`](TypeAlias.FeatureKind)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\> | [browser/features/BrowserFeatureKind.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/BrowserFeatureKind.ts#L25) |
