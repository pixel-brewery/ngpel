---
title: 'Interface: ITourContributionStep'
generated: true
editUrl: false
---
# Interface: ITourContributionStep

Defined in: [libs/ui/src/tour/contributions/ITourContributionStep.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContributionStep.ts#L13)

Describes one feature-owned step before its final tour anchor is namespaced.

## Extends

- `Omit`\<`ITourStep`, `"id"` \| `"anchorId"` \| `"title"` \| `"content"`\>

## Properties

### content

```ts
readonly content: TourContributionText;
```

Defined in: [libs/ui/src/tour/contributions/ITourContributionStep.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContributionStep.ts#L44)

Localized content or a signal that tracks the active language.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/tour/contributions/ITourContributionStep.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContributionStep.ts#L20)

Stable identifier within the contribution.

***

### target

```ts
readonly target: string;
```

Defined in: [libs/ui/src/tour/contributions/ITourContributionStep.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContributionStep.ts#L28)

Target key exposed by the contributing tour accessor.

***

### title

```ts
readonly title: TourContributionText;
```

Defined in: [libs/ui/src/tour/contributions/ITourContributionStep.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/tour/contributions/ITourContributionStep.ts#L36)

Localized title or a signal that tracks the active language.
