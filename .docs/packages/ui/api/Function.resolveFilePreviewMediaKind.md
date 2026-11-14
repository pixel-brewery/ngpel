---
title: 'Function: resolveFilePreviewMediaKind()'
generated: true
editUrl: false
---
# Function: resolveFilePreviewMediaKind()

```ts
function resolveFilePreviewMediaKind(contentType, fileName): FilePreviewMediaKind;
```

Defined in: [libs/ui/src/components/file/FilePreview.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FilePreview.ts#L103)

Determines the thumbnail media family from MIME type, then from the file extension.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contentType` | `string` | The MIME type, or an empty string if unavailable. |
| `fileName` | `string` | The original file name. |

## Returns

[`FilePreviewMediaKind`](TypeAlias.FilePreviewMediaKind)

The media family for the thumbnail.
