---
title: 'Function: createAdvancedFilterGroup()'
generated: true
editUrl: false
---
# Function: createAdvancedFilterGroup()

```ts
function createAdvancedFilterGroup(
   id,
   condition?,
   children?
): IAdvancedFilterGroup;
```

Defined in: [libs/ui/src/components/filter-bar/filterConditions.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/filterConditions.ts#L41)

Creates an advanced filter group.

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `id` | `string` | `undefined` |
| `condition` | [`FilterConditionValue`](TypeAlias.FilterConditionValue) | `FilterCondition.And` |
| `children` | readonly [`AdvancedFilterNode`](TypeAlias.AdvancedFilterNode)[] | `[]` |

## Returns

[`IAdvancedFilterGroup`](Interface.IAdvancedFilterGroup)
