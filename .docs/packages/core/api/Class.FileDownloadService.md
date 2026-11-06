---
title: 'Class: FileDownloadService'
generated: true
editUrl: false
---
# Class: FileDownloadService

Defined in: [browser/download/FileDownloadService.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/download/FileDownloadService.ts#L16)

Default [IFileDownloader](Interface.IFileDownloader) adapter: a temporary object URL on a detached anchor whose
`download` attribute carries the file name, so the browser never derives a suggestion from the
object URL. The URL is revoked in a `finally` block, even when the click throws.

## Implements

- [`IFileDownloader`](Interface.IFileDownloader)

## Constructors

### Constructor

```ts
new FileDownloadService(): FileDownloadService;
```

#### Returns

`FileDownloadService`

## Methods

### downloadBlobAs()

```ts
downloadBlobAs(blob, fileName): void;
```

Defined in: [browser/download/FileDownloadService.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/download/FileDownloadService.ts#L32)

Downloads one blob under the supplied name. Does nothing outside a browser window.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `blob` | `Blob` | Content to save. |
| `fileName` | `string` | Name suggested to the browser, including its extension. |

#### Returns

`void`

#### Implementation of

[`IFileDownloader`](Interface.IFileDownloader).[`downloadBlobAs`](Interface.IFileDownloader#downloadblobas)
