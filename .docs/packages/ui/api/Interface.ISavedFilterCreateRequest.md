---
title: 'Interface: ISavedFilterCreateRequest'
generated: true
editUrl: false
---
# Interface: ISavedFilterCreateRequest

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterCreateRequest.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterCreateRequest.ts#L12)

Request emitted when a user wants to save the current filter values.

## Properties

### name

```ts
readonly name: string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterCreateRequest.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterCreateRequest.ts#L16)

User-facing saved filter name.

***

### values

```ts
readonly values: FilterValues;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/ISavedFilterCreateRequest.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/ISavedFilterCreateRequest.ts#L21)

Filter values to persist.
