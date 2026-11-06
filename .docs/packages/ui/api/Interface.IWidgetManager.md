---
title: 'Interface: IWidgetManager'
generated: true
editUrl: false
---
# Interface: IWidgetManager

Defined in: [libs/ui/src/widget/services/IWidgetManager.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetManager.ts#L15)

The composition port of the widget infrastructure: it collects the widgets contributed through
DI and lets a host add or drop widgets at runtime. Storage and ordering are delegated to the
[IWidgetRegistry](Interface.IWidgetRegistry).

## Properties

### widgets

```ts
readonly widgets: Signal<readonly IWidget<IWidgetData>[]>;
```

Defined in: [libs/ui/src/widget/services/IWidgetManager.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetManager.ts#L21)

Every registered widget, ordered by `order` and then by id.

## Methods

### allWidgets()

```ts
allWidgets(): readonly IWidget<IWidgetData>[];
```

Defined in: [libs/ui/src/widget/services/IWidgetManager.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetManager.ts#L49)

Reads every registered widget in the order [IWidgetManager.widgets](#widgets) publishes.

#### Returns

readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[]

The registered widgets.

***

### registerWidget()

```ts
registerWidget(widget): void;
```

Defined in: [libs/ui/src/widget/services/IWidgetManager.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetManager.ts#L33)

Registers a widget, replacing a widget already registered under the same id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widget` | [`IWidget`](Interface.IWidget) | The widget to register. |

#### Returns

`void`

***

### unregisterWidget()

```ts
unregisterWidget(widgetId): void;
```

Defined in: [libs/ui/src/widget/services/IWidgetManager.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetManager.ts#L41)

Unregisters a widget. Unregistering an unknown id is a no-op.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgetId` | `string` | The id of the widget to unregister. |

#### Returns

`void`
