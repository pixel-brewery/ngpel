---
title: 'Class: NavigationMenuItemComponent'
generated: true
editUrl: false
---
# Class: NavigationMenuItemComponent

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L71)

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

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L96)

Whether the item is displayed without a visual label.

***

### item

```ts
readonly item: InputSignal<INavItem>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L104)

Navigation item executed by the underlying navigation directive.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L112)

Already translated visual and accessible label.

***

### menuMode

```ts
readonly menuMode: InputSignal<"inline" | undefined>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L120)

Enables Mosaik's inline submenu behavior for expanded parent items.

## Accessors

### elementRef

#### Get Signature

```ts
get elementRef(): ElementRef<HTMLElement>;
```

Defined in: [libs/ui/src/components/navigation/NavigationMenuItemComponent.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/navigation/NavigationMenuItemComponent.ts#L86)

Element reference used by contextual hover actions.

##### Returns

`ElementRef`\<`HTMLElement`\>
