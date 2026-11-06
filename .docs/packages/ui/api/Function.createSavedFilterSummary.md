---
title: 'Function: createSavedFilterSummary()'
generated: true
editUrl: false
---
# Function: createSavedFilterSummary()

```ts
function createSavedFilterSummary(
   filters,
   values,
   intl
): readonly ISavedFilterSummaryItem[];
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/createSavedFilterSummary.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/createSavedFilterSummary.ts#L40)

Creates display-ready summary rows for standard and advanced filter values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters` | readonly [`IFilterDefinition`](Interface.IFilterDefinition)[] | Available filter definitions. |
| `values` | [`FilterValues`](TypeAlias.FilterValues) | Active filter values. |
| `intl` | [`FilterBarComponentIntl`](Class.FilterBarComponentIntl) | Filter bar labels. |

## Returns

readonly [`ISavedFilterSummaryItem`](Interface.ISavedFilterSummaryItem)[]
