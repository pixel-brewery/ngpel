---
title: 'Class: WidgetManager'
generated: true
editUrl: false
---
# Class: WidgetManager

Defined in: [libs/ui/src/widget/services/WidgetManager.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetManager.ts#L22)

Collects the widgets contributed under the [WIDGET](Variable.WIDGET) multi-token and registers them in the
[WidgetRegistry](Class.WidgetRegistry), which stays the only store and the only order. A host may still add or
drop widgets afterwards — a widget that only exists for one tenant, or one that a background
capability check turns out to allow.

Registered by `provideWidget(...)`.

## Implements

- [`IWidgetManager`](Interface.IWidgetManager)

## Constructors

### Constructor

```ts
new WidgetManager(): WidgetManager;
```

Defined in: [libs/ui/src/widget/services/WidgetManager.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetManager.ts#L36)

Constructs a new instance of the `WidgetManager` class.

#### Returns

`WidgetManager`

## Accessors

### widgets

#### Get Signature

```ts
get widgets(): Signal<readonly IWidget<IWidgetData>[]>;
```

Defined in: [libs/ui/src/widget/services/WidgetManager.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetManager.ts#L52)

Every registered widget, ordered by `order` and then by id.

##### Returns

`Signal`\<readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[]\>

Every registered widget, ordered by `order` and then by id.

#### Implementation of

[`IWidgetManager`](Interface.IWidgetManager).[`widgets`](Interface.IWidgetManager#widgets)

## Methods

### allWidgets()

```ts
allWidgets(): readonly IWidget<IWidgetData>[];
```

Defined in: [libs/ui/src/widget/services/WidgetManager.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetManager.ts#L86)

Reads every registered widget in the order [IWidgetManager.widgets](Interface.IWidgetManager#widgets) publishes.

#### Returns

readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[]

The registered widgets.

#### Implementation of

[`IWidgetManager`](Interface.IWidgetManager).[`allWidgets`](Interface.IWidgetManager#allwidgets)

***

### registerWidget()

```ts
registerWidget(widget): void;
```

Defined in: [libs/ui/src/widget/services/WidgetManager.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetManager.ts#L66)

Registers a widget, replacing a widget already registered under the same id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widget` | [`IWidget`](Interface.IWidget) | The widget to register. |

#### Returns

`void`

#### Implementation of

[`IWidgetManager`](Interface.IWidgetManager).[`registerWidget`](Interface.IWidgetManager#registerwidget)

***

### unregisterWidget()

```ts
unregisterWidget(widgetId): void;
```

Defined in: [libs/ui/src/widget/services/WidgetManager.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetManager.ts#L76)

Unregisters a widget. Unregistering an unknown id is a no-op.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgetId` | `string` | The id of the widget to unregister. |

#### Returns

`void`

#### Implementation of

[`IWidgetManager`](Interface.IWidgetManager).[`unregisterWidget`](Interface.IWidgetManager#unregisterwidget)
