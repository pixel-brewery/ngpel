---
title: 'Variable: WIDGET\_SIZE'
generated: true
editUrl: false
---
# Variable: WIDGET\_SIZE

```ts
const WIDGET_SIZE: InjectionToken<Signal<IWidgetSize>>;
```

Defined in: [libs/ui/src/widget/provider/WIDGET\_SIZE.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/WIDGET_SIZE.ts#L15)

The token a widget shell binds to publish the logical grid size of the widget it renders,
including a live resize preview. A view reads it through `WidgetViewDirective` and adapts its
density to the space it actually has.
