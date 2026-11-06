---
title: 'Interface: IFilterDefinition'
generated: true
editUrl: false
---
# Interface: IFilterDefinition

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L114)

Describes a single filter field in the filter bar.

## Properties

### integer?

```ts
readonly optional integer?: boolean;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L141)

Restricts a numeric filter to whole numbers.

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L118)

Unique key identifying the filter (used in the emitted filter values).

***

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L123)

Display label for the filter field.

***

### options?

```ts
readonly optional options?: readonly IFilterOption[];
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L138)

Available options for select-type and multi-select-type filters.

***

### placeholder?

```ts
readonly optional placeholder?: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L133)

Placeholder text shown when no value is set.

***

### type

```ts
readonly type: FilterTypeValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L128)

The type of filter control to render.

***

### visible?

```ts
readonly optional visible?: boolean;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L146)

Whether this filter is visible by default. Defaults to `true`.
