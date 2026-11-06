---
title: 'Function: moveWidgetGridItem()'
generated: true
editUrl: false
---
# Function: moveWidgetGridItem()

```ts
function moveWidgetGridItem(
   layout,
   widgetId,
   targetZoneId,
   targetIndex
): IWidgetGridLayout;
```

Defined in: [libs/ui/src/widget/layout/moveWidgetGridItem.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/moveWidgetGridItem.ts#L23)

Moves one widget into a zone at a position and renumbers both the zone it left and the zone it
joined. Dropping a widget always shows it, which is what makes dragging one out of the toolbox
the same gesture as moving one between zones.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layout` | [`IWidgetGridLayout`](Interface.IWidgetGridLayout) | The current layout. |
| `widgetId` | `string` | The id of the widget to move. |
| `targetZoneId` | `string` | The id of the zone the widget is moved into. |
| `targetIndex` | `number` | The position within the target zone, clamped into range. |

## Returns

[`IWidgetGridLayout`](Interface.IWidgetGridLayout)

The layout with the widget moved, or the unchanged layout when the widget or the zone is
unknown.
