---
title: 'Interface: ITourContribution'
generated: true
editUrl: false
---
# Interface: ITourContribution

Defined in: [libs/ui/src/tour/contributions/ITourContribution.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContribution.ts#L12)

Describes a feature-owned set of steps that can be composed into a larger tour.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/tour/contributions/ITourContribution.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContribution.ts#L19)

Stable identifier within the composed tour.

***

### steps

```ts
readonly steps: readonly ITourContributionStep[];
```

Defined in: [libs/ui/src/tour/contributions/ITourContribution.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContribution.ts#L27)

Ordered steps contributed by the feature.
