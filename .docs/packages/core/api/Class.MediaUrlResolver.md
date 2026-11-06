---
title: 'Class: MediaUrlResolver'
generated: true
editUrl: false
---
# Class: MediaUrlResolver

Defined in: [browser/media/MediaUrlResolver.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MediaUrlResolver.ts#L18)

Resolves backend-owned relative media paths against the configured API origin. Available in
the root injector without configuration (pass-through), and re-registered by
`provideMediaUrls(...)` so a route-level composition gets its own scoped instance.

## Constructors

### Constructor

```ts
new MediaUrlResolver(): MediaUrlResolver;
```

#### Returns

`MediaUrlResolver`

## Methods

### resolve()

```ts
resolve(url): string;
```

Defined in: [browser/media/MediaUrlResolver.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MediaUrlResolver.ts#L35)

Resolves a root-relative backend media URL while preserving browser-local and absolute URLs.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` \| `null` \| `undefined` | Media URL returned by an API or created locally for a preview. |

#### Returns

`string`

The resolved URL, or `''` for `null`/`undefined`.
