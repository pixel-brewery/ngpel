---
title: 'Class: RailActionComponent'
generated: true
editUrl: false
---
# Class: RailActionComponent

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L46)

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

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L49)

***

### appearance

```ts
readonly appearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L112)

Visual Mosaik appearance of the action.

***

### disabled

```ts
readonly disabled: InputSignal<boolean | Signal<boolean>>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L128)

Indicates whether the action is currently unavailable.

***

### floatingLabel

```ts
readonly floatingLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L88)

Short visual label used when the action floats.

***

### icon

```ts
readonly icon: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L96)

Mosaik icon rendered by the compact action.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L85)

Accessible label and tooltip for the compact action.

***

### loading

```ts
readonly loading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L136)

Replaces the action with a size-preserving skeleton while its feature initializes.

***

### skeletonTestId

```ts
readonly skeletonTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L144)

Optional test identifier applied to the loading skeleton.

***

### target

```ts
readonly target: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L77)

Stable key of the rail content activated by this action. Omit the target
when a host directive handles the action instead.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L152)

Optional stable test identifier applied to the interactive action.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L104)

Visual Mosaik variant of the action.

***

### visible

```ts
readonly visible: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L120)

Indicates whether the action participates in the current rail.

## Accessors

### activateCommand

#### Get Signature

```ts
get protected activateCommand(): Command<void>;
```

Defined in: [libs/ui/src/components/rail/RailActionComponent.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/rail/RailActionComponent.ts#L160)

Command that activates the configured target through the generic rail host.

##### Returns

`Command`\<`void`\>
