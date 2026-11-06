---
title: 'Function: collectWidgetZones()'
generated: true
editUrl: false
---
# Function: collectWidgetZones()

```ts
function collectWidgetZones(widgets): readonly IWidgetZone[];
```

Defined in: [libs/ui/src/widget/adapters/collectWidgetZones.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/adapters/collectWidgetZones.ts#L20)

Derives the distinct zones the registered widgets ask for, ordered by the zone order and then by
zone id. There is no global zone inventory: a new widget contribution introduces its zone by
declaring it, and a zone disappears with the last widget that wanted it.

The zones come back without display text, because ngpel resolves none — a host maps them onto
`IWidgetGridZoneDefinition` with its own resolved label and description.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgets` | readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[] | The registered widgets. |

## Returns

readonly [`IWidgetZone`](Interface.IWidgetZone)[]

The distinct zones, in the order they should be rendered.
