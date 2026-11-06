---
title: 'Interface: ITextSuggestionOption'
generated: true
editUrl: false
---
# Interface: ITextSuggestionOption

Defined in: libs/ui/src/directives/input-suggestions/ITextSuggestionOption.ts:2

A selectable result supplied by an application-owned suggestion source.

## Properties

### description?

```ts
readonly optional description?: string;
```

Defined in: libs/ui/src/directives/input-suggestions/ITextSuggestionOption.ts:10

Optional context displayed below the label.

***

### icon?

```ts
readonly optional icon?: string;
```

Defined in: libs/ui/src/directives/input-suggestions/ITextSuggestionOption.ts:13

Optional Mosaik icon registry name.

***

### id

```ts
readonly id: string;
```

Defined in: libs/ui/src/directives/input-suggestions/ITextSuggestionOption.ts:4

Stable, unique identifier of the result.

***

### label

```ts
readonly label: string;
```

Defined in: libs/ui/src/directives/input-suggestions/ITextSuggestionOption.ts:7

Text shown as the primary option label.
