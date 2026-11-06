---
title: 'Interface: IWithWidgetItemsOptions'
generated: true
editUrl: false
---
# Interface: IWithWidgetItemsOptions

Defined in: [libs/ui/src/widget/provider/IWithWidgetItemsOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/IWithWidgetItemsOptions.ts#L12)

Options of `withWidgetItems(...)`.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/widget/provider/IWithWidgetItemsOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/IWithWidgetItemsOptions.ts#L20)

The stable id of this contribution, unique across every widget contribution of the
application; it is what turns a duplicate registration into a composition error instead of a
silently duplicated dashboard tile.

***

### widgets

```ts
readonly widgets: readonly () => IWidget[];
```

Defined in: [libs/ui/src/widget/provider/IWithWidgetItemsOptions.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/IWithWidgetItemsOptions.ts#L27)

The contributed widgets, as factories. Each factory runs inside an injection context, so a
widget may resolve its title from a translation service or its availability from a
permission service while it is being built.
