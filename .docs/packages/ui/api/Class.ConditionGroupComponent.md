---
title: 'Class: ConditionGroupComponent'
generated: true
editUrl: false
---
# Class: ConditionGroupComponent

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L129)

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

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L148)

***

### addGroupRequested

```ts
readonly addGroupRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L154)

***

### addRuleLabel

```ts
readonly addRuleLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L147)

***

### addRuleRequested

```ts
readonly addRuleRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L153)

***

### allowConditionChange

```ts
readonly allowConditionChange: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L133)

***

### andLabel

```ts
readonly andLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L143)

***

### canAddGroup

```ts
readonly canAddGroup: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L136)

***

### canAddRule

```ts
readonly canAddRule: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L135)

***

### canRemove

```ts
readonly canRemove: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:137](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L137)

***

### condition

```ts
readonly condition: InputSignal<"and" | "or">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L132)

***

### conditionChanged

```ts
readonly conditionChanged: OutputEmitterRef<"and" | "or">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L152)

***

### conditionLabel

```ts
readonly conditionLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L146)

Accessible name of the condition selector.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L134)

***

### inlineActions

```ts
readonly inlineActions: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L139)

Keeps actions beside the condition selector.

***

### level

```ts
protected readonly level: Signal<number>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L157)

***

### orLabel

```ts
readonly orLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L144)

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L149)

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L155)

***

### removeVariant

```ts
readonly removeVariant: InputSignal<"primary" | "danger">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:142](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L142)

***

### showLeadingLine

```ts
readonly showLeadingLine: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L141)

Shows the leading line for nested groups. Disable when the consumer draws its own tree.

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L150)

## Methods

### setCondition()

```ts
protected setCondition(value): void;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L160)

Applies an allowed change without making a fixed domain conjunction editable.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `"and"` \| `"or"` |

#### Returns

`void`
