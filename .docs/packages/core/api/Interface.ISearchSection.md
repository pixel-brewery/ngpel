---
title: 'Interface: ISearchSection'
generated: true
editUrl: false
---
# Interface: ISearchSection

Defined in: [search/models/ISearchSection.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchSection.ts#L15)

A visual group of the search surface, produced by `SearchSession`. Sections are the rendering
unit; flattening them in order yields the keyboard navigation order.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [search/models/ISearchSection.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchSection.ts#L21)

Stable section identifier used for tracking and keyboard flattening.

***

### items

```ts
readonly items: readonly (
  | ICommandItem
  | ISearchResult<unknown>)[];
```

Defined in: [search/models/ISearchSection.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchSection.ts#L42)

Items displayed inside this section, in display order.

***

### label?

```ts
readonly optional label?: string;
```

Defined in: [search/models/ISearchSection.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchSection.ts#L32)

Optional already-resolved label for sections named after provider-owned data.

***

### labelKey?

```ts
readonly optional labelKey?: string;
```

Defined in: [search/models/ISearchSection.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchSection.ts#L27)

Optional translation key for sections whose wording is owned by the application. The session
emits it for the command section when `ISearchConfig.commandSectionLabelKey` is configured.

***

### layout?

```ts
readonly optional layout?: SearchSectionLayout;
```

Defined in: [search/models/ISearchSection.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchSection.ts#L37)

Layout of this section. Defaults to `'list'`.
