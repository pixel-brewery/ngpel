---
title: 'Interface: IAdvancedFilterValues'
generated: true
editUrl: false
---
# Interface: IAdvancedFilterValues

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:217](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L217)

Emitted values for advanced filter mode.

## Extends

- `Readonly`\<`Record`\<`string`, `unknown`\>\>

## Indexable

```ts
[key: string]: unknown
```

## Properties

### mode

```ts
readonly mode: "advanced";
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L221)

Discriminator for advanced filter values.

***

### root

```ts
readonly root: IAdvancedFilterGroup;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:226](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L226)

Root condition group.
