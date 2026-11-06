---
title: 'Interface: IWidgetZone'
generated: true
editUrl: false
---
# Interface: IWidgetZone

Defined in: [libs/ui/src/widget/models/IWidgetZone.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetZone.ts#L9)

A page-neutral suggestion for a widget's initial semantic zone. Widgets contribute these
descriptors dynamically, so a new contribution can introduce a zone without a central zone
inventory. The consuming page owns the localized labels and decides whether or how to render a
zone heading.

## Properties

### iconName

```ts
readonly iconName: string;
```

Defined in: [libs/ui/src/widget/models/IWidgetZone.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetZone.ts#L20)

The suggested icon, named in the host's icon vocabulary.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/widget/models/IWidgetZone.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetZone.ts#L15)

The stable free-form identifier used for reconciliation and persistence.

***

### order

```ts
readonly order: number;
```

Defined in: [libs/ui/src/widget/models/IWidgetZone.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/models/IWidgetZone.ts#L25)

The suggested order before the user customizes the layout.
