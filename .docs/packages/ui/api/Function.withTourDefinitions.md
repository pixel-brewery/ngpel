---
title: 'Function: withTourDefinitions()'
generated: true
editUrl: false
---
# Function: withTourDefinitions()

```ts
function withTourDefinitions(options): TourFeature;
```

Defined in: [libs/ui/src/tour/provider/withTourDefinitions.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/provider/withTourDefinitions.ts#L21)

Creates a composable feature contribution for native Mosaik tour definitions.

Definition factories remain lazy and are resolved by the native tour service
in Angular's injection context.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithTourDefinitionsOptions`](Interface.IWithTourDefinitionsOptions) | Feature identifier and tour definitions to contribute. |

## Returns

[`TourFeature`](TypeAlias.TourFeature)

A tour feature for use with [provideTour](Function.provideTour).
