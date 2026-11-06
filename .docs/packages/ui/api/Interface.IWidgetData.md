---
title: 'Interface: IWidgetData'
generated: true
editUrl: false
---
# Interface: IWidgetData

Defined in: [libs/ui/src/widget/models/IWidgetData.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetData.ts#L8)

The data payload attached to one widget instance. A widget shell binds it into the child
injector of the rendered view under `WIDGET_DATA`, which is how a view reads what its widget was
configured with without the registry knowing the payload's shape.

## Indexable

```ts
[key: string]: unknown
```

Free-form payload entries owned by the contributing feature.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/widget/models/IWidgetData.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetData.ts#L14)

The unique identifier of this payload.
