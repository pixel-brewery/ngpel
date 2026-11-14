---
title: 'Class: ConditionGroupComponent'
generated: true
editUrl: false
---
# Class: ConditionGroupComponent

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L120)

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

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L133)

***

### addGroupRequested

```ts
readonly addGroupRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L139)

***

### addRuleLabel

```ts
readonly addRuleLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L132)

***

### addRuleRequested

```ts
readonly addRuleRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L138)

***

### allowConditionChange

```ts
readonly allowConditionChange: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L124)

***

### andLabel

```ts
readonly andLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:130](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L130)

***

### canAddGroup

```ts
readonly canAddGroup: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L127)

***

### canAddRule

```ts
readonly canAddRule: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L126)

***

### canRemove

```ts
readonly canRemove: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L128)

***

### condition

```ts
readonly condition: InputSignal<"and" | "or">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L123)

***

### conditionChanged

```ts
readonly conditionChanged: OutputEmitterRef<"and" | "or">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:137](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L137)

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L125)

***

### level

```ts
protected readonly level: Signal<number>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:142](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L142)

***

### orLabel

```ts
readonly orLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L131)

***

### removeLabel

```ts
readonly removeLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L134)

***

### removeRequested

```ts
readonly removeRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L140)

***

### removeVariant

```ts
readonly removeVariant: InputSignal<"primary" | "danger">;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L129)

***

### testIdPrefix

```ts
readonly testIdPrefix: InputSignal<string>;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L135)

## Methods

### setCondition()

```ts
protected setCondition(value): void;
```

Defined in: [libs/ui/src/components/condition-group/ConditionGroupComponent.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/condition-group/ConditionGroupComponent.ts#L145)

Applies an allowed change without making a fixed domain conjunction editable.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `"and"` \| `"or"` |

#### Returns

`void`
