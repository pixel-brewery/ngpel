---
title: 'Class: RailComponent'
generated: true
editUrl: false
---
# Class: RailComponent

Defined in: [libs/ui/src/components/rail/RailComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L77)

Coordinates a compact action list with one independently declared drawer rail at a time.

## Implements

- `AfterContentInit`
- [`IRailHost`](Interface.IRailHost)

## Constructors

### Constructor

```ts
new RailComponent(): RailComponent;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L106)

Constructs a rail coordinator and restores its drawer when the local rail is destroyed.

#### Returns

`RailComponent`

## Properties

### activeContentKey

```ts
readonly activeContentKey: Signal<string | null>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L136)

Key of the independently declared content currently visible in the rail.

#### Implementation of

[`IRailHost`](Interface.IRailHost).[`activeContentKey`](Interface.IRailHost#activecontentkey)

***

### backLabel

```ts
readonly backLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L120)

Accessible label and tooltip of the generic return action.

***

### backTestId

```ts
readonly backTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L128)

Stable automation contract for the generic return action.

***

### contents

```ts
protected readonly contents: QueryList<RailContentDirective>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L145)

Rail contents registered below this local coordinator.

## Accessors

### backCommand

#### Get Signature

```ts
get protected backCommand(): Command<void>;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L153)

Command that restores the compact action overview.

##### Returns

`Command`\<`void`\>

## Methods

### activateContent()

```ts
activateContent(target): void;
```

Defined in: [libs/ui/src/components/rail/RailComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L183)

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

Defined in: [libs/ui/src/components/rail/RailComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L199)

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

Defined in: [libs/ui/src/components/rail/RailComponent.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailComponent.ts#L166)

Keeps the coordinator consistent when conditionally declared rail content disappears.

#### Returns

`void`

#### Implementation of

```ts
AfterContentInit.ngAfterContentInit
```
