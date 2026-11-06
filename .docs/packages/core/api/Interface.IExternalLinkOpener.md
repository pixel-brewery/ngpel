---
title: 'Interface: IExternalLinkOpener'
generated: true
editUrl: false
---
# Interface: IExternalLinkOpener

Defined in: [browser/external-links/IExternalLinkOpener.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/external-links/IExternalLinkOpener.ts#L8)

Port for handing a URL to a new, isolated browsing context from a command context (menus,
shortcuts) where no rendered link exists. Rendered links keep using anchors with
`target="_blank"`; this port only owns the raw open primitive.

## Methods

### open()

```ts
open(url): void;
```

Defined in: [browser/external-links/IExternalLinkOpener.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/external-links/IExternalLinkOpener.ts#L16)

Opens `url` externally.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` \| `undefined` | The absolute URL to open; empty or `undefined` values are ignored. |

#### Returns

`void`
