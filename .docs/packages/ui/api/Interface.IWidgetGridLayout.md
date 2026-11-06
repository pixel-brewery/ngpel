---
title: 'Interface: IWidgetGridLayout'
generated: true
editUrl: false
---
# Interface: IWidgetGridLayout

Defined in: [libs/ui/src/widget/layout/IWidgetGridLayout.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridLayout.ts#L19)

The versioned user configuration of one widget grid: the order of its zones and the placement of
every widget the user has ever seen.

Display text and widget payloads intentionally stay outside this contract — it is the only part
of a dashboard that is persisted, and it must survive renamed labels, new translations and
temporarily unavailable widgets.

## Properties

### items

```ts
readonly items: readonly IWidgetGridItemLayout[];
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridLayout.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridLayout.ts#L35)

The persisted widget placements, including the ones whose widget is currently unavailable.

***

### version

```ts
readonly version: 2;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridLayout.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridLayout.ts#L25)

The schema version of this payload.

***

### zones

```ts
readonly zones: readonly IWidgetGridZoneLayout[];
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridLayout.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridLayout.ts#L30)

The persisted zone order.
