---
title: 'Function: resizeWidgetGridItem()'
generated: true
editUrl: false
---
# Function: resizeWidgetGridItem()

```ts
function resizeWidgetGridItem(
   layout,
   definition,
   columnDelta,
   rowDelta
): IWidgetGridLayout;
```

Defined in: [libs/ui/src/widget/layout/resizeWidgetGridItem.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/resizeWidgetGridItem.ts#L23)

Grows or shrinks one widget by a number of grid cells, clamped to the constraints the widget
itself declares. A resize gesture therefore never has to be validated by the pointer code: an
over-long drag simply stops at the widget's own maximum.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layout` | [`IWidgetGridLayout`](Interface.IWidgetGridLayout) | The current layout. |
| `definition` | [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition) | The definition carrying the widget's span constraints. |
| `columnDelta` | `number` | The number of columns to add, negative to remove. |
| `rowDelta` | `number` | The number of rows to add, negative to remove. |

## Returns

[`IWidgetGridLayout`](Interface.IWidgetGridLayout)

The layout with the resized widget, or the unchanged layout when the widget has no
placement.
