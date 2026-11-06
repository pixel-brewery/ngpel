---
title: 'Class: WidgetGridItemComponent'
generated: true
editUrl: false
---
# Class: WidgetGridItemComponent

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:449](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L449)

Renders one editable widget-grid item including controls, ghost, placeholder, and resize feedback.

## Constructors

### Constructor

```ts
new WidgetGridItemComponent(): WidgetGridItemComponent;
```

#### Returns

`WidgetGridItemComponent`

## Properties

### canMoveEarlier

```ts
readonly canMoveEarlier: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:478](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L478)

Whether the item can move one position earlier.

***

### canMoveLater

```ts
readonly canMoveLater: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:481](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L481)

Whether the item can move one position later.

***

### canMoveToNextZone

```ts
readonly canMoveToNextZone: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:487](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L487)

Whether the item can move to the following zone.

***

### canMoveToPreviousZone

```ts
readonly canMoveToPreviousZone: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:484](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L484)

Whether the item can move to the preceding zone.

***

### columnSpan

```ts
protected readonly columnSpan: Signal<number>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:508](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L508)

Logical column span, including an active resize preview.

***

### editable

```ts
readonly editable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:475](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L475)

Whether editing chrome is active.

***

### hidden

```ts
readonly hidden: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:502](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L502)

Requests removal from the visible canvas.

***

### item

```ts
readonly item: InputSignal<IWidgetGridItemDefinition>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:463](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L463)

Registry-derived item definition.

***

### itemTemplate

```ts
readonly itemTemplate: InputSignal<TemplateRef<IWidgetGridItemTemplateContext>>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:469](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L469)

Owning feature's concrete widget template.

***

### itemTemplateContext

```ts
protected readonly itemTemplateContext: Signal<IWidgetGridItemTemplateContext>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:517](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L517)

Context passed to the feature-owned item template.

***

### labels

```ts
readonly labels: InputSignal<IWidgetGridLabels>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:472](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L472)

Resolved editor labels.

***

### layout

```ts
readonly layout: InputSignal<IWidgetGridItemLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:466](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L466)

Current persisted placement of the item.

***

### mediumColumnSpan

```ts
protected readonly mediumColumnSpan: Signal<number>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:511](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L511)

Column span used by the two-column breakpoint.

***

### moved

```ts
readonly moved: OutputEmitterRef<number>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:490](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L490)

Requests a relative move inside the current zone.

***

### movedToZone

```ts
readonly movedToZone: OutputEmitterRef<number>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:493](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L493)

Requests a move to a neighboring zone.

***

### resizeActiveChange

```ts
readonly resizeActiveChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:499](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L499)

Emits when a pointer resize starts or ends.

***

### resizeConfiguration

```ts
protected readonly resizeConfiguration: Signal<IWidgetGridResizeConfiguration>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:526](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L526)

Configuration consumed by every directional resize handle.

***

### resized

```ts
readonly resized: OutputEmitterRef<IWidgetGridResizePreview>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:496](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L496)

Requests a persisted absolute size.

***

### resizePreview

```ts
protected readonly resizePreview: Signal<
  | IWidgetGridResizePreview
| null>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:505](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L505)

Current live resize target.

***

### rowSpan

```ts
protected readonly rowSpan: Signal<number>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:514](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L514)

Logical row span, including an active resize preview.

## Methods

### canResize()

```ts
protected canResize(columnDelta, rowDelta): boolean;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:554](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L554)

Whether the requested size change stays inside the contribution constraints.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `columnDelta` | `number` |
| `rowDelta` | `number` |

#### Returns

`boolean`

***

### onResized()

```ts
protected onResized(preview): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:549](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L549)

Forwards a completed resize to the owning grid.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `preview` | [`IWidgetGridResizePreview`](Interface.IWidgetGridResizePreview) |

#### Returns

`void`

***

### onResizePreview()

```ts
protected onResizePreview(preview): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:540](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L540)

Applies or clears live resize feedback.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `preview` | \| [`IWidgetGridResizePreview`](Interface.IWidgetGridResizePreview) \| `null` |

#### Returns

`void`

***

### resizeBy()

```ts
protected resizeBy(columnDelta, rowDelta): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridItemComponent.ts:567](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridItemComponent.ts#L567)

Emits a keyboard/menu-driven size change as an absolute target.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `columnDelta` | `number` |
| `rowDelta` | `number` |

#### Returns

`void`
