---
title: 'Interface: IWidgetSize'
generated: true
editUrl: false
---
# Interface: IWidgetSize

Defined in: [libs/ui/src/widget/models/IWidgetSize.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSize.ts#L7)

The logical size of a widget inside its owning grid, in grid cells. A shell publishes it under
`WIDGET_SIZE` so a widget view can adapt its density to the space it actually occupies.

## Properties

### columnSpan

```ts
readonly columnSpan: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSize.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSize.ts#L13)

The number of grid columns the widget spans.

***

### rowSpan

```ts
readonly rowSpan: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSize.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSize.ts#L18)

The number of grid rows the widget spans.
