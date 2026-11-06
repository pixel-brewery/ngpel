---
title: 'Class: WidgetSummaryComponent'
generated: true
editUrl: false
---
# Class: WidgetSummaryComponent

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L127)

Presents one prominent widget value with its descriptive label, and optionally a unit.

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

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L161)

Whether the summary is rendered at the smaller scale used when a widget shows several of
them next to each other.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L136)

The descriptive label of the value.

***

### unit

```ts
readonly unit: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L152)

The unit shown next to the value.

***

### value

```ts
readonly value: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetSummaryComponent.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetSummaryComponent.ts#L144)

The value, already formatted for display.
