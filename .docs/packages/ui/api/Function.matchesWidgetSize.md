---
title: 'Function: matchesWidgetSize()'
generated: true
editUrl: false
---
# Function: matchesWidgetSize()

```ts
function matchesWidgetSize(size, condition): boolean;
```

Defined in: [libs/ui/src/widget/models/matchesWidgetSize.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/matchesWidgetSize.ts#L23)

Evaluates whether a logical widget size satisfies an exact or ranged template condition. Both
axes must match; an axis the condition omits is unconstrained.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | [`IWidgetSize`](Interface.IWidgetSize) | The current logical size of the widget. |
| `condition` | [`IWidgetSizeCondition`](Interface.IWidgetSizeCondition) | The condition declared by the widget template. |

## Returns

`boolean`

Whether the size satisfies the condition.

## Example

```typescript
matchesWidgetSize({ columnSpan: 2, rowSpan: 4 }, { columns: { min: 1, max: 2 } }); // true
```
