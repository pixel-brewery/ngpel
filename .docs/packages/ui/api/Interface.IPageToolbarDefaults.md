---
title: 'Interface: IPageToolbarDefaults'
generated: true
editUrl: false
---
# Interface: IPageToolbarDefaults

Defined in: [libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts#L8)

Application defaults for the page toolbar. Label getters can read translation signals.

## Properties

### compactPrimaryLabel?

```ts
readonly compactPrimaryLabel?: string | (() => string);
```

Defined in: [libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts#L10)

Optional short label for the primary start button in compact mode.

***

### moreActionsAppearance?

```ts
readonly moreActionsAppearance?: Appearance;
```

Defined in: [libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts#L16)

Appearance of the overflow button.

***

### moreActionsIconName?

```ts
readonly moreActionsIconName?: string;
```

Defined in: [libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts#L14)

Registered icon name of the overflow button.

***

### moreActionsIconOnly?

```ts
readonly moreActionsIconOnly?: boolean;
```

Defined in: [libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts#L18)

Shows the overflow button label in a tooltip instead of on the button.

***

### moreActionsLabel?

```ts
readonly moreActionsLabel?: string | (() => string);
```

Defined in: [libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/IPageToolbarDefaults.ts#L12)

Accessible label of the menu for overflow actions.
