---
title: 'Class: ConditionGroupComponent'
generated: true
editUrl: false
---
# Class: ConditionGroupComponent

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L109)

Composes the shared And/Or group toolbar from the advanced list filters with projected domain conditions.
The consumer owns its rule model, allowed operations and evaluation; nested groups reuse the common leading line.

## Constructors

### Constructor

```ts
new ConditionGroupComponent(): ConditionGroupComponent;
```

#### Returns

`ConditionGroupComponent`

## Properties

### addGroupLabel

```ts
readonly addGroupLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L122)

***

### addGroupRequested

```ts
readonly addGroupRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L128)

***

### addRuleLabel

```ts
readonly addRuleLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:121](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L121)

***

### addRuleRequested

```ts
readonly addRuleRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L127)

***

### allowConditionChange

```ts
readonly allowConditionChange: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L113)

***

### andLabel

```ts
readonly andLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L119)

***

### canAddGroup

```ts
readonly canAddGroup: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L116)

***

### canAddRule

```ts
readonly canAddRule: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L115)

***

### canRemove

```ts
readonly canRemove: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L117)

***

### condition

```ts
readonly condition: InputSignal<"and" | "or">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L112)

***

### conditionChanged

```ts
readonly conditionChanged: OutputEmitterRef<"and" | "or">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L126)

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L114)

***

### level

```ts
protected readonly level: Signal<number>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L131)

***

### orLabel

```ts
readonly orLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L120)

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L123)

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L129)

***

### removeVariant

```ts
readonly removeVariant: InputSignal<"danger" | "primary">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L118)

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L124)

## Methods

### setCondition()

```ts
protected setCondition(value): void;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L134)

Applies an allowed change without making a fixed domain conjunction editable.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `"and"` \| `"or"` |

#### Returns

`void`
