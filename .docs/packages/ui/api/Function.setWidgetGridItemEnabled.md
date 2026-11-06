---
title: 'Function: setWidgetGridItemEnabled()'
generated: true
editUrl: false
---
# Function: setWidgetGridItemEnabled()

```ts
function setWidgetGridItemEnabled(
   layout,
   widgetId,
   enabled
): IWidgetGridLayout;
```

Defined in: [libs/ui/src/widget/layout/setWidgetGridItemEnabled.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/setWidgetGridItemEnabled.ts#L19)

Shows or hides one widget while keeping its placement, so bringing it back puts it exactly where
the user last had it.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layout` | [`IWidgetGridLayout`](Interface.IWidgetGridLayout) | The current layout. |
| `widgetId` | `string` | The id of the widget to show or hide. |
| `enabled` | `boolean` | Whether the widget is visible. |

## Returns

[`IWidgetGridLayout`](Interface.IWidgetGridLayout)

The layout with the visibility applied, or the unchanged layout when the widget is
unknown.
