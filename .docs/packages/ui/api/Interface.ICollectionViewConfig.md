---
title: 'Interface: ICollectionViewConfig\<TItem, TView, TCalendarItem\>'
generated: true
editUrl: false
---
# Interface: ICollectionViewConfig\<TItem, TView, TCalendarItem\>

Defined in: [libs/ui/src/collection-view/core/ICollectionViewConfig.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewConfig.ts#L16)

Complete collection-view configuration for a feature collection.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-titem"></a> `TItem` | - |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` | - |
| <a id="type-parameter-tcalendaritem"></a> `TCalendarItem` | `TItem` |

## Properties

### defaultView

```ts
readonly defaultView: TView;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewConfig.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewConfig.ts#L20)

Default view type for the collection.

***

### fields

```ts
readonly fields: readonly ICollectionField<TItem>[];
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewConfig.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewConfig.ts#L25)

Field metadata used by table, filter, and export projections.

***

### views

```ts
readonly views: readonly (
  | ICollectionCalendarViewConfig<TCalendarItem, TView>
  | ICollectionTableViewConfig<TItem, TView>
  | ICollectionGalleryViewConfig<TItem, TView>
  | ICollectionFlowViewConfig<TItem, TView, string>)[];
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewConfig.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewConfig.ts#L30)

Supported view projections for this feature collection.
