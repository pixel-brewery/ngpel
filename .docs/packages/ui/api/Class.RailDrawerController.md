---
title: 'Class: RailDrawerController'
generated: true
editUrl: false
---
# Class: RailDrawerController

Defined in: [libs/ui/src/services/RailDrawerController.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L23)

Coordinates an expandable generic rail with its host drawer width.

## Constructors

### Constructor

```ts
new RailDrawerController(options): RailDrawerController;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L44)

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

Defined in: [libs/ui/src/services/RailDrawerController.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L58)

Indicates whether expanded rail content is visible.

##### Returns

`Signal`\<`boolean`\>

## Methods

### close()

```ts
close(): void;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L100)

Restores the compact rail and the drawer's original width.

#### Returns

`void`

***

### open()

```ts
open(): void;
```

Defined in: [libs/ui/src/services/RailDrawerController.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/services/RailDrawerController.ts#L71)

Expands the generic rail and its host drawer once.

#### Returns

`void`
