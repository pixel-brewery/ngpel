---
title: 'Interface: IAdvancedFilterRule'
generated: true
editUrl: false
---
# Interface: IAdvancedFilterRule

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L154)

A single advanced filter rule.

## Properties

### fieldKey

```ts
readonly fieldKey: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L168)

Filter field key.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L163)

Stable node id.

***

### kind

```ts
readonly kind: "rule";
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L158)

Discriminator for rule nodes.

***

### operator

```ts
readonly operator: FilterOperatorValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L173)

Rule operator.

***

### value?

```ts
readonly optional value?: unknown;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L178)

Optional rule value.
