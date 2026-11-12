---
title: 'Interface: IWidget\<TData\>'
generated: true
editUrl: false
---
# Interface: IWidget\<TData\>

Defined in: [libs/ui/src/widget/models/IWidget.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L37)

One dashboard widget, contributed as plain data so any host can render the same registry: its
identity and order, its reactive display text, the default placement and resize constraints it
asks for, and the lazily loaded components that make up its faces.

A widget describes itself and nothing else. Where it currently sits is user state and lives in a
persisted `IWidgetGridLayout`; what it renders is the host's business.

## Example

```typescript
const widget: IWidget = {
    id: 'pipeline',
    order: 10,
    title: computed(() => translate('widgets.pipeline.title')),
    layout: {
        defaultZone: { id: 'operations', iconName: 'board', order: 0 },
        enabledByDefault: true,
        columnSpan: { default: 3, min: 1, max: 6 },
        rowSpan: { default: 2, min: 1, max: 4 }
    },
    views: { front: async () => (await import('./PipelineWidgetView')).PipelineWidgetView }
};
```

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tdata"></a> `TData` *extends* [`IWidgetData`](Interface.IWidgetData) | [`IWidgetData`](Interface.IWidgetData) | The shape of the optional payload the widget's views read back. |

## Properties

### canActivate?

```ts
readonly canActivate?: () => boolean;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L76)

Decides whether the widget is available at all — a permission check, a licence, a feature
flag. An absent predicate means the widget is always available.

#### Returns

`boolean`

***

### data?

```ts
readonly data?: TData;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L81)

The payload handed to the widget's views, usually through the `WIDGET_DATA` token.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L44)

The unique identifier of the widget. Registering a second widget under the same id replaces
the first one.

***

### layout

```ts
readonly layout: IWidgetLayout;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L65)

The default grid placement and the resize constraints of the widget.

***

### order

```ts
readonly order: number;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L50)

The display order within a zone. Lower values come first; ties are broken by id so the order
never depends on registration timing.

***

### subTitle?

```ts
readonly subTitle?: Signal<string>;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L60)

The widget subtitle, as a signal.

***

### title

```ts
readonly title: Signal<string>;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L55)

The widget title, as a signal so a host may resolve it from a translation that arrives late.

***

### views

```ts
readonly views: IWidgetViews;
```

Defined in: [libs/ui/src/widget/models/IWidget.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidget.ts#L70)

The lazily loaded components rendered for this widget.
