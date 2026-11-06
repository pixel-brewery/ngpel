---
title: 'Class: WidgetGridToolboxComponent'
generated: true
editUrl: false
---
# Class: WidgetGridToolboxComponent

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L80)

Renders the available widget selection independently from its owning surface.

## Constructors

### Constructor

```ts
new WidgetGridToolboxComponent(): WidgetGridToolboxComponent;
```

#### Returns

`WidgetGridToolboxComponent`

## Properties

### groups

```ts
protected readonly groups: Signal<readonly IWidgetGridToolboxGroup[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L95)

***

### items

```ts
readonly items: InputSignal<readonly IWidgetGridItemDefinition[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L90)

***

### itemToggled

```ts
readonly itemToggled: OutputEmitterRef<IWidgetGridItemDefinition>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L93)

***

### labels

```ts
readonly labels: InputSignal<IWidgetGridLabels>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L92)

***

### layout

```ts
readonly layout: InputSignal<IWidgetGridLayout>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L91)

***

### zones

```ts
readonly zones: InputSignal<readonly IWidgetGridZoneDefinition[]>;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L89)

## Methods

### isItemEnabled()

```ts
protected isItemEnabled(itemId): boolean;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L123)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemId` | `string` |

#### Returns

`boolean`

***

### itemSizeConstraints()

```ts
protected itemSizeConstraints(item): string;
```

Defined in: [libs/ui/src/widget/components/WidgetGridToolboxComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/components/WidgetGridToolboxComponent.ts#L127)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | [`IWidgetGridItemDefinition`](Interface.IWidgetGridItemDefinition) |

#### Returns

`string`
