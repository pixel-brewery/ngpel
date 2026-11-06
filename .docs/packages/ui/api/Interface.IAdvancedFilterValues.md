---
title: 'Interface: IAdvancedFilterValues'
generated: true
editUrl: false
---
# Interface: IAdvancedFilterValues

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:220](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L220)

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

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:224](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L224)

Discriminator for advanced filter values.

***

### root

```ts
readonly root: IAdvancedFilterGroup;
```

Defined in: [libs/ui/src/components/filter-bar/IFilterDefinition.ts:229](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L229)

Root condition group.
