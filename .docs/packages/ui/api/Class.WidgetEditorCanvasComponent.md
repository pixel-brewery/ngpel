---
title: 'Class: WidgetEditorCanvasComponent'
generated: true
editUrl: false
---
# Class: WidgetEditorCanvasComponent

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:305](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L305)

Visual authoring canvas for semantic zones and their widget grid items.

The component owns editor rendering and gesture targets, while persistence and
immutable layout mutations remain in `WidgetGridComponent` and `WidgetGridLayout`.

## Constructors

### Constructor

```ts
new WidgetEditorCanvasComponent(): WidgetEditorCanvasComponent;
```

#### Returns

`WidgetEditorCanvasComponent`

## Properties

### editable

```ts
readonly editable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:333](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L333)

Whether authoring chrome and the snap grid are visible.

***

### itemDropped

```ts
readonly itemDropped: OutputEmitterRef<IWidgetGridItemDropRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:339](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L339)

Requests one widget move within or across zones.

***

### itemHidden

```ts
readonly itemHidden: OutputEmitterRef<IWidgetGridItemDefinition>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:354](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L354)

Requests hiding one widget from the canvas.

***

### itemMoved

```ts
readonly itemMoved: OutputEmitterRef<IWidgetGridItemMoveRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:345](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L345)

Requests one accessible relative item move.

***

### itemMovedToZone

```ts
readonly itemMovedToZone: OutputEmitterRef<IWidgetGridItemMoveRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:348](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L348)

Requests a widget move to a neighboring zone.

***

### itemResized

```ts
readonly itemResized: OutputEmitterRef<IWidgetGridItemResizeRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:351](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L351)

Requests one absolute snapped widget size.

***

### itemTemplate

```ts
readonly itemTemplate: InputSignal<TemplateRef<IWidgetGridItemTemplateContext>>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L327)

Owning feature's concrete widget template.

***

### labels

```ts
readonly labels: InputSignal<IWidgetGridLabels>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L330)

Resolved editor labels.

***

### layout

```ts
readonly layout: InputSignal<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:324](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L324)

Current persisted layout used for item spans and control availability.

***

### zoneDropListIds

```ts
protected readonly zoneDropListIds: Signal<string[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L357)

Connected item drop-list identifiers.

***

### zoneDropped

```ts
readonly zoneDropped: OutputEmitterRef<IWidgetGridZoneDropRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:336](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L336)

Requests one zone reorder.

***

### zoneMoved

```ts
readonly zoneMoved: OutputEmitterRef<IWidgetGridZoneMoveRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:342](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L342)

Requests one accessible relative zone move.

***

### zones

```ts
readonly zones: InputSignal<readonly IWidgetEditorCanvasZone[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L321)

Ordered zones and enabled items rendered on the canvas.

## Methods

### canMoveItem()

```ts
protected canMoveItem(widgetId, delta): boolean;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:400](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L400)

Whether a widget can move in the requested direction inside its zone.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `widgetId` | `string` |
| `delta` | `number` |

#### Returns

`boolean`

***

### canMoveItemToZone()

```ts
protected canMoveItemToZone(widgetId, delta): boolean;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:415](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L415)

Whether a widget can move to a neighboring zone.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `widgetId` | `string` |
| `delta` | `number` |

#### Returns

`boolean`

***

### canMoveZone()

```ts
protected canMoveZone(zoneId, delta): boolean;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:391](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L391)

Whether a zone can move in the requested direction.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `zoneId` | `string` |
| `delta` | `number` |

#### Returns

`boolean`

***

### itemLayout()

```ts
protected itemLayout(widgetId):
  | IWidgetGridItemLayout
  | undefined;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:386](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L386)

Current persisted item placement.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `widgetId` | `string` |

#### Returns

  \| [`IWidgetGridItemLayout`](Interface.IWidgetGridItemLayout)
  \| `undefined`

***

### onItemDrop()

```ts
protected onItemDrop(event): void;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:373](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L373)

Converts an Angular CDK item drop into a stable request.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `CdkDragDrop`\<`string`, `string`, [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition)\> |

#### Returns

`void`

***

### onZoneDrop()

```ts
protected onZoneDrop(event): void;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:364](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L364)

Converts an Angular CDK zone drop into a stable request.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `CdkDragDrop`\<readonly [`IWidgetEditorCanvasZone`](Interface.IWidgetEditorCanvasZone)[]\> |

#### Returns

`void`

***

### zoneDropListId()

```ts
protected zoneDropListId(zoneId): string;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:430](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L430)

Stable item drop-list id for one zone.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `zoneId` | `string` |

#### Returns

`string`
