---
title: 'Function: withWidgetItems()'
generated: true
editUrl: false
---
# Function: withWidgetItems()

```ts
function withWidgetItems(options): IFeature<"widget-item">;
```

Defined in: [libs/ui/src/widget/provider/withWidgetItems.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/withWidgetItems.ts#L26)

Contributes widgets to the dashboard. A feature library exports one such contribution; the
composition root passes it to `provideWidget(...)`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithWidgetItemsOptions`](Interface.IWithWidgetItemsOptions) | The contribution id and its widget factories. |

## Returns

`IFeature`\<`"widget-item"`\>

A feature for `provideWidget(...)`.

## Example

```typescript
export function withReportingWidgets(): IFeature<WidgetFeatureKind> {
    return withWidgetItems({ id: 'reporting', widgets: [createRevenueWidget, createPipelineWidget] });
}
```
