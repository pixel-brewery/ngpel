---
title: 'Interface: IAdvancedFilterGroup'
generated: true
editUrl: false
---
# Interface: IAdvancedFilterGroup

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L183)

An advanced filter group with nested rules or groups.

## Properties

### children

```ts
readonly children: readonly AdvancedFilterNode[];
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L202)

Nested child nodes.

***

### condition

```ts
readonly condition: FilterConditionValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L197)

Logical condition between child nodes.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L192)

Stable node id.

***

### kind

```ts
readonly kind: "group";
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:187](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L187)

Discriminator for group nodes.
