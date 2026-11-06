---
title: 'Interface: IFilterColumnBinding\<T\>'
generated: true
editUrl: false
---
# Interface: IFilterColumnBinding\<T\>

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L256)

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

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:260](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L260)

The column key this binding refers to. Must be a property key of `T`.

***

### options?

```ts
readonly optional options?: readonly IFilterOption[];
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:275](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L275)

Available options when [type](#type) is `'select'` or `'multi-select'`.

***

### placeholder?

```ts
readonly optional placeholder?: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:270](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L270)

Placeholder text for the filter control. Falls back to the column title.

***

### type

```ts
readonly type: FilterTypeValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:265](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L265)

The filter control type to render for this column.
