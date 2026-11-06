---
title: 'Interface: ISavedFilterController'
generated: true
editUrl: false
---
# Interface: ISavedFilterController

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts#L14)

Controller for persisted named filters.

## Properties

### savedFilters

```ts
readonly savedFilters: Signal<readonly ISavedFilter[]>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts#L18)

Saved filters for the configured view.

## Methods

### find()

```ts
find(id): ISavedFilter | undefined;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts#L40)

Finds a saved filter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Saved filter id. |

#### Returns

[`ISavedFilter`](Interface.ISavedFilter) \| `undefined`

***

### remove()

```ts
remove(id): void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts#L33)

Removes a saved filter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Saved filter id. |

#### Returns

`void`

***

### save()

```ts
save(name, values): ISavedFilter | undefined;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterController.ts#L26)

Saves the supplied filter values under a user-facing name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | Saved filter name. |
| `values` | [`FilterValues`](TypeAlias.FilterValues) | Filter values. |

#### Returns

[`ISavedFilter`](Interface.ISavedFilter) \| `undefined`
