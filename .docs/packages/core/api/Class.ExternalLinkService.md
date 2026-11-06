---
title: 'Class: ExternalLinkService'
generated: true
editUrl: false
---
# Class: ExternalLinkService

Defined in: [browser/external-links/ExternalLinkService.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/external-links/ExternalLinkService.ts#L17)

Default [IExternalLinkOpener](Interface.IExternalLinkOpener) adapter: `window.open(url, '_blank', 'noopener,noreferrer')`
on the injected `DOCUMENT`'s window. The call shape is deliberately fixed and the return value
ignored — desktop shells intercept exactly this window-open request to hand the URL to the OS
browser, and a fallback to in-app navigation would drive such a shell off-app.

## Implements

- [`IExternalLinkOpener`](Interface.IExternalLinkOpener)

## Constructors

### Constructor

```ts
new ExternalLinkService(): ExternalLinkService;
```

#### Returns

`ExternalLinkService`

## Methods

### open()

```ts
open(url): void;
```

Defined in: [browser/external-links/ExternalLinkService.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/external-links/ExternalLinkService.ts#L32)

Opens `url` in a new, isolated browsing context.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` \| `undefined` | The absolute URL to open; empty or `undefined` values are ignored. |

#### Returns

`void`

#### Implementation of

[`IExternalLinkOpener`](Interface.IExternalLinkOpener).[`open`](Interface.IExternalLinkOpener#open)
