---
title: 'Class: DrawerExteriorPlacementDirective'
generated: true
editUrl: false
---
# Class: DrawerExteriorPlacementDirective

Defined in: [libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts#L22)

Places contextual drawer content outside the drawer on its leading backdrop edge.

The host must be projected through the drawer's Mosaik portal so drawer transforms
and overflow clipping cannot hide the externally positioned content. The host stays
hidden when the drawer and its exterior content do not fit side by side in the viewport.

## Implements

- `AfterViewInit`

## Constructors

### Constructor

```ts
new DrawerExteriorPlacementDirective(): DrawerExteriorPlacementDirective;
```

Defined in: [libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts#L48)

Constructs a drawer-opposite placement behavior.

#### Returns

`DrawerExteriorPlacementDirective`

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): Promise<void>;
```

Defined in: [libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts#L73)

Resolves the documented Mosaik drawer root after both Angular and Lit have rendered it.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AfterViewInit.ngAfterViewInit`
