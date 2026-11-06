---
title: 'Interface: IRouteTitleTextResolver'
generated: true
editUrl: false
---
# Interface: IRouteTitleTextResolver

Defined in: [title/IRouteTitleTextResolver.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleTextResolver.ts#L8)

Port resolving a route title segment to display text. Products that keep translation keys in
`route.data` bind it to their translation service; the default resolver returns the text
unchanged, so the package carries no i18n dependency.

## Methods

### resolve()

```ts
resolve(text): string;
```

Defined in: [title/IRouteTitleTextResolver.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/title/IRouteTitleTextResolver.ts#L17)

Resolves one title segment.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The raw segment taken from the route data. |

#### Returns

`string`

The display text.
