---
title: 'Interface: IFilterControllerConfig'
generated: true
editUrl: false
---
# Interface: IFilterControllerConfig

Defined in: [libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts#L19)

Configuration for [createFilterController](Function.createFilterController).

## Properties

### activeFilters

```ts
readonly activeFilters: Signal<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts#L28)

Active filter values owned by the concrete list presenter.

***

### applyFilterValues

```ts
readonly applyFilterValues: (values) => void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts#L38)

Applies filter values in the concrete list presenter.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) |

#### Returns

`void`

***

### isFilterActive

```ts
readonly isFilterActive: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts#L33)

Whether a filter is active.

***

### savedFilterStorageKey

```ts
readonly savedFilterStorageKey: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/createFilterController.ts#L23)

Stable preference key used for named saved filters.
