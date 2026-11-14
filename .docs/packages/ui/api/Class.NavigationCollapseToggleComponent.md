---
title: 'Class: NavigationCollapseToggleComponent'
generated: true
editUrl: false
---
# Class: NavigationCollapseToggleComponent

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L96)

Switches the application navigation between its labelled and icon-only forms.
The shell owns the persisted state and positions the control through its inline and block offsets.

## Constructors

### Constructor

```ts
new NavigationCollapseToggleComponent(): NavigationCollapseToggleComponent;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L109)

Connects the navigation hover group and optional platform shortcut to the toggle lifetime.

#### Returns

`NavigationCollapseToggleComponent`

## Properties

### ariaShortcut

```ts
protected readonly ariaShortcut: Signal<string | null>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L162)

***

### collapsed

```ts
readonly collapsed: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L143)

Whether the shell currently renders icon-only navigation.

***

### collapsedChange

```ts
readonly collapsedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L157)

Requested state. The shell applies and persists it.

***

### controlKeyLabel

```ts
readonly controlKeyLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L149)

Localized name of Ctrl displayed in the shortcut tooltip.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L151)

Whether pointer and keyboard activation are unavailable.

***

### edgeButton

```ts
readonly edgeButton: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L153)

Uses a larger pointer target around the floating button when it straddles a panel edge.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L145)

Accessible name of the current action, supplied by the shell.

***

### navigation

```ts
readonly navigation: InputSignal<IHasElementRef | null>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L141)

Navigation host providing the hover region and accessible controls ID.

***

### navigationId

```ts
protected readonly navigationId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L161)

***

### revealed

```ts
readonly revealed: Signal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:159](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L159)

Whether navigation hover or keyboard focus reveals the toggle.

***

### shortcutKey

```ts
readonly shortcutKey: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L147)

Optional key to combine with Ctrl or Command.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L155)

Optional automation identifier for the action.

***

### tooltip

```ts
protected readonly tooltip: Signal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L166)

## Methods

### activate()

```ts
protected activate(): void;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L178)

#### Returns

`void`

***

### focusEntered()

```ts
protected focusEntered(event): void;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:184](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L184)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `FocusEvent` |

#### Returns

`void`

***

### focusLeft()

```ts
protected focusLeft(): void;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L193)

#### Returns

`void`

***

### keyboardFocused()

```ts
protected keyboardFocused(): void;
```

Defined in: [libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts#L197)

#### Returns

`void`
