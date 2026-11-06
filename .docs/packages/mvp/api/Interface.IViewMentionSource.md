---
title: 'Interface: IViewMentionSource'
generated: true
editUrl: false
---
# Interface: IViewMentionSource

Defined in: [mentions/IViewMentionSource.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionSource.ts#L12)

Supplies an active view's loaded resources without fetching new suggestion data.

## Properties

### routePrefix

```ts
readonly routePrefix: string;
```

Defined in: [mentions/IViewMentionSource.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionSource.ts#L23)

Route path that owns the source, including any nested routes.

***

### viewKey

```ts
readonly viewKey: string;
```

Defined in: [mentions/IViewMentionSource.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionSource.ts#L18)

Stable application-owned key identifying the contributing view.

## Methods

### items()

```ts
items(): readonly IViewMentionOption[];
```

Defined in: [mentions/IViewMentionSource.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/IViewMentionSource.ts#L34)

Returns the resources currently loaded by the view.

#### Returns

readonly [`IViewMentionOption`](Interface.IViewMentionOption)[]

The current resource projection.
