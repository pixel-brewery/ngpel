---
title: 'Function: moveWidgetGridZone()'
generated: true
editUrl: false
---
# Function: moveWidgetGridZone()

```ts
function moveWidgetGridZone(
   layout,
   previousIndex,
   currentIndex
): IWidgetGridLayout;
```

Defined in: [libs/ui/src/widget/layout/moveWidgetGridZone.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/moveWidgetGridZone.ts#L21)

Moves one zone to another position and renumbers the zone order.

Both indices are clamped into range, so a drag that ends outside the list drops the zone at the
nearest valid position instead of losing it.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layout` | [`IWidgetGridLayout`](Interface.IWidgetGridLayout) | The current layout. |
| `previousIndex` | `number` | The current position of the zone. |
| `currentIndex` | `number` | The position the zone is moved to. |

## Returns

[`IWidgetGridLayout`](Interface.IWidgetGridLayout)

The layout with the zone moved, or the unchanged layout when there is no zone to move.
