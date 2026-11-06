---
title: 'Interface: IWidgetGridItemTemplateContext'
generated: true
editUrl: false
---
# Interface: IWidgetGridItemTemplateContext

Defined in: [libs/ui/src/widget/models/IWidgetGridItemTemplateContext.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetGridItemTemplateContext.ts#L12)

The context a widget grid hands to the template that renders one item.

## Properties

### $implicit

```ts
readonly $implicit: IWidgetGridItemDefinition;
```

Defined in: [libs/ui/src/widget/models/IWidgetGridItemTemplateContext.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetGridItemTemplateContext.ts#L21)

The item being rendered.

***

### size

```ts
readonly size: {
  columnSpan: number;
  rowSpan: number;
};
```

Defined in: [libs/ui/src/widget/models/IWidgetGridItemTemplateContext.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetGridItemTemplateContext.ts#L29)

The logical size of the item, including a live resize preview while the user drags a handle.

#### columnSpan

```ts
readonly columnSpan: number;
```

#### rowSpan

```ts
readonly rowSpan: number;
```
