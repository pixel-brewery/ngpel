---
title: 'Class: WidgetRegistry'
generated: true
editUrl: false
---
# Class: WidgetRegistry

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L20)

The in-memory widget store. It is the single source of order: widgets are published sorted by
`order` and then by id, so a dashboard renders the same sequence no matter in which sequence the
feature libraries were composed.

Registered by `provideWidget(...)`.

## Implements

- [`IWidgetRegistry`](Interface.IWidgetRegistry)

## Constructors

### Constructor

```ts
new WidgetRegistry(): WidgetRegistry;
```

#### Returns

`WidgetRegistry`

## Accessors

### widgetChanged

#### Get Signature

```ts
get widgetChanged(): Observable<void>;
```

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L47)

Emits after a widget was registered or unregistered, for consumers that react through RxJS
instead of signals.

##### Returns

`Observable`\<`void`\>

Emits after a widget was registered or unregistered, for consumers that react through RxJS
instead of signals.

#### Implementation of

[`IWidgetRegistry`](Interface.IWidgetRegistry).[`widgetChanged`](Interface.IWidgetRegistry#widgetchanged)

***

### widgets

#### Get Signature

```ts
get widgets(): Signal<readonly IWidget<IWidgetData>[]>;
```

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L37)

Every registered widget, ordered by `order` and then by id.

##### Returns

`Signal`\<readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[]\>

Every registered widget, ordered by `order` and then by id.

#### Implementation of

[`IWidgetRegistry`](Interface.IWidgetRegistry).[`widgets`](Interface.IWidgetRegistry#widgets)

## Methods

### all()

```ts
all(): readonly IWidget<IWidgetData>[];
```

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L86)

Reads every registered widget in the order [IWidgetRegistry.widgets](Interface.IWidgetRegistry#widgets) publishes.

#### Returns

readonly [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>[]

The registered widgets.

#### Implementation of

[`IWidgetRegistry`](Interface.IWidgetRegistry).[`all`](Interface.IWidgetRegistry#all)

***

### get()

```ts
get(widgetId):
  | IWidget<IWidgetData>
  | undefined;
```

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L97)

Reads one registered widget.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgetId` | `string` | The id of the widget. |

#### Returns

  \| [`IWidget`](Interface.IWidget)\<[`IWidgetData`](Interface.IWidgetData)\>
  \| `undefined`

The widget, or `undefined` while it is not registered.

#### Implementation of

[`IWidgetRegistry`](Interface.IWidgetRegistry).[`get`](Interface.IWidgetRegistry#get)

***

### register()

```ts
register(widget): void;
```

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L61)

Registers a widget, replacing a widget already registered under the same id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widget` | [`IWidget`](Interface.IWidget) | The widget to register. |

#### Returns

`void`

#### Implementation of

[`IWidgetRegistry`](Interface.IWidgetRegistry).[`register`](Interface.IWidgetRegistry#register)

***

### unregister()

```ts
unregister(widgetId): void;
```

Defined in: [libs/ui/src/widget/services/WidgetRegistry.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/services/WidgetRegistry.ts#L72)

Unregisters a widget. Unregistering an unknown id is a no-op.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `widgetId` | `string` | The id of the widget to unregister. |

#### Returns

`void`

#### Implementation of

[`IWidgetRegistry`](Interface.IWidgetRegistry).[`unregister`](Interface.IWidgetRegistry#unregister)
