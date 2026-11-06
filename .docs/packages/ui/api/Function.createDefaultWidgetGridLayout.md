---
title: 'Function: createDefaultWidgetGridLayout()'
generated: true
editUrl: false
---
# Function: createDefaultWidgetGridLayout()

```ts
function createDefaultWidgetGridLayout(zones, items): IWidgetGridLayout;
```

Defined in: [libs/ui/src/widget/layout/createDefaultWidgetGridLayout.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/createDefaultWidgetGridLayout.ts#L18)

Creates the layout a user starts with, purely from what the zones and items contribute.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `zones` | readonly [`IWidgetGridZoneDefinition`](Interface.IWidgetGridZoneDefinition)[] | The zones that currently exist. |
| `items` | readonly [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition)[] | The items that are currently available. |

## Returns

[`IWidgetGridLayout`](Interface.IWidgetGridLayout)

The initial layout.
