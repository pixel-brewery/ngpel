---
title: 'Interface: IWidgetSizeRange'
generated: true
editUrl: false
---
# Interface: IWidgetSizeRange

Defined in: [libs/ui/src/widget/models/IWidgetSizeRange.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSizeRange.ts#L7)

An inclusive span range used by one axis of an [IWidgetSizeCondition](Interface.IWidgetSizeCondition). An omitted bound is
unconstrained.

## Properties

### max?

```ts
readonly max?: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSizeRange.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSizeRange.ts#L18)

The largest matching span, inclusive.

***

### min?

```ts
readonly min?: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetSizeRange.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSizeRange.ts#L13)

The smallest matching span, inclusive.
