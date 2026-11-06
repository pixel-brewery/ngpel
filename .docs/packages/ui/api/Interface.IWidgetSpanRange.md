---
title: 'Interface: IWidgetSpanRange'
generated: true
editUrl: false
---
# Interface: IWidgetSpanRange

Defined in: [libs/ui/src/widget/models/IWidgetSpanRange.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSpanRange.ts#L8)

The supported span range of one widget axis together with the span it starts out with. The same
shape describes a contributed [IWidgetLayout](Interface.IWidgetLayout) and a reconciled
[IWidgetGridItemDefinition](Interface.IWidgetGridItemDefinition), so a widget declares its constraints exactly once.

## Properties

### default

```ts
readonly default: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSpanRange.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSpanRange.ts#L14)

The span used until a persisted layout overrides it.

***

### max

```ts
readonly max: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSpanRange.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSpanRange.ts#L24)

The largest span the widget may grow to.

***

### min

```ts
readonly min: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSpanRange.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSpanRange.ts#L19)

The smallest span the widget still renders correctly at.
