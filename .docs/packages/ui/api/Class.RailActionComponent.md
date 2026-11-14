---
title: 'Class: RailActionComponent'
generated: true
editUrl: false
---
# Class: RailActionComponent

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L73)

Renders one compact action that either activates independently declared rail content
or hosts another action directive when no target is supplied.

## Constructors

### Constructor

```ts
new RailActionComponent(): RailActionComponent;
```

#### Returns

`RailActionComponent`

## Properties

### \_railHost

```ts
protected readonly _railHost: IRailHost;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L76)

***

### appearance

```ts
readonly appearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L140)

Visual Mosaik appearance of the action.

***

### disabled

```ts
readonly disabled: InputSignal<boolean | Signal<boolean>>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L156)

Indicates whether the action is currently unavailable.

***

### floatingAction

```ts
protected readonly floatingAction: Signal<boolean> | (() => false);
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L77)

***

### floatingLabel

```ts
readonly floatingLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L116)

Short visual label used when the action floats.

***

### icon

```ts
readonly icon: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L124)

Mosaik icon rendered by the compact action.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L113)

Accessible label and tooltip for the compact action.

***

### loading

```ts
readonly loading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L164)

Replaces the action with a size-preserving skeleton while its feature initializes.

***

### skeletonTestId

```ts
readonly skeletonTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L172)

Optional test identifier applied to the loading skeleton.

***

### target

```ts
readonly target: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L105)

Stable key of the rail content activated by this action. Omit the target
when a host directive handles the action instead.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:180](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L180)

Optional stable test identifier applied to the interactive action.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L132)

Visual Mosaik variant of the action.

***

### visible

```ts
readonly visible: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L148)

Indicates whether the action participates in the current rail.

## Accessors

### activateCommand

#### Get Signature

```ts
get protected activateCommand(): Command<void>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:188](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L188)

Command that activates the configured target through the generic rail host.

##### Returns

`Command`\<`void`\>
