---
title: 'Class: DrawerExteriorPlacementDirective'
generated: true
editUrl: false
---
# Class: DrawerExteriorPlacementDirective

Defined in: [libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts#L21)

Places contextual drawer content outside the drawer on its leading backdrop edge.

The host must be projected through the drawer's Mosaik portal so drawer transforms
and overflow clipping cannot hide the externally positioned content.

## Implements

- `AfterViewInit`

## Constructors

### Constructor

```ts
new DrawerExteriorPlacementDirective(): DrawerExteriorPlacementDirective;
```

Defined in: [libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts#L47)

Constructs a drawer-opposite placement behavior.

#### Returns

`DrawerExteriorPlacementDirective`

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): Promise<void>;
```

Defined in: [libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/drawer-exterior-placement/DrawerExteriorPlacementDirective.ts#L72)

Resolves the documented Mosaik drawer root after both Angular and Lit have rendered it.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AfterViewInit.ngAfterViewInit`
