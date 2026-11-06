---
title: 'Interface: IAdvancedFilterRule'
generated: true
editUrl: false
---
# Interface: IAdvancedFilterRule

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L151)

A single advanced filter rule.

## Properties

### fieldKey

```ts
readonly fieldKey: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L165)

Filter field key.

***

### id

```ts
readonly id: string;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L160)

Stable node id.

***

### kind

```ts
readonly kind: "rule";
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L155)

Discriminator for rule nodes.

***

### operator

```ts
readonly operator: FilterOperatorValue;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:170](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L170)

Rule operator.

***

### value?

```ts
readonly optional value?: unknown;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L175)

Optional rule value.
