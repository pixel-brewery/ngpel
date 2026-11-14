---
title: 'Class: NavigationComponent'
generated: true
editUrl: false
---
# Class: NavigationComponent

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L87)

Provides the layout shell for an application navigation surface.

Consumers project the brand, primary navigation, and footer controls into
dedicated content areas while retaining ownership of application state.

## Constructors

### Constructor

```ts
new NavigationComponent(): NavigationComponent;
```

#### Returns

`NavigationComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L99)

Accessible name for the primary navigation region.

***

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L107)

Whether the navigation is displayed as an icon-only rail.

***

### elementRef

```ts
readonly elementRef: ElementRef<HTMLElement>;
```

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L91)

Host element used by a collapse toggle positioned alongside this navigation.

***

### showScrollControls

```ts
readonly showScrollControls: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L110)

Uses the Mosaik vertical scrollbar and scroll buttons for overflowing navigation.
