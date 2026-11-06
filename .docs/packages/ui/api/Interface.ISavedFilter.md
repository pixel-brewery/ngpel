---
title: 'Interface: ISavedFilter'
generated: true
editUrl: false
---
# Interface: ISavedFilter

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts#L12)

Named filter definition persisted for one list view.

## Properties

### createdAt

```ts
readonly createdAt: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts#L31)

ISO timestamp for creation.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts#L16)

Stable saved filter id.

***

### name

```ts
readonly name: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts#L21)

User-facing saved filter name.

***

### updatedAt

```ts
readonly updatedAt: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts#L36)

ISO timestamp for last update.

***

### values

```ts
readonly values: FilterValues;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilter.ts#L26)

Persisted filter values.
