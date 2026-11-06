---
title: 'Class: PageToolbarComponent'
generated: true
editUrl: false
---
# Class: PageToolbarComponent

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L93)

Hosts a Mosaik page toolbar. In compact mode secondary start actions and end actions that
overflow appear in a menu. A menu choice activates the original projected control.

Apply `data-ngp-toolbar-keep` to keep a slotted button visible. The primary start button and
link buttons stay visible automatically.

## Constructors

### Constructor

```ts
new PageToolbarComponent(): PageToolbarComponent;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:121](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L121)

Observes projected controls and reconciles the compact overflow layout.

#### Returns

`PageToolbarComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L195)

Accessible name that describes the actions offered by the toolbar.

***

### compact

```ts
readonly compact: InputSignal<boolean | null>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:198](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L198)

Overrides the compact breakpoint. Leave it unset to follow the application's breakpoints.

***

### isCompact

```ts
readonly isCompact: Signal<boolean>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L204)

Whether the toolbar currently uses its compact layout.

***

### moreActionsLabel

```ts
readonly moreActionsLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:201](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L201)

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

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:206](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L206)

## Methods

### activate()

```ts
protected activate(element, menu): void;
```

Defined in: [libs/ui/src/components/page-toolbar/PageToolbarComponent.ts:226](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/PageToolbarComponent.ts#L226)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `element` | `HTMLElement` |
| `menu` | `DropDownButtonComponent` |

#### Returns

`void`
