---
title: 'Interface: IWidgetGridZoneLayout'
generated: true
editUrl: false
---
# Interface: IWidgetGridZoneLayout

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneLayout.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneLayout.ts#L6)

The persisted ordering of one widget-grid zone.

## Properties

### order

```ts
readonly order: number;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneLayout.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneLayout.ts#L18)

The zero-based position of the zone. Reconciliation normalizes it, so the positions of the
known zones are always a gap-free sequence.

***

### zoneId

```ts
readonly zoneId: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneLayout.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneLayout.ts#L12)

The id of the zone this entry orders.
