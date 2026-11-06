---
title: 'Class: RailComponent'
generated: true
editUrl: false
---
# Class: RailComponent

Defined in: [libs/ui/src/components/rail/RailComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L116)

Coordinates a compact action list with one independently declared drawer rail at a time.

## Implements

- `AfterContentInit`
- [`IRailHost`](Interface.IRailHost)

## Constructors

### Constructor

```ts
new RailComponent(): RailComponent;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L147)

Constructs a rail coordinator and restores its drawer when the local rail is destroyed.

#### Returns

`RailComponent`

## Properties

### activeContentKey

```ts
readonly activeContentKey: Signal<string | null>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L221)

Key of the independently declared content currently visible in the rail.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`activeContentKey`](Interface.IRailHost#activecontentkey)

***

### backLabel

```ts
readonly backLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L193)

Accessible label and tooltip of the generic return action.

***

### backTestId

```ts
readonly backTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:201](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L201)

Stable automation contract for the generic return action.

***

### closeLabel

```ts
readonly closeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:210](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L210)

Accessible label of the sheet's close action.

***

### closeTestId

```ts
readonly closeTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L213)

Optional automation identifier for the sheet's close action.

***

### contents

```ts
protected readonly contents: QueryList<RailContentDirective>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L230)

Rail contents registered below this local coordinator.

***

### floating

```ts
readonly floating: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L204)

Presents activated content in a sheet, leaving the host drawer width intact.

***

### isFloating

```ts
readonly isFloating: Signal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L207)

Current presentation mode, available to participating rail actions.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`isFloating`](Interface.IRailHost#isfloating)

## Accessors

### backCommand

#### Get Signature

```ts
get protected backCommand(): Command<void>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:238](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L238)

Command that restores the compact action overview.

##### Returns

`Command`\<`void`\>

## Methods

### activateContent()

```ts
activateContent(target): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:268](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L268)

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

Defined in: [libs/ui/src/components/rail/RailComponent.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L286)

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

Defined in: [libs/ui/src/components/rail/RailComponent.ts:251](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L251)

Keeps the coordinator consistent when conditionally declared rail content disappears.

#### Returns

`void`

#### Implementation of

```ts
AfterContentInit.ngAfterContentInit
```

***

### onSheetClosed()

```ts
protected onSheetClosed(): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:291](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L291)

#### Returns

`void`
