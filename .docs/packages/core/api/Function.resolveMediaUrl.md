---
title: 'Function: resolveMediaUrl()'
generated: true
editUrl: false
---
# Function: resolveMediaUrl()

```ts
function resolveMediaUrl(origin, url): string;
```

Defined in: [browser/media/resolveMediaUrl.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/resolveMediaUrl.ts#L12)

Resolves a root-relative backend media path against an API origin while preserving
browser-local and absolute URLs. Only single-leading-slash paths are prefixed: absolute
(`https://`), protocol-relative (`//cdn`), `data:` and `blob:` URLs and empty values pass
through unchanged, and an empty origin keeps the path relative (local proxies).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `origin` | `string` | The API origin, with or without trailing slashes. |
| `url` | `string` \| `null` \| `undefined` | Media URL returned by an API or created locally for a preview. |

## Returns

`string`

The resolved URL, or `''` for `null`/`undefined`.
