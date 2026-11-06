---
title: 'Interface: IAdvancedFilterGroup'
generated: true
editUrl: false
---
# Interface: IAdvancedFilterGroup

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:186](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L186)

An advanced filter group with nested rules or groups.

## Properties

### children

```ts
readonly children: readonly AdvancedFilterNode[];
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:205](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L205)

Nested child nodes.

***

### condition

```ts
readonly condition: FilterConditionValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:200](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L200)

Logical condition between child nodes.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L195)

Stable node id.

***

### kind

```ts
readonly kind: "group";
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L190)

Discriminator for group nodes.
