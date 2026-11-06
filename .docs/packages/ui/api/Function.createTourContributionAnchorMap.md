---
title: 'Function: createTourContributionAnchorMap()'
generated: true
editUrl: false
---
# Function: createTourContributionAnchorMap()

```ts
function createTourContributionAnchorMap(tourId, contribution): TourAccessorAnchorMap;
```

Defined in: [libs/ui/src/tour/contributions/createTourContributionAnchorMap.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/createTourContributionAnchorMap.ts#L16)

Creates the accessor mapping for a contribution within a composed tour.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tourId` | `string` | Identifier of the composed tour. |
| `contribution` | [`ITourContribution`](Interface.ITourContribution) | Feature-owned contribution to map. |

## Returns

`TourAccessorAnchorMap`

Target-to-anchor mapping consumed by `mosaikTourAccessor`.
