---
title: 'Interface: IFileDownloader'
generated: true
editUrl: false
---
# Interface: IFileDownloader

Defined in: [browser/download/IFileDownloader.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/download/IFileDownloader.ts#L6)

Port for saving in-memory content under an explicit, caller-supplied file name.

## Methods

### downloadBlobAs()

```ts
downloadBlobAs(blob, fileName): void;
```

Defined in: [browser/download/IFileDownloader.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/download/IFileDownloader.ts#L15)

Downloads one blob under the supplied name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `blob` | `Blob` | Content to save. |
| `fileName` | `string` | Name suggested to the browser, including its extension. |

#### Returns

`void`
