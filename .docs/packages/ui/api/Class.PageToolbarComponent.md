---
title: 'Class: PageToolbarComponent'
generated: true
editUrl: false
---
# Class: PageToolbarComponent

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L100)

Hosts a Mosaik page toolbar. In compact mode secondary start actions and end actions that
overflow appear in a menu. A menu choice activates the original projected control.

Apply `data-ngp-toolbar-keep` to keep a slotted button visible. The primary start button and
link buttons stay visible automatically.

## Constructors

### Constructor

```ts
new PageToolbarComponent(): PageToolbarComponent;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L129)

Observes projected controls and reconciles the compact overflow layout.

#### Returns

`PageToolbarComponent`

## Properties

### \_moreActionsLabel

```ts
protected readonly _moreActionsLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L213)

Overrides the accessible label of the menu for overflow actions.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L207)

Accessible name that describes the actions offered by the toolbar.

***

### compact

```ts
readonly compact: InputSignal<boolean | null>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:210](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L210)

Overrides the compact breakpoint. Leave it unset to follow the application's breakpoints.

***

### compactPrimaryLabel

```ts
readonly compactPrimaryLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L231)

Optional short label for the primary start button in compact mode.

***

### isCompact

```ts
readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:234](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L234)

Whether the toolbar currently uses its compact layout.

***

### moreActionsAppearance

```ts
readonly moreActionsAppearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:225](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L225)

Appearance of the button for overflow actions.

***

### moreActionsIconName

```ts
readonly moreActionsIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:222](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L222)

Icon displayed on the button for overflow actions.

***

### moreActionsIconOnly

```ts
readonly moreActionsIconOnly: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L228)

Shows the overflow button label in a tooltip instead of on the button.

***

### moreActionsLabel

```ts
readonly moreActionsLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:216](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L216)

Accessible label of the menu for overflow actions.

***

### overflowActions

```ts
protected readonly overflowActions: Signal<{
  checked: boolean;
  disabled: boolean;
  element: HTMLElement;
  icon: IconSource | undefined;
  label: string;
  testId: string | null;
}[]>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:236](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L236)

## Methods

### activate()

```ts
protected activate(element, menu): void;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L256)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `element` | `HTMLElement` |
| `menu` | `DropDownButtonComponent` |

#### Returns

`void`
