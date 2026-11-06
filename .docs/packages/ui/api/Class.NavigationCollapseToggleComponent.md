---
title: 'Class: NavigationCollapseToggleComponent'
generated: true
editUrl: false
---
# Class: NavigationCollapseToggleComponent

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:67

Switches the application navigation between its labelled and icon-only forms.
The shell owns the persisted state and positions the control through its inline and block offsets.

## Constructors

### Constructor

```ts
new NavigationCollapseToggleComponent(): NavigationCollapseToggleComponent;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:80

Connects the navigation hover group and optional platform shortcut to the toggle lifetime.

#### Returns

`NavigationCollapseToggleComponent`

## Properties

### ariaShortcut

```ts
protected readonly ariaShortcut: Signal<string | null>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:131

***

### collapsed

```ts
readonly collapsed: InputSignal<boolean>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:114

Whether the shell currently renders icon-only navigation.

***

### collapsedChange

```ts
readonly collapsedChange: OutputEmitterRef<boolean>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:126

Requested state. The shell applies and persists it.

***

### controlKeyLabel

```ts
readonly controlKeyLabel: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:120

Localized name of Ctrl displayed in the shortcut tooltip.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:122

Whether pointer and keyboard activation are unavailable.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:116

Accessible name of the current action, supplied by the shell.

***

### navigation

```ts
readonly navigation: InputSignal<IHasElementRef | null>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:112

Navigation host providing the hover region and accessible controls ID.

***

### navigationId

```ts
protected readonly navigationId: Signal<string | null>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:130

***

### revealed

```ts
readonly revealed: Signal<boolean>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:128

Whether navigation hover or keyboard focus reveals the toggle.

***

### shortcutKey

```ts
readonly shortcutKey: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:118

Optional key to combine with Ctrl or Command.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:124

Optional automation identifier for the action.

***

### tooltip

```ts
protected readonly tooltip: Signal<string>;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:135

## Methods

### activate()

```ts
protected activate(): void;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:147

#### Returns

`void`

***

### focusEntered()

```ts
protected focusEntered(event): void;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:153

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

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:158

#### Returns

`void`

***

### keyboardFocused()

```ts
protected keyboardFocused(): void;
```

Defined in: libs/ui/src/components/navigation/NavigationCollapseToggleComponent.ts:162

#### Returns

`void`
