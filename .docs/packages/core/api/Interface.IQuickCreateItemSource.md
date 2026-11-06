---
title: 'Interface: IQuickCreateItemSource'
generated: true
editUrl: false
---
# Interface: IQuickCreateItemSource

Defined in: [search/quick-create/IQuickCreateItemSource.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItemSource.ts#L8)

Interface for dynamic quick-create item sources (injectable classes).

## Methods

### getItems()

```ts
getItems(): readonly IQuickCreateItem[];
```

Defined in: [search/quick-create/IQuickCreateItemSource.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItemSource.ts#L12)

Returns the quick-create items provided by this source.

#### Returns

readonly [`IQuickCreateItem`](Interface.IQuickCreateItem)[]
