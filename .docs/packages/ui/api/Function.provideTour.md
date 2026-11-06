---
title: 'Function: provideTour()'
generated: true
editUrl: false
---
# Function: provideTour()

```ts
function provideTour(...features): EnvironmentProviders;
```

Defined in: [libs/ui/src/tour/provider/provideTour.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/provider/provideTour.ts#L29)

Provides the native tour runtime and composes feature-owned tour definitions.

This root provider must be called once by the application shell. Individual
feature libraries contribute their tours through `with...Tour()` features.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly ([`TourFeature`](TypeAlias.TourFeature) \| `ITourFeature`)[] | Native Mosaik features and tour contributions owned by feature libraries. |

## Returns

`EnvironmentProviders`

Environment providers for the native tour runtime and all definitions.
