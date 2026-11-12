---
title: 'Interface: ICollectionView\<TItem, TView, TCalendarItem\>'
generated: true
editUrl: false
---
# Interface: ICollectionView\<TItem, TView, TCalendarItem\>

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L21)

Runtime collection-view model exposed by feature presenters.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-titem"></a> `TItem` | - |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` | - |
| <a id="type-parameter-tcalendaritem"></a> `TCalendarItem` | `TItem` |

## Properties

### activeFilters

```ts
readonly activeFilters: Signal<FilterValues>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L35)

Active filter values.

***

### activeView

```ts
readonly activeView: Signal<TView>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L25)

The currently active view. Exactly one view can be active at any time.

***

### availableViews

```ts
readonly availableViews: Signal<readonly ICollectionViewDefinition<TView>[]>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L30)

The view definitions supported by this feature collection.

***

### calendar?

```ts
readonly calendar?: ICollectionCalendarView<TCalendarItem>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L55)

Optional calendar projection.

***

### exportColumns

```ts
readonly exportColumns: Signal<readonly ICollectionExportColumn[]>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L50)

Export columns derived from collection fields.

***

### filterDefinitions

```ts
readonly filterDefinitions: Signal<readonly IFilterDefinition[]>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L45)

Filter definitions derived from collection fields.

***

### flow?

```ts
readonly flow?: ICollectionFlowView<TItem, string>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L70)

Optional flow projection.

***

### gallery?

```ts
readonly gallery?: ICollectionGalleryView<TItem>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L65)

Optional gallery projection.

***

### isFilterActive

```ts
readonly isFilterActive: Signal<boolean>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L40)

Indicates whether at least one filter value is active.

***

### table?

```ts
readonly table?: ICollectionTableView<TItem>;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L60)

Optional table projection.

## Methods

### buildExportFilters()

```ts
buildExportFilters(): readonly ICollectionExportFilter[];
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L90)

Builds export filters from active filter values.

#### Returns

readonly [`ICollectionExportFilter`](Interface.ICollectionExportFilter)[]

***

### canActivateView()

```ts
canActivateView(view): boolean;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L80)

Checks if a view can be activated.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `view` | `string` |

#### Returns

`boolean`

***

### setActiveView()

```ts
setActiveView(view): void;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L75)

Activates a supported view type.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `view` | `TView` |

#### Returns

`void`

***

### setFilterValues()

```ts
setFilterValues(values): void;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionView.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionView.ts#L85)

Replaces active filter values.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) |

#### Returns

`void`
