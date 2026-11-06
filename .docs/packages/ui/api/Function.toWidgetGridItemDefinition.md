---
title: 'Function: toWidgetGridItemDefinition()'
generated: true
editUrl: false
---
# Function: toWidgetGridItemDefinition()

```ts
function toWidgetGridItemDefinition(widget): IWidgetGridItemDefinition;
```

Defined in: [libs/ui/src/widget/adapters/toWidgetGridItemDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/adapters/toWidgetGridItemDefinition.ts#L20)

Projects a registered widget onto the framework-free item contract the layout algebra works with,
resolving the widget's reactive text on the way. Calling it inside a `computed(...)` keeps the
derived definitions in step with a title that arrives with a late translation.

It is the one bridge between the two halves of this entry point, so a host never has to restate
a widget's default zone and span constraints in a second shape.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widget` | [`IWidget`](Interface.IWidget) | The registered widget. |

## Returns

[`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition)

The item definition for the layout algebra.
