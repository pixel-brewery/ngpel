---
title: 'Class: NavigationMenuItemComponent'
generated: true
editUrl: false
---
# Class: NavigationMenuItemComponent

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L68)

Application navigation item backed by a Mosaik menu item.

The compact state removes only the visual label. The accessible name remains
attached to the interactive Mosaik element and is also exposed as a tooltip.

## Constructors

### Constructor

```ts
new NavigationMenuItemComponent(): NavigationMenuItemComponent;
```

#### Returns

`NavigationMenuItemComponent`

## Properties

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L93)

Whether the item is displayed without a visual label.

***

### item

```ts
readonly item: InputSignal<INavItem>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L101)

Navigation item executed by the underlying navigation directive.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L109)

Already translated visual and accessible label.

***

### menuMode

```ts
readonly menuMode: InputSignal<"inline" | undefined>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L117)

Enables Mosaik's inline submenu behavior for expanded parent items.

## Accessors

### elementRef

#### Get Signature

```ts
get elementRef(): ElementRef<HTMLElement>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L83)

Element reference used by contextual hover actions.

##### Returns

`ElementRef`\<`HTMLElement`\>
