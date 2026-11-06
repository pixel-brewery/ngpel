---
title: 'Class: RailActionComponent'
generated: true
editUrl: false
---
# Class: RailActionComponent

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L45)

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

### appearance

```ts
readonly appearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L108)

Visual Mosaik appearance of the action.

***

### disabled

```ts
readonly disabled: InputSignal<boolean | Signal<boolean>>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L124)

Indicates whether the action is currently unavailable.

***

### icon

```ts
readonly icon: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L92)

Mosaik icon rendered by the compact action.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L84)

Accessible label and tooltip for the compact action.

***

### loading

```ts
readonly loading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L132)

Replaces the action with a size-preserving skeleton while its feature initializes.

***

### skeletonTestId

```ts
readonly skeletonTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L140)

Optional test identifier applied to the loading skeleton.

***

### target

```ts
readonly target: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L76)

Stable key of the rail content activated by this action. Omit the target
when a host directive handles the action instead.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L148)

Optional stable test identifier applied to the interactive action.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L100)

Visual Mosaik variant of the action.

***

### visible

```ts
readonly visible: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L116)

Indicates whether the action participates in the current rail.

## Accessors

### activateCommand

#### Get Signature

```ts
get protected activateCommand(): Command<void>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L156)

Command that activates the configured target through the generic rail host.

##### Returns

`Command`\<`void`\>
