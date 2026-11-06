---
title: 'Class: WidgetViewDirective'
generated: true
editUrl: false
---
# Class: WidgetViewDirective

Defined in: [libs/ui/src/widget/directives/WidgetViewDirective.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetViewDirective.ts#L41)

Exposes the logical grid size of the surrounding widget to its own template, so a view can trade
detail for space without knowing anything about the grid that placed it.

## Example

```html
<ng-container ngpWidgetView #view="ngpWidgetView">
    @if (view.matches({ columns: { min: 3 } })) {
        <ngp-revenue-chart />
    } @else {
        <ngp-widget-summary label="Revenue" [value]="total()" />
    }
</ng-container>
```

## Constructors

### Constructor

```ts
new WidgetViewDirective(): WidgetViewDirective;
```

#### Returns

`WidgetViewDirective`

## Accessors

### size

#### Get Signature

```ts
get size(): Signal<IWidgetSize>;
```

Defined in: [libs/ui/src/widget/directives/WidgetViewDirective.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetViewDirective.ts#L56)

The current grid span of the surrounding widget, including an active resize preview.

##### Returns

`Signal`\<[`IWidgetSize`](Interface.IWidgetSize)\>

## Methods

### matches()

```ts
matches(condition): boolean;
```

Defined in: [libs/ui/src/widget/directives/WidgetViewDirective.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetViewDirective.ts#L71)

Evaluates whether the current grid span satisfies a template condition.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `condition` | [`IWidgetSizeCondition`](Interface.IWidgetSizeCondition) | The condition declared by the template. |

#### Returns

`boolean`

Whether the current span satisfies the condition.
