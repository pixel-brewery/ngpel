---
title: 'Interface: ICollectionViewDefinition\<TView\>'
generated: true
editUrl: false
---
# Interface: ICollectionViewDefinition\<TView\>

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L6)

Describes a view option that can be activated for a collection surface.

## Extended by

- [`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig)
- [`ICollectionFlowViewConfig`](Interface.ICollectionFlowViewConfig)
- [`ICollectionGalleryViewConfig`](Interface.ICollectionGalleryViewConfig)
- [`ICollectionTableViewConfig`](Interface.ICollectionTableViewConfig)

## Type Parameters

| Type Parameter |
| ------ |
| `TView` *extends* `string` |

## Properties

### iconName?

```ts
readonly optional iconName?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L20)

Optional icon name used by feature-specific toggles.

***

### label?

```ts
readonly optional label?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L15)

Optional display label used by feature-specific toggles.

***

### type

```ts
readonly type: TView;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L10)

Stable view type key.
