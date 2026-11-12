---
title: 'Interface: IFilterControllerConfig'
generated: true
editUrl: false
---
# Interface: IFilterControllerConfig

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts#L14)

Configuration for `createFilterController()`.

## Properties

### activeFilters

```ts
readonly activeFilters: Signal<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts#L26)

Active filter values owned by the concrete list presenter.

***

### applyFilterValues

```ts
readonly applyFilterValues: (values) => void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts#L36)

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

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts#L31)

Whether a filter is active.

***

### livePreference?

```ts
readonly livePreference?: ILiveFilterPreference;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts#L21)

Optional persistence for the active filter, separate from named saved filters.

***

### savedFilterStorageKey

```ts
readonly savedFilterStorageKey: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/IFilterControllerConfig.ts#L18)

Stable preference key used for named saved filters.
