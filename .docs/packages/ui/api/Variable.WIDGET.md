---
title: 'Variable: WIDGET'
generated: true
editUrl: false
---
# Variable: WIDGET

```ts
const WIDGET: InjectionToken<readonly IWidget<IWidgetData>[]>;
```

Defined in: [libs/ui/src/widget/provider/WIDGET.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/provider/WIDGET.ts#L15)

The multi-provider token every feature library contributes its widgets to. `provideWidget(...)`
collects the contributions and hands them to the [WidgetManager](Class.WidgetManager); contribute through
`withWidgetItems(...)` rather than binding the token by hand.
