---
title: 'Function: provideWidget()'
generated: true
editUrl: false
---
# Function: provideWidget()

```ts
function provideWidget(...features): EnvironmentProviders;
```

Defined in: [libs/ui/src/widget/provider/provideWidget.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/provideWidget.ts#L26)

Composes the widget infrastructure: the [WidgetRegistry](Class.WidgetRegistry) that stores and orders widgets,
the [WidgetManager](Class.WidgetManager) that collects the contributed ones, and every contribution passed in.
Call it once, in the application composition root.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly `IFeature`\<`"widget-item"`\>[] | Contributions from `withWidgetItems(...)`. |

## Returns

`EnvironmentProviders`

Environment providers for the application composition root.

## Throws

Error when two contributions share an id.

## Example

```typescript
provideWidget(withReportingWidgets(), withFeedbackWidgets());
```
