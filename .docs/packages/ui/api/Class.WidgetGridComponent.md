---
title: 'Class: WidgetGridComponent'
generated: true
editUrl: false
---
# Class: WidgetGridComponent

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L62)

Generic configurable widget grid with local persistence.

## Constructors

### Constructor

```ts
new WidgetGridComponent(): WidgetGridComponent;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L78)

Creates and continuously reconciles the grid with its contributed definitions.

#### Returns

`WidgetGridComponent`

## Properties

### editable

```ts
readonly editable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L110)

Whether zone and widget authoring controls are active.

***

### items

```ts
readonly items: InputSignal<readonly IWidgetGridItemDefinition[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L101)

Registry-derived widgets currently available to the user.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<WidgetGridItemTemplate>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L119)

Owning feature template marked with `ngpWidgetGridItem`.

***

### labels

```ts
readonly labels: InputSignal<IWidgetGridLabels>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L107)

Resolved labels for editor and empty states.

***

### layout

```ts
readonly layout: Signal<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L116)

Current reconciled layout.

***

### layoutChange

```ts
readonly layoutChange: OutputEmitterRef<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L113)

Emits the restored layout and every subsequent user change.

***

### persistenceKey

```ts
readonly persistenceKey: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L104)

Stable local preference key.

***

### renderedZones

```ts
protected readonly renderedZones: Signal<readonly IWidgetEditorCanvasZone[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L122)

Zones and enabled items in their persisted order.

***

### zones

```ts
readonly zones: InputSignal<readonly IWidgetGridZoneDefinition[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L98)

Semantic zones supported by the current page.

## Methods

### moveItem()

```ts
protected moveItem(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L176)

Reorders a widget inside its current zone without requiring a drag gesture.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IWidgetGridItemMoveRequest` |

#### Returns

`void`

***

### moveItemToZone()

```ts
protected moveItemToZone(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L195)

Moves a widget to the preceding or following zone without requiring a drag gesture.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IWidgetGridItemMoveRequest` |

#### Returns

`void`

***

### moveZone()

```ts
protected moveZone(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L163)

Moves a zone one position without requiring a drag gesture.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IWidgetGridZoneMoveRequest` |

#### Returns

`void`

***

### onItemDrop()

```ts
protected onItemDrop(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L158)

Moves a widget within or across connected Angular CDK drop lists.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IWidgetGridItemDropRequest` |

#### Returns

`void`

***

### onZoneDrop()

```ts
protected onZoneDrop(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L153)

Applies a zone reorder emitted by the editor canvas.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IWidgetGridZoneDropRequest` |

#### Returns

`void`

***

### resetLayout()

```ts
resetLayout(): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L231)

Restores the contributed default layout and removes the local override.

#### Returns

`void`

***

### resizeItem()

```ts
protected resizeItem(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:214](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L214)

Applies an absolute snapped size emitted by the editor canvas.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IWidgetGridItemResizeRequest` |

#### Returns

`void`

***

### toggleItem()

```ts
toggleItem(item): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:226](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L226)

Toggles one widget without losing its previous placement.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition) |

#### Returns

`void`
