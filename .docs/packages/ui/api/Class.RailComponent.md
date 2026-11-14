---
title: 'Class: RailComponent'
generated: true
editUrl: false
---
# Class: RailComponent

Defined in: [libs/ui/src/components/rail/RailComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L204)

Coordinates a compact action list with one independently declared drawer rail at a time.

## Implements

- `AfterContentInit`
- [`IRailHost`](Interface.IRailHost)

## Constructors

### Constructor

```ts
new RailComponent(): RailComponent;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:242](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L242)

Constructs a rail coordinator and restores its drawer when the local rail is destroyed.

#### Returns

`RailComponent`

## Properties

### activeContentKey

```ts
readonly activeContentKey: Signal<string | null>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:341](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L341)

Key of the independently declared content currently visible in the rail.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`activeContentKey`](Interface.IRailHost#activecontentkey)

***

### backLabel

```ts
readonly backLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:305](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L305)

Accessible label and tooltip of the generic return action.

***

### backTestId

```ts
readonly backTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:313](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L313)

Stable automation contract for the generic return action.

***

### closeLabel

```ts
readonly closeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L330)

Accessible label of the sheet's close action.

***

### closeTestId

```ts
readonly closeTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:333](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L333)

Optional automation identifier for the sheet's close action.

***

### contents

```ts
protected readonly contents: QueryList<RailContentDirective>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:350](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L350)

Rail contents registered below this local coordinator.

***

### floating

```ts
readonly floating: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:316](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L316)

Presents activated content in a sheet, leaving the host drawer width intact.

***

### isAdaptiveDrawer

```ts
protected readonly isAdaptiveDrawer: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L321)

***

### isFloating

```ts
readonly isFloating: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:324](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L324)

Current presentation mode, available to participating rail actions.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`isFloating`](Interface.IRailHost#isfloating)

***

### layout

```ts
readonly layout: InputSignal<"standard" | "adaptive-drawer">;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:319](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L319)

Uses an adaptive drawer rail with floating actions below the Mosaik medium breakpoint.

***

### usesFloatingActions

```ts
readonly usesFloatingActions: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L327)

Whether the rail gives its column back to the drawer and shows floating action buttons.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`usesFloatingActions`](Interface.IRailHost#usesfloatingactions)

## Accessors

### backCommand

#### Get Signature

```ts
get protected backCommand(): Command<void>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:358](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L358)

Command that restores the compact action overview.

##### Returns

`Command`\<`void`\>

## Methods

### activateContent()

```ts
activateContent(target): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L388)

Activates registered content and expands the surrounding drawer rail.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` | Stable key selected by a rail action. |

#### Returns

`void`

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`activateContent`](Interface.IRailHost#activatecontent)

***

### hasContent()

```ts
hasContent(target): boolean;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:406](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L406)

Indicates whether content is currently registered for a key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` | Stable content key to inspect. |

#### Returns

`boolean`

Whether matching content exists.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`hasContent`](Interface.IRailHost#hascontent)

***

### ngAfterContentInit()

```ts
ngAfterContentInit(): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:371](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L371)

Keeps the coordinator consistent when conditionally declared rail content disappears.

#### Returns

`void`

#### Implementation of

`AfterContentInit.ngAfterContentInit`

***

### onSheetCloseAttempted()

```ts
protected onSheetCloseAttempted(): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:415](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L415)

#### Returns

`void`

***

### onSheetClosed()

```ts
protected onSheetClosed(): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:411](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L411)

#### Returns

`void`
