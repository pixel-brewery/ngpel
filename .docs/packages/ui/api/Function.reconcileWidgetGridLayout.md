---
title: 'Function: reconcileWidgetGridLayout()'
generated: true
editUrl: false
---
# Function: reconcileWidgetGridLayout()

```ts
function reconcileWidgetGridLayout(
   stored,
   zones,
   items
): IWidgetGridLayout;
```

Defined in: [libs/ui/src/widget/layout/reconcileWidgetGridLayout.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/reconcileWidgetGridLayout.ts#L32)

Reconciles a stored layout with the zones and items that currently exist.

Two properties make this safe to run on every dashboard load. A placement whose widget is
momentarily unavailable — a permission that has not loaded yet, a licence being renewed — is
retained instead of dropped, so a temporary outage never destroys a user's arrangement. And every
stored span is clamped to the constraints the widget declares today, so a widget that shrank its
maximum size cannot be rendered at a size it no longer supports.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stored` | [`IWidgetGridLayout`](Interface.IWidgetGridLayout) \| `undefined` | The persisted layout, or `undefined` for a user who has none yet. |
| `zones` | readonly [`IWidgetGridZoneDefinition`](Interface.IWidgetGridZoneDefinition)[] | The zones that currently exist. |
| `items` | readonly [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition)[] | The items that are currently available. |

## Returns

[`IWidgetGridLayout`](Interface.IWidgetGridLayout)

The reconciled layout.
