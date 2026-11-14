---
title: 'Class: RailDrawerController'
generated: true
editUrl: false
---
# Class: RailDrawerController

Defined in: [libs/ui/src/services/RailDrawerController.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L35)

Coordinates a generic rail with its host drawer: the docked rail expands the drawer
for its content, the floating rail gives its column back to the drawer body and
anchors the floating actions above the drawer footer.

## Constructors

### Constructor

```ts
new RailDrawerController(options): RailDrawerController;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L73)

Constructs a controller for one host drawer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `IRailDrawerOptions` | Drawer element and width accessors. |

#### Returns

`RailDrawerController`

## Accessors

### isOpen

#### Get Signature

```ts
get isOpen(): Signal<boolean>;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L87)

Indicates whether expanded rail content is visible.

##### Returns

`Signal`\<`boolean`\>

## Methods

### close()

```ts
close(): void;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:130](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L130)

Restores the compact rail and the drawer's original width.

#### Returns

`void`

***

### dock()

```ts
dock(): void;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:182](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L182)

Restores the docked rail column and releases everything the floating layer reserved.

#### Returns

`void`

***

### float()

```ts
float(layer): void;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L149)

Gives the rail column back to the drawer body and keeps the supplied layer anchored
above the drawer footer, independent of the scroll position. The scroll container
beneath the layer reserves room so its last content can be scrolled clear of it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layer` | `HTMLElement` | Element that carries the floating rail actions. |

#### Returns

`void`

***

### open()

```ts
open(): void;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L101)

Expands the docked rail and its host drawer once. A floating rail never widens
the drawer because its content opens in a sheet instead.

#### Returns

`void`
