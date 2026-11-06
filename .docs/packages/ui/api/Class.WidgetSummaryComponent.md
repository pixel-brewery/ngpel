---
title: 'Class: WidgetSummaryComponent'
generated: true
editUrl: false
---
# Class: WidgetSummaryComponent

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L141)

Presents one prominent widget value with a descriptive label, an optional unit and a hint.

The value scales with the width of the widget rather than with a breakpoint, so the same summary
reads correctly in a one-column tile and in a six-column one. Set `compact` for a widget that
shows several summaries side by side.

It renders a description list, so the label stays associated with its value for assistive
technology even though the value is shown first.

## Example

```html
<ngp-widget-summary label="Open tickets" [value]="openTickets()" unit="today" />
```

## Constructors

### Constructor

```ts
new WidgetSummaryComponent(): WidgetSummaryComponent;
```

#### Returns

`WidgetSummaryComponent`

## Properties

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L178)

Whether the summary is rendered at the smaller scale used when a widget shows several of
them next to each other.

***

### hint

```ts
readonly hint: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:169](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L169)

Optional secondary text below the label, such as a comparison or denominator.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L150)

The descriptive label of the value.

***

### unit

```ts
readonly unit: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L166)

The unit shown next to the value.

***

### value

```ts
readonly value: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L158)

The value, already formatted for display.
