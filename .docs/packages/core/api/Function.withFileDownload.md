---
title: 'Function: withFileDownload()'
generated: true
editUrl: false
---
# Function: withFileDownload()

```ts
function withFileDownload(adapter?): IFeature<BrowserFeatureKind>;
```

Defined in: [browser/features/withFileDownload.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/withFileDownload.ts#L20)

Registers the [FILE\_DOWNLOADER](Variable.FILE_DOWNLOADER) port.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `adapter?` | `Type`\<[`IFileDownloader`](Interface.IFileDownloader)\> | `FileDownloadService` | The adapter class to instantiate; defaults to the anchor-based [FileDownloadService](Class.FileDownloadService). |

## Returns

[`IFeature`](Interface.IFeature)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\>

A feature for `provideBrowser(...)`.
