---
title: 'Interface: IWidgetSizeCondition'
generated: true
editUrl: false
---
# Interface: IWidgetSizeCondition

Defined in: [libs/ui/src/widget/models/IWidgetSizeCondition.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSizeCondition.ts#L13)

A size condition a widget template checks before it renders a density variant. Each axis is
either an exact span or an inclusive [IWidgetSizeRange](Interface.IWidgetSizeRange); an omitted axis is unconstrained.

## Properties

### columns?

```ts
readonly optional columns?: number | IWidgetSizeRange;
```

Defined in: [libs/ui/src/widget/models/IWidgetSizeCondition.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSizeCondition.ts#L19)

The matching column span, exact or ranged.

***

### rows?

```ts
readonly optional rows?: number | IWidgetSizeRange;
```

Defined in: [libs/ui/src/widget/models/IWidgetSizeCondition.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetSizeCondition.ts#L24)

The matching row span, exact or ranged.
