---
title: 'Class: WidgetGridComponent'
generated: true
editUrl: false
---
# Class: WidgetGridComponent

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L63)

Generic configurable widget grid with local persistence.

## Constructors

### Constructor

```ts
new WidgetGridComponent(): WidgetGridComponent;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L79)

Creates and continuously reconciles the grid with its contributed definitions.

#### Returns

`WidgetGridComponent`

## Properties

### editable

```ts
readonly editable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L111)

Whether zone and widget authoring controls are active.

***

### items

```ts
readonly items: InputSignal<readonly IWidgetGridItemDefinition[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L102)

Registry-derived widgets currently available to the user.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<WidgetGridItemTemplate>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L123)

Owning feature template marked with `ngpWidgetGridItem`.

***

### labels

```ts
readonly labels: InputSignal<IWidgetGridLabels>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L108)

Resolved labels for editor and empty states.

***

### layout

```ts
readonly layout: Signal<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L120)

Current reconciled layout.

***

### layoutChange

```ts
readonly layoutChange: OutputEmitterRef<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L114)

Emits the restored layout and every subsequent user change.

***

### persistenceKey

```ts
readonly persistenceKey: InputSignal<string>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L105)

Stable local preference key.

***

### renderedZones

```ts
protected readonly renderedZones: Signal<readonly IWidgetEditorCanvasZone[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L126)

Zones and enabled items in their persisted order.

***

### resizeActiveChange

```ts
readonly resizeActiveChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L117)

Lets the host suspend conflicting interactions while a widget is being resized.

***

### zones

```ts
readonly zones: InputSignal<readonly IWidgetGridZoneDefinition[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L99)

Semantic zones supported by the current page.

## Methods

### moveItem()

```ts
protected moveItem(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:180](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L180)

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

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L199)

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

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L167)

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

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L162)

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

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L157)

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

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:235](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L235)

Restores the contributed default layout and removes the local override.

#### Returns

`void`

***

### resizeItem()

```ts
protected resizeItem(request): void;
```

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L218)

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

Defined in: [libs/ui/src/widget/components/WidgetGridComponent.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridComponent.ts#L230)

Toggles one widget without losing its previous placement.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition) |

#### Returns

`void`
