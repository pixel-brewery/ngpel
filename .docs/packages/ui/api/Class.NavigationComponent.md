---
title: 'Class: NavigationComponent'
generated: true
editUrl: false
---
# Class: NavigationComponent

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L66)

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

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L78)

Accessible name for the primary navigation region.

***

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L86)

Whether the navigation is displayed as an icon-only rail.

***

### elementRef

```ts
readonly elementRef: ElementRef<HTMLElement>;
```

Defined in: [libs/ui/src/components/navigation/NavigationComponent.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationComponent.ts#L70)

Host element used by a collapse toggle positioned alongside this navigation.
