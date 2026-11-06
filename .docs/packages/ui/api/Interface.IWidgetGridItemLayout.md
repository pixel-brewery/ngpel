---
title: 'Interface: IWidgetGridItemLayout'
generated: true
editUrl: false
---
# Interface: IWidgetGridItemLayout

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L7)

The persisted placement of one widget: where the user put it, how large they made it and whether
they kept it visible.

## Properties

### columnSpan

```ts
readonly columnSpan: number;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L28)

The number of grid columns the widget spans, clamped to the widget's own constraints.

***

### enabled

```ts
readonly enabled: boolean;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L39)

Whether the user keeps the widget visible. A hidden widget keeps its placement, so showing
it again puts it back where it was.

***

### order

```ts
readonly order: number;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L23)

The zero-based position within the zone. Reconciliation normalizes it per zone.

***

### rowSpan

```ts
readonly rowSpan: number;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L33)

The number of grid rows the widget spans, clamped to the widget's own constraints.

***

### widgetId

```ts
readonly widgetId: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L13)

The id of the widget this placement belongs to.

***

### zoneId

```ts
readonly zoneId: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridItemLayout.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridItemLayout.ts#L18)

The id of the zone the widget sits in.
