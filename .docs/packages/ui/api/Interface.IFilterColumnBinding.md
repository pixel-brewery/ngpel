---
title: 'Interface: IFilterColumnBinding\<T\>'
generated: true
editUrl: false
---
# Interface: IFilterColumnBinding\<T\>

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:259](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L259)

Binds a column key to its filter metadata. Used by [buildFilterDefinitions](Function.buildFilterDefinitions)
to resolve labels from column definitions and produce [IFilterDefinition](Interface.IFilterDefinition) entries.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The entity type whose keys constrain the allowed column keys. |

## Properties

### columnKey

```ts
readonly columnKey: keyof T & string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:263](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L263)

The column key this binding refers to. Must be a property key of `T`.

***

### options?

```ts
readonly optional options?: readonly IFilterOption[];
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L278)

Available options when [type](#type) is `'select'` or `'multi-select'`.

***

### placeholder?

```ts
readonly optional placeholder?: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:273](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L273)

Placeholder text for the filter control. Falls back to the column title.

***

### type

```ts
readonly type: FilterTypeValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:268](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L268)

The filter control type to render for this column.
