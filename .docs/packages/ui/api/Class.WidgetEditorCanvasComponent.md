---
title: 'Class: WidgetEditorCanvasComponent'
generated: true
editUrl: false
---
# Class: WidgetEditorCanvasComponent

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L306)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L334)

Whether authoring chrome and the snap grid are visible.

***

### itemDropped

```ts
readonly itemDropped: OutputEmitterRef<IWidgetGridItemDropRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:340](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L340)

Requests one widget move within or across zones.

***

### itemHidden

```ts
readonly itemHidden: OutputEmitterRef<IWidgetGridItemDefinition>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:358](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L358)

Requests hiding one widget from the canvas.

***

### itemMoved

```ts
readonly itemMoved: OutputEmitterRef<IWidgetGridItemMoveRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:346](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L346)

Requests one accessible relative item move.

***

### itemMovedToZone

```ts
readonly itemMovedToZone: OutputEmitterRef<IWidgetGridItemMoveRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:349](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L349)

Requests a widget move to a neighboring zone.

***

### itemResized

```ts
readonly itemResized: OutputEmitterRef<IWidgetGridItemResizeRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:352](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L352)

Requests one absolute snapped widget size.

***

### itemTemplate

```ts
readonly itemTemplate: InputSignal<TemplateRef<IWidgetGridItemTemplateContext>>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L328)

Owning feature's concrete widget template.

***

### labels

```ts
readonly labels: InputSignal<IWidgetGridLabels>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:331](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L331)

Resolved editor labels.

***

### layout

```ts
readonly layout: InputSignal<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:325](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L325)

Current persisted layout used for item spans and control availability.

***

### resizeActiveChange

```ts
readonly resizeActiveChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:355](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L355)

Emits when a widget starts or ends a pointer resize.

***

### zoneDropListIds

```ts
protected readonly zoneDropListIds: Signal<string[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:361](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L361)

Connected item drop-list identifiers.

***

### zoneDropped

```ts
readonly zoneDropped: OutputEmitterRef<IWidgetGridZoneDropRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L337)

Requests one zone reorder.

***

### zoneMoved

```ts
readonly zoneMoved: OutputEmitterRef<IWidgetGridZoneMoveRequest>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:343](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L343)

Requests one accessible relative zone move.

***

### zones

```ts
readonly zones: InputSignal<readonly IWidgetEditorCanvasZone[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:322](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L322)

Ordered zones and enabled items rendered on the canvas.

## Methods

### canMoveItem()

```ts
protected canMoveItem(widgetId, delta): boolean;
```

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:404](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L404)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:419](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L419)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:395](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L395)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:390](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L390)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:377](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L377)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:368](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L368)

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

Defined in: [libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts:434](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetEditorCanvasComponent.ts#L434)

Stable item drop-list id for one zone.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `zoneId` | `string` |

#### Returns

`string`
