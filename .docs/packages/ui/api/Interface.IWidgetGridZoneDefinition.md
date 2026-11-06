---
title: 'Interface: IWidgetGridZoneDefinition'
generated: true
editUrl: false
---
# Interface: IWidgetGridZoneDefinition

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts#L8)

One semantic zone a widget grid renders, with its text already resolved. The layout algebra is
i18n-agnostic on purpose: it receives finished strings and never a translation key, so nothing
about a persisted layout depends on the language it was created in.

## Properties

### description

```ts
readonly description: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts#L29)

The resolved explanatory zone text.

***

### iconName

```ts
readonly iconName: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts#L19)

The icon shown in the zone header, named in the host's icon vocabulary.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts#L14)

The stable zone identifier used by widget defaults and persisted layouts.

***

### label

```ts
readonly label: string;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts#L24)

The resolved zone title.

***

### order

```ts
readonly order: number;
```

Defined in: [libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/layout/IWidgetGridZoneDefinition.ts#L34)

The zone order used until the user reorders the zones.
