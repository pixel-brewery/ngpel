---
title: 'Function: createFilePreview()'
generated: true
editUrl: false
---
# Function: createFilePreview()

```ts
function createFilePreview(
   mediaKind,
   url,
   fileName
): ThumbnailPreview;
```

Defined in: [libs/ui/src/components/file/FilePreview.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FilePreview.ts#L30)

Creates a thumbnail for a URL whose lifecycle is owned by the caller.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mediaKind` | [`FilePreviewMediaKind`](TypeAlias.FilePreviewMediaKind) | The media family to render. |
| `url` | `string` | The media URL, which may be an object URL. |
| `fileName` | `string` | Alternative text for an image thumbnail. |

## Returns

`ThumbnailPreview`

The thumbnail or the generic document fallback.
