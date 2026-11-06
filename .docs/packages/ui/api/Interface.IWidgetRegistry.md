---
title: 'Interface: IWidgetRegistry'
generated: true
editUrl: false
---
# Interface: IWidgetRegistry

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L16)

The storage port of the widget infrastructure: it keeps the registered widgets and publishes
them in registration-independent order. It holds definitions only — a user's placement of those
widgets is a separate, persisted `IWidgetGridLayout`.

## Properties

### widgetChanged

```ts
readonly widgetChanged: Observable<void>;
```

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L28)

Emits after a widget was registered or unregistered, for consumers that react through RxJS
instead of signals.

***

### widgets

```ts
readonly widgets: Signal<readonly IWidget<IWidgetData>[]>;
```

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L22)

Every registered widget, ordered by `order` and then by id.

## Methods

### all()

```ts
all(): readonly IWidget<IWidgetData>[];
```

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L56)

Reads every registered widget in the order [IWidgetRegistry.widgets](#widgets) publishes.

#### Returns

readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[]

The registered widgets.

***

### get()

```ts
get(widgetId):
  | IWidget<IWidgetData>
  | undefined;
```

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L65)

Reads one registered widget.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgetId` | `string` | The id of the widget. |

#### Returns

  \| [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>
  \| `undefined`

The widget, or `undefined` while it is not registered.

***

### register()

```ts
register(widget): void;
```

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L40)

Registers a widget, replacing a widget already registered under the same id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widget` | [`IWidget`](Interface.IWidget) | The widget to register. |

#### Returns

`void`

***

### unregister()

```ts
unregister(widgetId): void;
```

Defined in: [libs/ui/src/widget/services/IWidgetRegistry.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/IWidgetRegistry.ts#L48)

Unregisters a widget. Unregistering an unknown id is a no-op.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgetId` | `string` | The id of the widget to unregister. |

#### Returns

`void`
