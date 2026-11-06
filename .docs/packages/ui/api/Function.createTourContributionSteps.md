---
title: 'Function: createTourContributionSteps()'
generated: true
editUrl: false
---
# Function: createTourContributionSteps()

```ts
function createTourContributionSteps(
   tourId,
   contributions,
   defaults?
): readonly ITourStep<unknown>[];
```

Defined in: [libs/ui/src/tour/contributions/createTourContributionSteps.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/createTourContributionSteps.ts#L18)

Materializes feature-owned contributions as native Mosaik tour steps.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tourId` | `string` | Identifier of the composed tour. |
| `contributions` | readonly [`ITourContribution`](Interface.ITourContribution)[] | Ordered contributions to materialize. |
| `defaults` | `Omit`\<`Partial`\<`ITourStep`\>, `"id"` \| `"anchorId"` \| `"title"` \| `"content"`\> | Default native step configuration applied before contribution overrides. |

## Returns

readonly `ITourStep`\<`unknown`\>[]

Namespaced, localized Mosaik tour steps.
