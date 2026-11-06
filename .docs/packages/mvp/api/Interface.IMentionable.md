---
title: 'Interface: IMentionable'
generated: true
editUrl: false
---
# Interface: IMentionable

Defined in: [behaviors/IMentionable.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IMentionable.ts#L12)

Contract for a presenter that offers its loaded resources as context-aware mentions.

## Methods

### getViewMentionSource()

```ts
getViewMentionSource(): IViewMentionSource | null;
```

Defined in: [behaviors/IMentionable.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IMentionable.ts#L20)

Creates the source of mention options for the current view.

#### Returns

[`IViewMentionSource`](Interface.IViewMentionSource) \| `null`

The source to register, or `null` when this presenter contributes no resources.
